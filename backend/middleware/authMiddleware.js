require("dotenv").config(); // Optional here if already loaded globally

const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const authMiddleware = async (req, res, next) => {
  const rawHeader = req.headers.authorization;
  console.log("AUTH HEADER:", rawHeader);

  if (!rawHeader) return res.status(401).json({ error: "No token provided" });

  const token = rawHeader.split(" ")[1] || rawHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).json({ error: "Invalid user" });

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err.message);
    return res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
