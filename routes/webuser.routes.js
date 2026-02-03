import express from 'express';
import { registerWebUser, loginWebUser, forgotPasswordWebUser, getWebUsers, deleteWebUser, getWebUserById } from '../controllers/webuser.controller.js';
const router = express.Router();

// POST /api/webusers/register
router.post('/register', registerWebUser);
// POST /api/webusers/login
router.post('/login', loginWebUser);
// POST /api/webusers/forgot-password
router.post('/forgot-password', forgotPasswordWebUser);
// GET /api/webusers
router.get('/', getWebUsers);
// GET /api/webusers/:id
router.get('/:id', getWebUserById);
// DELETE /api/webusers/:id
router.delete('/:id', deleteWebUser);

export default router;

