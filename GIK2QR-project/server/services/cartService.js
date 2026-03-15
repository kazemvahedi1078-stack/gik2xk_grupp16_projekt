// cartService.js – Hanterar affärslogik för varukorgen.
// Ansvarar för att lägga till, uppdatera, hämta och ta bort produkter i varukorgen.

const db = require("../models");

// Lägger till en produkt i varukorgen.
// Skapar varukorgen om den inte finns (findOrCreate).
// Om produkten redan finns i korgen uppdateras antalet istället.
async function addProduct(userId, productId, amount) {
  const [cart] = await db.Cart.findOrCreate({ where: { userId } });

  const [item, created] = await db.CartItem.findOrCreate({
    where: { cartId: cart.id, productId },
    defaults: { quantity: amount }
  });

  if (!created) {
    item.quantity += amount;
    await item.save();
  }

  return await getCart(userId);
}

// Uppdaterar antalet av en specifik produkt i varukorgen.
async function updateQuantity(userId, productId, quantity) {
  const cart = await db.Cart.findOne({
    where: { userId },
    order: [["createdAt", "DESC"]]
  });

  if (!cart) return null;

  const item = await db.CartItem.findOne({
    where: { cartId: cart.id, productId }
  });

  if (!item) return null;

  item.quantity = quantity;
  await item.save();
  return item;
}

// Hämtar varukorgen för en användare med produktdetaljer, pris och totalsumma.
async function getCart(userId) {
  const cart = await db.Cart.findOne({
    where: { userId },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.CartItem,
        include: [{ model: db.Product }]
      }
    ]
  });

  if (!cart) return { items: [], total: 0 };

  // Filtrera bort poster där produkten inte längre finns i databasen
  const validCartItems = cart.CartItems.filter((ci) => ci.Product);

  const items = validCartItems.map((ci) => ({
    productId: ci.productId,
    name: ci.Product.name,
    price: ci.Product.price,
    quantity: ci.quantity,
    sum: ci.Product.price * ci.quantity
  }));

  const total = items.reduce((acc, item) => acc + item.sum, 0);

  return {
    cartId: cart.id,
    userId: cart.userId,
    items,
    total
  };
}

// Tar bort en produkt från varukorgen. Returnerar antal borttagna rader.
async function removeProduct(userId, productId) {
  const cart = await db.Cart.findOne({
    where: { userId },
    order: [["createdAt", "DESC"]]
  });

  if (!cart) return null;

  const deleted = await db.CartItem.destroy({
    where: { cartId: cart.id, productId }
  });

  return deleted;
}

module.exports = { addProduct, updateQuantity, getCart, removeProduct };
