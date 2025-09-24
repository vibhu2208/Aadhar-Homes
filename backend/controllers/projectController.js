const Project = require('../models/Project');

// @desc    Get all projects with filtering and pagination
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = {};
    
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
    
    // Filter by luxury
    if (req.query.luxury) {
      filter.luxury = req.query.luxury;
    }
    
    // Filter by spotlight
    if (req.query.spotlight) {
      filter.spotlight = req.query.spotlight;
    }

    // Sort options
    let sort = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
      sort[sortField] = sortOrder;
    } else {
      sort.createdAt = -1; // Default: newest first
    }

    // Execute query
    const projects = await Project.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-__v');

    // Get total count for pagination
    const total = await Project.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      totalPages,
      currentPage: page,
      data: projects
    });

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching projects'
    });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select('-__v');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Get project error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching project'
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin only)
const createProject = async (req, res) => {
  try {
    // Generate project URL if not provided
    if (!req.body.project_url && req.body.projectName) {
      req.body.project_url = req.body.projectName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });

  } catch (error) {
    console.error('Create project error:', error);

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
      message: 'Server error while creating project'
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin only)
const updateProject = async (req, res) => {
  try {
    // Update project URL if projectName is being updated
    if (req.body.projectName && !req.body.project_url) {
      req.body.project_url = req.body.projectName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-__v');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });

  } catch (error) {
    console.error('Update project error:', error);

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
      message: 'Server error while updating project'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: {}
    });

  } catch (error) {
    console.error('Delete project error:', error);

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting project'
    });
  }
};

// @desc    Search projects using text index
// @route   GET /api/projects/search
// @access  Public
const searchProjects = async (req, res) => {
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
    const projects = await Project.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count for search results
    const total = await Project.countDocuments({ $text: { $search: q } });
    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      totalPages,
      currentPage: parseInt(page),
      query: q,
      data: projects
    });

  } catch (error) {
    console.error('Search projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching projects'
    });
  }
};

// @desc    Get project statistics
// @route   GET /api/projects/stats
// @access  Private (Admin only)
const getProjectStats = async (req, res) => {
  try {
    const stats = await Project.aggregate([
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          avgMinPrice: { $avg: '$minPrice' },
          avgMaxPrice: { $avg: '$maxPrice' },
          totalUnits: { $sum: '$totalUnit' },
        }
      },
      {
        $project: {
          _id: 0,
          totalProjects: 1,
          avgMinPrice: { $round: ['$avgMinPrice', 2] },
          avgMaxPrice: { $round: ['$avgMaxPrice', 2] },
          totalUnits: 1
        }
      }
    ]);

    // Get projects by status
    const statusStats = await Project.aggregate([
      {
        $group: {
          _id: '$project_Status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get projects by city
    const cityStats = await Project.aggregate([
      {
        $group: {
          _id: '$city',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalProjects: 0,
          avgMinPrice: 0,
          avgMaxPrice: 0,
          totalUnits: 0
        },
        byStatus: statusStats,
        byCity: cityStats
      }
    });

  } catch (error) {
    console.error('Get project stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching project statistics'
    });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  searchProjects,
  getProjectStats
};
