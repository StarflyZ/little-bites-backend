const Report = require("../models/reportModel")

exports.getMonthlyReport = async (req, res) => {
  try {
    const report = await Report.getMonthlySales()
    res.json(report)
  } catch (error) {
    console.error("Error getMonthlyReport:", error)
    res.status(500).json({ error: error.message })
  }
}

exports.getCustomerBill = async (req, res) => {
  try {
    const { idcustomer } = req.params
    const bill = await Report.getCustomerBill(idcustomer)
    res.json(bill)
  } catch (error) {
    console.error("Error getCustomerBill:", error)
    res.status(500).json({ error: error.message })
  }
}

exports.getPopularMenu = async (req, res) => {
  try {
    const popularMenu = await Report.getPopularMenu()
    res.json(popularMenu)
  } catch (error) {
    console.error("Error getPopularMenu:", error)
    res.status(500).json({ error: error.message })
  }
}

exports.getTotalCustomers = async (req, res) => {
  try {
    const result = await Report.getTotalCustomers()
    res.json(result)
  } catch (error) {
    console.error("Error getTotalCustomers:", error)
    res.status(500).json({ error: error.message })
  }
}

exports.getTotalOrders = async (req, res) => {
  try {
    const result = await Report.getTotalOrders();
    res.json(result[0]); 
  } catch (error) {
    console.error('Gagal mengambil total orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTotalRevenue = async (req, res) => {
  try {
    const result = await Report.getTotalRevenue();
    res.json(result[0]);
  } catch (error) {
    console.error('Gagal mengambil total penjualan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


