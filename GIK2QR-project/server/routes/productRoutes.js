// productRoutes.js – Definierar API-endpoints för produkter.
// Delegerar affärslogik till productService.

const express = require("express");
const router = express.Router();
const productService = require("../services/productService");

// GET /products – Hämtar alla produkter med reviews och snittbetyg.
router.get("/", async (req, res) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET /products/:id – Hämtar en enskild produkt med reviews och snittbetyg.
router.get("/:id", async (req, res) => {
  try {
    const product = await productService.getOne(req.params.id);
    if (!product) return res.status(404).json("Product not found");
    res.json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// POST /products – Skapar en ny produkt.
router.post("/", async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// PUT /products/:id – Uppdaterar en befintlig produkt.
router.put("/:id", async (req, res) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    if (!product) return res.status(404).json("Product not found");
    res.json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// DELETE /products/:id – Tar bort en produkt.
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await productService.remove(req.params.id);
    if (!deleted) return res.status(404).json("Product not found");
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
