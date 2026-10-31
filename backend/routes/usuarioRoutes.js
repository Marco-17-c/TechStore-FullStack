
const express = require('express');
const router = express.Router();

const {
    verificarToken,
    verificarRol
} = require('../middlewares/authMiddleware');

// Ruta protegida: cualquier usuario autenticado
router.get('/perfil', verificarToken, (req, res) => {
    res.json({
        mensaje: 'Acceso autorizado al perfil',
        usuario: req.usuario
    });
});

// Ruta protegida: solo administradores
router.get(
    '/admin',
    verificarToken,
    verificarRol('admin'),
    (req, res) => {
        res.json({
            mensaje: 'Bienvenido al panel de administrador'
        });
    }
);

module.exports = router;
