// cart.js – Sequelize-modell för varukorgar.
// Varje varukorg tillhör en användare och kan innehålla
// flera produkter via CartItem (många-till-många via kopplingstabell).

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.hasMany(models.CartItem, { foreignKey: 'cartId' });
    }
  }

  Cart.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    { sequelize, modelName: 'Cart' }
  );

  return Cart;
};
