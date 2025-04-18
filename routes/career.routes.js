import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { 
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer
} from "../controllers/career.controller.js";

const router = express.Router();

// Multer configuration for file upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/careers'));
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

// Routes
router.get("/", getAllCareers);
router.get("/:id", getCareerById);
router.post("/", upload.array('additionalDocFiles', 5), createCareer); // Allow up to 5 files
router.put("/:id", upload.array('additionalDocFiles', 5), updateCareer);
router.delete("/:id", deleteCareer);

export default router;