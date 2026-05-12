import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    classLevel: {
      type: String,
      trim: true,
    },

    examType: {
      type: String,
      trim: true,
    },

    revisionMode: {
      type: Boolean,
      default: false,
    },

    includeDiagram: {
      type: Boolean,
      default: false,
    },

    includeChart: {
      type: Boolean,
      default: false,
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model("Note", noteSchema);