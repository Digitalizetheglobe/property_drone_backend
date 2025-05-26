import express from "express";
import {
  getAllRealEstate,
  getRealEstateById,
  createRealEstate,
  updateRealEstate,
  deleteRealEstate,
} from "../controllers/realestate.controller.js";

const router = express.Router();

// GET all real estate listings
router.get("/", getAllRealEstate);

// GET a single real estate listing
router.get("/:id", getRealEstateById);

// POST create a new real estate listing
router.post("/", createRealEstate);

// PUT update a real estate listing
router.put("/:id", updateRealEstate);

// DELETE a real estate listing
router.delete("/:id", deleteRealEstate);

export default router; 