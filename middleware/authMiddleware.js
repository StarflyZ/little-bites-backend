const jwt = require("jsonwebtoken");
const JWT_SECRET = "rahasia_anda"; // atau dari .env

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token diperlukan" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // menyimpan iduser dan role
    next();
  } catch {
    res.status(401).json({ error: "Token tidak valid" });
  }
}

function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Akses hanya untuk admin" });
  }
  next();
}

module.exports = {
  authMiddleware,
  adminOnly,
};
