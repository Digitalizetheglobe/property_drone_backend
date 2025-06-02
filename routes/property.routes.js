import express from "express";
import { 
  getProperties, 
  getPropertyById, 
  createProperty, 
  updateProperty, 
  deleteProperty,
  updatePropertyImages,
  getPropertyBySlug
} from "../controllers/property.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// Get all properties
router.get("/", getProperties);

// Get property by slug
router.get("/:slug", getPropertyBySlug);

// Get property by ID
router.get("/:id", getPropertyById);

// Create new property with image uploads
router.post("/", upload.array("propertyImages", 10), createProperty);

// Update property with optional image uploads
router.put("/:id", upload.array("propertyImages", 10), updateProperty);

// Delete property
router.delete("/:id", deleteProperty);

// Special route just for adding/removing images
router.patch("/:id/images", upload.array("propertyImages", 10), updatePropertyImages);

export default router;