const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/monthly', reportController.getMonthlyReport);
router.get('/tagihan/:idcustomer', reportController.getCustomerBill);
router.get('/popular', reportController.getPopularMenu);
router.get('/total-customers', reportController.getTotalCustomers);
router.get('/total-orders', reportController.getTotalOrders);
router.get('/total-revenue', reportController.getTotalRevenue);




module.exports = router;