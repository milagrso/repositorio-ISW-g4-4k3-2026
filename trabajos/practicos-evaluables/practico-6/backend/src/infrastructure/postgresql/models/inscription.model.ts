import { DataTypes, Model } from "sequelize";
import { PostgreSQLDatabase } from "../initializer/database";

const database = new PostgreSQLDatabase();
const sequelize = database.getSequelize();

export class InscriptionModel extends Model {}

InscriptionModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'activities',
            key: 'id'
        }
    },
    timeSlotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'time_slots',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    participants: {
        type: DataTypes.JSON,
        allowNull: false
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qrCode: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    termsAccepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'REGISTERED'
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: true
    },
    numeroInscripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: 'inscriptions',
    modelName: 'Inscription',
    indexes: [
        {
            fields: ['timeSlotId']
        },
        {
            fields: ['fecha']
        }
    ]
});
