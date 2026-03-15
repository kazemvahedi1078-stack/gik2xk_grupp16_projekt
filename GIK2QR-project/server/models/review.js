// review.js – Sequelize-modell för recensioner/betyg.
// Varje recension har ett betyg (1-5), en valfri kommentar,
// och är kopplad till en specifik produkt och användare.

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'productId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Review.init(
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
      },
      comment: { type: DataTypes.TEXT },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    { sequelize, modelName: 'Review' }
  );

  return Review;
};
