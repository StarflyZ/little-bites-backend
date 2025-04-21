const Stock = require('../models/stockModel');

exports.getStockLog = async (req, res) => {
  try {
    const stockLog = await Stock.getStockLog();
    res.json(stockLog);
  } catch (error) {
    console.error('Error getStockLog:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.addStock = async (req, res) => {
  try {
    const { idmenu, jumlah, tanggal_masuk } = req.body;

    if (!idmenu || !jumlah || !tanggal_masuk) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    const result = await Stock.addStock(idmenu, jumlah, tanggal_masuk);
    res.status(201).json({ message: 'Stok berhasil ditambahkan', stockId: result });
  } catch (error) {
    console.error('Error addStock:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.addStockOut = async (req, res) => {
  try {
    const { idmenu, jumlah_keluar, tanggal_keluar, alasan } = req.body;

    if (!idmenu || !jumlah_keluar || !tanggal_keluar || !alasan) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    const result = await Stock.addStockOut(idmenu, jumlah_keluar, tanggal_keluar, alasan);
    res.status(201).json({ message: 'Stok keluar berhasil ditambahkan', stockOutId: result });
  } catch (error) {
    console.error('Error addStockOut:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllStock = async (req, res) => {
  try {
    const stocks = await Stock.getAllStock();
    res.json(stocks);
  } catch (error) {
    console.error('Error getAllStock:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.getStockById(id);
    if (!stock) {
      return res.status(404).json({ error: 'Stok tidak ditemukan' });
    }
    res.json(stock);
  } catch (error) {
    console.error('Error getStockById:', error);
    res.status(500).json({ error: error.message });
  }
};




