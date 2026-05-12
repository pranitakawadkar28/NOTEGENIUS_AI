import { generateNotesService } from "../../services/notes/notes.service.js";
import { AppError } from "../../utils/AppError.js";

export const generateNotes = async (req, res, next) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    if (!topic) {
      throw new AppError("TOPIC_IS_REQUIRED", 400);
    }

    const note = await generateNotesService({
      userId: req.userId,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    return res.status(201).json({
      success: true,
      message: "NOTES_GENERATED_SUCCESSFULLY",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};