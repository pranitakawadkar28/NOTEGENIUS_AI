import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../services/payment/payment.service.js";

import { PLANS } from "../../config/plans.js";
import { AppError } from "../../utils/AppError.js";

export const createOrder = async (req, res, next) => {
  try {
    const { planId } = req.body;
    const plan = PLANS[planId];

    if (!plan) {
      throw new AppError("INVALID_PLAN_SELECTED", 400);
    }

    const order = await createRazorpayOrder({
      userId: req.user.userId,
      planId: plan.id,
      amount: plan.price,
      credits: plan.credits,
    });

    return res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const result = await verifyRazorpayPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (result.alreadyProcessed) {
      return res.json({ message: "Already processed" });
    }

    return res.json({
      success: true,
      message: "Payment verified and credits added",
      data: { user: result.updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentHistory = async (req, res, next) => {
  try {
    const history = await getUserPaymentsService(req.user.userId);
    return res.json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};
