import multer from "multer";
import path from "path";
import fs from "fs";

// Create directory if it doesn't exist
const createDestinationDir = (destination) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine destination based on file type or route
    let uploadPath;
    
    if (file.fieldname === "propertyImages") {
      uploadPath = path.join(process.cwd(), "public", "uploads", "properties");
    } else if (file.fieldname === "blogImage") {
      uploadPath = path.join(process.cwd(), "public", "uploads", "blogs");
    } else {
      uploadPath = path.join(process.cwd(), "public", "uploads", "others");
    }
    
    // Create directory if it doesn't exist
    createDestinationDir(uploadPath);
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filter for image types
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Export the configured multer middleware
export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Usage examples:
// upload.single('fieldName') - For single file uploads
// upload.array('fieldName', maxCount) - For multiple file uploads
// upload.fields([{ name: 'field1', maxCount: 1 }, { name: 'field2', maxCount: 8 }]) - For mixed uploads