import { Plot } from "../models/index.js";

// Create a new plot
export const createPlot = async (req, res) => {
    try {
        const data = req.body;
        if (!data.slug && data.title) {
            data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
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
        await plot.update(req.body);
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
