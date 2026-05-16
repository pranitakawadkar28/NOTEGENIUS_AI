import rateLimit from "express-rate-limit";

// Auth sensitive routes: OTP verify, forgot password, login
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "TOO_MANY_REQUESTS_PLEASE_TRY_AGAIN_LATER",
  },
});

// Stricter limiter for OTP-specific routes
export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "TOO_MANY_OTP_ATTEMPTS_PLEASE_TRY_AGAIN_LATER",
  },
});
