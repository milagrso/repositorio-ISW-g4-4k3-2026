import { ActivityRepository } from '../../../domain/repositories/activity.repository';
import { ParkRepository } from '../../../domain/repositories/park.repository';
import { InscriptionRepository } from '../../../domain/repositories/inscription.repository';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { ServiceError } from '../../../domain/messages/service.error';
import { Errors } from '../../../domain/messages/error-type.constants';
import { getArgentinaIsoString } from '../../helpers/time.helper';

export { getArgentinaIsoString } from '../../helpers/time.helper';

export class CatalogService {
    constructor(
        private readonly activityRepository: ActivityRepository,
        private readonly parkRepository: ParkRepository,
        private readonly inscriptionRepository: InscriptionRepository,
        private readonly userRepository: UserRepository,
    ) {}

    public async getActivities() {
        const activities = await this.activityRepository.findAll();
        return activities.map((a) => this.mapActivity(a));
    }

    public async getActivityById(id: string | number) {
        const activity = await this.activityRepository.findById(id);
        if (!activity) {
            throw new ServiceError(Errors.ACTIVITY_NOT_FOUND);
        }
        return this.mapActivity(activity);
    }

    public async getAvailableSlotsByActivityAndDate(activityId: string | number, fecha?: string) {
        return this.getActivityTimeSlots(activityId, fecha);
    }

    public async getActivityTimeSlots(activityId: string | number, fecha?: string) {
        const activity = await this.activityRepository.findById(activityId);
        if (!activity) {
            throw new ServiceError(Errors.ACTIVITY_NOT_FOUND);
        }

        const slots = await this.activityRepository.findTimeSlotsByActivityId(activityId, fecha);

        return slots.map((slot) => {
            const cupoMaximo = slot.maxCapacity;
            const cuposDisponibles = slot.getAvailableSlots ? slot.getAvailableSlots() : (slot.maxCapacity - slot.occupiedSlots);

            let reservable = true;
            let motivo: string | undefined = undefined;

            if (cuposDisponibles <= 0) {
                reservable = false;
                motivo = 'Sin cupos';
            } else if (fecha) {
                const [year, month, day] = fecha.split('-').map(Number);
                const dateUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

                if (dateUtc.getUTCDay() === 1 || (month === 12 && day === 25) || (month === 1 && day === 1)) {
                    reservable = false;
                    motivo = 'Parque cerrado';
                } else {
                    const [hours, minutes] = slot.startTime.split(':').map(Number);
                    const slotDateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0, 0)).getTime();
                    const now = new Date().getTime();
                    const diffMs = slotDateTime - now;

                    if (diffMs > 24 * 60 * 60 * 1000) {
                        reservable = false;
                        motivo = 'Turno habilitado 24hs antes';
                    } else if (diffMs < 15 * 60 * 1000) {
                        reservable = false;
                        motivo = 'Inscripciones cerradas (15 min antes)';
                    }
                }
            }

            return {
                id: slot.id,
                activityId: slot.activityId,
                hora: slot.startTime,
                startTime: slot.startTime,
                endTime: slot.endTime,
                cupoMaximo,
                maxCapacity: cupoMaximo,
                cuposDisponibles,
                availableSlots: cuposDisponibles,
                reservable,
                motivo,
            };
        });
    }

    public async getTimeSlots(fecha?: string) {
        const slots = await this.activityRepository.findAllTimeSlots(fecha);
        return slots.map((slot) => ({
            id: slot.id,
            activityId: slot.activityId,
            hora: slot.startTime,
            startTime: slot.startTime,
            endTime: slot.endTime,
            cupoMaximo: slot.maxCapacity,
            maxCapacity: slot.maxCapacity,
            cuposDisponibles: slot.getAvailableSlots ? slot.getAvailableSlots() : (slot.maxCapacity - slot.occupiedSlots),
            availableSlots: slot.getAvailableSlots ? slot.getAvailableSlots() : (slot.maxCapacity - slot.occupiedSlots),
            occupiedSlots: slot.occupiedSlots,
        }));
    }

    public async getTimeSlotById(id: string | number, fecha?: string) {
        const slot = await this.activityRepository.findTimeSlotById(id, fecha);
        if (!slot) {
            throw new ServiceError(Errors.TIME_SLOT_NOT_FOUND);
        }
        return {
            id: slot.id,
            activityId: slot.activityId,
            hora: slot.startTime,
            startTime: slot.startTime,
            endTime: slot.endTime,
            cupoMaximo: slot.maxCapacity,
            maxCapacity: slot.maxCapacity,
            cuposDisponibles: slot.getAvailableSlots ? slot.getAvailableSlots() : (slot.maxCapacity - slot.occupiedSlots),
            availableSlots: slot.getAvailableSlots ? slot.getAvailableSlots() : (slot.maxCapacity - slot.occupiedSlots),
            occupiedSlots: slot.occupiedSlots,
        };
    }

    public async getParks() {
        return this.parkRepository.findAll();
    }

    public async getParkById(id: string | number) {
        const park = await this.parkRepository.findById(id);
        if (!park) {
            throw new ServiceError(Errors.PARK_NOT_FOUND);
        }
        return park;
    }

    public async getInscriptions() {
        return this.inscriptionRepository.findAll();
    }

    public async getInscriptionById(id: string | number) {
        const inscription = await this.inscriptionRepository.findById(id);
        if (!inscription) {
            throw new ServiceError(Errors.INSCRIPTION_NOT_FOUND);
        }
        return inscription;
    }

    public async getSessionUser() {
        const user = await this.userRepository.findSessionUser();
        if (!user) {
            throw new ServiceError(Errors.USER_NOT_FOUND);
        }
        return {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
        };
    }

    public getServerTime() {
        return {
            now: getArgentinaIsoString(),
        };
    }

    public getCurrentTime() {
        return this.getServerTime();
    }

    private mapActivity(a: any) {
        const requiresCloth = typeof a.requiresCloth === 'function' ? a.requiresCloth() : Boolean(a.cloth);
        const available = typeof a.isAvailable === 'function' ? a.isAvailable() : (a.enabled !== false);

        return {
            id: a.id,
            name: a.name,
            nombre: a.name,
            enabled: a.enabled !== false,
            habilitada: a.enabled !== false,
            available,
            requiresCloth,
            clothRequired: requiresCloth,
            requiereTalle: requiresCloth,
            cloth: a.cloth,
            minAge: a.minAge ?? 0,
            edadMinima: a.minAge ?? 0,
            maxCapacityActivity: a.maxCapacityActivity,
            cupoMaximo: a.maxCapacityActivity,
            termsAndConditions: a.termsAndConditions,
            terminos: a.termsAndConditions,
        };
    }
}
