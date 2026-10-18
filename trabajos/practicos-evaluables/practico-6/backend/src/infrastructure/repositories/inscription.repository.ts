import { InscriptionDataSource, InscriptionEntity, InscriptionRepository } from '../../domain';
import { PostgresInscriptionDataSource } from '../data-sources/inscription';

export class InscriptionRepository_I implements InscriptionRepository {

    private dataSource: InscriptionDataSource;

    constructor(dataSource?: InscriptionDataSource) {
        this.dataSource = dataSource ?? new PostgresInscriptionDataSource();
    }

    public findAll(): Promise<InscriptionEntity[]> {
        return this.dataSource.findAll();
    }

    public findById(id: string | number): Promise<InscriptionEntity | null> {
        return this.dataSource.findById(id);
    }

    public hasActiveInscriptionForParticipant(dni: number, horario?: string, fecha?: string): Promise<boolean> {
        if (!this.dataSource.hasActiveInscriptionForParticipant) {
            return Promise.resolve(false);
        }
        return this.dataSource.hasActiveInscriptionForParticipant(dni, horario, fecha);
    }

    public findActiveByParticipantDniAndSchedule(dni: number, horario?: string, fecha?: string): Promise<InscriptionEntity | null> {
        if (!this.dataSource.findActiveByParticipantDniAndSchedule) {
            return Promise.resolve(null);
        }
        return this.dataSource.findActiveByParticipantDniAndSchedule(dni, horario, fecha);
    }

    public reserveSlots(timeSlotId: string | number, quantity: number): Promise<boolean> {
        return this.dataSource.reserveSlots(timeSlotId, quantity);
    }

    public save(inscription: InscriptionEntity | any): Promise<InscriptionEntity | any> {
        return this.dataSource.save(inscription);
    }
}
