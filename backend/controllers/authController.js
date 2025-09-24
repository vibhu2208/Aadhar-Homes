const User = require('../models/User');

// @desc    Register user (Admin only for first user, then protected)
// @route   POST /api/auth/register
// @access  Public (for first user) / Private (for subsequent users)
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if this is the first user
    const userCount = await User.countDocuments();
    
    // If there are existing users, require authentication
    if (userCount > 0) {
      // This route should be protected for subsequent registrations
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Registration is restricted. Please login as admin.'
        });
      }
      
      // Only admin can create new users
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Only administrators can create new users'
        });
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'admin' // Default to admin for first user
    });

    // Generate token
    const token = user.getSignedJwtToken();

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by credentials
    const user = await User.findByCredentials(email, password);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = user.getSignedJwtToken();

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    
    if (error.message === 'Invalid login credentials') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      lastLogin: req.user.lastLogin,
      createdAt: req.user.createdAt
    };

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Logout user (client-side token removal)
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

module.exports = {
  register,
  login,
  getMe,
  logout
};
