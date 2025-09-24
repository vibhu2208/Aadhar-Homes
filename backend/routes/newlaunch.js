const express = require('express');
const {
  getNewLaunches,
  getNewLaunch,
  createNewLaunch,
  updateNewLaunch,
  deleteNewLaunch,
  searchNewLaunches,
  getUpcomingLaunches,
  getNewLaunchStats
} = require('../controllers/newLaunchController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getNewLaunches);
router.get('/search', searchNewLaunches);
router.get('/upcoming', getUpcomingLaunches);
router.get('/:id', getNewLaunch);

// Protected routes (Admin only)
router.use(protect); // All routes below require authentication
router.use(authorize('admin')); // All routes below require admin role

router.post('/', createNewLaunch);
router.put('/:id', updateNewLaunch);
router.delete('/:id', deleteNewLaunch);
router.get('/admin/stats', getNewLaunchStats);

module.exports = router;
