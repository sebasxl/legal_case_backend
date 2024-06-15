const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, statusController.createStatus);
router.get('/', authenticateToken, statusController.getStatuses);
router.get('/:id', authenticateToken, statusController.getStatusById);
router.put('/:id', authenticateToken, statusController.updateStatus);
router.delete('/:id', authenticateToken, statusController.deleteStatus);

module.exports = router;
