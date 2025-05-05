const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/monthly', reportController.getMonthlyReport);
router.get('/tagihan/:idcustomer', reportController.getCustomerBill);
router.get('/popular', reportController.getPopularMenu);


module.exports = router;