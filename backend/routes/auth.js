const express = require("express");
const router = express.Router();
const User = require("../modals/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ======================== Register =========================
router.post("/register", async (req, res) => {
  const { userId, email, password, firstName, lastName } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(403).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    userId,
    email,
    password: hashedPassword,
    firstName,
    lastName,
    dp: "", // default dp field
  });

  const token = await getToken(email, newUser);
  const userToReturn = { ...newUser.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

// ===================== Email Validation ====================
router.post("/validate-email", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(200).json({ valid: true });
    return res.status(404).json({ valid: false, message: "Email not found" });
  } catch (err) {
    return res.status(500).json({ valid: false, message: "Server error" });
  }
});

// ========================= Login ===========================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(403).json({ err: "Invalid credentials" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(403).json({ err: "Invalid credentials" });

  const token = await getToken(email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

// ================== Multer Setup for DP ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/dp";
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1000)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ================== Get Authenticated Profile ==============
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch user" });
  }
});

// ==================== Update Profile =======================
router.post("/update", authMiddleware, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userId: newUserId,
      bio,
      externalLink,
      dp,
      password,
    } = req.body;

    const updateFields = {
      firstName,
      lastName,
      userId: newUserId,
      bio,
      externalLink,
      dp,
    };

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    );

    return res.json({ success: true, user: updatedUser });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to update profile." });
  }
});

// ====================== Upload DP ==========================
router.post("/upload-dp", authMiddleware, upload.single("dp"), async (req, res) => {
  try {
    const imagePath = `http://localhost:8080/uploads/dp/${req.file.filename}`;
    const user = await User.findById(req.user._id);
    user.dp = imagePath;
    await user.save();
    res.status(200).json({ success: true, dp: user.dp });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload DP" });
  }
});

// ====================== Delete DP ==========================
router.post("/delete-dp", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.dp) {
      const localPath = user.dp.replace("http://localhost:8080", ""); // remove domain
      const absolutePath = path.join(__dirname, "../..", localPath);

      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }

      user.dp = "";
      await user.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete DP" });
  }
});

module.exports = router;
