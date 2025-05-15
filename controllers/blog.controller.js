import { Blog } from "../models/index.js";
import slugify from "slugify";
import path from "path";
import express from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log("Incoming Field Name:", file.fieldname); // Log the field name
    const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

const router = express.Router();

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
        console.log("Request Body:", req.body); // Log the request body
        console.log("Uploaded File:", req.file); // Log the uploaded file

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

        console.log("New Blog Created:", newBlog); // Log the created blog
        res.status(201).json(newBlog);
    } catch (error) {
        console.error("Error in createBlog:", error); // Log the error
        res.status(400).json({ message: error.message });
    }
};

router.post("/", upload.single('blogImage'), createBlog);

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


