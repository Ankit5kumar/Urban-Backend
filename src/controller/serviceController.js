const {Service} = require('../models');

// Create service (Provider only)
exports.createService = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const newService = await Service.create({
      name,
      description,
      price,
      category,
      providerId: req.user.id
    });

    res.status(201).json({ message: 'Service created', service: newService });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({ include: ['provider'] });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single service
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update service (only provider who created it)
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service || service.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this service' });
    }

    await service.update(req.body);
    res.json({ message: 'Service updated', service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service || service.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this service' });
    }

    await service.destroy();
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
