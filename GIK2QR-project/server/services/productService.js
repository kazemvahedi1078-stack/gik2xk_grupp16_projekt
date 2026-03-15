// productService.js – Hanterar affärslogik för produkter.
// Separerar databasanrop från routes för tydligare arkitektur.

const db = require("../models");

// Hämtar alla produkter inklusive reviews och beräknar snittbetyg.
async function getAll() {
  const products = await db.Product.findAll({
    include: [{ model: db.Review }]
  });

  return products.map((product) => {
    const reviews = product.Reviews;
    let avgRating = 0;

    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      avgRating = sum / reviews.length;
    }

    return {
      ...product.toJSON(),
      avgRating
    };
  });
}

// Hämtar en enskild produkt med reviews och snittbetyg.
async function getOne(id) {
  const product = await db.Product.findByPk(id, {
    include: [{ model: db.Review }]
  });

  if (!product) return null;

  const reviews = product.Reviews;
  let avgRating = 0;

  if (reviews.length > 0) {
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    avgRating = sum / reviews.length;
  }

  return {
    ...product.toJSON(),
    avgRating
  };
}

// Skapar en ny produkt med given data.
async function create(body) {
  return await db.Product.create(body);
}

// Uppdaterar en befintlig produkt. Returnerar null om produkten inte finns.
async function update(id, body) {
  const product = await db.Product.findByPk(id);
  if (!product) return null;

  await product.update(body);
  return product;
}

// Tar bort en produkt. Returnerar antal borttagna rader (0 om ej hittad).
async function remove(id) {
  return await db.Product.destroy({ where: { id } });
}

module.exports = { getAll, getOne, create, update, remove };
