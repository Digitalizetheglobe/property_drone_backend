import { Property } from "../models/index.js";
import slugify from "slugify";
import path from "path";
import fs from "fs";

// Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new property
export const createProperty = async (req, res) => {
  try {
    const {
      propertyName,
      propertyType,
      youtubeUrl,
      googleMapUrl,
      propertyCategory,
      beds,
      baths,
      topology,
      carpetArea,
      city,
      location,
      tentativeBudget,
      possession,
      seoDescription,
      seoTitle,
      seoKeywords
    } = req.body;

    // Generate slug from property name
    const slug = slugify(propertyName, { lower: true });

    // Process multiple images if uploaded
    let multipleImages = [];
    if (req.files && req.files.length > 0) {
      multipleImages = req.files.map(file => ({
        filename: file.filename,
        path: `/uploads/properties/${file.filename}`,
        originalName: file.originalname
      }));
      console.log("Multiple images processed:", multipleImages);
    } else {
      console.log("No images uploaded.");
    }

    const newProperty = await Property.create({
      propertyName,
      propertyType,
      youtubeUrl,
      googleMapUrl,
      propertyCategory,
      beds,
      baths,
      topology,
      carpetArea,
      city,
      location,
      tentativeBudget,
      possession,
      multipleImages,
      slug,
      seoDescription,
      seoTitle,
      seoKeywords
    });

    console.log("New property created:", newProperty);

    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Parse property data from FormData
    let updateData = {};
    if (req.body.propertyData) {
      updateData = JSON.parse(req.body.propertyData);
    } else {
      updateData = req.body;
    }
    
    // If generating a new slug is needed when property name changes
    if (updateData.propertyName) {
      updateData.slug = slugify(updateData.propertyName, { lower: true });
    }

    // Get current images
    let currentImages = property.multipleImages || [];

    // Handle image deletion if specified
    if (updateData.imagesToRemove) {
      const imagesToRemove = typeof updateData.imagesToRemove === 'string' 
        ? JSON.parse(updateData.imagesToRemove) 
        : updateData.imagesToRemove;

      // Delete files from server
      imagesToRemove.forEach(imageId => {
        const imageToDelete = currentImages.find(img => img.filename === imageId);
        if (imageToDelete) {
          const imagePath = path.join(process.cwd(), 'public', imageToDelete.path);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      });

      // Remove deleted images from the array
      currentImages = currentImages.filter(img => !imagesToRemove.includes(img.filename));
    }

    // Add new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        filename: file.filename,
        path: `/uploads/properties/${file.filename}`,
        originalName: file.originalname
      }));
      
      // Combine existing and new images
      currentImages = [...currentImages, ...newImages];
    }

    // Remove imagesToRemove from updateData as it's not a database field
    delete updateData.imagesToRemove;

    // Update the property with the modified images array
    updateData.multipleImages = currentImages;

    // Update the property
    await property.update(updateData);

    // Fetch the updated property to return the latest state
    const updatedProperty = await Property.findByPk(req.params.id);
    res.json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Optional: Delete image files from the server when deleting a property
    if (property.multipleImages && property.multipleImages.length > 0) {
      property.multipleImages.forEach(image => {
        const imagePath = path.join(process.cwd(), 'public', image.path);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    await property.destroy();
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add/remove specific images from a property
export const updatePropertyImages = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    const { imagesToRemove } = req.body;
    let currentImages = property.multipleImages || [];
    
    // Remove specified images if any
    if (imagesToRemove && imagesToRemove.length > 0) {
      // Parse the JSON string if it comes as a string
      const imagesToRemoveArray = typeof imagesToRemove === 'string' 
        ? JSON.parse(imagesToRemove) 
        : imagesToRemove;
        
      // Delete files from server
      imagesToRemoveArray.forEach(imageId => {
        const imageToDelete = currentImages.find(img => img.filename === imageId);
        if (imageToDelete) {
          const imagePath = path.join(process.cwd(), 'public', imageToDelete.path);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      });
      
      // Filter out removed images
      currentImages = currentImages.filter(img => !imagesToRemoveArray.includes(img.filename));
    }
    
    // Add new images if any were uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        filename: file.filename,
        path: `/uploads/properties/${file.filename}`,
        originalName: file.originalname
      }));
      
      currentImages = [...currentImages, ...newImages];
    }
    
    // Update the property with the modified images array
    await property.update({ multipleImages: currentImages });
    
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};