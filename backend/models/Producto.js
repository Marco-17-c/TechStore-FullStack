
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
            minlength: [2, 'El nombre debe tener al menos 2 caracteres']
        },
        categoria: {
            type: String,
            required: [true, 'La categoría es obligatoria'],
            trim: true
        },
        precio: {
            type: Number,
            required: [true, 'El precio es obligatorio'],
            min: [0.01, 'El precio debe ser mayor que cero']
        },
        stock: {
            type: Number,
            required: [true, 'El stock es obligatorio'],
            min: [0, 'El stock no puede ser negativo'],
            validate: {
                validator: Number.isInteger,
                message: 'El stock debe ser un número entero'
            }
        },
        descripcion: {
            type: String,
            trim: true,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Producto', productoSchema);
