// routes/productosRoutes.js
const express = require('express');
const { fetchAllProducts, postProduct ,fetchProductByCode } = require('../controllers/productosController');
const router = express.Router();

router.get('/productos', fetchAllProducts);
router.get('/producto/:codigo', fetchProductByCode);
router.post('/producto', postProduct);

module.exports = router;