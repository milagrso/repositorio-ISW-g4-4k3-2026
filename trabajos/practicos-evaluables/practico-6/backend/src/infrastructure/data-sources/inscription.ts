import { Op } from 'sequelize';
import { InscriptionModel } from '../postgresql/models/inscription.model';
import { TimeSlotModel } from '../postgresql/models/time-slot.model';
import { InscriptionDataSource, InscriptionEntity } from '../../domain';

export class PostgresInscriptionDataSource implements InscriptionDataSource {

    constructor() {
        InscriptionModel.sync({ alter: true });
        TimeSlotModel.sync({ alter: true });
    }

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

        const inscriptions = await InscriptionModel.findAll({ where: whereClause });

        for (const insc of inscriptions) {
            const data = insc.dataValues;
            const participants = Array.isArray(data.participants) ? data.participants : [];
            const hasDni = participants.some((p: any) => Number(p.dni) === Number(dni));

            if (hasDni) {
                if (!horario) {
                    return InscriptionEntity.fromObject(data);
                }
                const slot = await TimeSlotModel.findByPk(data.timeSlotId);
                if (slot && slot.dataValues.startTime === horario) {
                    return InscriptionEntity.fromObject(data);
                }
            }
        }

        return null;
    }

    public async reserveSlots(timeSlotId: string | number, quantity: number, fecha?: string): Promise<boolean> {
        try {
            const slot = await TimeSlotModel.findByPk(timeSlotId);

            if (!slot) {
                return false;
            }

            const { maxCapacity, occupiedSlots } = slot.dataValues;

            if (fecha) {
                const inscriptions = await InscriptionModel.findAll({
                    where: {
                        timeSlotId,
                        fecha,
                        status: { [Op.ne]: 'CANCELLED' }
                    }
                });
                const occupiedOnDate = inscriptions.reduce((sum, insc: any) => sum + (Number(insc.quantity) || 0), 0);
                if (maxCapacity - occupiedOnDate < quantity) {
                    return false;
                }
                return true;
            }

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
                fecha: inscription.fecha,
                numeroInscripcion: inscription.numeroInscripcion,
            });

            return InscriptionEntity.fromObject(created.dataValues);
        } catch (error) {
            throw error;
        }
    }
}
