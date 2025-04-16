const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {
  pool,
  execute: async (query, params = []) => {
    try {
      const [results] = await pool.execute(query, params);
      return results;
    } catch (error) {
      console.error('Query Error:', error);
      throw error;
    }
  }
};
