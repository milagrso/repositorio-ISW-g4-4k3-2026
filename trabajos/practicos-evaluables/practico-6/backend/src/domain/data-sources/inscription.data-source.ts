import { InscriptionEntity } from '../entities/inscription.entity';

export abstract class InscriptionDataSource {
    public abstract findAll(): Promise<InscriptionEntity[]>;
    public abstract findById(id: string | number): Promise<InscriptionEntity | null>;
    public abstract hasActiveInscriptionForParticipant?(dni: number, horario?: string, fecha?: string): Promise<boolean>;
    public abstract findActiveByParticipantDniAndSchedule?(dni: number, horario?: string, fecha?: string): Promise<InscriptionEntity | null>;
    public abstract reserveSlots(timeSlotId: string | number, quantity: number): Promise<boolean>;
    public abstract save(inscription: InscriptionEntity | any): Promise<InscriptionEntity | any>;
}
