const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, verifyTotalAdmin, verifyOrganizationAdmin, verifyLawyer } = require('../middlewares/authMiddleware');

// Registrar un nuevo usuario
router.post('/register', userController.register);

// Iniciar sesión
router.post('/login', userController.login);

// Obtener todos los usuarios
router.get('/', authenticateToken, userController.getUsers);

// Obtener usuario por ID
router.get('/:id', authenticateToken, userController.getUserById);

// Actualizar usuario
router.put('/:id', authenticateToken, userController.updateUser);

// Eliminar usuario
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
