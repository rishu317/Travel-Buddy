import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import TextInput from "../components/Shared/TextInput";
import PassInput from "../components/Shared/PassInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import {
  FaPlane,
  FaShip,
  FaCar,
  FaBus,
  FaTrain,
  FaMotorcycle,
  FaGlobeAmericas,
  FaBicycle,
  FaRocket,
  FaHelicopter,
  FaWater,
} from "react-icons/fa";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm email must match.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password and confirm password must match.");
      return;
    }

    const data = { email, password, userId, firstName, lastName };
    const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);

    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Signup Successful!");
      navigate("/home");
    } else {
      alert("Signup Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-200 to-emerald-100 relative overflow-hidden p-4">
      {/* Decorative Circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-sky-300 to-blue-500 rounded-full opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-green-300 to-emerald-500 rounded-full opacity-20"></div>

      {/* Vehicles */}
      <div className="absolute inset-0 z-0 pointer-events-none text-7xl opacity-20 text-gray-700">
        <FaPlane className="absolute top-6 left-10 animate-float-plane" />
        <FaRocket className="absolute top-6 right-10 animate-float-rocket" />
        <FaHelicopter className="absolute top-1/4 left-1/3 animate-float-helicopter" />
        <FaBicycle className="absolute top-1/4 right-1/4 animate-float-bicycle" />
        <FaCar className="absolute top-1/2 left-8 animate-float-car" />
        <FaMotorcycle className="absolute top-1/2 right-8 animate-float-motorcycle" />
        <FaBus className="absolute bottom-1/3 left-1/4 animate-float-bus" />
        <FaMotorcycle className="absolute bottom-1/3 right-1/4 animate-float-scooter" />
        <FaShip className="absolute bottom-20 left-12 animate-float-ship" />
        <FaWater className="absolute bottom-20 right-12 animate-float-canoe" />
        <FaTrain className="absolute bottom-4 left-1/2 animate-float-train transform -translate-x-1/2" />
        <FaGlobeAmericas className="absolute bottom-4 right-4 animate-spin-globe" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-sky-700">
            🌏 Travel<span className="text-amber-500">Buddy</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Create your account & start your adventure ✈️
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signUp();
          }}
          className="space-y-3"
        >
          <TextInput type="text" placeholder="User ID" value={userId} setValue={setUserId} />
          <TextInput type="text" placeholder="First Name" value={firstName} setValue={setFirstName} />
          <TextInput type="text" placeholder="Last Name" value={lastName} setValue={setLastName} />
          <TextInput type="email" placeholder="Email" value={email} setValue={setEmail} />
          <TextInput type="email" placeholder="Confirm Email" value={confirmEmail} setValue={setConfirmEmail} />
          <PassInput placeholder="Password" value={password} setValue={setPassword} />
          <PassInput placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} />

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-full shadow-lg transition"
          >
            Sign Up
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-xs text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="text-center text-sm text-gray-600">
          Already have an account?
        </div>
        <div className="flex justify-center mt-2">
          <Link
            to="/login"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full shadow transition"
          >
            Log In
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          © 2025 TravelBuddy — Explore. Connect. Discover.
        </p>
      </div>

      <style>{`
  @keyframes floatY {
    0% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0); }
  }
  @keyframes floatX {
    0% { transform: translateX(0); }
    50% { transform: translateX(15px); }
    100% { transform: translateX(0); }
  }
  @keyframes spin360 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .animate-float-plane {
    animation: floatY 4s ease-in-out infinite;
  }
  .animate-float-rocket {
    animation: floatX 6s ease-in-out infinite;
  }
  .animate-float-helicopter {
    animation: floatY 5s ease-in-out infinite;
  }
  .animate-float-bicycle {
    animation: floatX 6s ease-in-out infinite;
  }
  .animate-float-car {
    animation: floatY 7s ease-in-out infinite;
  }
  .animate-float-motorcycle {
    animation: floatX 7s ease-in-out infinite;
  }
  .animate-float-bus {
    animation: floatY 8s ease-in-out infinite;
  }
  .animate-float-scooter {
    animation: floatX 8s ease-in-out infinite;
  }
  .animate-float-ship {
    animation: floatY 9s ease-in-out infinite;
  }
  .animate-float-canoe {
    animation: floatX 9s ease-in-out infinite;
  }
  .animate-float-train {
    animation: floatY 10s ease-in-out infinite;
  }
  .animate-spin-globe {
    animation: spin360 15s linear infinite;
  }
`}</style>

    </div>
  );
};

export default Signup;
