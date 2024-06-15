const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/', authenticateToken, userController.getUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
