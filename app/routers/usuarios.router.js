const express = require('express');
const router = express.Router();
const usuarios = require('../controllers/usuarios.controller.js'); // Asegúrate de que el nombre del controlador coincida

// Crear un nuevo usuario
router.post('/api/usuarios/create', usuarios.create);

// Obtener todos los usuarios
router.get('/api/usuarios/all', usuarios.retrieveAllUsuarios);

// Obtener un usuario por su ID
router.get('/api/usuarios/onebyid/:id', usuarios.getUsuarioById);

// Actualizar un usuario por su ID
router.put('/api/usuarios/update/:id', usuarios.updateById);

// Eliminar un usuario por su ID
router.delete('/api/usuarios/delete/:id', usuarios.deleteById);

module.exports = router;
