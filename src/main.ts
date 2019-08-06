import bcrypt from "bcrypt";
import config from "./config";
import { bootstrap, Core, pingDb } from "./core";
import { connection, db } from "./db";
import { logError } from "./logger";

/**
 * Boot the app :)
 */
const main = async (): Promise<void> => {
    try {
        const port = config.get("port") || 3000;
        const core: Core = {
            db,
            crypto: bcrypt,
        };
        await core.db.client();
        await pingDb(core.db);
        const app = bootstrap(core);
        await app.listen(port);
        console.log(`Server started on port: ${port}`);
    } catch (e) {
        logError({
            error: e,
            message: "Fatal error occurred on startup",
            info: {
                port: config.get("port"),
                host: config.get("host"),
                env: config.get("env"),
                database: {
                    host: config.get("database.host"),
                    port: config.get("database.port"),
                    username: config.get("database.username"),
                    db: config.get("database.schema"),
                    socketPath: config.get("database.socketPath"),
                },
                connection,
            },
        });
    }
};

main();
