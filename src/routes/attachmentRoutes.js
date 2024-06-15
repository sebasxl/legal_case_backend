const express = require('express');
const router = express.Router();
const attachmentController = require('../controllers/attachmentController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, attachmentController.createAttachment);
router.get('/', authenticateToken, attachmentController.getAttachments);
router.get('/:id', authenticateToken, attachmentController.getAttachmentById);
router.put('/:id', authenticateToken, attachmentController.updateAttachment);
router.delete('/:id', authenticateToken, attachmentController.deleteAttachment);

module.exports = router;
