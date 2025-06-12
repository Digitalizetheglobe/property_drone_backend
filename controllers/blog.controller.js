import { Blog } from "../models/index.js";
import slugify from "slugify";
import path from "path";

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single blog by slug
export const getBlogBySlug = async (req, res) => {
    try {
        console.log("Searching for slug:", req.params.slug);
        const blog = await Blog.findOne({
            where: {
                slug: req.params.slug
            }
        });
        
        if (!blog) {
            console.log("No blog found with slug:", req.params.slug);
            return res.status(404).json({ message: "Blog not found" });
        }

        console.log("Found blog:", blog);
        res.json(blog);
    } catch (error) {
        console.error("Error in getBlogBySlug:", error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new blog
export const createBlog = async (req, res) => {
    try {
        console.log("\n--- CREATE BLOG DEBUG ---");
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        const { 
            blogTitle, 
            blogDescription, 
            blogContent, 
            writer, 
            category, 
            tags 
        } = req.body;

        if (!blogTitle) {
            return res.status(400).json({ message: "Blog title is required" });
        }

        const slug = slugify(blogTitle, { lower: true });

        // Process image if uploaded - accept any file
        let blogImage = null;
        if (req.files && req.files.length > 0) {
            // Use the first file regardless of field name
            const file = req.files[0];
            console.log("Using file with field name:", file.fieldname);
            blogImage = {
                filename: file.filename,
                path: `/uploads/blogs/${file.filename}`,
                originalName: file.originalname,
                fieldName: file.fieldname // Store the field name for debugging
            };
        }

        const newBlog = await Blog.create({
            blogTitle,
            blogDescription,
            blogContent,
            blogImage: blogImage ? [blogImage] : [],
            writer,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            slug
        });

        console.log("New Blog Created:", newBlog);
        res.status(201).json(newBlog);
    } catch (error) {
        console.error("Error in createBlog:", error);
        res.status(400).json({ message: error.message });
    }
};

// Update an existing blog
export const updateBlog = async (req, res) => {
    try {
        console.log("\n--- UPDATE BLOG DEBUG ---");
        console.log("Update Request Body:", req.body);
        console.log("Update Uploaded Files:", req.files);

        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const updateData = { ...req.body };

        // Process image if uploaded - accept any file
        if (req.files && req.files.length > 0) {
            // Use the first file regardless of field name
            const file = req.files[0];
            console.log("Using file with field name:", file.fieldname);
            updateData.blogImage = [{
                filename: file.filename,
                path: `/uploads/blogs/${file.filename}`,
                originalName: file.originalname,
                fieldName: file.fieldname // Store the field name for debugging
            }];
        }

        await blog.update(updateData);
        res.json(blog);
    } catch (error) {
        console.error("Error in updateBlog:", error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        await blog.destroy();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


