import { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import contact from "../assets/images/contact.jpg";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isHuman, setIsHuman] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (value) => {
    if (value) {
      setIsHuman(true);
    }
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
      const response = await makeUnauthenticatedPOSTRequest("/auth/validate-email", { email });

      if (!response.valid) {
        setEmailError("This email is not registered.");
        return;
      } else {
        setEmailError("");
      }
    } catch (error) {
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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: `url(${contact})` }}
    >
      <div className="bg-gray-500 bg-opacity-80 shadow-lg rounded-3xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-white text-center mb-6">Get in Touch 📬</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2 border rounded"
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
            className={`w-full p-2 border rounded ${emailError ? "border-red-500" : ""}`}
            required
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full p-2 border rounded"
            required
          ></textarea>

          <ReCAPTCHA
            sitekey="6LcERWgrAAAAABzqWnZ1DazxnlbDLrTBbxaxJ-jM"
            onChange={handleCaptcha}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>

        <div className="mt-6 text-center text-gray-300 text-lg font-semibold">
          <p>Email: rishukumar02751@gmail.com</p>
          <p>Phone: +91 9265552973</p>
          <p>Address: 06, Sainath Appartment, Netalde Society, Surat, Gujarat.</p>
          <p>Pin: 395006</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
