const express = require('express');
require("dotenv").config();
const cors = require('cors');
const validateToken = require('./src/middlewares/validateToken');

const productosRoutes = require('./src/routes/productosRoutes');
const authRoutes = require('./src/routes/authRoutes'); // Agregar rutas de autenticación
const categoriasRoutes = require('./src/routes/categoriesRoutes')


const app = express();
const port = process.env.PORT || 3001;

// Configuración de CORS
app.use(cors({
    origin: 'http://192.168.131.115:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Necesario para enviar credenciales
}));
app.use((req, res, next) => {
    res.setHeader("Referrer-Policy","Content-Security-Policy", "default-src *; connect-src *;", "no-referrer-when-downgrade");
    next();
});

// Middlewares
app.use(express.json());
app.use('/api',validateToken);
app.use('/api',categoriasRoutes)
// Routes
app.use('/api', productosRoutes);
app.use('/auth', authRoutes);

// Iniciar servidor
app.listen(port,"0.0.0.0", () => {
    console.log(`✅ Servidor corriendo, revisar la "ipconfig" IPv4 en cmd para obtener ip. Puerto:${port}`);
});
