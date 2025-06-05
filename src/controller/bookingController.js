const {Booking} = require('../models');
const {Service} = require('../models');
const {User} = require('../models');


exports.createBooking = async (req, res) => {
  try {
    const { serviceId, bookingDate } = req.body;

    const service = await Service.findByPk(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const booking = await Booking.create({
      serviceId,
      bookingDate,
      customerId: req.user.id,
      providerId: service.providerId,
    });

    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get customer bookings
exports.getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { customerId: req.user.id },
      include: ['Service']
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get provider bookings
exports.getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { providerId: req.user.id },
      include: ['Service', 'Customer']
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update booking status (provider only)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByPk(id);
    if (!booking || booking.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: 'Booking updated', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
