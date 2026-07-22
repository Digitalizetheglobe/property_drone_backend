import express from "express";
import {
    createPlot,
    getAllPlots,
    getPlotById,
    getPlotBySlug,
    updatePlot,
    deletePlot,
} from "../controllers/plot.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.array("images", 10), createPlot);
router.get("/", getAllPlots);
router.get("/:id", getPlotById);
router.get("/slug/:slug", getPlotBySlug);
router.put("/:id", upload.array("images", 10), updatePlot);
router.delete("/:id", deletePlot);

export default router;
