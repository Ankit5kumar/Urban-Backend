module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('customer', 'provider', 'admin'),
      defaultValue: 'customer'
    }
  });

  User.associate = (models) => {     
    User.hasMany(models.Booking, { foreignKey: 'customerId' });
    User.hasMany(models.Booking, { foreignKey: 'providerId', as : 'providerBookings' });
  };

  return User;
};
