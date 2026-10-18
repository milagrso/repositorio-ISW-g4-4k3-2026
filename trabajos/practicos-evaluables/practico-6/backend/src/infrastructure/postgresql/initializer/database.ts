import { Sequelize } from "sequelize";
import { env } from "../../../config";

export class PostgreSQLDatabase {
    private static sharedSequelize: Sequelize | null = null;
    public sequelize: Sequelize;

    constructor() {
        if (!PostgreSQLDatabase.sharedSequelize) {
            PostgreSQLDatabase.sharedSequelize = new Sequelize(env.POSTGRES_DB, env.POSTGRES_USER, env.POSTGRES_PASS, {
                dialect: "postgres",
                logging: false
            });
        }
        this.sequelize = PostgreSQLDatabase.sharedSequelize;
    }

    public static getActiveSequelize(): Sequelize | null {
        return PostgreSQLDatabase.sharedSequelize;
    }

    public static setActiveSequelize(instance: Sequelize | null): void {
        PostgreSQLDatabase.sharedSequelize = instance;
    }

    public getSequelize() {
        return this.sequelize;
    }

    public static initAssociations(): void {
        const { ActivityModel } = require('../models/activity.model');
        const { TimeSlotModel } = require('../models/time-slot.model');
        const { InscriptionModel } = require('../models/inscription.model');

        ActivityModel.hasMany(TimeSlotModel, { foreignKey: 'activityId', as: 'timeSlots' });
        TimeSlotModel.belongsTo(ActivityModel, { foreignKey: 'activityId', as: 'activity' });

        TimeSlotModel.hasMany(InscriptionModel, { foreignKey: 'timeSlotId', as: 'inscriptions' });
        InscriptionModel.belongsTo(TimeSlotModel, { foreignKey: 'timeSlotId', as: 'timeSlot' });

        ActivityModel.hasMany(InscriptionModel, { foreignKey: 'activityId', as: 'inscriptions' });
        InscriptionModel.belongsTo(ActivityModel, { foreignKey: 'activityId', as: 'activity' });
    }

    public async connect() {
        try {
            await this.sequelize.authenticate();
            PostgreSQLDatabase.sharedSequelize = this.sequelize;
            PostgreSQLDatabase.initAssociations();
            await this.sequelize.sync({ alter: true });

            console.log("Connected to PostgreSQL");

            const { SeederHelper } = await import('../../helpers/seeder.helper');
            await SeederHelper.seed();

            return true;
        } catch(error) {
            PostgreSQLDatabase.sharedSequelize = null;
            throw error;
        }
    }
}