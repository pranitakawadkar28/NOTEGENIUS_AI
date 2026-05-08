import express from "express";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/error.middleware.js";

import authRouter from "./routes/auth.route.js";

import { FRONTEND_URL } from "./config/env.js";
import passport from "./config/passport.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());


app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;