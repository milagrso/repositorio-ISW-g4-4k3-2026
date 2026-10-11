import { DataTypes, Model } from "sequelize";
import { PostgreSQLDatabase } from "../initializer/database";

const database = new PostgreSQLDatabase();
const sequelize = database.getSequelize();

export class TimeSlotModel extends Model {}

TimeSlotModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    maxCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    occupiedSlots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'time_slots',
    modelName: 'TimeSlot',
});
