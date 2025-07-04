import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaStar,
} from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080"; // adjust if needed

function Footer() {
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchRatings = async () => {
    try {
      const res = await axios.get("/api/rating");
      setAverage(res.data.average || 0);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Error fetching ratings:", err);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const submitRating = async (value) => {
    if (loading) return;
    setLoading(true);
    setUserRating(value);
    try {
      const res = await axios.post("/api/rating", { value });
      console.log("Rating submitted:", res.data);
      await fetchRatings();
    } catch (err) {
      console.error("Error submitting rating:", err);
      alert("Failed to submit rating. Please try again.");
      setUserRating(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-sky-600 to-blue-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3">TravelBuddy</h3>
          <p className="opacity-90 text-[14px]">
            Explore the world with confidence. Find your perfect destinations
            and make unforgettable memories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-yellow-300">About Us</Link>
            </li>
            <li>
              <Link to="/service" className="hover:text-yellow-300">Service & Policy</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-bold mb-3">Connect With Us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-yellow-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-300"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-300"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-300"><FaLinkedin /></a>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="text-lg font-bold mb-3">🌟 Rate Us</h4>
          <p>
            Average: <span className="font-semibold text-base">{average}</span> |{" "}
            <span className="font-semibold text-base">{total}</span> ratings
          </p>
          <div className="mt-3 flex gap-1 flex-wrap">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                disabled={loading}
                onClick={() => submitRating(star)}
                className={`text-xl transition ${
                  star <= userRating
                    ? "text-yellow-400"
                    : "text-gray-300 "
                }`}
              >
                <FaStar />
              </button>
            ))}
          </div>
          {loading && (
            <p className="text-xs text-blue-200 mt-2 animate-pulse">
              Submitting your rating…
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-blue-400 mt-8 pt-4 text-center text-xs text-gray-200">
        © {new Date().getFullYear()} TravelBuddy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
