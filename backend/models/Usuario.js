
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true
        },

        correo: {
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: 8,
            select: false
        },

        rol: {
            type: String,
            enum: ['admin', 'usuario'],
            default: 'usuario'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Usuario', usuarioSchema);
