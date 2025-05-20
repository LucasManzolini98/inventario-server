const express = require('express');
const { fetchAllCategories} = require('../controllers/categoriesController')
const router = express.Router();

router.get('/categorias',fetchAllCategories)

module.exports = router;