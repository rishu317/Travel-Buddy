const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // ✅ New fields below
  dp: {
    type: String, // will store image path or URL
    default: "",  // fallback to default image on frontend
  },
  bio: {
    type: String,
    default: "",
  },
  externalLink: {
    type: String,
    default: "",
  },
}, {
  timestamps: true, // optional: adds createdAt, updatedAt
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
