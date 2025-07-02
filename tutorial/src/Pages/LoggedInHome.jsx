import React from "react";
import DestinationCard from "../components/DestinationCard";
import destinationData from "../Data/AlldestinationsData";
import hero from "../assets/images/hero.jpg";
import Navbar from "../components/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

function LoggedInHome() {
  const navigate = useNavigate();
  const handle = () => {
    navigate("/plan")
  }
  return (
    <div>
      {/* ✅ Hero Section */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <img
          src={hero}
          alt="Travel Hero"
          className="w-full h-full object-cover brightness-75"
        />

        <div className="absolute inset-0 flex flex-col text-white px-4 justify-center">

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore the World with TravelBuddy</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Find your perfect destination and plan your next adventure with ease.
            </p>

            

            <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition" onClick={handle}>
              Start Planning ✈️
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Welcome Text */}
      <section className="text-center mt-12 mb-10 px-4 ">
        <h1 className="text-3xl font-bold text-blue-600">Welcome to TravelBuddy ✈️</h1>
        <p className="mt-2 text-gray-600">Explore the world’s best travel destinations with us.</p>
      </section>

      {/* ✅ Popular Destinations */}
      <section className="px-6 pb-10">
        <h2 className="text-2xl font-semibold mb-4">Popular Destinations</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {destinationData.slice(0, 3).map((dest) => (
            <DestinationCard
              key={dest.title} // ✅ FIXED
              image={dest.image}
              title={dest.title}
              location={dest.location}
              price={dest.price}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

export default LoggedInHome;
