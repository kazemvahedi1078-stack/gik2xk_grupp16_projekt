// reviewRoutes.js – Definierar API-endpoints för recensioner/betyg.
// Delegerar affärslogik till reviewService.

const express = require("express");
const router = express.Router();
const reviewService = require("../services/reviewService");

// POST /reviews – Skapar en ny recension.
router.post("/", async (req, res) => {
  try {
    const review = await reviewService.create(req.body);
    res.json(review);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET /reviews/product/:productId – Hämtar alla recensioner för en produkt.
router.get("/product/:productId", async (req, res) => {
  try {
    const reviews = await reviewService.getByProduct(req.params.productId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
