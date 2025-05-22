import { YoutubeVideo } from "../models/index.js";

// Get all YouTube videos
export const getYoutubeVideos = async (req, res) => {
  try {
    const videos = await YoutubeVideo.findAll();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific YouTube video by ID
export const getYoutubeVideoById = async (req, res) => {
  try {
    const video = await YoutubeVideo.findByPk(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new YouTube video
export const createYoutubeVideo = async (req, res) => {
  try {
    const { title, description, youtube_url, author, date } = req.body;
    const video = await YoutubeVideo.create({ 
      title, 
      description, 
      youtube_url, 
      author, 
      date: date || new Date() 
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a YouTube video
export const updateYoutubeVideo = async (req, res) => {
  try {
    const { title, description, youtube_url, author, date } = req.body;
    const video = await YoutubeVideo.findByPk(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    
    await video.update({ 
      title, 
      description, 
      youtube_url, 
      author,
      date 
    });
    
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a YouTube video
export const deleteYoutubeVideo = async (req, res) => {
  try {
    const video = await YoutubeVideo.findByPk(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    
    await video.destroy();
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};