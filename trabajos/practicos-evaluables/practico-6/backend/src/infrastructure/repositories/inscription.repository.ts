import { InscriptionEntity, InscriptionRepository } from '../../domain';
import { PostgresInscriptionDataSource } from '../data-sources/inscription';

export class InscriptionRepository_I implements InscriptionRepository {

    private dataSource: PostgresInscriptionDataSource;

    constructor() {
        this.dataSource = new PostgresInscriptionDataSource();
    }

    public findAll(): Promise<InscriptionEntity[]> {
        return this.dataSource.findAll();
    }

    public findById(id: string | number): Promise<InscriptionEntity | null> {
        return this.dataSource.findById(id);
    }

    public hasActiveInscriptionForParticipant(dni: number, horario?: string, fecha?: string): Promise<boolean> {
        return this.dataSource.hasActiveInscriptionForParticipant(dni, horario, fecha);
    }

    public findActiveByParticipantDniAndSchedule(dni: number, horario?: string, fecha?: string): Promise<InscriptionEntity | null> {
        return this.dataSource.findActiveByParticipantDniAndSchedule(dni, horario, fecha);
    }

    public reserveSlots(timeSlotId: string | number, quantity: number, fecha?: string): Promise<boolean> {
        return this.dataSource.reserveSlots(timeSlotId, quantity, fecha);
    }

    public save(inscription: InscriptionEntity | any): Promise<InscriptionEntity | any> {
        return this.dataSource.save(inscription);
    }
}
