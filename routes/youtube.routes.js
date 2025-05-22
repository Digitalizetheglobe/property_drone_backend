import express from "express";
import { 
  getYoutubeVideos, 
  getYoutubeVideoById, 
  createYoutubeVideo, 
  updateYoutubeVideo, 
  deleteYoutubeVideo 
} from "../controllers/youtube.controller.js";

const router = express.Router();

// Get all videos
router.get("/", getYoutubeVideos);

// Get a specific video by ID
router.get("/:id", getYoutubeVideoById);

// Create a new video
router.post("/", createYoutubeVideo);

// Update a video
router.put("/:id", updateYoutubeVideo);

// Delete a video
router.delete("/:id", deleteYoutubeVideo);

export default router;