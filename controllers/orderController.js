const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { idcustomer, waktu_ambil, items } = req.body;
    console.log('Body diterima:', req.body);
    if (!idcustomer || !waktu_ambil || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Data pesanan tidak lengkap' });
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

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.getById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }

    const orderDetails = await Order.getOrderDetails(orderId);
    res.json({ order, orderDetails });
  } catch (error) {
    console.error('Error getOrderById:', error);
    res.status(500).json({ error: error.message });
  }
};

