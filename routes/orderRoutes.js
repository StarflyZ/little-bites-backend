const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const orderController = require("../controllers/orderController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

// ✳️ PROTEKSI ROUTE ADMIN
router.get("/", authMiddleware, adminOnly, orderController.getAllOrders); // admin
router.get(
  "/belum-bayar",
  authMiddleware,
  adminOnly,
  orderController.getUnpaidOrders
); // admin
router.get(
  "/pembayaran/menunggu",
  authMiddleware,
  adminOnly,
  orderController.getPendingPayments
); // admin
router.post(
  "/pembayaran/set-lunas",
  authMiddleware,
  adminOnly,
  orderController.markAsLunas
); // admin

// ✳️ ROUTE PUBLIK / USER
router.post("/create", orderController.createOrder);
router.post("/payment", orderController.addPayment);
router.get("/:id", orderController.getOrderById);
router.post(
  "/upload-bukti",
  upload.single("bukti_bayar"),
  orderController.uploadBuktiBayar
);

module.exports = router;
