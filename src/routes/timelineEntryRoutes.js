const express = require('express');
const router = express.Router();
const timelineEntryController = require('../controllers/timelineEntryController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, timelineEntryController.createTimelineEntry);
router.get('/', authenticateToken, timelineEntryController.getTimelineEntries);
router.get('/:id', authenticateToken, timelineEntryController.getTimelineEntryById);
router.put('/:id', authenticateToken, timelineEntryController.updateTimelineEntry);
router.delete('/:id', authenticateToken, timelineEntryController.deleteTimelineEntry);
// Obtener entradas de la línea temporal por ID de caso
router.get('/case/:caseId', authenticateToken, timelineEntryController.getTimelineEntriesByCaseId);

// Obtener entradas de la línea temporal por ID de usuario
router.get('/user/:userId', authenticateToken, timelineEntryController.getTimelineEntriesByUserId);

module.exports = router;
