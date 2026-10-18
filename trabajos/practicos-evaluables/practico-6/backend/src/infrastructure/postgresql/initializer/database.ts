import { Sequelize } from "sequelize";
import { env } from "../../../config";

export class PostgreSQLDatabase {
    private static activeInstance: Sequelize | null = null;
    public sequelize: Sequelize;

    constructor(){
        this.sequelize = new Sequelize(env.POSTGRES_DB, env.POSTGRES_USER, env.POSTGRES_PASS, {
            dialect: "postgres",
            logging: false
        });
    }

    public static getActiveSequelize(): Sequelize | null {
        return PostgreSQLDatabase.activeInstance;
    }

    public static setActiveSequelize(instance: Sequelize | null): void {
        PostgreSQLDatabase.activeInstance = instance;
    }

    public getSequelize() {
        return this.sequelize;
    }

    public async connect() {
        try{
            await this.sequelize.authenticate();
            PostgreSQLDatabase.activeInstance = this.sequelize;
            await this.sequelize.sync({ alter: true });

            console.log("Connected to PostgreSQL");

            const { SeederHelper } = await import('../../helpers/seeder.helper');
            await SeederHelper.seed();

            return true;
        }catch(error){
            PostgreSQLDatabase.activeInstance = null;
            throw error;
        }
    }
}