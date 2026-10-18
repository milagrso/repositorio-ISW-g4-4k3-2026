import { ActivityModel } from '../postgresql/models/activity.model';
import { TimeSlotModel } from '../postgresql/models/time-slot.model';
import { ActivityDataSource, ActivityEntity, TimeSlotEntity } from '../../domain';

export class PostgresActivityDataSource implements ActivityDataSource {

    constructor() {
        ActivityModel.sync({ alter: true });
        TimeSlotModel.sync({ alter: true });
    }

    private isValidId(id: string | number): boolean {
        const num = Number(id);
        return Number.isInteger(num) && num > 0;
    }

    public async findAll(): Promise<ActivityEntity[]> {
        const activities = await ActivityModel.findAll();
        return activities.map((a) => ActivityEntity.fromObject(a.dataValues));
    }

    public async findById(id: string | number): Promise<ActivityEntity | null> {
        if (!this.isValidId(id)) return null;
        const activity = await ActivityModel.findByPk(Number(id));
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
            const actId = Number(activityId);
            const whereClause: Record<string, any> = { activityId: actId, startTime: time };
            if (fecha) {
                whereClause.fecha = fecha;
            }

            const slot = await TimeSlotModel.findOne({
                where: whereClause,
            });

            if (!slot) {
                return null;
            }

            return TimeSlotEntity.fromObject(slot.dataValues);
        } catch (error) {
            throw error;
        }
    }

    public async findAllTimeSlots(fecha?: string): Promise<TimeSlotEntity[]> {
        const whereClause: Record<string, any> = {};
        if (fecha) {
            whereClause.fecha = fecha;
        }

        const slots = await TimeSlotModel.findAll({
            where: whereClause,
            order: [['fecha', 'ASC'], ['startTime', 'ASC']],
        });

        return slots.map((slot) => TimeSlotEntity.fromObject(slot.dataValues));
    }

    public async findTimeSlotById(id: string | number, _fecha?: string): Promise<TimeSlotEntity | null> {
        if (!this.isValidId(id)) return null;
        const slot = await TimeSlotModel.findByPk(Number(id));
        if (!slot) return null;

        return TimeSlotEntity.fromObject(slot.dataValues);
    }

    public async findTimeSlotsByActivityId(activityId: string | number, fecha?: string): Promise<TimeSlotEntity[]> {
        if (!this.isValidId(activityId)) return [];
        const actId = Number(activityId);
        const whereClause: Record<string, any> = { activityId: actId };
        if (fecha) {
            whereClause.fecha = fecha;
        }

        const slots = await TimeSlotModel.findAll({
            where: whereClause,
            order: [['fecha', 'ASC'], ['startTime', 'ASC']],
        });

        return slots.map((slot) => TimeSlotEntity.fromObject(slot.dataValues));
    }
}
