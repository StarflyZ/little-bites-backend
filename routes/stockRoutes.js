const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stockController');

router.get('/', StockController.getAllStock);
router.post('/', StockController.addStock);

module.exports = router;