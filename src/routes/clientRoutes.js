const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authenticateToken, verifyTotalAdmin, verifyOrganizationAdmin, verifyLawyer } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, clientController.createClient);
router.get('/', authenticateToken, clientController.getClients);
router.get('/:id', authenticateToken, clientController.getClientById);
router.put('/:id', authenticateToken, clientController.updateClient);
router.delete('/:id', authenticateToken, clientController.deleteClient);

module.exports = router;
