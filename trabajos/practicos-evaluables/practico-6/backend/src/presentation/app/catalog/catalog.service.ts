import { ActivityRepository } from '../../../domain/repositories/activity.repository';
import { ParkRepository } from '../../../domain/repositories/park.repository';
import { InscriptionRepository } from '../../../domain/repositories/inscription.repository';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { ServiceError } from '../../../domain/messages/service.error';
import { Errors } from '../../../domain/messages/error-type.constants';
import { TimeHelper } from '../../helpers/time.helper';

export class CatalogService {
    constructor(
        private readonly activityRepository: ActivityRepository,
        private readonly parkRepository: ParkRepository,
        private readonly inscriptionRepository: InscriptionRepository,
        private readonly userRepository: UserRepository,
    ) {}

    public async getActivities() {
        return await this.activityRepository.findAll();
    }

    public async getActivityById(id: string | number) {
        const activity = await this.activityRepository.findById(id);
        if (!activity) {
            throw new ServiceError(Errors.ACTIVITY_NOT_FOUND);
        }
        return activity;
    }

    public async getTimeSlots(fecha?: string, activityId?: string | number) {
        if (activityId !== undefined) {
            return await this.activityRepository.findTimeSlotsByActivityId(activityId, fecha);
        }
        return await this.activityRepository.findAllTimeSlots(fecha);
    }

    public async getTimeSlotById(id: string | number) {
        const slot = await this.activityRepository.findTimeSlotById(id);
        if (!slot) {
            throw new ServiceError(Errors.TIME_SLOT_NOT_FOUND);
        }
        return slot;
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
            now: TimeHelper.getArgentinaIsoString(),
        };
    }

    public getCurrentTime() {
        return this.getServerTime();
    }
}
