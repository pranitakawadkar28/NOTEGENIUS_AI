import { User } from "../../models/user.model.js";
import { Note } from "../../models/note.model.js";

import { buildPrompt } from "../../utils/promptBuilder.js";

import { generateGeminiResponse } from "../../config/gemini.js";

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

  user.credits -= 10;

  const note = await Note.create({
    user: user._id,
    topic,
    classLevel,
    examType,
    revisionMode,
    includeDiagram,
    includeChart,
    content: aiResponse,
  });

  user.notes.push(note._id);
  await user.save();

  return note;
};