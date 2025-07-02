import React, { useState } from "react";
import DestinationCard from "../components/DestinationCard";
import chinaData from "../Data/chinaData";
import Contries from "../components/DestinationsForContries";

const ChinaDest = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter destinations based on search input
  const filteredDestinations = chinaData.filter((dest) =>
    dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Page Title */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700 w-auto">
          Explore China's Destinations
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Find your perfect getaway from our top travel picks.
        </p>

        {/* Search Input */}
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            placeholder="Search destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 px-4 border rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-64 text-sm"
          />
          <button
            className="bg-blue-300 text-white px-4 py-2 rounded-r-md hover:bg-blue-400 text-sm"
            onClick={() => setSearchTerm(searchTerm.trim())}
          >
            🔍
          </button>
        </div>
      </section>

      {/* Country Tabs */}
      <section className="w-full text-gray-900 flex mb-10">
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
          <p className="text-center text-gray-500">No destinations found.</p>
        )}
      </section>
    </div>
  );
};

export default ChinaDest;
