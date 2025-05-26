import express from 'express';
import {
  getAllRealEstateBasics,
  getRealEstateBasic,
  createRealEstateBasic,
  updateRealEstateBasic,
  deleteRealEstateBasic
} from '../controllers/realEstateBasic.controller.js';

const router = express.Router();

// GET /real-estate-basics - Get all real estate basics
router.get('/', getAllRealEstateBasics);

// GET /real-estate-basics/:id - Get a single real estate basic
router.get('/:id', getRealEstateBasic);

// POST /real-estate-basics - Create a new real estate basic
router.post('/', createRealEstateBasic);

// PUT /real-estate-basics/:id - Update a real estate basic
router.put('/:id', updateRealEstateBasic);

// DELETE /real-estate-basics/:id - Delete a real estate basic
router.delete('/:id', deleteRealEstateBasic);

export default router; 