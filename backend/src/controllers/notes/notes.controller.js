import {
  generateNotesService,
  getUserNotesService,
  getNoteByIdService,
  deleteNoteService,
} from "../../services/notes/notes.service.js";

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
      remainingCredits,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserNotes = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { notes, pagination } = await getUserNotesService(req.user.userId, {
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      message: "NOTES_FETCHED_SUCCESSFULLY",
      data: notes,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const note = await getNoteByIdService(req.params.id, req.user.userId);

    return res.status(200).json({
      success: true,
      message: "NOTE_FETCHED_SUCCESSFULLY",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    await deleteNoteService(req.params.id, req.user.userId);

    return res.status(200).json({
      success: true,
      message: "NOTE_DELETED_SUCCESSFULLY",
    });
  } catch (error) {
    next(error);
  }
};
