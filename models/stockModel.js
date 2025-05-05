const { execute } = require('../config/db');

const Stock = {
  getStockLog: async () => {
    const query = `
      SELECT sm.idstock_masuk, sm.jumlah_masuk, sm.tanggal_masuk, 
             sk.idstock_keluar, sk.jumlah_keluar, sk.tanggal_keluar, sk.alasan
      FROM stock_masuk sm
      LEFT JOIN stock_keluar sk ON sm.idstock_masuk = sk.idstock_keluar
      ORDER BY sm.tanggal_masuk DESC, sk.tanggal_keluar DESC;
    `;
    return await execute(query); 
  }
  ,
  addStock: async (idmenu, jumlah, tanggal_masuk) => {
    const queryStockMasuk = 'INSERT INTO stock_masuk (jumlah_masuk, tanggal_masuk) VALUES (?, ?)';
    const resultStockMasuk = await execute(queryStockMasuk, [jumlah, tanggal_masuk]);
    const idstock_masuk = resultStockMasuk.insertId;

    const queryStock = 'INSERT INTO stock (idmenu, jumlah, idstock_masuk, idstock_keluar) VALUES (?, ?, ?, NULL)';
    await execute(queryStock, [idmenu, jumlah, idstock_masuk]);

    return idstock_masuk;
  }
  ,
  addStockOut: async (idmenu, jumlah_keluar, tanggal_keluar, alasan) => {
    // 1. Tambah stok keluar ke tabel stock_keluar
    const queryStockKeluar = 'INSERT INTO stock_keluar (jumlah_keluar, tanggal_keluar, alasan) VALUES (?, ?, ?)';
    const resultStockKeluar = await execute(queryStockKeluar, [jumlah_keluar, tanggal_keluar, alasan]);
    const idstock_keluar = resultStockKeluar.insertId;

    // 2. Kurangi stok di tabel stock
    const queryStock = 'UPDATE stock SET jumlah = jumlah - ? WHERE idmenu = ?';
    await execute(queryStock, [jumlah_keluar, idmenu]);

    return idstock_keluar;
  }
  ,
  getAllStock: async () => {
    const query = `
      SELECT s.idstock, m.nama AS menu_name, s.jumlah, sm.tanggal_masuk, sk.tanggal_keluar
      FROM stock s
      JOIN menu m ON s.idmenu = m.idmenu
      LEFT JOIN stock_masuk sm ON s.idstock_masuk = sm.idstock_masuk
      LEFT JOIN stock_keluar sk ON s.idstock_keluar = sk.idstock_keluar
      ORDER BY m.nama;
    `;
    return await execute(query);
  }
  ,
  getStockById: async (idmenu) => {
    const query = `
      SELECT s.idstock, m.nama AS menu_name, s.jumlah, sm.tanggal_masuk, sk.tanggal_keluar
      FROM stock s
      JOIN menu m ON s.idmenu = m.idmenu
      LEFT JOIN stock_masuk sm ON s.idstock_masuk = sm.idstock_masuk
      LEFT JOIN stock_keluar sk ON s.idstock_keluar = sk.idstock_keluar
      WHERE s.idmenu = ?
      ORDER BY sm.tanggal_masuk DESC, sk.tanggal_keluar DESC;
    `;
    return await execute(query, [idmenu]);
  }
};

module.exports = Stock;
