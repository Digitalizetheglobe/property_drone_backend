import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import {
    getAllExperts,
    getExpertById,
    createExpert,
    updateExpert,
    deleteExpert
} from "../controllers/expert.controller.js";

const router = express.Router();

// Create a debug middleware to log request details
const logRequest = (req, res, next) => {
    console.log('\n--- EXPERT REQUEST DEBUG ---');
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Content-Type:', req.headers['content-type']);

    next();
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads/experts');
if (!fs.existsSync(uploadsDir)) {
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
    limits: { fileSize: 10 * 1024 * 1024 }
}).any();

// Define routes
router.get("/", getAllExperts);
router.get("/:id", getExpertById);

router.post("/", logRequest, (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, createExpert);

router.put("/:id", logRequest, (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, updateExpert);

router.delete("/:id", deleteExpert);

export default router;
