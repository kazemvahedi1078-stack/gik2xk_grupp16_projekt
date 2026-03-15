// cartItem.js – Sequelize-modell för kopplingstabellen mellan Cart och Product.
// Representerar en rad i varukorgen med referens till vilken
// varukorg och produkt det gäller, samt antal.

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      this.belongsTo(models.Cart, { foreignKey: 'cartId' });
      this.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  CartItem.init(
    {
      cartId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
    },
    { sequelize, modelName: 'CartItem' }
  );

  return CartItem;
};
