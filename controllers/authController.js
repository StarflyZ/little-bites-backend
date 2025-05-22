const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Password salah" });

    // Buat token JWT
    const token = jwt.sign(
        { id: user.iduser, role: user.role, username: user.username  }, 
        JWT_SECRET, 
        { expiresIn: "1d",}
    );

    res.json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ error: "Login gagal" });
  }
};

exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findByUsername(username);
    if (existing) {
      return res.status(400).json({ error: 'Username sudah terdaftar' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create(username, hashedPassword, 'admin');

    res.status(201).json({ message: 'Admin berhasil dibuat' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal membuat admin' });
  }
};
