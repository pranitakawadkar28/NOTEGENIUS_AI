export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // req.file contain metadata from multer-s3, including the location (S3 URL)
    const fileUrl = req.file.location;

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully to AWS S3",
      url: fileUrl,
    });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during upload",
      error: error.message,
    });
  }
};
