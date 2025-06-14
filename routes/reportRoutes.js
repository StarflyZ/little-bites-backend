const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

router.get("/monthly", authMiddleware, adminOnly, reportController.getMonthlyReport);
router.get("/tagihan/:idcustomer", authMiddleware, adminOnly, reportController.getCustomerBill);
router.get("/popular", authMiddleware, adminOnly, reportController.getPopularMenu);
router.get("/total-customers", authMiddleware, adminOnly, reportController.getTotalCustomers);
router.get("/total-orders", authMiddleware, adminOnly, reportController.getTotalOrders);
router.get("/total-revenue", authMiddleware, adminOnly, reportController.getTotalRevenue);

module.exports = router;
