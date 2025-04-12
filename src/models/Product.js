const pool = require('../config/db');

const getAllProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
};

const getProductByCode = async (codigo) => {
    const [rows] = await pool.query('SELECT * FROM productos WHERE codigo = ?', [codigo]);
    return rows[0];
};

const addProductIfNotExists = async (codigo, nombre, categoria, stock, precio) => {
    const [existingProduct] = await pool.query('SELECT id FROM productos WHERE codigo = ?', [codigo]);

    if (existingProduct.length > 0) {
        console.log("Codigo existente")
        throw new Error('El código del producto ya existe');
    }

    const [result] = await pool.query(
        'INSERT INTO productos (codigo, nombre, categoria, stock, precio) VALUES (?, ?, ?, ?, ?)',
        [codigo, nombre, categoria, stock, precio]
    );
    return result.insertId;
};

const deleteProduct = async (codigo) => {
    const [result] = await pool.query('DELETE FROM productos WHERE codigo = ?', [codigo]);
    return result.affectedRows > 0; // Retorna true si eliminó algo, false si no encontró el producto
};


module.exports = { getAllProducts, addProductIfNotExists, getProductByCode,deleteProduct };
