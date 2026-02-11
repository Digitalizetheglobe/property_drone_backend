import { CommercialProperty } from "../models/index.js";

export const createCommercialProperty = async (req, res) => {
    try {
        const data = req.body;
        // Parse JSON fields if they are strings (from FormData)
        if (typeof data.furnishedDetails === 'string') {
            try { data.furnishedDetails = JSON.parse(data.furnishedDetails); } catch (e) { }
        }
        if (typeof data.contact === 'string') {
            try { data.contact = JSON.parse(data.contact); } catch (e) { }
        }

        // Auto-generate slug from buildingName + location if not provided
        if ((!data.slug || data.slug.trim() === '') && (data.buildingName || data.title)) {
            const base = data.title || data.buildingName || 'commercial-property';
            data.slug = base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }

        // Handle images: Start with what's in body (as string or array)
        let finalImages = [];
        if (data.images) {
            if (typeof data.images === 'string') {
                finalImages = data.images.split(',').map(s => s.trim()).filter(Boolean);
            } else if (Array.isArray(data.images)) {
                finalImages = data.images;
            }
        }

        // Append new file uploads
        if (req.files && req.files.length > 0) {
            const newImagePaths = req.files.map(file => `/uploads/commercial-properties/${file.filename}`);
            finalImages = [...finalImages, ...newImagePaths];
        }

        data.images = finalImages;

        const property = await CommercialProperty.create(data);
        res.status(201).json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllCommercialProperties = async (req, res) => {
    try {
        const properties = await CommercialProperty.findAll();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommercialPropertyById = async (req, res) => {
    try {
        const property = await CommercialProperty.findByPk(req.params.id);
        if (!property) return res.status(404).json({ message: "Property not found" });
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommercialPropertyBySlug = async (req, res) => {
    try {
        const property = await CommercialProperty.findOne({ where: { slug: req.params.slug } });
        if (!property) return res.status(404).json({ message: "Property not found" });
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCommercialProperty = async (req, res) => {
    try {
        const property = await CommercialProperty.findByPk(req.params.id);
        if (!property) return res.status(404).json({ message: "Property not found" });

        const data = req.body;

        // Parse JSON fields
        if (typeof data.furnishedDetails === 'string') {
            try { data.furnishedDetails = JSON.parse(data.furnishedDetails); } catch (e) { }
        }
        if (typeof data.contact === 'string') {
            try { data.contact = JSON.parse(data.contact); } catch (e) { }
        }

        // Handle Images
        // Start with current DB images, unless specific list provided in body to retain
        let currentImages = property.images || [];

        // If 'images' provided in body, it overrides existing (used for deletion/retention)
        if (data.images !== undefined) {
            if (typeof data.images === 'string') {
                currentImages = data.images.split(',').map(s => s.trim()).filter(Boolean);
            } else if (Array.isArray(data.images)) {
                currentImages = data.images;
            }
        }

        // Append new uploads
        if (req.files && req.files.length > 0) {
            const newImagePaths = req.files.map(file => `/uploads/commercial-properties/${file.filename}`);
            currentImages = [...currentImages, ...newImagePaths];
        }

        data.images = currentImages;

        await property.update(data);
        res.json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCommercialProperty = async (req, res) => {
    try {
        const property = await CommercialProperty.findByPk(req.params.id);
        if (!property) return res.status(404).json({ message: "Property not found" });
        await property.destroy();
        res.json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
