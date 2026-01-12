import WebUser from '../models/webuser.model.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

// Register a new web user
export const registerWebUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existing = await WebUser.findOne({ where: { [Op.or]: [{ email }, { username: name }] }});
    if (existing) {
      return res.status(400).json({ message: 'Email or name already registered' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await WebUser.create({ username: name, email, password: hash });
    res.status(201).json({ id: user.id, name: user.username, email: user.email });
  } catch (e) {
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
    const user = await WebUser.findOne({ where: { email }});
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ id: user.id, name: user.username, email: user.email });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Forgot password (will just simulate sending reset mail, for demo)
export const forgotPasswordWebUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const user = await WebUser.findOne({ where: { email }});
    if (!user) {
      return res.status(200).json({ message: 'If user exists, password reset link would be sent' });
    }
    // In real app: send a mail with a reset link/token
    res.status(200).json({ message: 'Password reset link sent (simulated - implement real email in production)' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Get ALL web users
export const getWebUsers = async (req, res) => {
  try {
    const users = await WebUser.findAll({ attributes: ['id', 'username', 'email', 'createdAt'] });
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

