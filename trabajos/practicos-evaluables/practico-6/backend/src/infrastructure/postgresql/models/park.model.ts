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
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'EcoHarmony Park'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'OPEN'
    },
    openTime: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '08:30'
    },
    closeTime: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '19:00'
    }
}, {
    sequelize,
    tableName: 'park',
    modelName: 'Park',
});
