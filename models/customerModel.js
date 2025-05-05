const { execute } = require('../config/db');

const Customer = {
  create: async (nama, pengirim, jenis_pesanan) => {
    const insertQuery = `
      INSERT INTO customer (nama, pengirim, jenis_pesanan)
      VALUES (?, ?, ?)
    `;

    const result = await execute(insertQuery, [nama, pengirim, jenis_pesanan]);
    return result.insertId; // return idcustomer
  },

  getAll: async () => {
    const query = `
      SELECT idcustomer, nama, pengirim, jenis_pesanan
      FROM customer
    `;
    return await execute(query);
  }
};

module.exports = Customer;
