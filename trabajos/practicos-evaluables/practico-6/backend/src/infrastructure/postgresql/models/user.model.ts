import { DataTypes, Model } from "sequelize";
import { PostgreSQLDatabase } from "../initializer/database";

const database = new PostgreSQLDatabase();
const sequelize = database.getSequelize();

export class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
});
