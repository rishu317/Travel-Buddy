import { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import {
  FaEnvelope, FaPhoneAlt, FaCommentDots, FaPaperPlane, FaGlobeAmericas,
} from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isHuman, setIsHuman] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (value) => {
    if (value) setIsHuman(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = form;

    if (!name || !email || !message) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!isHuman) {
      toast.error("Please verify you are not a robot.");
      return;
    }

    try {
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/validate-email",
        { email }
      );

      if (!response.valid) {
        setEmailError("This email is not registered.");
        return;
      } else {
        setEmailError("");
      }
    } catch {
      toast.error("Error verifying email.");
      return;
    }

    emailjs
      .send(
        "service_50d2qfv",
        "template_fxavyrj",
        form,
        "exoToqe8LJhmxa9rK"
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          setForm({ name: "", email: "", message: "" });
          setIsHuman(false);
        },
        (error) => {
          toast.error("Failed to send message.");
          console.error(error);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-200 to-yellow-100 relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none text-6xl opacity-20 text-gray-500">
        <FaEnvelope className="absolute top-8 left-1/4 animate-float-envelope" />
        <FaPhoneAlt className="absolute bottom-10 right-1/3 animate-float-phone" />
        <FaCommentDots className="absolute top-20 right-1/5 animate-float-comment" />
        <FaPaperPlane className="absolute bottom-20 left-10 animate-float-plane" />
        <FaGlobeAmericas className="absolute bottom-5 right-5 animate-spin-globe" />
      </div>

      <div className="relative z-10 bg-white/90 shadow-xl backdrop-blur-md rounded-2xl p-4 sm:p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-4">
          📬 Get in Touch
        </h1>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full text-sm p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => {
              handleChange(e);
              setEmailError("");
            }}
            placeholder="Your Email"
            className={`w-full text-sm p-2 border rounded shadow-sm focus:outline-none focus:ring-2 ${
              emailError
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-purple-400"
            }`}
            required
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full text-sm p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          ></textarea>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LcERWgrAAAAABzqWnZ1DazxnlbDLrTBbxaxJ-jM"
              onChange={handleCaptcha}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white text-sm py-2 rounded shadow hover:bg-purple-700 transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600 text-xs">
          <p>📧 rishukumar02751@gmail.com</p>
          <p>📞 +91 9265552973</p>
          <p>🏠 06, Sainath Appartment, Netalde Society, Surat, Gujarat</p>
          <p>📮 Pin: 395006</p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        @keyframes floatX {
          0% { transform: translateX(0); }
          50% { transform: translateX(12px); }
          100% { transform: translateX(0); }
        }
        @keyframes spin360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-float-envelope {
          animation: floatY 6s ease-in-out infinite;
        }
        .animate-float-phone {
          animation: floatX 7s ease-in-out infinite;
        }
        .animate-float-comment {
          animation: floatY 8s ease-in-out infinite;
        }
        .animate-float-plane {
          animation: floatX 9s ease-in-out infinite;
        }
        .animate-spin-globe {
          animation: spin360 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Contact;
