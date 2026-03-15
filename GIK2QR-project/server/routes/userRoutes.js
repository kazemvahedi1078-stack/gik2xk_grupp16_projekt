// userRoutes.js – Definierar API-endpoints för användare.
// Delegerar affärslogik till userService.

const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

// GET /users – Hämtar alla användare.
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET /users/:id/getCart – Hämtar varukorgen för en specifik användare.
router.get("/:id/getCart", async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const cart = await userService.getUserCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET /users/:id – Hämtar en enskild användare.
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getOne(req.params.id);
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// POST /users – Skapar en ny användare.
router.post("/", async (req, res) => {
  try {
    const user = await userService.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// PUT /users/:id – Uppdaterar en befintlig användare.
router.put("/:id", async (req, res) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// DELETE /users/:id – Tar bort en användare.
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await userService.remove(req.params.id);
    if (!deleted) return res.status(404).json("User not found");
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
