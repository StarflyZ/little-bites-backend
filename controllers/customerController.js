const Customer = require("../models/customerModel");

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
    const { nama, pengirim, jenis_pesanan } = req.body;

    console.log("nama:", nama);
    console.log("pengirim:", pengirim);
    console.log("jenis_pesanan:", jenis_pesanan);

    // Validasi input
    if (!nama?.trim() || !pengirim?.trim() || !jenis_pesanan?.trim()) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    // Debug body
    console.log("Body yang diterima:", req.body);

    // Simpan ke DB
    const idcustomer = await Customer.create(nama, pengirim, jenis_pesanan);
    res
      .status(201)
      .json({ message: "Customer berhasil ditambahkan", idcustomer });
  } catch (error) {
    console.error("Gagal membuat customer:", error);
    res
      .status(400)
      .json({
        error: error.message || "Terjadi kesalahan saat menambahkan customer",
      });
  }
};
