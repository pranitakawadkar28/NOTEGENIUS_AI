import express from "express";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.get("/", (req, res) => {
    console.log("heyyy!!!");
})

app.use(errorHandler);

export default app;