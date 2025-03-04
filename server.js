const express = require('express');
require("dotenv").config();
const cors = require('cors');
const validateToken = require('./src/middlewares/validateToken');
// Importar rutas
const productosRoutes = require('./src/routes/productosRoutes');
const authRoutes = require('./src/routes/authRoutes'); // Agregar rutas de autenticación

const app = express();
const port = process.env.PORT || 3001;

// Configuración de CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src *; connect-src *;");
    next();
});

// Middlewares
app.use(express.json());
app.use('/api',validateToken);

// Routes
app.use('/api', productosRoutes);
app.use('/auth', authRoutes); // Ahora /api/login y /api/register están activas

// Iniciar servidor
app.listen(port,"0.0.0.0", () => {
    console.log(`✅ Servidor corriendo en http://192.168.0.11:${port}`);
});
