import express from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import {
  createOrder,
  verifyPayment,
  getPaymentHistory,
} from "../controllers/payment/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", authenticate, createOrder);
paymentRouter.post("/verify", authenticate, verifyPayment);
paymentRouter.get("/history", authenticate, getPaymentHistory);

export default paymentRouter;
