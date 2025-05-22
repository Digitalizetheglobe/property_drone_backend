import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import ContactModel from "./contact.model.js";
import ProjectModel from "./project.model.js";
import BlogModel from "./blog.model.js";
import PropertyModel from "./property.model.js";
import AdminUserModel from "./admin.model.js"; 
import CareerModel from "./career.model.js";
import JobApplicationModel from "./application.model.js"; // Add this line
import YoutubeVideoModel from "./youtube.model.js"; 

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

// Initialize models
const Contact = ContactModel(sequelize, DataTypes);
const Project = ProjectModel(sequelize, DataTypes);
const Blog = BlogModel(sequelize, DataTypes);
const Career = CareerModel(sequelize, DataTypes); // Notice I changed to PascalCase
const Property = PropertyModel(sequelize, DataTypes);
const AdminUser = AdminUserModel(sequelize, DataTypes);
const JobApplication = JobApplicationModel(sequelize, DataTypes); // Add this line
const YoutubeVideo = YoutubeVideoModel(sequelize, DataTypes);
// Define associations
Career.hasMany(JobApplication, { foreignKey: 'jobId', sourceKey: 'jobId' });
JobApplication.belongsTo(Career, { foreignKey: 'jobId', targetKey: 'jobId' });

// Add Op for operators
const { Op } = Sequelize;
sequelize.Op = Op;

sequelize.sync()
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.log("Error:", err));

export { sequelize, Contact, Project, Blog, Property, AdminUser, Career, JobApplication, YoutubeVideo }; // Add JobApplication to exports