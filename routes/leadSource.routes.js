import express from "express";
import { createLeadSource, getLeadSources } from "../controllers/leadSource.controller.js";

const router = express.Router();

router.post("/", createLeadSource);
router.get("/", getLeadSources);

export default router;
