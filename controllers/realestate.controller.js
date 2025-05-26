import { RealEstate } from "../models/index.js";
import { Op } from "sequelize";

// Get all real estate listings
export const getAllRealEstate = async (req, res) => {
  try {
    const realEstate = await RealEstate.findAll();
    res.json(realEstate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single real estate listing by ID
export const getRealEstateById = async (req, res) => {
  try {
    const realEstate = await RealEstate.findByPk(req.params.id);
    if (!realEstate) {
      return res.status(404).json({ message: "Real estate listing not found" });
    }
    res.json(realEstate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new real estate listing
export const createRealEstate = async (req, res) => {
  try {
    const { title, description, keywords, images, author } = req.body;
    const realEstate = await RealEstate.create({
      title,
      description,
      keywords,
      images,
      author,
    });
    res.status(201).json(realEstate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a real estate listing
export const updateRealEstate = async (req, res) => {
  try {
    const { title, description, keywords, images, author } = req.body;
    const realEstate = await RealEstate.findByPk(req.params.id);
    
    if (!realEstate) {
      return res.status(404).json({ message: "Real estate listing not found" });
    }

    await realEstate.update({
      title,
      description,
      keywords,
      images,
      author,
    });

    res.json(realEstate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a real estate listing
export const deleteRealEstate = async (req, res) => {
  try {
    const realEstate = await RealEstate.findByPk(req.params.id);
    
    if (!realEstate) {
      return res.status(404).json({ message: "Real estate listing not found" });
    }

    await realEstate.destroy();
    res.json({ message: "Real estate listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 