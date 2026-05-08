import express from "express";

import { validate } from "../middlewares/validator.middleware.js";

import { loginSchema, registerSchema } from "../validator/auth.validator.js";

import { loginController, registerController } from "../controllers/auth/auth.controller.js";

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

export default authRouter;