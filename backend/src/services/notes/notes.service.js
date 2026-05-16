import mongoose from "mongoose";
import { User } from "../../models/user.model.js";
import { Note } from "../../models/note.model.js";

import { buildPrompt } from "../../utils/promptBuilder.js";

import { generateGeminiResponse } from "../../utils/gemini.js";

import { AppError } from "../../utils/AppError.js";

export const generateNotesService = async ({
  userId,
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart,
}) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  if (user.credits < 10) {
    throw new AppError("INSUFFICIENT_CREDITS", 402);
  }

  const prompt = buildPrompt({
    topic,
    classLevel,
    examType,
    revisionMode,
    includeDiagram,
    includeChart,
  });

  const aiResponse = await generateGeminiResponse(prompt);

  // Atomic: deduct credits + create note in a single transaction
  // If Note.create fails, credits are NOT lost
  const session = await mongoose.startSession();
  session.startTransaction();

  let note;
  try {
    [note] = await Note.create(
      [
        {
          user: user._id,
          topic,
          classLevel,
          examType,
          revisionMode,
          includeDiagram,
          includeChart,
          content: aiResponse,
        },
      ],
      { session }
    );

    await User.findByIdAndUpdate(
      userId,
      { $inc: { credits: -10 }, $push: { notes: note._id } },
      { session }
    );

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }

  // Fetch the updated user to get remaining credits
  const updatedUser = await User.findById(userId).select('credits')

  return { note, remainingCredits: updatedUser?.credits ?? 0 };
};

export const getUserNotesService = async (userId, { page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;

  const notes = await Note.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Note.countDocuments({ user: userId });

  return {
    notes,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  };
};

export const getNoteByIdService = async (noteId, userId) => {
  const note = await Note.findOne({ _id: noteId, user: userId });

  if (!note) {
    throw new AppError("NOTE_NOT_FOUND", 404);
  }

  return note;
};

export const deleteNoteService = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

  if (!note) {
    throw new AppError("NOTE_NOT_FOUND", 404);
  }

  // Remove note reference from user
  await User.findByIdAndUpdate(userId, { $pull: { notes: noteId } });

  return note;
};