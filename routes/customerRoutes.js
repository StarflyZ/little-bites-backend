const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

router.get('/', CustomerController.getAllCustomers);
router.post('/create', CustomerController.createCustomer);

module.exports = router;