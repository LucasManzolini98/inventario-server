// controllers/productosController.js
const { getAllProducts, addProduct ,getProductByCode } = require('../models/productoModel');

const fetchAllProducts = async (req, res) => {
    try {
        const productos = await getAllProducts();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

const fetchProductByCode = async (req, res) => {
    const { codigo } = req.params;
    try {
        const producto = await getProductByCode(codigo);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener producto', details: error.message });
    }
};


const postProduct = async (req, res) => {
    const { codigo, nombre, categoria, stock, precio } = req.body;
    try {
        const insertId = await addProduct(codigo, nombre, categoria, stock, precio);
        res.status(201).json({ message: 'Producto agregado', insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar producto', details: error.message });
    }
};

module.exports = { fetchAllProducts, postProduct ,fetchProductByCode };