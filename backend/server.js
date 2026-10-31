
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const productoRoutes = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Seguridad básica
app.use(helmet());

app.use(cors());

app.use(express.json({ limit: '10kb' }));

// Limitar intentos de autenticación
const limiteAutenticacion = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        mensaje: 'Demasiados intentos. Intenta nuevamente en 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Rutas de la API
app.use('/api/productos', productoRoutes);
app.use('/api/auth', limiteAutenticacion, authRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de TechStore funcionando correctamente'
    });
});

// Iniciar servidor
async function iniciarServidor() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('Falta configurar MONGODB_URI en el archivo .env');
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('Falta configurar JWT_SECRET en el archivo .env');
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Conexión con MongoDB Atlas establecida');

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar TechStore:', error.message);
        process.exit(1);
    }
}

iniciarServidor();
