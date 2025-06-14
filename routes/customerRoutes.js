const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customerController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

router.get("/", CustomerController.getAllCustomers);
router.post("/create", CustomerController.createCustomer);

module.exports = router;
