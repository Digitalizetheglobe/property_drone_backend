import { Career } from "../models/index.js";
import path from "path";

// Get all career opportunities
export const getAllCareers = async (req, res) => {
    try {
        const careers = await Career.findAll();
        res.json(careers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single career opportunity by ID
export const getCareerById = async (req, res) => {
    try {
        const career = await Career.findByPk(req.params.id);
        if (!career) return res.status(404).json({ message: "Career opportunity not found" });

        res.json(career);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new career opportunity
export const createCareer = async (req, res) => {
    try {
        const { 
            jobTitle,
            jobId,
            location,
            jobType,
            experienceLevel,
            salaryRange,
            applicationDeadline,
            jobDescription,
            requirements,
            benefits
        } = req.body;

        // Process document files if uploaded
        let additionalDocFiles = [];
        if (req.files && req.files.length > 0) {
            additionalDocFiles = req.files.map(file => ({
                filename: file.filename,
                path: `/uploads/careers/${file.filename}`,
                originalName: file.originalname
            }));
        }

        const newCareer = await Career.create({
            jobTitle,
            jobId,
            location,
            jobType,
            experienceLevel,
            salaryRange,
            applicationDeadline: applicationDeadline || null,
            jobDescription,
            requirements,
            benefits: benefits || null,
            additionalDocFiles: additionalDocFiles.length > 0 ? additionalDocFiles : null
        });

        res.status(201).json(newCareer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing career opportunity
export const updateCareer = async (req, res) => {
    try {
        const career = await Career.findByPk(req.params.id);
        if (!career) return res.status(404).json({ message: "Career opportunity not found" });

        const updateData = { ...req.body };

        // Process document files if uploaded
        if (req.files && req.files.length > 0) {
            const docFiles = req.files.map(file => ({
                filename: file.filename,
                path: `/uploads/careers/${file.filename}`,
                originalName: file.originalname
            }));
            
            updateData.additionalDocFiles = docFiles;
        }

        await career.update(updateData);
        res.json(career);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a career opportunity
export const deleteCareer = async (req, res) => {
    try {
        const career = await Career.findByPk(req.params.id);
        if (!career) return res.status(404).json({ message: "Career opportunity not found" });

        await career.destroy();
        res.json({ message: "Career opportunity deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};