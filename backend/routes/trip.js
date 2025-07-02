const express = require("express");
const router = express.Router();
const Trip = require("../modals/Trip");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, async (req, res) => {
  const { name, contact, from, destination, budget, people, date, duration } = req.body;

  if (!name || !contact || !from || !destination || !budget || !date || !duration || !people) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  const contactRegex = /^\+\d{1,4}\d{6,14}$/;
  if (!contactRegex.test(contact)) {
    return res.status(400).json({ error: "Invalid contact format. Use international format like +911234567890" });
  }

  if (Number(budget) < 1 || Number(duration) < 1) {
    return res.status(400).json({ error: "Budget and duration must be at least 1." });
  }

  try {
    const newTrip = await Trip.create({
      user: req.user._id,
      name,
      contact,
      from,
      destination,
      budget,
      people,
      date,
      duration,
    });

    return res.status(201).json(newTrip);
  } catch (error) {
    console.error("Error creating trip:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/my", authMiddleware, async (req, res) => {
  try {
    console.log("GET /trip/my called by:", req.user._id);
    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
    console.log("Trips returned:", trips.length);
    res.json(trips);
  } catch (err) {
    console.error("Error in /trip/my:", err);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});



// Update a trip
router.post("/update", authMiddleware, async (req, res) => {
  const { _id, name, from, destination, budget, duration, date } = req.body;
  try {
    const trip = await Trip.findOne({ _id, user: req.user._id });
    if (!trip) return res.status(404).json({ success: false, message: "Trip not found" });

    Object.assign(trip, { name, from, destination, budget, duration, date });
    await trip.save();

    res.json({ success: true, message: "Trip updated" });
  } catch (err) {
    console.error("Trip update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete a trip
router.post("/delete", authMiddleware, async (req, res) => {
  const { id } = req.body;
  try {
    await Trip.findOneAndDelete({ _id: id, user: req.user._id });
    res.json({ success: true, message: "Trip deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Deletion failed" });
  }
});

router.get("/trip/download", authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=MyTrips.pdf");
    doc.pipe(res);

    doc.fontSize(20).text("My Trips", { align: "center" }).moveDown();

    trips.forEach((trip, i) => {
      doc
        .fontSize(12)
        .text(`${i + 1}. From: ${trip.from} → To: ${trip.destination}`)
        .text(`   Budget: ₹${trip.budget} | Duration: ${trip.duration} days`)
        .text(`   Date: ${trip.date.toDateString()}`)
        .moveDown();
    });

    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

module.exports = router;
