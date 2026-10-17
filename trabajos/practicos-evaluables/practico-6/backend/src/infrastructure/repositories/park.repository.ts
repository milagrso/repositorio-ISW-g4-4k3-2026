import { ParkEntity, ParkRepository } from '../../domain';
import { PostgresParkDataSource } from '../data-sources/park';

export class ParkRepository_I implements ParkRepository {

    private dataSource: PostgresParkDataSource;

    constructor() {
        this.dataSource = new PostgresParkDataSource();
    }

    public findAll(): Promise<ParkEntity[]> {
        return this.dataSource.findAll();
    }

    public findById(id: string | number): Promise<ParkEntity | null> {
        return this.dataSource.findById(id);
    }

    public isOpenAt(time: string): Promise<boolean> {
        return this.dataSource.isOpenAt(time);
    }
}
