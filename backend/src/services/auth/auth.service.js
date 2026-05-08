import crypto from "crypto";
import jwt from "jsonwebtoken";

import { User } from "../../models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { 
    comparePassword, 
    hashPassword 
} from "../../utils/hash.js";
import { 
    generateAccessToken, 
    generateRefreshToken 
} from "../../utils/jwt.js";

export const registerService = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new AppError("PLEASE_PROVIDE_USERNAME,EMAIL,PASSWORD", 400);
  }

  const isUserAlreadyExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    throw new AppError("USER_ALREADY_EXISTS", 409);
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return { user };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("INVALID_CREDENTIALS", 401);
  }

  const isMatched = await comparePassword(password, user.password);

  if (!isMatched) {
    throw new AppError("INVALID_CREDENTIALS", 401);
  }

  const accessToken = generateAccessToken({
    userId: user._id,
    tokenVersion: user.tokenVersion,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id,
    tokenVersion: user.tokenVersion,
  });

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  user.refreshToken = hashedRefreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};