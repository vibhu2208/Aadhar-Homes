const express = require('express');
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public (for first user) / Private (for subsequent users)
router.post('/register', async (req, res, next) => {
  try {
    // Check if this is the first user
    const userCount = await User.countDocuments();
    
    if (userCount > 0) {
      // Protect route for subsequent registrations
      return protect(req, res, () => {
        authorize('admin')(req, res, next);
      });
    } else {
      // Allow first user registration without authentication
      next();
    }
  } catch (error) {
    console.error('Registration middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}, register);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', login);

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, getMe);

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', protect, logout);

module.exports = router;
