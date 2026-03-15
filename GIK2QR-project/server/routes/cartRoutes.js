// cartRoutes.js – Definierar API-endpoints för varukorgen.
// Delegerar affärslogik till cartService.

const express = require("express");
const router = express.Router();
const cartService = require("../services/cartService");

// POST /cart/addProduct – Lägger till en produkt i varukorgen.
// Förväntar body: { userId, productId, amount }
router.post("/addProduct", async (req, res) => {
  try {
    const { userId, productId, amount } = req.body;

    if (!userId || !productId || !amount) {
      return res.status(400).json("userId, productId, amount krävs");
    }

    const fullCart = await cartService.addProduct(userId, productId, amount);
    res.json(fullCart);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// PUT /cart/updateQuantity – Uppdaterar antal av en produkt i varukorgen.
// Förväntar body: { userId, productId, quantity }
router.put("/updateQuantity", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json("userId, productId, quantity krävs");
    }

    const item = await cartService.updateQuantity(userId, productId, quantity);
    if (!item) return res.status(404).json("Cart or CartItem not found");

    res.json(item);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET /cart/:userId – Hämtar varukorgen för en användare med produktdetaljer och totalsumma.
router.get("/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// DELETE /cart/removeProduct – Tar bort en produkt från varukorgen.
// Förväntar body: { userId, productId }
router.delete("/removeProduct", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json("userId och productId krävs");
    }

    const deleted = await cartService.removeProduct(userId, productId);
    if (!deleted) return res.status(404).json("Cart or CartItem not found");

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
