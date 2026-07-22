import { Plot } from "../models/index.js";

// Create a new plot
export const createPlot = async (req, res) => {
    try {
        let data = req.body;
        if (req.body.plotData) {
            data = JSON.parse(req.body.plotData);
        } else {
            // Parse nested JSON fields if they come as strings from FormData
            const jsonFields = ['location', 'plotDetails', 'priceDetails', 'contact', 'amenities'];
            jsonFields.forEach(field => {
                if (typeof data[field] === 'string') {
                    try {
                        data[field] = JSON.parse(data[field]);
                    } catch (e) {
                        console.error(`Error parsing ${field}:`, e);
                    }
                }
            });
        }

        if (!data.slug && data.title) {
            data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        }

        let multipleImages = [];
        if (req.files && req.files.length > 0) {
            multipleImages = req.files.map(file => ({
                filename: file.filename,
                path: `/uploads/properties/${file.filename}`, // Adjust path if needed, reusing properties folder or create plots folder
                originalName: file.originalname
            }));
            data.images = multipleImages;
        } else if (typeof data.images === 'string') {
            try {
                data.images = JSON.parse(data.images);
            } catch (e) {
                // Keep as is if it's not a JSON string, might be an array of strings
            }
        }

        const plot = await Plot.create(data);
        res.status(201).json(plot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all plots
export const getAllPlots = async (req, res) => {
    try {
        const plots = await Plot.findAll();
        res.json(plots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single plot by ID
export const getPlotById = async (req, res) => {
    try {
        const plot = await Plot.findByPk(req.params.id);
        if (!plot) return res.status(404).json({ message: "Plot not found" });
        res.json(plot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single plot by Slug
export const getPlotBySlug = async (req, res) => {
    try {
        const plot = await Plot.findOne({ where: { slug: req.params.slug } });
        if (!plot) return res.status(404).json({ message: "Plot not found" });
        res.json(plot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a plot
export const updatePlot = async (req, res) => {
    try {
        const plot = await Plot.findByPk(req.params.id);
        if (!plot) return res.status(404).json({ message: "Plot not found" });

        let data = req.body;
        if (req.body.plotData) {
            data = JSON.parse(req.body.plotData);
        } else {
            // Parse nested JSON fields if they come as strings from FormData
            const jsonFields = ['location', 'plotDetails', 'priceDetails', 'contact', 'amenities'];
            jsonFields.forEach(field => {
                if (typeof data[field] === 'string') {
                    try {
                        data[field] = JSON.parse(data[field]);
                    } catch (e) {
                        console.error(`Error parsing ${field}:`, e);
                    }
                }
            });
        }

        let currentImages = plot.images || [];
        
        // Add new images if uploaded
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => ({
                filename: file.filename,
                path: `/uploads/properties/${file.filename}`,
                originalName: file.originalname
            }));
            currentImages = [...currentImages, ...newImages];
            data.images = currentImages;
        } else if (data.images && typeof data.images === 'string') {
            try {
                data.images = JSON.parse(data.images);
            } catch (e) {
                // string, maybe comma separated or JSON, we will just set it
            }
        } else if (data.images && Array.isArray(data.images)) {
             // Use provided images array
        } else {
            data.images = currentImages;
        }

        await plot.update(data);
        res.json(plot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a plot
export const deletePlot = async (req, res) => {
    try {
        const plot = await Plot.findByPk(req.params.id);
        if (!plot) return res.status(404).json({ message: "Plot not found" });
        await plot.destroy();
        res.json({ message: "Plot deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
