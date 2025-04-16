const { execute } = require('../config/db');

class Menu {
  static async getAll() {
    const query = `
      SELECT m.*, c.nama_categori, h.harga 
      FROM menu m
      JOIN categori c ON m.idcategori = c.idcategori
      JOIN harga h ON m.idharga = h.idharga
    `;
    return await execute(query);
  }

  static async getById(id) {
    const query = 'SELECT * FROM menu WHERE idmenu = ?';
    return (await execute(query, [id]))[0];
  }
}

module.exports = Menu;
