import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminUsers,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  changeAdminStatus,
  getProfile
} from "../controllers/admin.controller.js";
import { authenticate, isSuperAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected routes
router.get("/profile", authenticate, getProfile);
router.get("/", authenticate, getAdminUsers);
router.get("/:id", authenticate, getAdminById);
router.put("/:id", authenticate, updateAdmin);
router.delete("/:id", authenticate, deleteAdmin);
router.patch("/:id/status", authenticate, changeAdminStatus);

export default router;