export abstract class UserDataSource {
    public abstract findById(id: string | number): Promise<any>;
}
