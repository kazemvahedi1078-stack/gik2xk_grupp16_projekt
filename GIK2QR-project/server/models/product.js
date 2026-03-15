// product.js – Sequelize-modell för produkter.
// Varje produkt har namn, beskrivning, pris och en valfri bild-URL.
// Relationer: En produkt kan ha många recensioner (Review) och
// finnas i många varukorgar via CartItem.

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.hasMany(models.Review, { foreignKey: 'productId' });
      this.hasMany(models.CartItem, { foreignKey: 'productId' });
    }
  }

  Product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      imageUrl: { type: DataTypes.STRING }
    },
    { sequelize, modelName: 'Product' }
  );

  return Product;
};
