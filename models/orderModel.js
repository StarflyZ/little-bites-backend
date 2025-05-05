const { execute } = require('../config/db');

const Order = {
  create: async (idcustomer, waktu_ambil, items) => {
    const created_at = new Date().toISOString().slice(0, 10);
    
    // 1. Tambahkan ke tabel pesanan
    const insertOrderQuery = 'INSERT INTO pesanan (idcustomer, created_at, waktu_ambil) VALUES (?, ?, ?)';
    const result = await execute(insertOrderQuery, [idcustomer, created_at, waktu_ambil]);
    const idpesanan = result.insertId;

    // 2. Tambahkan ke detail_pesanan + update stok
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
      ORDER BY p.created_at DESC
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
