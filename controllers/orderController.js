const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { idcustomer, waktu_ambil, items } = req.body;

    if (!idcustomer || !waktu_ambil || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    const result = await Order.create(idcustomer, waktu_ambil, items);
    res.status(201).json({ message: 'Pesanan berhasil dibuat', orderId: result });
  } catch (error) {
    console.error('Error createOrder:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    console.error('Error getAllOrders:', error);
    res.status(500).json({ error: error.message });
  }
};

