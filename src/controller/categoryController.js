const { Category } = require('../models');

// Create Category (Admin Only)
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json({ message: 'Category created', category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Categories (Public)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Category (Admin Only)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name;
    await category.save();

    res.json({ message: 'Category updated', category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Category (Admin Only)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
