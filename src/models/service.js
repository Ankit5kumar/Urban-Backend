module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    category: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    image:DataTypes.STRING,
    providerId: DataTypes.INTEGER
  });

  Service.associate = (models) => {
    Service.belongsTo(models.User, { foreignKey: 'providerId', as: 'provider' });
    Service.hasMany(models.Booking, { foreignKey: 'serviceId' });
  };

  return Service;
};
