import multer from 'multer';
import path from 'path';

// Set up storage configuration for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  },
});

// Create a multer instance with storage configuration
const upload = multer({ storage });

// Export the upload instance (named export)
export { upload };
