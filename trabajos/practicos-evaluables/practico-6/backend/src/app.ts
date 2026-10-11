import { env } from "./config";
import { PostgreSQLDatabase } from "./infrastructure/postgresql/initializer/database";
import { Server, AppRouter } from "./presentation";

(async () => {
    main();
})();

async function main() {

    const postgresql = new PostgreSQLDatabase();
    await postgresql.connect();

    const server = new Server({
        port: env.PORT,
        routes: AppRouter.routes
    });

    server.start();
}