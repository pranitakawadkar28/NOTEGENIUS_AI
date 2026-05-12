import express from "express";

const noteRouter = express.Router();

noteRouter.post(
  "/generate",
  authenticate,
  generateNotes
);

export default noteRouter;