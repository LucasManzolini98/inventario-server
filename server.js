const express = require('express');
const cors = require('cors');
const productosRoutes = require('./src/routes/productosRoutes');

const app = express();
const port = 3001;

app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());
app.use('/api', productosRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://192.168.0.11:${port}`);
});

