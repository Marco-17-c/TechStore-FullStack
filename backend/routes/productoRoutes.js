
const express = require('express');
const router = express.Router();

const {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController');

const {
    verificarToken,
    verificarRol
} = require('../middlewares/authMiddleware');

// Consultar productos: cualquier visitante
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// Registrar, editar y eliminar: solo administradores
router.post(
    '/',
    verificarToken,
    verificarRol('admin'),
    crearProducto
);

router.put(
    '/:id',
    verificarToken,
    verificarRol('admin'),
    actualizarProducto
);

router.delete(
    '/:id',
    verificarToken,
    verificarRol('admin'),
    eliminarProducto
);

module.exports = router;
