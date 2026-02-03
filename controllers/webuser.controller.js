import WebUser from '../models/webuser.model.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

// Register a new web user
export const registerWebUser = async (req, res) => {
  try {
    console.log("Registering user, body:", req.body);
    const { name, email, number, password } = req.body;

    // Check for missing fields individually to provide better error messages
    if (!name) return res.status(400).json({ message: 'Name is required' });
    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!password) return res.status(400).json({ message: 'Password is required' });
    if (!number) return res.status(400).json({ message: 'Mobile number is required' });

    const existing = await WebUser.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await WebUser.create({ name, email, number, password: hash });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, number: user.number });
  } catch (e) {
    console.error("Registration error:", e);
    res.status(400).json({ message: e.message });
  }
};

// Login a web user
export const loginWebUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const user = await WebUser.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ id: user.id, name: user.name, email: user.email, number: user.number });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Forgot password (will just simulate sending reset mail, for demo)
export const forgotPasswordWebUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const user = await WebUser.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ message: 'If user exists, password reset link would be sent' });
    }
    // In real app: send a mail with a reset link/token
    res.status(200).json({ message: 'Password reset link sent' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Get ALL web users
export const getWebUsers = async (req, res) => {
  try {
    const users = await WebUser.findAll({ attributes: ['id', 'name', 'email', 'number', 'createdAt'] });
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Get Single web user by ID
export const getWebUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await WebUser.findByPk(id, { attributes: ['id', 'name', 'email', 'number', 'createdAt'] });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Delete a web user
export const deleteWebUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await WebUser.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

