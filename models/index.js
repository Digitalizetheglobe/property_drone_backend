import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import ContactModel from "./contact.model.js";
import ProjectModel from "./project.model.js";
import BlogModel from "./blog.model.js";
import PropertyModel from "./property.model.js";
import AdminUserModel from "./admin.model.js";
import CareerModel from "./career.model.js";
import JobApplicationModel from "./application.model.js";
import YoutubeVideoModel from "./youtube.model.js";
import RealEstateModel from "./realestate.model.js";
import realEstateBasicModel from './realEstateBasic.model.js';
import PlotModel from './plot.model.js';
import CookieConsentModel from './cookieconsent.model.js';
import NewsModel from './news.model.js';
import UserPropertyModel from './userProperty.model.js';
import ExpertModel from './expert.model.js';
import CommercialPropertyModel from './commercialProperty.model.js';

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
const Career = CareerModel(sequelize, DataTypes);
const Property = PropertyModel(sequelize, DataTypes);
const AdminUser = AdminUserModel(sequelize, DataTypes);
const JobApplication = JobApplicationModel(sequelize, DataTypes);
const YoutubeVideo = YoutubeVideoModel(sequelize, DataTypes);
const RealEstate = RealEstateModel(sequelize);
const RealEstateBasic = realEstateBasicModel(sequelize, Sequelize.DataTypes);
const CookieConsent = CookieConsentModel(sequelize);
const News = NewsModel(sequelize, DataTypes);
const UserProperty = UserPropertyModel(sequelize, DataTypes);
const Expert = ExpertModel(sequelize, DataTypes);
const Plot = PlotModel(sequelize, DataTypes);
const CommercialProperty = CommercialPropertyModel(sequelize, DataTypes);

// Define associations
// Define associations
// Career.hasMany(JobApplication, { foreignKey: 'jobId', sourceKey: 'jobId', onDelete: 'CASCADE' });
// JobApplication.belongsTo(Career, { foreignKey: 'jobId', targetKey: 'jobId', onDelete: 'CASCADE' });

// Add Op for operators
const { Op } = Sequelize;
sequelize.Op = Op;

sequelize.sync({ alter: true })
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.log("Error:", err));

export { sequelize, Contact, Project, Blog, Property, AdminUser, Career, JobApplication, YoutubeVideo, RealEstate, RealEstateBasic, CookieConsent, News, UserProperty, Expert, Plot, CommercialProperty };
