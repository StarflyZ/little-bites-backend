const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController.js');
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

router.get('/', authMiddleware, adminOnly, stockController.getAllStock);
router.post('/add', authMiddleware, adminOnly, stockController.addStock);
router.post('/out', authMiddleware, adminOnly, stockController.addStockOut);
router.get('/log', authMiddleware, adminOnly, stockController.getStockLog);
router.get('/:id', authMiddleware, adminOnly, stockController.getStockById); 

module.exports = router;