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

// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const { 
            blogTitle, 
            blogDescription, 
            blogContent, 
            writer, 
            category, 
            tags 
        } = req.body;

        const slug = slugify(blogTitle, { lower: true });

        // Process image if uploaded
        let blogImage = null;
        if (req.file) {
            blogImage = {
                filename: req.file.filename,
                path: `/uploads/blogs/${req.file.filename}`,
                originalName: req.file.originalname
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

        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing blog
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const updateData = { ...req.body };

        // Process image if uploaded
        if (req.file) {
            updateData.blogImage = [{
                filename: req.file.filename,
                path: `/uploads/blogs/${req.file.filename}`,
                originalName: req.file.originalname
            }];
        }

        await blog.update(updateData);
        res.json(blog);
    } catch (error) {
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