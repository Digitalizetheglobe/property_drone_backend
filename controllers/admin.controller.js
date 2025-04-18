import { AdminUser, sequelize } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new admin user
export const registerAdmin = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    // Check if admin with same email or username already exists
    const existingAdmin = await AdminUser.findOne({
      where: {
        [sequelize.Op.or]: [
          { email: email },
          { userName: userName }
        ]
      }
    });

    if (existingAdmin) {
      return res.status(400).json({ 
        message: "Admin with this email or username already exists" 
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin user
    const newAdmin = await AdminUser.create({
      userName,
      email,
      password: hashedPassword,
      role: role || 'admin'
    });

    // Remove password from response
    const adminResponse = newAdmin.toJSON();
    delete adminResponse.password;

    res.status(201).json(adminResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login admin user
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await AdminUser.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({ message: "Account is deactivated" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      id: admin.id,
      userName: admin.userName,
      email: admin.email,
      role: admin.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all admin users (protected route)
export const getAdminUsers = async (req, res) => {
  try {
    // Only superadmin can view all admins
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: "Not authorized" });
    }

    const admins = await AdminUser.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get admin user by ID (protected route)
export const getAdminById = async (req, res) => {
  try {
    const admin = await AdminUser.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Check if the user is requesting their own info or is a superadmin
    if (req.user.id !== admin.id && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update admin user (protected route)
export const updateAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findByPk(req.params.id);
    
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Check if the user is updating their own info or is a superadmin
    if (req.user.id !== admin.id && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updateData = { ...req.body };
    
    // If password is being updated, hash it
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // Regular admin cannot change their role
    if (req.user.role !== 'superadmin') {
      delete updateData.role;
    }

    await admin.update(updateData);
    
    // Remove password from response
    const adminResponse = admin.toJSON();
    delete adminResponse.password;
    
    res.json(adminResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete admin user (protected route, superadmin only)
export const deleteAdmin = async (req, res) => {
  try {
    // Only superadmin can delete admins
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: "Not authorized" });
    }

    const admin = await AdminUser.findByPk(req.params.id);
    
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    await admin.destroy();
    res.json({ message: "Admin user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change admin status (activate/deactivate)
export const changeAdminStatus = async (req, res) => {
  try {
    // Only superadmin can change status
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { isActive } = req.body;
    const admin = await AdminUser.findByPk(req.params.id);
    
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    await admin.update({ isActive });
    res.json({ 
      id: admin.id, 
      userName: admin.userName, 
      isActive: admin.isActive 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get current admin profile
export const getProfile = async (req, res) => {
  try {
    const admin = await AdminUser.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};