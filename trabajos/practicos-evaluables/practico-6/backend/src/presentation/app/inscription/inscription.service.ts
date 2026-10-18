import { ParkRepository } from '../../../domain/repositories/park.repository';
import { ActivityRepository } from '../../../domain/repositories/activity.repository';
import { InscriptionRepository } from '../../../domain/repositories/inscription.repository';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { EmailHelper } from '../../../infrastructure/helpers/email.helper';
import { QrHelper } from '../../../infrastructure/helpers/qr.helper';
import { ServiceError } from '../../../domain/messages/service.error';
import { Errors } from '../../../domain/messages/error-type.constants';
import { RegisterInscriptionDto } from '../../dto/inscription/register-inscription.dto';
import { EmailStatus, RegisterInscriptionResponse } from '../../dto/inscription/register-inscription.res';
import { InscriptionEntity } from '../../../domain/entities/inscription.entity';
import { Transactional } from '../../../infrastructure/decorators/transactional.decorator';
import { TimeHelper } from '../../helpers/time.helper';

export class InscriptionService {
    constructor(
        private readonly parkRepository: ParkRepository,
        private readonly activityRepository: ActivityRepository,
        private readonly inscriptionRepository: InscriptionRepository,
        _userRepository?: UserRepository,
        private readonly emailHelper: EmailHelper = new EmailHelper(),
        private readonly qrHelper: QrHelper = new QrHelper(),
    ) {}

    public async register(dto: RegisterInscriptionDto): Promise<RegisterInscriptionResponse> {
        // 1. Validar calendario del parque si dto.fecha está presente (cerrado lunes, 25/12, 01/01)
        if (dto.fecha) {
            const [year, month, day] = dto.fecha.split('-').map(Number);
            const dateUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
            // getUTCDay: 0=Sunday, 1=Monday
            if (dateUtc.getUTCDay() === 1 || (month === 12 && day === 25) || (month === 1 && day === 1)) {
                throw new ServiceError(Errors.PARK_CLOSED_ON_DATE);
            }
        }

        // 2. Verificar si el parque está abierto en el horario seleccionado
        const isParkOpen = await this.parkRepository.isOpenAt(dto.horario);
        if (!isParkOpen) {
            throw new ServiceError(Errors.PARK_CLOSED);
        }

        // 3. Buscar la actividad y verificar disponibilidad
        const activity = await this.activityRepository.findByName(dto.actividad);
        if (!activity || !activity.isAvailable()) {
            throw new ServiceError(Errors.ACTIVITY_NOT_AVAILABLE);
        }

        // 4. Buscar el turno/horario correspondiente (pasando fecha si está disponible)
        const timeSlot = await this.activityRepository.findTimeSlot(activity.id, dto.horario, dto.fecha);
        if (!timeSlot) {
            throw new ServiceError(Errors.TIME_SLOT_NOT_AVAILABLE);
        }

        // 5. Validar ventana temporal de reserva (dentro de las 24h previas y al menos 15m antes)
        if (dto.fecha && dto.horario) {
            const slotDateTime = TimeHelper.parseArgentinaDateTime(dto.fecha, dto.horario);
            const now = new Date().getTime();
            const diffMs = slotDateTime - now;

            if (diffMs > 24 * 60 * 60 * 1000) {
                throw new ServiceError(Errors.BOOKING_TOO_EARLY);
            }
            if (diffMs < 15 * 60 * 1000) {
                throw new ServiceError(Errors.BOOKING_TOO_LATE);
            }
        }

        // 6. Validar capacidad máxima total de la actividad
        if (activity.maxCapacityActivity !== undefined && activity.maxCapacityActivity !== null && dto.cantidad > activity.maxCapacityActivity) {
            throw new ServiceError((Errors.ACTIVITY_MAX_CAPACITY_EXCEEDED as any)(activity.maxCapacityActivity));
        }

        // 7. Validar edad mínima por actividad
        if (activity.minAge !== undefined && activity.minAge !== null && activity.minAge > 0) {
            const hasUnderage = dto.participantes.some((p) => p.edad < activity.minAge!);
            if (hasUnderage) {
                throw new ServiceError(Errors.PARTICIPANT_AGE_BELOW_MINIMUM);
            }
        }

        // 8. Verificar cupos disponibles en el turno
        const availableSlots = timeSlot.getAvailableSlots ? timeSlot.getAvailableSlots() : (timeSlot.maxCapacity - timeSlot.occupiedSlots);
        if (availableSlots <= 0) {
            throw new ServiceError(Errors.NO_AVAILABLE_SLOTS);
        }
        if (dto.cantidad > availableSlots) {
            throw new ServiceError(Errors.QUANTITY_EXCEEDS_AVAILABLE_SLOTS);
        }

        // 9. Verificar requisito de vestimenta/calzado si la actividad lo demanda
        if (activity.requiresCloth && activity.requiresCloth()) {
            const hasMissingCloth = dto.participantes.some(
                (p) => (!p.talleVestimenta && !p.talleCalzado)
            );
            if (hasMissingCloth) {
                throw new ServiceError(Errors.CLOTH_SIZE_REQUIRED);
            }
        }

        // 10. Validar solapamiento de horarios por participante (DNI)
        for (const p of dto.participantes) {
            const overlap = await this.inscriptionRepository.hasActiveInscriptionForParticipant!(p.dni, dto.horario, dto.fecha);
            if (overlap) {
                if (dto.participantes.length > 1) {
                    throw new ServiceError(Errors.GROUP_PARTICIPANT_SCHEDULE_OVERLAP);
                } else {
                    throw new ServiceError(Errors.PARTICIPANT_SCHEDULE_OVERLAP);
                }
            }
        }

        // 11. Generar número de inscripción y códigos QR
        const numeroInscripcion = `EHP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const participantesWithQr = await Promise.all(
            dto.participantes.map(async (p) => {
                const qr = await this.qrHelper.generate({
                    numeroInscripcion,
                    actividad: activity.name,
                    horario: dto.horario,
                    fecha: dto.fecha,
                    participante: p,
                });
                return {
                    ...p,
                    qr,
                };
            })
        );

        const qrCode = participantesWithQr[0]?.qr ?? '';

        // 12. Reservar cupos y guardar la inscripción de forma transaccional
        await this.persistInscription(timeSlot.id, dto, activity.id, qrCode, numeroInscripcion);

        // 13. Enviar correo de confirmación (I/O externo fuera de la transacción DB)
        let emailFailed = false;
        try {
            await this.emailHelper.sendInscriptionConfirmation({
                to: dto.emailContacto,
                activityName: activity.name,
                timeSlot: dto.horario,
                quantity: dto.cantidad,
                qrCode,
                fecha: dto.fecha,
                numeroInscripcion,
                participants: dto.participantes,
            });
        } catch (error) {
            emailFailed = true;
        }

        const cuposText = dto.cantidad === 1 ? '1 cupo reservado' : `${dto.cantidad} cupos reservados`;

        if (emailFailed) {
            return {
                status: 'REGISTRADA',
                emailStatus: EmailStatus.FAILED,
                message: 'Inscripción registrada pero falló el envío del correo',
                numeroInscripcion,
                actividad: dto.actividad,
                fecha: dto.fecha,
                horario: dto.horario,
                participantes: participantesWithQr,
            };
        }

        return {
            status: 'EXITOSA',
            message: `Inscripción para ${dto.actividad} realizada con éxito (${cuposText})`,
            emailStatus: EmailStatus.SENT,
            numeroInscripcion,
            actividad: dto.actividad,
            fecha: dto.fecha,
            horario: dto.horario,
            participantes: participantesWithQr,
        };
    }

    @Transactional()
    private async persistInscription(
        timeSlotId: string | number,
        dto: RegisterInscriptionDto,
        activityId: string | number,
        qrCode: string,
        numeroInscripcion: string
    ): Promise<void> {
        const reserved = await this.inscriptionRepository.reserveSlots(timeSlotId, dto.cantidad);
        if (!reserved) {
            throw new ServiceError(Errors.NO_AVAILABLE_SLOTS);
        }

        const inscription = InscriptionEntity.fromObject({
            activityId,
            timeSlotId,
            quantity: dto.cantidad,
            participants: dto.participantes,
            contactEmail: dto.emailContacto,
            qrCode,
            termsAccepted: dto.aceptaTerminos,
            status: 'REGISTERED',
            createdAt: new Date(),
            fecha: dto.fecha,
            numeroInscripcion,
        });

        await this.inscriptionRepository.save(inscription);
    }
}
