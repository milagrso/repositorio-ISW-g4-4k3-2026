import { ActivityModel } from '../postgresql/models/activity.model';
import { TimeSlotModel } from '../postgresql/models/time-slot.model';
import { ActivityDataSource, ActivityEntity, TimeSlotEntity } from '../../domain';

export class PostgresActivityDataSource implements ActivityDataSource {

    constructor() {
        ActivityModel.sync();
        TimeSlotModel.sync();
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

    public async findTimeSlot(activityId: string | number, time: string): Promise<TimeSlotEntity | null> {
        try {
            const slot = await TimeSlotModel.findOne({
                where: { activityId, startTime: time }
            });

            if (!slot) {
                return null;
            }

            return TimeSlotEntity.fromObject(slot.dataValues);
        } catch (error) {
            throw error;
        }
    }
}
