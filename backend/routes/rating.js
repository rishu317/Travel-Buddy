const express = require("express");
const router = express.Router();
const Rating = require("../modals/Rating");

// POST: submit a rating
router.post("/", async (req, res) => {
  const { value } = req.body;
  if (!value || value < 1 || value > 5) {
    return res.status(400).json({ error: "Invalid rating" });
  }

  try {
    const rating = new Rating({ value });
    await rating.save();
    return res.json({ message: "Rating submitted", rating });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to save rating" });
  }
});

// GET: fetch average & total
router.get("/", async (req, res) => {
  try {
    const ratings = await Rating.find();
    const total = ratings.length;
    const average =
      total > 0
        ? (ratings.reduce((sum, r) => sum + r.value, 0) / total).toFixed(1)
        : 0;

    res.json({ average, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
});

module.exports = router;
