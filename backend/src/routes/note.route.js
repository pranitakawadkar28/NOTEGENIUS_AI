import express from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validator.middleware.js";

import { generateNoteSchema } from "../validator/note.validator.js";

import { generateNotes } from "../controllers/notes/notes.controller.js";

const noteRouter = express.Router();

noteRouter.post(
  "/generate",
  authenticate,
  validate(generateNoteSchema),
  generateNotes
);

export default noteRouter;