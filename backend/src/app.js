import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandler } from "./middlewares/error.middleware.js";

import authRouter from "./routes/auth.route.js";

import { FRONTEND_URL } from "./config/env.js";
import passport from "./config/passport.js";
import noteRouter from "./routes/note.route.js";
import pdfRouter from "./routes/pdf.route.js";
import paymentRouter from "./routes/payment.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/payment", paymentRouter);

app.use(errorHandler);

export default app;