const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Any authenticated user
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome!', user: req.user });
});

// Only Admin
router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

// Customer or Provider
router.get('/dashboard', authenticateToken, authorizeRoles('customer', 'provider'), (req, res) => {
  res.json({ message: `Welcome ${req.user.role}!` });
});

module.exports = router;
