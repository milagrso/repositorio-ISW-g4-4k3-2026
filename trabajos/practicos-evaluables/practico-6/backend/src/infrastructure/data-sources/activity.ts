import { Op } from 'sequelize';
import { ActivityModel } from '../postgresql/models/activity.model';
import { TimeSlotModel } from '../postgresql/models/time-slot.model';
import { InscriptionModel } from '../postgresql/models/inscription.model';
import { ActivityDataSource, ActivityEntity, TimeSlotEntity } from '../../domain';

export class PostgresActivityDataSource implements ActivityDataSource {

    constructor() {
        ActivityModel.sync();
        TimeSlotModel.sync();
    }

    private async calculateOccupiedSlots(timeSlotId: number | string, fecha?: string): Promise<number> {
        if (!fecha) return 0;
        try {
            const inscriptions = await InscriptionModel.findAll({
                where: {
                    timeSlotId,
                    fecha,
                    status: { [Op.ne]: 'CANCELLED' }
                }
            });
            return inscriptions.reduce((sum, insc: any) => sum + (Number(insc.quantity) || 0), 0);
        } catch {
            return 0;
        }
    }

    public async findAll(): Promise<ActivityEntity[]> {
        const activities = await ActivityModel.findAll();
        return activities.map((a) => ActivityEntity.fromObject(a.dataValues));
    }

    public async findById(id: string | number): Promise<ActivityEntity | null> {
        const activity = await ActivityModel.findByPk(id);
        if (!activity) return null;
        return ActivityEntity.fromObject(activity.dataValues);
    }

    public async findByName(name: string): Promise<ActivityEntity | null> {
        try {
            const activity = await ActivityModel.findOne({ where: { name } });

            if (!activity) {
                return null;
            }

            return ActivityEntity.fromObject(activity.dataValues);
        } catch (error) {
            throw error;
        }
    }

    public async findTimeSlot(activityId: string | number, time: string, fecha?: string): Promise<TimeSlotEntity | null> {
        try {
            const slot = await TimeSlotModel.findOne({
                where: { activityId, startTime: time }
            });

            if (!slot) {
                return null;
            }

            const data = { ...slot.dataValues };
            if (fecha) {
                data.occupiedSlots = await this.calculateOccupiedSlots(slot.dataValues.id, fecha);
            }

            return TimeSlotEntity.fromObject(data);
        } catch (error) {
            throw error;
        }
    }

    public async findAllTimeSlots(fecha?: string): Promise<TimeSlotEntity[]> {
        const slots = await TimeSlotModel.findAll({ order: [['startTime', 'ASC']] });
        return Promise.all(
            slots.map(async (slot) => {
                const data = { ...slot.dataValues };
                if (fecha) {
                    data.occupiedSlots = await this.calculateOccupiedSlots(slot.dataValues.id, fecha);
                }
                return TimeSlotEntity.fromObject(data);
            })
        );
    }

    public async findTimeSlotById(id: string | number, fecha?: string): Promise<TimeSlotEntity | null> {
        const slot = await TimeSlotModel.findByPk(id);
        if (!slot) return null;
        const data = { ...slot.dataValues };
        if (fecha) {
            data.occupiedSlots = await this.calculateOccupiedSlots(slot.dataValues.id, fecha);
        }
        return TimeSlotEntity.fromObject(data);
    }

    public async findTimeSlotsByActivityId(activityId: string | number, fecha?: string): Promise<TimeSlotEntity[]> {
        const slots = await TimeSlotModel.findAll({
            where: { activityId },
            order: [['startTime', 'ASC']]
        });
        return Promise.all(
            slots.map(async (slot) => {
                const data = { ...slot.dataValues };
                if (fecha) {
                    data.occupiedSlots = await this.calculateOccupiedSlots(slot.dataValues.id, fecha);
                }
                return TimeSlotEntity.fromObject(data);
            })
        );
    }
}
