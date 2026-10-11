export abstract class ParkRepository {
    public abstract isOpenAt(time: string): Promise<boolean>;
}
