const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const { authenticateToken, verifyTotalAdmin, verifyOrganizationAdmin, verifyLawyer } = require('../middlewares/authMiddleware');

// Crear un nuevo caso
router.post('/', authenticateToken, caseController.createCase);

// Obtener todos los casos
router.get('/', authenticateToken, caseController.getCases);

// Obtener caso por ID
router.get('/:id', authenticateToken, caseController.getCaseById);

// Actualizar un caso
router.put('/:id', authenticateToken, caseController.updateCase);

// Eliminar un caso
router.delete('/:id', authenticateToken, caseController.deleteCase);

module.exports = router;
