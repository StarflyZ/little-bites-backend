const Stock = require('../models/stockModel');

exports.getAllStock = async (req, res) => {
  try {
    const stock = await Stock.getAll();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addStock = async (req, res) => {
  try {
    const result = await Stock.addStock(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};