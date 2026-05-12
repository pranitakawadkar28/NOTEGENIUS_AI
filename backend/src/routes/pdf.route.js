import express from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import { pdfDownload } from "../controllers/pdf/pdf.controller.js";

const pdfRouter = express.Router();

pdfRouter.post(
  "/download",
  authenticate,
  pdfDownload
);

export default pdfRouter;