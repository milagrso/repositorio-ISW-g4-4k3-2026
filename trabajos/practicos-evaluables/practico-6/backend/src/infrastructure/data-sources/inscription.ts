import { Op, Sequelize } from 'sequelize';
import { InscriptionModel } from '../postgresql/models/inscription.model';
import { TimeSlotModel } from '../postgresql/models/time-slot.model';
import { InscriptionDataSource, InscriptionEntity } from '../../domain';

export class PostgresInscriptionDataSource implements InscriptionDataSource {

    constructor() {}

    public async findAll(): Promise<InscriptionEntity[]> {
        const inscriptions = await InscriptionModel.findAll({ order: [['id', 'DESC']] });
        return inscriptions.map((i) => InscriptionEntity.fromObject(i.dataValues));
    }

    public async findById(id: string | number): Promise<InscriptionEntity | null> {
        const num = Number(id);
        if (!Number.isInteger(num) || num <= 0) return null;
        const inscription = await InscriptionModel.findByPk(num);
        if (!inscription) return null;
        return InscriptionEntity.fromObject(inscription.dataValues);
    }

    public async hasActiveInscriptionForParticipant(dni: number, horario?: string, fecha?: string): Promise<boolean> {
        const active = await this.findActiveByParticipantDniAndSchedule(dni, horario, fecha);
        return active !== null;
    }

    public async findActiveByParticipantDniAndSchedule(dni: number, horario?: string, fecha?: string): Promise<InscriptionEntity | null> {
        const whereClause: any = {
            status: { [Op.ne]: 'CANCELLED' }
        };
        if (fecha) {
            whereClause.fecha = fecha;
        }

        const inscriptions = await InscriptionModel.findAll({
            where: whereClause,
            include: horario ? [{
                model: TimeSlotModel,
                as: 'timeSlot',
                where: { startTime: horario },
                required: true,
            }] : undefined,
        });

        for (const insc of inscriptions) {
            const data = insc.dataValues;
            const participants = Array.isArray(data.participants) ? data.participants : [];
            const hasDni = participants.some((p: any) => Number(p.dni) === Number(dni));

            if (hasDni) {
                return InscriptionEntity.fromObject(data);
            }
        }

        return null;
    }

    public async reserveSlots(timeSlotId: string | number, quantity: number): Promise<boolean> {
        try {
            const qty = Number(quantity);
            const slotId = Number(timeSlotId);

            if (!Number.isInteger(qty) || qty <= 0) {
                return false;
            }
            if (!Number.isInteger(slotId) || slotId <= 0) {
                return false;
            }

            const [affectedCount] = await TimeSlotModel.update(
                { occupiedSlots: Sequelize.literal(`"occupiedSlots" + ${qty}`) },
                {
                    where: {
                        id: slotId,
                        occupiedSlots: { [Op.lte]: Sequelize.literal(`"maxCapacity" - ${qty}`) }
                    },
                }
            );

            return affectedCount > 0;
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
                fecha: inscription.fecha,
                numeroInscripcion: inscription.numeroInscripcion,
            });

            return InscriptionEntity.fromObject(created.dataValues);
        } catch (error) {
            throw error;
        }
    }
}
