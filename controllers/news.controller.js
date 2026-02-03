import { News } from "../models/index.js";
import slugify from "slugify";
import path from "path";

// Get all news
export const getAllNews = async (req, res) => {
    try {
        const news = await News.findAll();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single news by ID
export const getNewsById = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) return res.status(404).json({ message: "News not found" });

        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single news by slug
export const getNewsBySlug = async (req, res) => {
    try {
        console.log("Searching for slug:", req.params.slug);
        const news = await News.findOne({
            where: {
                slug: req.params.slug
            }
        });

        if (!news) {
            console.log("No news found with slug:", req.params.slug);
            return res.status(404).json({ message: "News not found" });
        }

        console.log("Found news:", news);
        res.json(news);
    } catch (error) {
        console.error("Error in getNewsBySlug:", error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new news
export const createNews = async (req, res) => {
    try {
        console.log("\n--- CREATE NEWS DEBUG ---");
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        const {
            newsTitle,
            newsDescription,
            newsContent,
            writer,
            category,
            tags
        } = req.body;

        if (!newsTitle) {
            return res.status(400).json({ message: "News title is required" });
        }

        const slug = slugify(newsTitle, { lower: true });

        // Process image if uploaded - accept any file
        let newsImage = null;
        if (req.files && req.files.length > 0) {
            // Use the first file regardless of field name
            const file = req.files[0];
            console.log("Using file with field name:", file.fieldname);
            newsImage = {
                filename: file.filename,
                path: `/uploads/news/${file.filename}`,
                originalName: file.originalname,
                fieldName: file.fieldname // Store the field name for debugging
            };
        }

        const newNews = await News.create({
            newsTitle,
            newsDescription,
            newsContent,
            newsImage: newsImage ? [newsImage] : [],
            writer,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            slug
        });

        console.log("New News Created:", newNews);
        res.status(201).json(newNews);
    } catch (error) {
        console.error("Error in createNews:", error);
        res.status(400).json({ message: error.message });
    }
};

// Update an existing news
export const updateNews = async (req, res) => {
    try {
        console.log("\n--- UPDATE NEWS DEBUG ---");
        console.log("Update Request Body:", req.body);
        console.log("Update Uploaded Files:", req.files);

        const news = await News.findByPk(req.params.id);
        if (!news) return res.status(404).json({ message: "News not found" });

        const updateData = { ...req.body };

        // Process image if uploaded - accept any file
        if (req.files && req.files.length > 0) {
            // Use the first file regardless of field name
            const file = req.files[0];
            console.log("Using file with field name:", file.fieldname);
            updateData.newsImage = [{
                filename: file.filename,
                path: `/uploads/news/${file.filename}`,
                originalName: file.originalname,
                fieldName: file.fieldname // Store the field name for debugging
            }];
        }

        await news.update(updateData);
        res.json(news);
    } catch (error) {
        console.error("Error in updateNews:", error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a news
export const deleteNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) return res.status(404).json({ message: "News not found" });

        await news.destroy();
        res.json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
