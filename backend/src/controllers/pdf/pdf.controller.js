import { generatePdfService } from "../../services/pdf/pdf.service.js";

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "NO CONTENT PROVIDED",
      });
    }

    generatePdfService(result, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "PDF GENERATION FAILED",
    });
  }
};