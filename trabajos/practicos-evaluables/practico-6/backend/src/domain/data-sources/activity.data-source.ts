import { ActivityEntity } from '../entities/activity.entity';
import { TimeSlotEntity } from '../entities/time-slot.entity';

export abstract class ActivityDataSource {
    public abstract findByName(name: string): Promise<ActivityEntity | null>;
    public abstract findTimeSlot(activityId: string | number, time: string): Promise<TimeSlotEntity | null>;
}
