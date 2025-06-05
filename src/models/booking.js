module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    
    serviceId: DataTypes.INTEGER,
    bookingDate: DataTypes.DATE,
    customerId: DataTypes.INTEGER,
    providerId: DataTypes.INTEGER,
    status: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: 'customerId' });
    Booking.belongsTo(models.Service, { foreignKey: 'serviceId' });
  };

  return Booking;
};
 