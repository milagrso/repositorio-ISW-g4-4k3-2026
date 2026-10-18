import { UserDataSource, UserEntity, UserRepository } from '../../domain';
import { PostgresUserDataSource } from '../data-sources/user';

export class UserRepository_I implements UserRepository {

    private dataSource: UserDataSource;

    constructor(dataSource?: UserDataSource) {
        this.dataSource = dataSource ?? new PostgresUserDataSource();
    }

    public findAll(): Promise<UserEntity[]> {
        return this.dataSource.findAll();
    }

    public findById(id: string | number): Promise<UserEntity | null> {
        return this.dataSource.findById(id);
    }

    public findByEmail(email: string): Promise<UserEntity | null> {
        return this.dataSource.findByEmail(email);
    }

    public findSessionUser(): Promise<UserEntity | null> {
        return this.dataSource.findSessionUser();
    }
}
