import { UserModel } from '../postgresql/models/user.model';
import { UserDataSource, UserEntity } from '../../domain';
import { env } from '../../config';

export class PostgresUserDataSource implements UserDataSource {

    constructor() {
        UserModel.sync();
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await UserModel.findAll();
        return users.map((u) => UserEntity.fromObject(u.dataValues));
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

    public async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) return null;
        return UserEntity.fromObject(user.dataValues);
    }

    public async findSessionUser(): Promise<UserEntity | null> {
        const sessionEmail = env.SESSION_USER_EMAIL || env.SEED_USER_EMAIL;
        if (sessionEmail) {
            const user = await this.findByEmail(sessionEmail);
            if (user) return user;
        }

        const firstUser = await UserModel.findOne();
        if (firstUser) {
            return UserEntity.fromObject(firstUser.dataValues);
        }

        return UserEntity.fromObject({
            id: 1,
            nombre: 'Felipe',
            email: sessionEmail || 'felipe@ejemplo.com'
        });
    }
}
