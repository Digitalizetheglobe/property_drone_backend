import { RealEstateBasic } from '../models/index.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/real-estate-basics';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
}).array('images', 5);

// Get all real estate basics
export const getAllRealEstateBasics = async (req, res) => {
  try {
    const basics = await RealEstateBasic.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(basics);
  } catch (error) {
    console.error('Error fetching real estate basics:', error);
    res.status(500).json({ message: 'Error fetching real estate basics' });
  }
};

// Get a single real estate basic
export const getRealEstateBasic = async (req, res) => {
  try {
    const basic = await RealEstateBasic.findByPk(req.params.id);
    if (!basic) {
      return res.status(404).json({ message: 'Real estate basic not found' });
    }
    res.json(basic);
  } catch (error) {
    console.error('Error fetching real estate basic:', error);
    res.status(500).json({ message: 'Error fetching real estate basic' });
  }
};

// Create a new real estate basic
export const createRealEstateBasic = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { title, description, keywords } = req.body;
      const images = req.files ? req.files.map(file => `/uploads/real-estate-basics/${file.filename}`) : [];

      const basic = await RealEstateBasic.create({
        title,
        description,
        keywords,
        images
      });

      res.status(201).json(basic);
    } catch (error) {
      console.error('Error creating real estate basic:', error);
      res.status(500).json({ message: 'Error creating real estate basic' });
    }
  });
};

// Update a real estate basic
export const updateRealEstateBasic = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const basic = await RealEstateBasic.findByPk(req.params.id);
      if (!basic) {
        return res.status(404).json({ message: 'Real estate basic not found' });
      }

      const { title, description, keywords } = req.body;
      let images = basic.images || [];

      if (req.files && req.files.length > 0) {
        // Delete old images
        if (basic.images) {
          basic.images.forEach(image => {
            const imagePath = path.join(process.cwd(), image);
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          });
        }

        // Add new images
        images = req.files.map(file => `/uploads/real-estate-basics/${file.filename}`);
      }

      await basic.update({
        title,
        description,
        keywords,
        images
      });

      res.json(basic);
    } catch (error) {
      console.error('Error updating real estate basic:', error);
      res.status(500).json({ message: 'Error updating real estate basic' });
    }
  });
};

// Delete a real estate basic
export const deleteRealEstateBasic = async (req, res) => {
  try {
    const basic = await RealEstateBasic.findByPk(req.params.id);
    if (!basic) {
      return res.status(404).json({ message: 'Real estate basic not found' });
    }

    // Delete associated images
    if (basic.images) {
      basic.images.forEach(image => {
        const imagePath = path.join(process.cwd(), image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    await basic.destroy();
    res.json({ message: 'Real estate basic deleted successfully' });
  } catch (error) {
    console.error('Error deleting real estate basic:', error);
    res.status(500).json({ message: 'Error deleting real estate basic' });
  }
}; 