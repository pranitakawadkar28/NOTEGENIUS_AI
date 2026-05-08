import express from "express";

import { validate } from "../middlewares/validator.middleware.js";

import { 
    forgotPasswordSchema,
    loginSchema, 
    registerSchema, 
    resetPasswordSchema, 
    verifyOtpSchema
} from "../validator/auth.validator.js";

import { 
    forgotPasswordController,
    loginController, 
    logoutController, 
    registerController, 
    resetPasswordController, 
    verifyOtpController
} from "../controllers/auth/auth.controller.js";

const authRouter = express.Router();

authRouter.post(
    "/register", 
    validate(registerSchema), 
    registerController
);

authRouter.post(
    "/login", 
    validate(loginSchema), 
    loginController
);

authRouter.post(
    "/logout",
    logoutController
);

authRouter.post(
    "/verify-otp", 
    validate(verifyOtpSchema), 
    verifyOtpController
);

authRouter.post(
  "/password/forgot",
  validate(forgotPasswordSchema),
  forgotPasswordController
);

authRouter.post(
  "/password/reset",
  validate(resetPasswordSchema),
  resetPasswordController
);

export default authRouter;