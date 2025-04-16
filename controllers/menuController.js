const Menu = require('../models/menuModel');

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.getAll();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await Menu.getById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};