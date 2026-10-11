export class UserEntity {
    private constructor(
        public id: string | number,
        public nombre: string,
        public email: string
    ) {}

    static fromObject(object: { [key: string]: any }): UserEntity {
        const { _id, id, nombre, email } = object;

        return new UserEntity(
            _id || id,
            nombre,
            email
        );
    }
}
