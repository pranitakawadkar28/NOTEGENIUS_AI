import PDFDocument from "pdfkit";

export const generatePdfService = (result, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Headers
  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    'attachment; filename="NoteGenius_AI_StudyGuide.pdf"'
  );

  // Pipe PDF stream
  doc.pipe(res);

  // =========================
  // TITLE
  // =========================

  doc.fontSize(24).font('Helvetica-Bold').text("NoteGenius AI", {
    align: "center",
  });

  doc.moveDown();

  // =========================
  // IMPORTANCE
  // =========================

  doc
    .fontSize(14)
    .text(`Importance: ${result.importance || "N/A"}`);

  doc.moveDown();

  // =========================
  // SUB TOPICS
  // =========================

  doc.fontSize(16).text("Sub Topics");

  doc.moveDown(0.5);

  if (result.subTopics) {
    Object.entries(result.subTopics).forEach(([star, topics]) => {
      doc.moveDown(0.5);

      doc.fontSize(13).text(`${star} Topics:`);

      topics.forEach((topic) => {
        doc.fontSize(12).text(`• ${topic}`);
      });
    });
  }

  doc.moveDown();

  // =========================
  // NOTES
  // =========================

  doc.fontSize(16).text("Notes");

  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .text(result.notes?.replace(/[#*]/g, "") || "No Notes");

  doc.moveDown();

  // =========================
  // REVISION POINTS
  // =========================

  doc.fontSize(16).text("Revision Points");

  doc.moveDown(0.5);

  if (result.revisionPoints?.length) {
    result.revisionPoints.forEach((point) => {
      doc.fontSize(12).text(`• ${point}`);
    });
  }

  doc.moveDown();

  // =========================
  // IMPORTANT QUESTIONS
  // =========================

  doc.fontSize(16).text("Important Questions");

  doc.moveDown(0.5);

  // Short Questions
  doc.fontSize(13).text("Short Questions:");

  result.questions?.short?.forEach((q) => {
    doc.fontSize(12).text(`• ${q}`);
  });

  doc.moveDown(0.5);

  // Long Questions
  doc.fontSize(13).text("Long Questions:");

  result.questions?.long?.forEach((q) => {
    doc.fontSize(12).text(`• ${q}`);
  });

  doc.moveDown(0.5);

  // Diagram Question
  doc.fontSize(13).text("Diagram Question:");

  doc
    .fontSize(12)
    .text(result.questions?.diagram || "No Diagram Question");

  doc.moveDown();

  // =========================
  // DIAGRAM SYNTAX
  // =========================
  
  if (result.diagram && result.diagram.data) {
    doc.fontSize(16).text("Conceptual Flow (Mermaid Syntax)");
    doc.moveDown(0.5);
    
    doc.fontSize(10).font('Courier').text(result.diagram.data);
    doc.font('Helvetica'); // Reset font
    doc.moveDown();
  }

  // Finish PDF
  doc.end();
};