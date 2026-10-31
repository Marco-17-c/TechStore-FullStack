
const express = require('express');
const router = express.Router();

const {
    registrar,
    iniciarSesion
} = require('../controllers/authController');

// Ruta para registrar usuarios
router.post('/register', registrar);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

module.exports = router;
