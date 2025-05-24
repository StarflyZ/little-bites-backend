const Stock = require('../models/stockModel');

// Ambil semua stok (jumlah per menu)
exports.getAllStock = async (req, res) => {
  try {
    const stocks = await Stock.getAllStock();
    res.json(stocks);
  } catch (error) {
    console.error('Error getAllStock:', error);
    res.status(500).json({ error: error.message });
  }
};

// Ambil stok berdasarkan idmenu
exports.getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.getStockById(id);
    if (!stock || stock.length === 0) {
      return res.status(404).json({ error: 'Stok tidak ditemukan' });
    }
    res.json(stock);
  } catch (error) {
    console.error('Error getStockById:', error);
    res.status(500).json({ error: error.message });
  }
};

// Tambah stok masuk
exports.addStock = async (req, res) => {
  try {
    const { idmenu, jumlah, tanggal_masuk } = req.body;

    if (!idmenu || !jumlah || !tanggal_masuk) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    const stockId = await Stock.addStock(idmenu, jumlah, tanggal_masuk);
    res.status(201).json({ message: 'Stok masuk berhasil ditambahkan', stockId });
  } catch (error) {
    console.error('Error addStock:', error);
    res.status(500).json({ error: error.message });
  }
};

// Tambah stok keluar
exports.addStockOut = async (req, res) => {
  try {
    const { idmenu, jumlah_keluar, tanggal_keluar, alasan } = req.body;

    if (!idmenu || !jumlah_keluar || !tanggal_keluar || !alasan) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    const stockOutId = await Stock.addStockOut(idmenu, jumlah_keluar, tanggal_keluar, alasan);
    res.status(201).json({ message: 'Stok keluar berhasil ditambahkan', stockOutId });
  } catch (error) {
    console.error('Error addStockOut:', error);
    res.status(500).json({ error: error.message });
  }
};

// Ambil log histori stok masuk dan keluar
exports.getStockLog = async (req, res) => {
  try {
    const stockLog = await Stock.getStockLog();
    res.json(stockLog);
  } catch (error) {
    console.error('Error getStockLog:', error);
    res.status(500).json({ error: error.message });
  }
};