const { execute } = require('../config/db');

const User = {
  findByUsername: async (username) => {
    const result = await execute(`SELECT * FROM users WHERE username = ?`, [username]);
    return result[0]; // 1 user
  },
  create: async (username, hashedPassword, role = 'admin') => {
    await execute(
      `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
      [username, hashedPassword, role]
    );
    return true;
  }
};

module.exports = User;
