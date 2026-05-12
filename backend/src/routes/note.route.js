import express from "express";

import { generateNotes } from "../controllers/notes/notes.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const noteRouter = express.Router();

noteRouter.post(
  "/generate",
  authenticate,
  generateNotes
);

export default noteRouter;