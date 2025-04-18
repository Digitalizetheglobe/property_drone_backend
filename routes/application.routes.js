import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { 
  getAllApplications,
  getApplicationsByJobId,
  getApplicationById,
  submitApplication,
  updateApplicationStatus,
  deleteApplication
} from "../controllers/application.controller.js";
import fs from 'fs';

const router = express.Router();

// Multer configuration for file upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/applications');
if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /pdf|doc|docx|txt/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only document files (PDF, DOC, DOCX, TXT) are allowed'));
    }
  }
});

// Configure the multer upload fields
const uploadFields = upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'additionalDocuments', maxCount: 5 }
]);

// Handle multer errors
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

// Routes
router.get("/", getAllApplications);
router.get("/job/:jobId", getApplicationsByJobId);
router.get("/:id", getApplicationById);
router.post("/submit", uploadFields, multerErrorHandler, submitApplication);
router.patch("/:id/status", updateApplicationStatus);
router.delete("/:id", deleteApplication);

export default router;