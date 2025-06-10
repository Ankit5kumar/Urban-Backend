const {Service} = require('../models');
const fs = require('fs');
const path = require('path');
// Create service (Provider only)
exports.createService = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const newService = await Service.create({
      name,
      description,
      price,
      category,
      providerId: req.user.id, 
      image:req.file.filename
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
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (service.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this service' });
    }

  console.log("service.image",service.image);
  console.log("req.file",req.file.filename);

    if (req.file) {
      
      if (service.image) {
        // const oldImagePath = path.join(__dirname, '../uploads', service.image);
        const oldImagePath = path.join(process.cwd(), 'uploads', service.image);
        
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // Set new image filename
      req.body.image = req.file.filename;
    }

    // Update service with new data (including image if uploaded)
    await service.update(req.body);

    res.json({ message: 'Service updated', service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ...existing code...

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


