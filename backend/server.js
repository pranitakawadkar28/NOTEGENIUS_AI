import app from "./src/app.js";
import { PORT } from "./src/config/env.js";

const startServer = async () => {
   try {
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
        });

    } catch (error) {
        console.error("FAILED TO START SERVER:", error.message);
        process.exit(1);
    }
};

startServer();