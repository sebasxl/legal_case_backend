const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const { authenticateToken, verifyTotalAdmin, verifyOrganizationAdmin, verifyLawyer } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, organizationController.createOrganization);
router.get('/', authenticateToken, organizationController.getOrganizations);
router.get('/:id', authenticateToken, organizationController.getOrganizationById);
router.put('/:id', authenticateToken, organizationController.updateOrganization);
router.delete('/:id', authenticateToken, organizationController.deleteOrganization);

module.exports = router;
