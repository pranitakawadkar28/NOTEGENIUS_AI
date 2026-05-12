import { generatePdfService } from "../../services/pdf/pdf.service.js";

import { AppError } from "../../utils/AppError.js";

export const pdfDownload = async (req, res, next) => {
  try {
    const { result } = req.body;
    if (!result) throw new AppError("NO_CONTENT_PROVIDED", 400);
    generatePdfService(result, res);
  } catch (error) {
    next(error);
  }
};