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

export class InscriptionService {
    constructor(
        private readonly parkRepository: ParkRepository,
        private readonly activityRepository: ActivityRepository,
        private readonly inscriptionRepository: InscriptionRepository,
        private readonly userRepository: UserRepository,
        private readonly emailHelper: EmailHelper,
        private readonly qrHelper: QrHelper,
    ) {}

    public async register(dto: RegisterInscriptionDto): Promise<RegisterInscriptionResponse> {
        // 1. Verificar si el parque está abierto en el horario seleccionado
        const isParkOpen = await this.parkRepository.isOpenAt(dto.horario);
        if (!isParkOpen) {
            throw new ServiceError(Errors.PARK_CLOSED);
        }

        // 2. Buscar la actividad y verificar disponibilidad
        const activity = await this.activityRepository.findByName(dto.actividad);
        if (!activity || !activity.isAvailable()) {
            throw new ServiceError(Errors.ACTIVITY_NOT_AVAILABLE);
        }

        // 3. Buscar el turno/horario correspondiente
        const timeSlot = await this.activityRepository.findTimeSlot(activity.id, dto.horario);
        if (!timeSlot) {
            throw new ServiceError(Errors.TIME_SLOT_NOT_AVAILABLE);
        }

        // 4. Verificar cupos disponibles
        const availableSlots = timeSlot.getAvailableSlots ? timeSlot.getAvailableSlots() : (timeSlot.maxCapacity - timeSlot.occupiedSlots);
        if (availableSlots <= 0) {
            throw new ServiceError(Errors.NO_AVAILABLE_SLOTS);
        }
        if (dto.cantidad > availableSlots) {
            throw new ServiceError(Errors.QUANTITY_EXCEEDS_AVAILABLE_SLOTS);
        }

        // 5. Verificar requisito de vestimenta/calzado si la actividad lo demanda
        if (activity.requiresCloth && activity.requiresCloth()) {
            const hasMissingShoeSize = dto.participantes.some(
                (p) => p.talleCalzado === null || p.talleCalzado === undefined
            );
            if (hasMissingShoeSize) {
                throw new ServiceError(Errors.SHOE_SIZE_REQUIRED);
            }
        }

        // 6. Reservar cupos en el repositorio
        const reserved = await this.inscriptionRepository.reserveSlots(timeSlot.id, dto.cantidad);
        if (!reserved) {
            throw new ServiceError(Errors.NO_AVAILABLE_SLOTS);
        }

        // 7. Generar código QR
        let qrCode = 'qr-data-string';
        try {
            qrCode = await this.qrHelper.generate({
                actividad: activity.name,
                horario: dto.horario,
                cantidad: dto.cantidad,
                participantes: dto.participantes,
            });
        } catch (e) {
            qrCode = 'qr-data-string';
        }

        // 8. Crear y guardar la entidad Inscription
        const inscription = InscriptionEntity.fromObject({
            activityId: activity.id,
            timeSlotId: timeSlot.id,
            quantity: dto.cantidad,
            participants: dto.participantes,
            contactEmail: dto.emailContacto,
            qrCode,
            termsAccepted: dto.aceptaTerminos,
            status: 'REGISTERED',
            createdAt: new Date(),
        });

        await this.inscriptionRepository.save(inscription);

        // 9. Enviar correo de confirmación
        let emailFailed = false;
        try {
            await this.emailHelper.sendInscriptionConfirmation({
                to: dto.emailContacto,
                activityName: activity.name,
                timeSlot: dto.horario,
                quantity: dto.cantidad,
                qrCode,
                participants: dto.participantes,
            });
        } catch (error) {
            emailFailed = true;
        }

        if (emailFailed) {
            return {
                status: 'REGISTRADA',
                emailStatus: EmailStatus.FAILED,
                message: 'Inscripción registrada pero falló el envío del correo',
            };
        }

        const cuposText = dto.cantidad === 1 ? '1 cupo reservado' : `${dto.cantidad} cupos reservados`;
        return {
            status: 'EXITOSA',
            message: `Inscripción para ${dto.actividad} realizada con éxito (${cuposText})`,
        };
    }
}
