const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  searchProjects,
  getProjectStats
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/search', searchProjects);
router.get('/:id', getProject);

// Protected routes (Admin only)
router.use(protect); // All routes below require authentication
router.use(authorize('admin')); // All routes below require admin role

router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.get('/admin/stats', getProjectStats);

module.exports = router;
