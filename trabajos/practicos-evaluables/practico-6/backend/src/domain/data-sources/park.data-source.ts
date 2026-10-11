export abstract class ParkDataSource {
    public abstract isOpenAt(time: string): Promise<boolean>;
}
