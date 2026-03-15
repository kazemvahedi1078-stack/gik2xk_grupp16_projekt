// userService.js – Hanterar affärslogik för användare.

const db = require("../models");
const cartService = require("./cartService");

// Hämtar alla användare.
async function getAll() {
  return await db.User.findAll();
}

// Hämtar en enskild användare via id. Returnerar null om ej hittad.
async function getOne(id) {
  return await db.User.findByPk(id);
}

// Skapar en ny användare.
async function create(body) {
  return await db.User.create(body);
}

// Uppdaterar en befintlig användare. Returnerar null om ej hittad.
async function update(id, body) {
  const user = await db.User.findByPk(id);
  if (!user) return null;

  await user.update(body);
  return user;
}

// Tar bort en användare. Returnerar antal borttagna rader.
async function remove(id) {
  return await db.User.destroy({ where: { id } });
}

// Hämtar varukorgen för en specifik användare via cartService.
async function getUserCart(userId) {
  return await cartService.getCart(userId);
}

module.exports = { getAll, getOne, create, update, remove, getUserCart };
