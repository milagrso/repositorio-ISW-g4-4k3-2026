import { ActivityEntity } from '../entities/activity.entity';
import { TimeSlotEntity } from '../entities/time-slot.entity';

export abstract class ActivityRepository {
    public abstract findAll(): Promise<ActivityEntity[]>;
    public abstract findById(id: string | number): Promise<ActivityEntity | null>;
    public abstract findByName(name: string): Promise<ActivityEntity | null>;
    public abstract findTimeSlot(activityId: string | number, time: string, fecha?: string): Promise<TimeSlotEntity | null>;
    public abstract findAllTimeSlots(fecha?: string): Promise<TimeSlotEntity[]>;
    public abstract findTimeSlotById(id: string | number, fecha?: string): Promise<TimeSlotEntity | null>;
    public abstract findTimeSlotsByActivityId(activityId: string | number, fecha?: string): Promise<TimeSlotEntity[]>;
}
