const express = require('express');
const router = express.Router();
const caseTypeController = require('../controllers/caseTypeController');
const { authenticateToken, verifyTotalAdmin, verifyOrganizationAdmin, verifyLawyer } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, caseTypeController.createCaseType);
router.get('/', authenticateToken, caseTypeController.getCaseTypes);
router.get('/:id', authenticateToken, caseTypeController.getCaseTypeById);
router.put('/:id', authenticateToken, caseTypeController.updateCaseType);
router.delete('/:id', authenticateToken, caseTypeController.deleteCaseType);

module.exports = router;
