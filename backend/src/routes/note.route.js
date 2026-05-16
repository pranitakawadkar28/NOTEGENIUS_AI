import express from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validator.middleware.js";

import { generateNoteSchema } from "../validator/note.validator.js";

import {
  generateNotes,
  getUserNotes,
  getNoteById,
  deleteNote,
} from "../controllers/notes/notes.controller.js";

import { uploadImage } from "../controllers/notes/upload.controller.js";
import upload from "../middlewares/upload.middleware.js";

const noteRouter = express.Router();

noteRouter.post(
  "/generate",
  authenticate,
  validate(generateNoteSchema),
  generateNotes,
);

noteRouter.post(
  "/upload-image",
  authenticate,
  upload.single("image"),
  uploadImage,
);

noteRouter.get("/", authenticate, getUserNotes);

noteRouter.get("/:id", authenticate, getNoteById);

noteRouter.delete("/:id", authenticate, deleteNote);

export default noteRouter;
