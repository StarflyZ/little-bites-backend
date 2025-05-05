const { execute } = require('../config/db');

const Order = {
  create: async (idcustomer, waktu_ambil, items) => {
    const created_at = new Date().toISOString().slice(0, 10);

    // 🔍 Ambil tipe_ambil dari customer
    const [customer] = await execute(
      'SELECT tipe_ambil FROM customer WHERE idcustomer = ?',
      [idcustomer]
    );
    const tipe_ambil = customer?.tipe_ambil || 'langsung';

    // 💰 Hitung harga_total
    let harga_total = 0;
    for (const item of items) {
      const [menu] = await execute(`
        SELECT h.harga FROM menu m
        JOIN harga h ON m.idharga = h.idharga
        WHERE m.idmenu = ?
      `, [item.idmenu]);
      const harga = menu?.harga || 0;
      harga_total += harga * item.kuantitas;
    }

    // 📝 Tambahkan ke pesanan
    const insertOrderQuery = `
      INSERT INTO pesanan (idcustomer, created_at, waktu_ambil, status, harga_total, tipe_ambil)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const status = 'proses';
    const result = await execute(insertOrderQuery, [
      idcustomer,
      created_at,
      waktu_ambil,
      status,
      harga_total,
      tipe_ambil
    ]);
    const idpesanan = result.insertId;

    // Tambahkan ke detail_pesanan dan update stok
    for (const item of items) {
      const insertDetail = `
        INSERT INTO detail_pesanan (idpesanan, idmenu, kuantitas, created_at)
        VALUES (?, ?, ?, ?)
      `;
      await execute(insertDetail, [idpesanan, item.idmenu, item.kuantitas, created_at]);

      const updateStok = 'UPDATE stock SET jumlah = jumlah - ? WHERE idmenu = ?';
      await execute(updateStok, [item.kuantitas, item.idmenu]);
    }

    return idpesanan;
  }
  ,
  getAll: async () => {
    const query = `
      SELECT p.idpesanan, c.nama AS nama_customer, p.created_at, p.waktu_ambil,
             p.status, p.harga_total, p.tipe_ambil
      FROM pesanan p
      JOIN customer c ON p.idcustomer = c.idcustomer
      ORDER BY p.created_at ASC
    `;
    return await execute(query);
  }
  ,
  getById: async (idpesanan) => {
    const query = `
      SELECT p.idpesanan, c.nama AS nama_customer, p.created_at, p.waktu_ambil, 
             p.status, p.harga_total, p.tipe_ambil
      FROM pesanan p
      JOIN customer c ON p.idcustomer = c.idcustomer
      WHERE p.idpesanan = ?
    `;
    const result = await execute(query, [idpesanan]);
    return result[0]; // Ambil satu pesanan
  }
  ,
  getOrderDetails: async (idpesanan) => {
    const query = `
      SELECT d.idmenu, m.nama AS menu_name, d.kuantitas, d.harga_awal
      FROM detail_pesanan d
      JOIN menu m ON d.idmenu = m.idmenu
      WHERE d.idpesanan = ?
    `;
    return await execute(query, [idpesanan]);
  }
};

module.exports = Order;
