export abstract class UserRepository {
    public abstract findById(id: string | number): Promise<any>;
}
