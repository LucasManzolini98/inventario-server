
const pool = require('../config/db');

const getAllProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
};

const getProductByCode = async (codigo) => {
    const [rows] = await pool.query('SELECT * FROM productos WHERE codigo = ?', [codigo]);
    return rows[0]; // Retorna el primer producto encontrado (o `undefined` si no hay resultados)
};

const addProduct = async (codigo, nombre, categoria, stock, precio) => {
    const [result] = await pool.query(
        'INSERT INTO productos (codigo, nombre, categoria, stock, precio) VALUES (?, ?, ?, ?, ?)',
        [codigo, nombre, categoria, stock, precio]
    );
    return result.insertId;
};

module.exports = { getAllProducts, addProduct, getProductByCode };
