const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  try {
    const {
      idcustomer,
      waktu_ambil,
      tipe_ambil,
      items,
      nama_penerima,
      telepon_penerima,
      alamat_kirim,
      tanggal_kirim,
      jam_kirim,
      kartu_kepada,
      kartu_ucapan,
      kartu_dari,
      invoice,
    } = req.body;

    console.log("Body diterima:", req.body);

    if (
      !idcustomer ||
      !waktu_ambil ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({ error: "Data pesanan tidak lengkap" });
    }

    if (
      !idcustomer ||
      !tipe_ambil ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({ error: "Data pesanan tidak lengkap" });
    }

    // Logika gabungan waktu ambil jika kirim
    if (tipe_ambil === "kirim") {
      if (!tanggal_kirim || !jam_kirim) {
        return res
          .status(400)
          .json({
            error: "Tanggal dan jam kirim wajib diisi untuk tipe 'kirim'",
          });
      }

      // Gabungkan jadi satu datetime string: "2025-07-10T14:30"
      waktu_ambil = `${tanggal_kirim}T${jam_kirim}`;
    }

    const result = await Order.create(
      idcustomer,
      waktu_ambil,
      items,
      tipe_ambil,
      nama_penerima,
      telepon_penerima,
      alamat_kirim,
      tanggal_kirim,
      jam_kirim,
      kartu_kepada,
      kartu_ucapan,
      kartu_dari,
      invoice
    );

    res.status(201).json({
      message: "Pesanan berhasil dibuat",
      orderId: result,
    });
  } catch (error) {
    console.error("Error createOrder:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    console.error("Error getAllOrders:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.getById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Pesanan tidak ditemukan" });
    }

    const orderDetails = await Order.getOrderDetails(orderId);
    res.json({ order, orderDetails });
  } catch (error) {
    console.error("Error getOrderById:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.addPayment = async (req, res) => {
  try {
    const { idpesanan, jumlah_bayar, metode } = req.body;

    if (!idpesanan || !jumlah_bayar || !metode) {
      return res.status(400).json({ error: "Data pembayaran tidak lengkap" });
    }

    const result = await Order.addPayment(idpesanan, jumlah_bayar, metode);
    res.status(201).json({
      message: "Pembayaran berhasil diproses",
      status_pembayaran: result.status,
    });
  } catch (error) {
    console.error("Error addPayment:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUnpaidOrders = async (req, res) => {
  try {
    const orders = await Order.getBelumBayar();
    res.json(orders);
  } catch (error) {
    console.error("Error getUnpaidOrders:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.uploadBuktiBayar = async (req, res) => {
  try {
    const filename = req.file.filename;
    await Order.uploadBuktiBayar(req.body, filename);
    res.status(200).json({ message: "Bukti pembayaran berhasil diunggah" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal upload bukti pembayaran" });
  }
};

exports.getPendingPayments = async (req, res) => {
  try {
    const list = await Order.getPembayaranPending();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsLunas = async (req, res) => {
  try {
    const { idpembayaran } = req.body;
    await Order.setLunas(idpembayaran);
    res.json({ message: "Status pembayaran diperbarui menjadi Lunas" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
