
const Producto = require('../models/Producto');

// GET: listar todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los productos',
            error: error.message
        });
    }
};

// GET: obtener un producto por su ID
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json(producto);
    } catch (error) {
        const estado = error.name === 'CastError' ? 400 : 500;

        res.status(estado).json({
            mensaje: 'Error al consultar el producto',
            error: error.message
        });
    }
};

// POST: crear un producto
exports.crearProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        const productoGuardado = await producto.save();

        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            producto: productoGuardado
        });
    } catch (error) {
        const estado = error.name === 'ValidationError' ? 400 : 500;

        res.status(estado).json({
            mensaje: 'Error al crear el producto',
            error: error.message
        });
    }
};

// PUT: actualizar un producto
exports.actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Producto actualizado correctamente',
            producto
        });
    } catch (error) {
        let estado = 500;

        if (error.name === 'ValidationError' ||
            error.name === 'CastError') {
            estado = 400;
        }

        res.status(estado).json({
            mensaje: 'Error al actualizar el producto',
            error: error.message
        });
    }
};

// DELETE: eliminar un producto
exports.eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Producto eliminado correctamente',
            producto
        });
    } catch (error) {
        const estado = error.name === 'CastError' ? 400 : 500;

        res.status(estado).json({
            mensaje: 'Error al eliminar el producto',
            error: error.message
        });
    }
};
