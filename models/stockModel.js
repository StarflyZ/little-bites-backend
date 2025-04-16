const db = require('../config/db');

class Stock {
  static async getAll() {
    await db.poolConnect;
    const request = db.pool.request();
    const result = await request.query(`
      SELECT s.*, m.nama AS nama_menu, 
             sm.jumlah_masuk, sm.tanggal_masuk,
             sk.jumlah_keluar, sk.tanggal_keluar, sk.alasan
      FROM stock s
      JOIN menu m ON s.idmenu = m.idmenu
      JOIN stock_masuk sm ON s.idstock_masuk = sm.idstock_masuk
      LEFT JOIN stock_keluar sk ON s.idstock_keluar = sk.idstock_keluar
    `);
    return result.recordset;
  }

  static async addStock(stockData) {
    await db.poolConnect;
    const transaction = new db.sql.Transaction(db.pool);
    await transaction.begin();

    try {
      const request = new db.sql.Request(transaction);
      
      // 1. Insert stock masuk
      const stockMasukResult = await request
        .input('jumlah_masuk', db.sql.Int, stockData.jumlah)
        .input('tanggal_masuk', db.sql.DateTime, new Date())
        .query(`
          INSERT INTO stock_masuk (jumlah_masuk, tanggal_masuk)
          VALUES (@jumlah_masuk, @tanggal_masuk);
          SELECT SCOPE_IDENTITY() AS idstock_masuk
        `);
      
      const idstock_masuk = stockMasukResult.recordset[0].idstock_masuk;

      // 2. Insert/Update stock
      await request
        .input('idmenu', db.sql.Int, stockData.idmenu)
        .input('jumlah', db.sql.Int, stockData.jumlah)
        .input('idstock_masuk', db.sql.Int, idstock_masuk)
        .query(`
          IF EXISTS (SELECT 1 FROM stock WHERE idmenu = @idmenu)
            UPDATE stock 
            SET jumlah = jumlah + @jumlah, 
                idstock_masuk = @idstock_masuk 
            WHERE idmenu = @idmenu;
          ELSE
            INSERT INTO stock (idmenu, jumlah, idstock_masuk, idstock_keluar)
            VALUES (@idmenu, @jumlah, @idstock_masuk, NULL);
        `);

      await transaction.commit();
      return { success: true };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = Stock;