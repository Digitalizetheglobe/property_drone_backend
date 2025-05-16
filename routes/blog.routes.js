import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { 
  getAllBlogs, 
  getBlogById, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} from "../controllers/blog.controller.js";

const router = express.Router();

// Create a debug middleware to log request details
const logRequest = (req, res, next) => {
  console.log('\n--- BLOG REQUEST DEBUG ---');
  console.log('Request Method:', req.method);
  console.log('Request URL:', req.url);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Request Body Fields:', Object.keys(req.body || {}));
  
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    console.log('This is a multipart form submission');
  }
  
  next();
};

// Set up a simple version of multer that accepts any field
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads/blogs');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    console.log('Received file with field name:', file.fieldname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
}).any(); // Use .any() to accept any field name

// Define routes with middleware
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Use the debug middleware and a more permissive multer configuration
router.post("/", logRequest, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ message: err.message });
    }
    console.log('Files received:', req.files);
    next();
  });
}, createBlog);

router.put("/:id", logRequest, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ message: err.message });
    }
    console.log('Files received:', req.files);
    next();
  });
}, updateBlog);

router.delete("/:id", deleteBlog);

export default router;