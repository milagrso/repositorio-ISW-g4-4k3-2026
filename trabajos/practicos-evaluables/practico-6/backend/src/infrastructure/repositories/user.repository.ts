import { UserRepository } from '../../domain';
import { PostgresUserDataSource } from '../data-sources/user';

export class UserRepository_I implements UserRepository {

    private dataSource: PostgresUserDataSource;

    constructor() {
        this.dataSource = new PostgresUserDataSource();
    }

    public findById(id: string | number): Promise<any> {
        return this.dataSource.findById(id);
    }
}
