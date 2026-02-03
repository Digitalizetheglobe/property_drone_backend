import { Expert } from "../models/index.js";
import path from "path";
import fs from "fs";

// Get all experts
export const getAllExperts = async (req, res) => {
    try {
        const experts = await Expert.findAll();
        res.json(experts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single expert by ID
export const getExpertById = async (req, res) => {
    try {
        const expert = await Expert.findByPk(req.params.id);
        if (!expert) return res.status(404).json({ message: "Expert not found" });

        res.json(expert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new expert
export const createExpert = async (req, res) => {
    try {
        console.log("\n--- CREATE EXPERT DEBUG ---");
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        const {
            name,
            experience,
            properties,
            locations,
            isExpert,
            initials,
            bgColor,
            contactNumber
        } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        // Process image if uploaded
        let image = null;
        if (req.files && req.files.length > 0) {
            const file = req.files[0];
            image = {
                filename: file.filename,
                path: `/uploads/experts/${file.filename}`,
                originalName: file.originalname,
                fieldName: file.fieldname
            };
        }

        const newExpert = await Expert.create({
            name,
            experience,
            properties: properties ? parseInt(properties) : 0,
            locations: locations ? (typeof locations === 'string' ? JSON.parse(locations) : locations) : [],
            isExpert: isExpert === 'true' || isExpert === true,
            initials,
            bgColor,
            contactNumber,
            image
        });

        console.log("New Expert Created:", newExpert);
        res.status(201).json(newExpert);
    } catch (error) {
        console.error("Error in createExpert:", error);
        res.status(400).json({ message: error.message });
    }
};

// Update an existing expert
export const updateExpert = async (req, res) => {
    try {
        console.log("\n--- UPDATE EXPERT DEBUG ---");
        console.log("Update Request Body:", req.body);
        console.log("Update Uploaded Files:", req.files);

        const expert = await Expert.findByPk(req.params.id);
        if (!expert) return res.status(404).json({ message: "Expert not found" });

        const updateData = { ...req.body };

        // Handle types explicitly for non-file fields
        if (updateData.properties) updateData.properties = parseInt(updateData.properties);
        if (updateData.isExpert !== undefined) updateData.isExpert = updateData.isExpert === 'true' || updateData.isExpert === true;
        if (updateData.locations && typeof updateData.locations === 'string') {
            try {
                updateData.locations = JSON.parse(updateData.locations);
            } catch (e) {
                console.error("Error parsing locations JSON:", e);
                // Keep as is or default to empty array if parsing fails, but be careful not to overwrite if intended
            }
        }

        // Process image if uploaded
        if (req.files && req.files.length > 0) {
            const file = req.files[0];
            updateData.image = {
                filename: file.filename,
                path: `/uploads/experts/${file.filename}`,
                originalName: file.originalname,
                fieldName: file.fieldname
            };

            // Optional: Delete old image file if exists
            /*
            if (expert.image && expert.image.path) {
                 const oldPath = path.join(process.cwd(), 'public', expert.image.path); // Adjust path logic as needed
                 if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            */
        }

        await expert.update(updateData);
        res.json(expert);
    } catch (error) {
        console.error("Error in updateExpert:", error);
        res.status(500).json({ message: error.message });
    }
};

// Delete an expert
export const deleteExpert = async (req, res) => {
    try {
        const expert = await Expert.findByPk(req.params.id);
        if (!expert) return res.status(404).json({ message: "Expert not found" });

        await expert.destroy();
        res.json({ message: "Expert deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
