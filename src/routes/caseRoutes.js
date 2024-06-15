const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const { authenticateToken, verifyTotalAdmin, verifyOrganizationAdmin, verifyLawyer } = require('../middlewares/authMiddleware');

// Crear un nuevo caso
router.post('/', authenticateToken, verifyOrganizationAdmin, caseController.createCase);

// Obtener todos los casos
router.get('/', authenticateToken, verifyTotalAdmin, caseController.getCases);

// Obtener caso por ID
router.get('/:id', authenticateToken, verifyLawyer, caseController.getCaseById);

// Actualizar un caso
router.put('/:id', authenticateToken, verifyLawyer, caseController.updateCase);

// Eliminar un caso
router.delete('/:id', authenticateToken, verifyLawyer, caseController.deleteCase);

module.exports = router;
