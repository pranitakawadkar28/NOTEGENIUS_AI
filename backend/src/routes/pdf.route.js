import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { pdfDownload } from "../controllers/pdf/pdf.controller";

const pdfRouter = express.Router();

pdfRouter.post(
  "/download",
  authenticate,
  pdfDownload
);

export default pdfRouter;