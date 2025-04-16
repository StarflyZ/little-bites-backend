const Customer = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.getAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const idcustomer = await Customer.create(req.body);
    res.status(201).json({ idcustomer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};