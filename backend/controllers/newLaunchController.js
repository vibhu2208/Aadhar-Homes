const NewLaunch = require('../models/NewLaunch');

// @desc    Get all new launches with filtering and pagination
// @route   GET /api/newlaunch
// @access  Public
const getNewLaunches = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = { isActive: true }; // Only show active new launches by default
    
    // Filter by city
    if (req.query.city) {
      filter.city = { $regex: req.query.city, $options: 'i' };
    }
    
    // Filter by type
    if (req.query.type) {
      filter.type = { $regex: req.query.type, $options: 'i' };
    }
    
    // Filter by status
    if (req.query.status) {
      filter.project_Status = req.query.status;
    }
    
    // Filter by builder
    if (req.query.builder) {
      filter.builderName = { $regex: req.query.builder, $options: 'i' };
    }
    
    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      filter.$and = [];
      if (req.query.minPrice) {
        filter.$and.push({ minPrice: { $gte: parseInt(req.query.minPrice) } });
      }
      if (req.query.maxPrice) {
        filter.$and.push({ maxPrice: { $lte: parseInt(req.query.maxPrice) } });
      }
    }
    
    // Filter by launch date range
    if (req.query.launchFrom || req.query.launchTo) {
      if (!filter.$and) filter.$and = [];
      if (req.query.launchFrom) {
        filter.$and.push({ launchingDate: { $gte: new Date(req.query.launchFrom) } });
      }
      if (req.query.launchTo) {
        filter.$and.push({ launchingDate: { $lte: new Date(req.query.launchTo) } });
      }
    }
    
    // Filter by luxury
    if (req.query.luxury) {
      filter.luxury = req.query.luxury;
    }

    // Sort options
    let sort = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
      sort[sortField] = sortOrder;
    } else {
      sort = { priority: -1, launchingDate: 1 }; // Default: priority first, then by launch date
    }

    // Execute query
    const newLaunches = await NewLaunch.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-__v');

    // Get total count for pagination
    const total = await NewLaunch.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: newLaunches.length,
      total,
      totalPages,
      currentPage: page,
      data: newLaunches
    });

  } catch (error) {
    console.error('Get new launches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching new launches'
    });
  }
};

// @desc    Get single new launch by ID
// @route   GET /api/newlaunch/:id
// @access  Public
const getNewLaunch = async (req, res) => {
  try {
    const newLaunch = await NewLaunch.findById(req.params.id).select('-__v');

    if (!newLaunch) {
      return res.status(404).json({
        success: false,
        message: 'New launch project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: newLaunch
    });

  } catch (error) {
    console.error('Get new launch error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching new launch project'
    });
  }
};

// @desc    Create new launch project
// @route   POST /api/newlaunch
// @access  Private (Admin only)
const createNewLaunch = async (req, res) => {
  try {
    // Generate project URL if not provided
    if (!req.body.project_url && req.body.projectName) {
      req.body.project_url = req.body.projectName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const newLaunch = await NewLaunch.create(req.body);

    res.status(201).json({
      success: true,
      message: 'New launch project created successfully',
      data: newLaunch
    });

  } catch (error) {
    console.error('Create new launch error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating new launch project'
    });
  }
};

// @desc    Update new launch project
// @route   PUT /api/newlaunch/:id
// @access  Private (Admin only)
const updateNewLaunch = async (req, res) => {
  try {
    // Update project URL if projectName is being updated
    if (req.body.projectName && !req.body.project_url) {
      req.body.project_url = req.body.projectName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const newLaunch = await NewLaunch.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-__v');

    if (!newLaunch) {
      return res.status(404).json({
        success: false,
        message: 'New launch project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'New launch project updated successfully',
      data: newLaunch
    });

  } catch (error) {
    console.error('Update new launch error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating new launch project'
    });
  }
};

// @desc    Delete new launch project
// @route   DELETE /api/newlaunch/:id
// @access  Private (Admin only)
const deleteNewLaunch = async (req, res) => {
  try {
    const newLaunch = await NewLaunch.findByIdAndDelete(req.params.id);

    if (!newLaunch) {
      return res.status(404).json({
        success: false,
        message: 'New launch project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'New launch project deleted successfully',
      data: {}
    });

  } catch (error) {
    console.error('Delete new launch error:', error);

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting new launch project'
    });
  }
};

// @desc    Search new launch projects using text index
// @route   GET /api/newlaunch/search
// @access  Public
const searchNewLaunches = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Text search with scoring
    const newLaunches = await NewLaunch.find(
      { 
        $text: { $search: q },
        isActive: true 
      },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count for search results
    const total = await NewLaunch.countDocuments({ 
      $text: { $search: q },
      isActive: true 
    });
    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json({
      success: true,
      count: newLaunches.length,
      total,
      totalPages,
      currentPage: parseInt(page),
      query: q,
      data: newLaunches
    });

  } catch (error) {
    console.error('Search new launches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching new launch projects'
    });
  }
};

// @desc    Get upcoming launches (launching in next 30 days)
// @route   GET /api/newlaunch/upcoming
// @access  Public
const getUpcomingLaunches = async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));

    const upcomingLaunches = await NewLaunch.find({
      isActive: true,
      launchingDate: {
        $gte: now,
        $lte: thirtyDaysFromNow
      }
    })
      .sort({ launchingDate: 1, priority: -1 })
      .limit(parseInt(req.query.limit) || 10)
      .select('-__v');

    res.status(200).json({
      success: true,
      count: upcomingLaunches.length,
      data: upcomingLaunches
    });

  } catch (error) {
    console.error('Get upcoming launches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching upcoming launches'
    });
  }
};

// @desc    Get new launch statistics
// @route   GET /api/newlaunch/stats
// @access  Private (Admin only)
const getNewLaunchStats = async (req, res) => {
  try {
    const stats = await NewLaunch.aggregate([
      {
        $group: {
          _id: null,
          totalNewLaunches: { $sum: 1 },
          activeNewLaunches: {
            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
          },
          avgMinPrice: { $avg: '$minPrice' },
          avgMaxPrice: { $avg: '$maxPrice' },
          totalUnits: { $sum: '$totalUnit' },
        }
      },
      {
        $project: {
          _id: 0,
          totalNewLaunches: 1,
          activeNewLaunches: 1,
          avgMinPrice: { $round: ['$avgMinPrice', 2] },
          avgMaxPrice: { $round: ['$avgMaxPrice', 2] },
          totalUnits: 1
        }
      }
    ]);

    // Get new launches by status
    const statusStats = await NewLaunch.aggregate([
      {
        $group: {
          _id: '$project_Status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get upcoming launches count
    const now = new Date();
    const upcomingCount = await NewLaunch.countDocuments({
      isActive: true,
      launchingDate: { $gte: now }
    });

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalNewLaunches: 0,
          activeNewLaunches: 0,
          avgMinPrice: 0,
          avgMaxPrice: 0,
          totalUnits: 0
        },
        byStatus: statusStats,
        upcomingCount
      }
    });

  } catch (error) {
    console.error('Get new launch stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching new launch statistics'
    });
  }
};

module.exports = {
  getNewLaunches,
  getNewLaunch,
  createNewLaunch,
  updateNewLaunch,
  deleteNewLaunch,
  searchNewLaunches,
  getUpcomingLaunches,
  getNewLaunchStats
};
