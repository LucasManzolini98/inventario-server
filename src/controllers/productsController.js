const { getAllProducts, addProductIfNotExists, getProductByCode,deleteProduct } = require('../models/Product');

const fetchAllProducts = async (req, res) => {
    console.log('Fetching all products..');
    console.log(new Date().toLocaleTimeString());
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
    console.log(req.body);
    const { codigo, nombre, categoria, stock, precio } = req.body;

    try {
        const insertId = await addProductIfNotExists(codigo, nombre, categoria, stock, precio);
        res.status(201).json({ message: 'Producto agregado', insertId });
    } catch (error) {
        console.log("codigo existenteeee")
        res.status(400).json({ error: error.message });
    }
};

const deleteProductByCode = async (req, res) => {
    const { codigo } = req.params;
    console.log("----------------------------");
    console.log(new Date().toLocaleTimeString());
    console.log("Intentando borrar producto con codigo: " + codigo);
    
    try {
        const wasDeleted = await deleteProduct(codigo);
        if (!wasDeleted) {
            console.log("error con el codigo:"+ codigo)
            return res.status(405).json({ error: `Producto con código ${codigo} no encontrado` });
        }
        console.log("Borrado con éxito, devolviendo respuesta...")
        console.log("----------------------------");
        res.status(204).send(); // No devuelve contenido
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = { fetchAllProducts, postProduct, fetchProductByCode, deleteProductByCode };
