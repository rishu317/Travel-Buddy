import { useState } from "react";
import TextInput from "../components/Shared/TextInput";
import PassInput from "../components/Shared/PassInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  FaPlane,
  FaShip,
  FaCar,
  FaBus,
  FaTrain,
  FaMotorcycle,
  FaGlobeAmericas,
} from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);

    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Login Successful!");
      navigate("/home");
    } else {
      alert("Login Failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-200 to-emerald-100 relative overflow-hidden p-4">
      {/* Decorative Gradient Circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-sky-300 to-blue-500 rounded-full opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-green-300 to-emerald-500 rounded-full opacity-20"></div>

      {/* Vehicles floating in background */}
      <div className="absolute inset-0 z-0 pointer-events-none text-7xl opacity-20 text-gray-700">
        <FaPlane className="absolute top-10 left-1/4 animate-plane" />
        <FaShip className="absolute bottom-20 left-10 animate-ship" />
        <FaCar className="absolute top-40 right-20 animate-car" />
        <FaBus className="absolute bottom-10 right-1/3 animate-bus" />
        <FaTrain className="absolute top-20 right-1/4 animate-train" />
        <FaMotorcycle className="absolute bottom-32 left-1/2 animate-motorcycle" />
        <FaGlobeAmericas className="absolute bottom-5 right-5 animate-globe" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-sky-700">
            🌏 Travel<span className="text-amber-500">Buddy</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Your adventure begins here — log in to explore ✈️
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
          className="space-y-4"
        >
          <TextInput
            type="email"
            placeholder="Email address"
            className="my-2"
            value={email}
            setValue={setEmail}
          />
          <PassInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-full shadow-lg transition"
          >
            Log In
          </button>
        </form>

        {/* Or Divider */}
        <div className="my-4 flex items-center gap-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-xs text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Signup redirect */}
        <div className="text-center text-sm text-gray-600">
          Don’t have an account?
        </div>
        <div className="flex justify-center mt-2">
          <Link
            to="/signup"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full shadow transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © 2025 TravelBuddy — Explore. Connect. Discover.
        </p>
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        @keyframes rotate360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-plane {
          animation: floatY 6s ease-in-out infinite;
        }
        .animate-ship {
          animation: floatY 8s ease-in-out infinite;
        }
        .animate-car {
          animation: floatY 7s ease-in-out infinite;
        }
        .animate-bus {
          animation: floatY 9s ease-in-out infinite;
        }
        .animate-train {
          animation: floatY 5s ease-in-out infinite;
        }
        .animate-motorcycle {
          animation: floatY 10s ease-in-out infinite;
        }
        .animate-globe {
          animation: rotate360 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Login;
