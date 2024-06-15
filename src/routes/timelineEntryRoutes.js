const express = require('express');
const router = express.Router();
const timelineEntryController = require('../controllers/timelineEntryController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, timelineEntryController.createTimelineEntry);
router.get('/', authenticateToken, timelineEntryController.getTimelineEntries);
router.get('/:id', authenticateToken, timelineEntryController.getTimelineEntryById);
router.put('/:id', authenticateToken, timelineEntryController.updateTimelineEntry);
router.delete('/:id', authenticateToken, timelineEntryController.deleteTimelineEntry);

module.exports = router;
