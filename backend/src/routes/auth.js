const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { validate, registerSchema, loginSchema } = require('../utils/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Register new user
router.post('/register', validate(registerSchema), register);

// Login user
router.post('/login', validate(loginSchema), login);

// Get user profile (protected route)
router.get('/profile', authenticateToken, getProfile);

module.exports = router; 