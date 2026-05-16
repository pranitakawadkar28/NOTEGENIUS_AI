import multer from "multer";
import multerS3 from "multer-s3";
import s3Client from "../config/s3.config.js";
import { AWS_S3_BUCKET_NAME } from "../config/env.js";

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: AWS_S3_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, `notes/${fileName}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default upload;
