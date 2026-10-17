import { ParkEntity } from '../entities/park.entity';

export abstract class ParkRepository {
    public abstract isOpenAt(time: string): Promise<boolean>;
    public abstract findAll(): Promise<ParkEntity[]>;
    public abstract findById(id: string | number): Promise<ParkEntity | null>;
}
