import express from "express";
import {
    createCommercialProperty,
    getAllCommercialProperties,
    getCommercialPropertyById,
    getCommercialPropertyBySlug,
    updateCommercialProperty,
    deleteCommercialProperty
} from "../controllers/commercialProperty.controller.js";

const router = express.Router();

console.log("Initializing Commercial Property Router");

router.use((req, res, next) => {
    console.log("Commercial Router Middleware Hit:", req.method, req.url);
    next();
});

import { upload } from "../middleware/multer.js";

router.post("/", upload.array('commercialPropertyImages'), (req, res, next) => {
    console.log("POST / handler hit");
    createCommercialProperty(req, res, next); // Call original handler
});
router.get("/", getAllCommercialProperties);
router.get("/:id", getCommercialPropertyById);
router.get("/slug/:slug", getCommercialPropertyBySlug);
router.put("/:id", upload.array('commercialPropertyImages'), updateCommercialProperty);
router.delete("/:id", deleteCommercialProperty);

export default router;
