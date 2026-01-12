import express from 'express';
import { registerWebUser, loginWebUser, forgotPasswordWebUser, getWebUsers } from '../controllers/webuser.controller.js';
const router = express.Router();

// POST /api/webusers/register
router.post('/register', registerWebUser);
// POST /api/webusers/login
router.post('/login', loginWebUser);
// POST /api/webusers/forgot-password
router.post('/forgot-password', forgotPasswordWebUser);
// GET /api/webusers
router.get('/', getWebUsers);

export default router;

