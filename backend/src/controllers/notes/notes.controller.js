import { generateNotesService } from "../../services/notes/notes.service.js";

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