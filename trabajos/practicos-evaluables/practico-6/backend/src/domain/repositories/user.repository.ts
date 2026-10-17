import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
    public abstract findAll(): Promise<UserEntity[]>;
    public abstract findById(id: string | number): Promise<UserEntity | null>;
    public abstract findByEmail(email: string): Promise<UserEntity | null>;
    public abstract findSessionUser(): Promise<UserEntity | null>;
}
