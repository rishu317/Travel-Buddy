const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  people: {
    type: Number,
    required: true,
    min: 1
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
},
  {
    timestamps: true
  });

module.exports = mongoose.model("Trip", tripSchema);
