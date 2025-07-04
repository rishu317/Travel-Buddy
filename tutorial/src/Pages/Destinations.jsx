import React, { useState } from "react";
import DestinationCard from "../components/DestinationCard";
import destinationData from "../Data/AlldestinationsData";
import Contries from "../components/DestinationsForContries";

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = destinationData.filter((dest) =>
    dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-12">
      {/* Page Title */}
      <section className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800">
          Explore World’s Most Beautiful Destinations 🌏
        </h1>
        <p className="text-gray-600 mt-2 text-base sm:text-lg max-w-2xl mx-auto">
          Find your perfect getaway from our curated international travel picks — beaches, cities, mountains & more.
        </p>

        {/* Search Input */}
        <div className="mt-6 flex justify-center">
          <div className="flex shadow rounded-lg w-full max-w-md">
            <input
              type="text"
              placeholder="Search by destination or location…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 text-sm border border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition text-sm"
              onClick={() => setSearchTerm(searchTerm.trim())}
            >
              🔍 Search
            </button>
          </div>
        </div>
      </section>

      {/* Country Tabs */}
      <section className="w-full text-gray-900 mb-10">
        <Contries />
      </section>

      {/* Destination Cards */}
      <section>
        {filteredDestinations.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                image={dest.image}
                title={dest.title}
                location={dest.location}
                price={dest.price}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-12 text-lg">
            No destinations found. Try a different search term.
          </p>
        )}
      </section>
    </div>
  );
};

export default Destinations;
