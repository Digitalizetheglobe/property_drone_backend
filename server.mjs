import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import careerRoutes from "./routes/career.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import youtubeRoutes from "./routes/youtube.routes.js";
import realEstateRoutes from "./routes/realestate.routes.js";
import realEstateBasicRoutes from './routes/realEstateBasic.routes.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create necessary upload directories if they don't exist
import fs from 'fs';
const uploadDirs = ['uploads/careers', 'uploads/applications'];
uploadDirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
    }
});

// Routes
app.use("/contacts", contactRoutes);
app.use("/projects", projectRoutes);
app.use("/blogs", blogRoutes);
app.use("/properties", propertyRoutes);
app.use("/admin", adminRoutes);
app.use("/careers", careerRoutes);
app.use("/applications", applicationRoutes);
app.use("/youtube-videos", youtubeRoutes);
app.use("/real-estate", realEstateRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));
app.use('/api/real-estate-basics', realEstateBasicRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));