import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      select: false,
      default: null,
    },

    googleId: {
      type: String,
      default: null,
    },

    tokenVersion: {
      type: Number,
      default: 0,
    },

    refreshToken: {
      type: String,
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    credits: {
      type: Number,
      default: 50,
      min: 0,
    },

    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.refreshToken;

    delete ret.__v;

    ret.id = ret._id;
    delete ret._id;

    ret.isCreditAvailable = ret.credits >= 10;

    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
