const express = require('express');
const router = express.Router();
const { postSale, getSale } = require('../controllers/salesController')

router.post('/ventas', postSale);
router.get('/ventas/:codigo', getSale);

module.exports = router;