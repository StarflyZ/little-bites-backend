const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuController');

router.get('/', MenuController.getAllMenuItems);
router.get('/:id', MenuController.getMenuItemById);

module.exports = router;