import { DataTypes, Model } from "sequelize";
import { PostgreSQLDatabase } from "../initializer/database";

const database = new PostgreSQLDatabase();
const sequelize = database.getSequelize();

export class ParkModel extends Model {}

ParkModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'OPEN'
    },
    openTime: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '08:00'
    },
    closeTime: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '18:00'
    }
}, {
    sequelize,
    tableName: 'park',
    modelName: 'Park',
});
