require("dotenv").config(); // Load .env variables

const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const path = require("path");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
      ExtractJwt = require("passport-jwt").ExtractJwt;

const cors = require("cors");

const User = require("./modals/User");
const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trip");
const ratingRoutes = require("./routes/rating");

const app = express();

// ENV Variables
const PORT = process.env.PORT ;
const MONGO_URL = process.env.MONGO_URL;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// MongoDB connection
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Passport JWT setup
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  const userId = jwt_payload._id || jwt_payload.identifier;
  User.findOne({ _id: userId }, (err, user) => {
    if (err) return done(err, false);
    if (user) return done(null, user);
    return done(null, false);
  });
}));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World from TravelBuddy Backend!");
});

app.use("/auth", authRoutes);
app.use("/trip", tripRoutes);
app.use("/api/rating", ratingRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.BASE_URL}`);
});
