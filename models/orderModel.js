const { execute } = require("../config/db");

const Order = {
  create: async (idcustomer, waktu_ambil, items) => {
    const created_at = new Date().toISOString().slice(0, 10);

    const tipe_ambil = "langsung";

    let harga_total = 0;
    for (const item of items) {
      const [menu] = await execute(
        `
        SELECT h.harga FROM menu m
        JOIN harga h ON m.idharga = h.idharga
        WHERE m.idmenu = ?
      `,
        [item.idmenu]
      );
      const harga = menu?.harga || 0;
      harga_total += harga * item.kuantitas;
    }

    const insertOrderQuery = `
      INSERT INTO pesanan (idcustomer, created_at, waktu_ambil, status, harga_total, tipe_ambil)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const status = "proses";

    const result = await execute(insertOrderQuery, [
      idcustomer,
      created_at,
      waktu_ambil,
      status,
      harga_total,
      tipe_ambil,
    ]);
    const idpesanan = result.insertId;

    for (const item of items) {
      const insertDetail = `
        INSERT INTO detail_pesanan (idpesanan, idmenu, kuantitas, created_at)
        VALUES (?, ?, ?, ?)
      `;
      await execute(insertDetail, [
        idpesanan,
        item.idmenu,
        item.kuantitas,
        created_at,
      ]);

      const updateStok =
        "UPDATE stock SET jumlah = jumlah - ? WHERE idmenu = ?";
      await execute(updateStok, [item.kuantitas, item.idmenu]);
    }

    return idpesanan;
  },
  getAll: async () => {
    const query = `
      SELECT p.idpesanan, c.nama AS nama_customer, p.created_at, p.waktu_ambil,
             p.status, p.harga_total, p.tipe_ambil
      FROM pesanan p
      JOIN customer c ON p.idcustomer = c.idcustomer
      ORDER BY p.created_at ASC
    `;
    return await execute(query);
  },
  getById: async (idpesanan) => {
    const query = `
      SELECT p.idpesanan, c.nama AS nama_customer, p.created_at, p.waktu_ambil, 
             p.status, p.harga_total, p.tipe_ambil
      FROM pesanan p
      JOIN customer c ON p.idcustomer = c.idcustomer
      WHERE p.idpesanan = ?
    `;
    const result = await execute(query, [idpesanan]);
    return result[0];
  },
  getOrderDetails: async (idpesanan) => {
    const query = `
      SELECT d.idmenu, m.nama AS menu_name, d.kuantitas, d.harga_awal
      FROM detail_pesanan d
      JOIN menu m ON d.idmenu = m.idmenu
      WHERE d.idpesanan = ?
    `;
    return await execute(query, [idpesanan]);
  },
  addPayment: async (idpesanan, jumlah_bayar, metode) => {
    const [pesanan] = await execute(
      `SELECT harga_total FROM pesanan WHERE idpesanan = ?`,
      [idpesanan]
    );
    if (!pesanan) throw new Error("Pesanan tidak ditemukan");

    const hargaTotal = pesanan.harga_total;
    const status = jumlah_bayar >= hargaTotal ? "Lunas" : "Kurang Bayar";

    await execute(
      `
    INSERT INTO pembayaran (idpesanan, jumlah_bayar, metode, status)
    VALUES (?, ?, ?, ?)
  `,
      [idpesanan, jumlah_bayar, metode, status]
    );

    await execute(
      `UPDATE pesanan SET status_pembayaran = ? WHERE idpesanan = ?`,
      [status, idpesanan]
    );

    return { status };
  },
  getBelumBayar: async () => {
    const query = `
    SELECT p.idpesanan, c.nama AS nama_customer, p.created_at, p.waktu_ambil,
           p.status, p.harga_total, p.tipe_ambil
    FROM pesanan p
    JOIN customer c ON p.idcustomer = c.idcustomer
    WHERE p.status_pembayaran = 'Belum Bayar'
    ORDER BY p.created_at ASC
  `;
    return await execute(query);
  },
  uploadBuktiBayar: async (data, filename) => {
    const { idpesanan, jumlah_bayar, metode } = data;

    await execute(
      `
    INSERT INTO pembayaran (idpesanan, jumlah_bayar, metode, bukti_bayar, status)
    VALUES (?, ?, ?, ?, 'Menunggu Verifikasi')
  `,
      [idpesanan, jumlah_bayar, metode, filename]
    );

    return true;
  },
  getPembayaranPending: async () => {
    const query = `
    SELECT pb.idpembayaran, pb.idpesanan, c.nama AS nama_customer,
           pb.jumlah_bayar, pb.metode, pb.bukti_bayar, pb.status
    FROM pembayaran pb
    JOIN pesanan p ON pb.idpesanan = p.idpesanan
    JOIN customer c ON p.idcustomer = c.idcustomer
    WHERE pb.status = 'Menunggu Verifikasi'
    ORDER BY pb.idpembayaran DESC
  `;
    return await execute(query);
  },

  setLunas: async (idpembayaran) => {
    // Update pembayaran dan pesanan jadi lunas
    await execute(
      `UPDATE pembayaran SET status = 'Lunas' WHERE idpembayaran = ?`,
      [idpembayaran]
    );

    const [row] = await execute(
      `SELECT idpesanan FROM pembayaran WHERE idpembayaran = ?`,
      [idpembayaran]
    );
    const idpesanan = row?.idpesanan;

    if (idpesanan) {
      await execute(
        `UPDATE pesanan 
        SET status_pembayaran = 'Lunas', status = 'Selesai' 
        WHERE idpesanan = ?`,
        [idpesanan]
      );
    }

    return true;
  },
};

module.exports = Order;
