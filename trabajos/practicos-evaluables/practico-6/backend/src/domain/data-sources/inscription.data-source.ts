import { InscriptionEntity } from '../entities/inscription.entity';

export abstract class InscriptionDataSource {
    public abstract reserveSlots(timeSlotId: string | number, quantity: number): Promise<boolean>;
    public abstract save(inscription: InscriptionEntity | any): Promise<InscriptionEntity | any>;
}
