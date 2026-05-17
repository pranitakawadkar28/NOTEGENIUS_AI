import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandler } from "./middlewares/error.middleware.js";

import { FRONTEND_URL } from "./config/env.js";

import passport from "./config/passport.js";

import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/notes.route.js";
import pdfRouter from "./routes/pdf.route.js";
import paymentRouter from "./routes/payments.route.js";

const app = express();

const allowedOrigins = [
  FRONTEND_URL,
  FRONTEND_URL?.endsWith('/') ? FRONTEND_URL.slice(0, -1) : `${FRONTEND_URL}/`
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow if origin is in the list, or if it's a Vercel subdomain
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        console.error(`CORS Blocked: Request from ${origin} not in ${allowedOrigins}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

console.log(`Backend initialized. Allowed Origin: ${FRONTEND_URL}`);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Handle favicon.ico requests to avoid 404 errors in browser logs
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "NoteGenius AI Backend is running!", status: "OK" });
});

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/payment", paymentRouter);

app.use(errorHandler);

export default app;