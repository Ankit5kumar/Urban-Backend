const express = require('express');
const router = express.Router();
const serviceController = require('../controller/serviceController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Public
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

// Provider-only
router.post('/', authenticateToken, authorizeRoles('provider'), serviceController.createService);
router.put('/:id', authenticateToken, authorizeRoles('provider'), serviceController.updateService);
router.delete('/:id', authenticateToken, authorizeRoles('provider'), serviceController.deleteService);

module.exports = router;
