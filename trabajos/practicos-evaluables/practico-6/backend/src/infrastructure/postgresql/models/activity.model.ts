import { DataTypes, Model } from "sequelize";
import { PostgreSQLDatabase } from "../initializer/database";

const database = new PostgreSQLDatabase();
const sequelize = database.getSequelize();

export class ActivityModel extends Model {}

ActivityModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    parkId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'park',
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    cloth: {
        type: DataTypes.JSON,
        allowNull: true
    },
    minAge: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    maxCapacityActivity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    termsAndConditions: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'activities',
    modelName: 'Activity',
});
