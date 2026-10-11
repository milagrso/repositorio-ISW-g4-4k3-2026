import { ActivityEntity, ActivityRepository, TimeSlotEntity } from '../../domain';
import { PostgresActivityDataSource } from '../data-sources/activity';

export class ActivityRepository_I implements ActivityRepository {

    private dataSource: PostgresActivityDataSource;

    constructor() {
        this.dataSource = new PostgresActivityDataSource();
    }

    public findByName(name: string): Promise<ActivityEntity | null> {
        return this.dataSource.findByName(name);
    }

    public findTimeSlot(activityId: string | number, time: string): Promise<TimeSlotEntity | null> {
        return this.dataSource.findTimeSlot(activityId, time);
    }
}
