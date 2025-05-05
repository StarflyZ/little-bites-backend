const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController.js');

router.get('/', stockController.getAllStock);
router.post('/add', stockController.addStock);
router.post('/out', stockController.addStockOut);
router.get('/log', stockController.getStockLog);
router.get('/:id', stockController.getStockById); 

module.exports = router;