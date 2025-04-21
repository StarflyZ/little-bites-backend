const { execute } = require('../config/db');

const Report = {
  getMonthlySales: async () => {
    const query = `
      SELECT 
        MONTH(p.created_at) AS month,
        YEAR(p.created_at) AS year,
        SUM(p.harga_total) AS total_sales,
        m.nama AS menu_name,
        SUM(d.kuantitas) AS total_quantity
      FROM pesanan p
      JOIN detail_pesanan d ON p.idpesanan = d.idpesanan
      JOIN menu m ON d.idmenu = m.idmenu
      GROUP BY YEAR(p.created_at), MONTH(p.created_at), m.idmenu
      ORDER BY total_sales DESC;
    `;
    return await execute(query);
  }
  ,
  getCustomerBill: async (idcustomer) => {
    const query = `
      SELECT 
        p.idpesanan, p.created_at, p.waktu_ambil, p.harga_total,
        GROUP_CONCAT(CONCAT(m.nama, ' x', d.kuantitas) SEPARATOR ', ') AS items
      FROM pesanan p
      JOIN detail_pesanan d ON p.idpesanan = d.idpesanan
      JOIN menu m ON d.idmenu = m.idmenu
      WHERE p.idcustomer = ?
      GROUP BY p.idpesanan
    `;
    return await execute(query, [idcustomer]);
  }
  ,
  getPopularMenu: async () => {
    const query = `
      SELECT m.nama AS menu_name, SUM(d.kuantitas) AS total_quantity
      FROM detail_pesanan d
      JOIN menu m ON d.idmenu = m.idmenu
      GROUP BY m.idmenu
      ORDER BY total_quantity DESC
      LIMIT 5;
    `;
    return await execute(query);
  }
};

module.exports = Report;
