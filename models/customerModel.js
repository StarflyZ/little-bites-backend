const { execute } = require('../config/db');

const Customer = {
  create: async (nama, pengirim, jenis_pesanan, tipe_ambil) => {
    const insertQuery = `
      INSERT INTO customer (nama, pengirim, jenis_pesanan)
      VALUES (?, ?, ?)
    `;

    const result = await execute(insertQuery, [nama, pengirim, jenis_pesanan, tipe_ambil]);
    return result.insertId; 
  },

  getAll: async () => {
    const query = `
      SELECT idcustomer, nama, pengirim, jenis_pesanan, tipe_ambil
      FROM customer
    `;
    return await execute(query);
  }
};

module.exports = Customer;
