import { InscriptionModel } from '../postgresql/models/inscription.model';
import { TimeSlotModel } from '../postgresql/models/time-slot.model';
import { InscriptionDataSource, InscriptionEntity } from '../../domain';

export class PostgresInscriptionDataSource implements InscriptionDataSource {

    constructor() {
        InscriptionModel.sync();
        TimeSlotModel.sync();
    }

    public async reserveSlots(timeSlotId: string | number, quantity: number): Promise<boolean> {
        try {
            const slot = await TimeSlotModel.findByPk(timeSlotId);

            if (!slot) {
                return false;
            }

            const { maxCapacity, occupiedSlots } = slot.dataValues;

            if (maxCapacity - occupiedSlots < quantity) {
                return false;
            }

            await slot.update({ occupiedSlots: occupiedSlots + quantity });
            return true;
        } catch (error) {
            throw error;
        }
    }

    public async save(inscription: InscriptionEntity | any): Promise<InscriptionEntity> {
        try {
            const created = await InscriptionModel.create({
                activityId: inscription.activityId,
                timeSlotId: inscription.timeSlotId,
                quantity: inscription.quantity,
                participants: inscription.participants,
                contactEmail: inscription.contactEmail,
                qrCode: inscription.qrCode,
                termsAccepted: inscription.termsAccepted,
                status: inscription.status || 'REGISTERED',
                createdAt: inscription.createdAt || new Date(),
            });

            return InscriptionEntity.fromObject(created.dataValues);
        } catch (error) {
            throw error;
        }
    }
}
