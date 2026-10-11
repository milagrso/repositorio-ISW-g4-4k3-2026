import { InscriptionEntity, InscriptionRepository } from '../../domain';
import { PostgresInscriptionDataSource } from '../data-sources/inscription';

export class InscriptionRepository_I implements InscriptionRepository {

    private dataSource: PostgresInscriptionDataSource;

    constructor() {
        this.dataSource = new PostgresInscriptionDataSource();
    }

    public reserveSlots(timeSlotId: string | number, quantity: number): Promise<boolean> {
        return this.dataSource.reserveSlots(timeSlotId, quantity);
    }

    public save(inscription: InscriptionEntity | any): Promise<InscriptionEntity | any> {
        return this.dataSource.save(inscription);
    }
}
