import express from "express";
import {
    createPlot,
    getAllPlots,
    getPlotById,
    getPlotBySlug,
    updatePlot,
    deletePlot,
} from "../controllers/plot.controller.js";

const router = express.Router();

router.post("/", createPlot);
router.get("/", getAllPlots);
router.get("/:id", getPlotById);
router.get("/slug/:slug", getPlotBySlug);
router.put("/:id", updatePlot);
router.delete("/:id", deletePlot);

export default router;
