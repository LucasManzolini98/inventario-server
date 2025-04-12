const express = require('express');
const { fetchAllProducts, postProduct ,fetchProductByCode, deleteProductByCode } = require('../controllers/productsController');
const router = express.Router();

router.get('/productos', fetchAllProducts);
router.get('/productos/:codigo', fetchProductByCode);
router.post('/productos', postProduct);
router.delete('/productos/:codigo', deleteProductByCode);
module.exports = router;