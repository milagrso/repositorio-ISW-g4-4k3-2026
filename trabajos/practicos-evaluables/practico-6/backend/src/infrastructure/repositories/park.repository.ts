import { ParkRepository } from '../../domain';
import { PostgresParkDataSource } from '../data-sources/park';

export class ParkRepository_I implements ParkRepository {

    private dataSource: PostgresParkDataSource;

    constructor() {
        this.dataSource = new PostgresParkDataSource();
    }

    public isOpenAt(time: string): Promise<boolean> {
        return this.dataSource.isOpenAt(time);
    }
}
