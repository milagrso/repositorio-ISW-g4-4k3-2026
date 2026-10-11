import { UserModel } from '../postgresql/models/user.model';
import { UserDataSource, UserEntity } from '../../domain';

export class PostgresUserDataSource implements UserDataSource {

    constructor() {
        UserModel.sync();
    }

    public async findById(id: string | number): Promise<UserEntity | null> {
        try {
            const user = await UserModel.findByPk(id);

            if (!user) {
                return null;
            }

            return UserEntity.fromObject(user.dataValues);
        } catch (error) {
            throw error;
        }
    }
}
