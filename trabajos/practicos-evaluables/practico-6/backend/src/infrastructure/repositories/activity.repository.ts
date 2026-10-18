import { ActivityDataSource, ActivityEntity, ActivityRepository, TimeSlotEntity } from '../../domain';
import { PostgresActivityDataSource } from '../data-sources/activity';

export class ActivityRepository_I implements ActivityRepository {

    private dataSource: ActivityDataSource;

    constructor(dataSource?: ActivityDataSource) {
        this.dataSource = dataSource ?? new PostgresActivityDataSource();
    }

    public findAll(): Promise<ActivityEntity[]> {
        return this.dataSource.findAll();
    }

    public findById(id: string | number): Promise<ActivityEntity | null> {
        return this.dataSource.findById(id);
    }

    public findByName(name: string): Promise<ActivityEntity | null> {
        return this.dataSource.findByName(name);
    }

    public findTimeSlot(activityId: string | number, time: string, fecha?: string): Promise<TimeSlotEntity | null> {
        return this.dataSource.findTimeSlot(activityId, time, fecha);
    }

    public findAllTimeSlots(fecha?: string): Promise<TimeSlotEntity[]> {
        return this.dataSource.findAllTimeSlots(fecha);
    }

    public findTimeSlotById(id: string | number, fecha?: string): Promise<TimeSlotEntity | null> {
        return this.dataSource.findTimeSlotById(id, fecha);
    }

    public findTimeSlotsByActivityId(activityId: string | number, fecha?: string): Promise<TimeSlotEntity[]> {
        return this.dataSource.findTimeSlotsByActivityId(activityId, fecha);
    }
}
