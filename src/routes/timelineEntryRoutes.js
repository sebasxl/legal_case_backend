const express = require('express');
const router = express.Router();
const timelineEntryController = require('../controllers/timelineEntryController');
const { authenticateToken, verifyTotalAdmin, verifyOrganizationAdmin, verifyLawyer } = require('../middlewares/authMiddleware');

// Crear una nueva entrada de la línea temporal
router.post('/', authenticateToken, timelineEntryController.createTimelineEntry);

// Obtener todas las entradas de la línea temporal
router.get('/', authenticateToken, timelineEntryController.getTimelineEntries);

// Obtener entrada de la línea temporal por ID
router.get('/:id', authenticateToken, timelineEntryController.getTimelineEntryById);

// Actualizar una entrada de la línea temporal
router.put('/:id', authenticateToken, timelineEntryController.updateTimelineEntry);

// Eliminar una entrada de la línea temporal
router.delete('/:id', authenticateToken, timelineEntryController.deleteTimelineEntry);

// Obtener entradas de la línea temporal por ID de caso
router.get('/case/:caseId', authenticateToken, timelineEntryController.getTimelineEntriesByCaseId);

// Obtener entradas de la línea temporal por ID de usuario
router.get('/user/:userId', authenticateToken, timelineEntryController.getTimelineEntriesByUserId);

module.exports = router;
