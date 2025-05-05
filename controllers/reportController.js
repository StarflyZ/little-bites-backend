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
