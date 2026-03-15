// user.js – Sequelize-modell för användare.
// Varje användare har ett namn och en unik e-postadress.
// Relationer: En användare kan ha många recensioner (Review)
// och en varukorg (Cart).

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Review, { foreignKey: 'userId' });
      this.hasOne(models.Cart, { foreignKey: 'userId' });
    }
  }

  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    { sequelize, modelName: 'User' }
  );

  return User;
};
