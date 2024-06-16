const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { authenticateToken, verifyTotalAdmin, verifyOrganizationAdmin, verifyLawyer } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, roleController.createRole);
router.get('/', authenticateToken, roleController.getRoles);
router.get('/:id', authenticateToken, roleController.getRoleById);
router.put('/:id', authenticateToken, roleController.updateRole);
router.delete('/:id', authenticateToken, roleController.deleteRole);

module.exports = router;
