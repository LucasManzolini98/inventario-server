const {getAllCategories} = require('../models/Categories');

const fetchAllCategories = async (req, res) => {
    console.log('Fetching all categories..');
    console.log(new Date().toLocaleTimeString());
    try {
        const categorias = await getAllCategories();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categorias' });
    }
};
module.exports = {fetchAllCategories}