const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Customer routes
router.post('/', authenticateToken, authorizeRoles('customer'), bookingController.createBooking);
router.get('/my-bookings', authenticateToken, authorizeRoles('customer'), bookingController.getCustomerBookings);

// Provider routes
router.get('/provider-bookings', authenticateToken, authorizeRoles('provider'), bookingController.getProviderBookings);
router.put('/:id/status', authenticateToken, authorizeRoles('provider'), bookingController.updateBookingStatus);

module.exports = router;
