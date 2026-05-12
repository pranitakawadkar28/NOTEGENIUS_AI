import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../services/payment/payment.service.js";

export const createOrder = async (req, res, next) => {
  try {
    const { planId, amount, credits } = req.body;

    if (!amount || !credits) {
      return res.status(400).json({ message: "Invalid plan data" });
    }

    const order = await createRazorpayOrder({
      userId: req.user.userId,
      planId,
      amount,
      credits,
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
