const { execute } = require('../config/db');

const Stock = {
  // Mendapatkan log keluar/masuk
  getStockLog: async () => {
    const query = `
      SELECT 
        m.nama AS menu_name,
        sm.jumlah_masuk, sm.tanggal_masuk,
        sk.jumlah_keluar, sk.tanggal_keluar, sk.alasan
      FROM stock s
      JOIN menu m ON s.idmenu = m.idmenu
      LEFT JOIN stock_masuk sm ON sm.idstock = s.idstock
      LEFT JOIN stock_keluar sk ON sk.idstock = s.idstock
      ORDER BY sm.tanggal_masuk DESC, sk.tanggal_keluar DESC;
    `;
    return await execute(query);
  },

  // Menambahkan stok masuk
  addStock: async (idmenu, jumlah, tanggal_masuk) => {
    // 1. Cek apakah stok untuk menu ini sudah ada
    const [stock] = await execute(`SELECT idstock FROM stock WHERE idmenu = ?`, [idmenu]);

    let idstock;
    if (stock) {
      idstock = stock.idstock;
      // 2. Tambah jumlah di tabel stock
      await execute(`UPDATE stock SET jumlah = jumlah + ? WHERE idstock = ?`, [jumlah, idstock]);
    } else {
      // 3. Buat baris baru di tabel stock
      const result = await execute(`INSERT INTO stock (idmenu, jumlah) VALUES (?, ?)`, [idmenu, jumlah]);
      idstock = result.insertId;
    }

    // 4. Simpan ke stock_masuk
    await execute(`INSERT INTO stock_masuk (jumlah_masuk, tanggal_masuk, idstock) VALUES (?, ?, ?)`, [jumlah, tanggal_masuk, idstock]);

    return idstock;
  },

  // Menambahkan stok keluar
  addStockOut: async (idmenu, jumlah_keluar, tanggal_keluar, alasan) => {
    // 1. Ambil ID stock
    const [stock] = await execute(`SELECT idstock FROM stock WHERE idmenu = ?`, [idmenu]);
    if (!stock) throw new Error('Stok untuk menu ini tidak ditemukan.');

    const idstock = stock.idstock;

    // 2. Kurangi stok utama
    await execute(`UPDATE stock SET jumlah = jumlah - ? WHERE idstock = ?`, [jumlah_keluar, idstock]);

    // 3. Simpan ke stock_keluar
    const result = await execute(
      `INSERT INTO stock_keluar (jumlah_keluar, tanggal_keluar, alasan, idstock) VALUES (?, ?, ?, ?)`,
      [jumlah_keluar, tanggal_keluar, alasan, idstock]
    );

    return result.insertId;
  },

  // Mendapatkan seluruh stok
  getAllStock: async () => {
    const query = `
      SELECT s.idstock, m.nama AS menu_name, s.jumlah
      FROM stock s
      JOIN menu m ON s.idmenu = m.idmenu
      ORDER BY m.nama;
    `;
    return await execute(query);
  },

  // Mendapatkan stok berdasarkan idmenu
  getStockById: async (idmenu) => {
    const query = `
      SELECT s.idstock, m.nama AS menu_name, s.jumlah
      FROM stock s
      JOIN menu m ON s.idmenu = m.idmenu
      WHERE s.idmenu = ?;
    `;
    return await execute(query, [idmenu]);
  }
};

module.exports = Stock;
