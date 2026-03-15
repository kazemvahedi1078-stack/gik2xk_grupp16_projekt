// reviewService.js – Hanterar affärslogik för recensioner/betyg.

const db = require("../models");

// Skapar en ny recension kopplad till en produkt och användare.
async function create(body) {
  return await db.Review.create(body);
}

// Hämtar alla recensioner för en specifik produkt.
async function getByProduct(productId) {
  return await db.Review.findAll({
    where: { productId }
  });
}

module.exports = { create, getByProduct };
