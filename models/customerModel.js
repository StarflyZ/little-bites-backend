const db = require('../config/db');

class Customer {
  static async getAll() {
    await db.poolConnect;
    const request = db.pool.request();
    const result = await request.query('SELECT * FROM customer');
    return result.recordset;
  }

  static async create(customerData) {
    await db.poolConnect;
    const request = db.pool.request();
    const result = await request
      .input('nama', db.sql.VarChar, customerData.nama)
      .input('pengirim', db.sql.VarChar, customerData.pengirim)
      .input('jenis_pesanan', db.sql.VarChar, customerData.jenis_pesanan)
      .query('INSERT INTO customer (nama, pengirim, jenis_pesanan) VALUES (@nama, @pengirim, @jenis_pesanan); SELECT SCOPE_IDENTITY() AS idcustomer');
    
    return result.recordset[0].idcustomer;
  }
}

module.exports = Customer;