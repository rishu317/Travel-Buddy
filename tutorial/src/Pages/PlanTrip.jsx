import TripForm from "../components/TripForm";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import trip from "../assets/images/trip.jpg"; // Optional background image

function PlanTrip() {
  const [submittedTrips, setSubmittedTrips] = useState([]);
  const location = useLocation();
  const prefilled = location.state || {};

  const handleAddTrip = (newTripFromBackend) => {
    setSubmittedTrips((prev) => [...prev, newTripFromBackend]);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10 relative"
      style={{ backgroundImage: `url(${trip})` }}
    >
      {/* Overlay with gradient and blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-white to-blue-100 opacity-80 backdrop-blur-md z-0" />

      {/* Main container */}
      <div className="relative z-10 w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-300">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-800 mb-2">
            Plan Your Adventure 🧳
          </h1>
          <p className="text-sm md:text-base text-red-500 font-medium">
            Please fill out the form below to share your travel plans with us!
          </p>
        </div>

        <TripForm onAddTrip={handleAddTrip} prefilled={prefilled} />

        {submittedTrips.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ✨ Your Submitted Trips
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {submittedTrips.map((trip, index) => (
                <div
                  key={index}
                  className="border border-blue-200 bg-white/70 p-4 rounded-xl shadow-sm hover:shadow-md transition-transform hover:scale-[1.02] text-sm"
                >
                  <p>
                    <strong>{trip.name}</strong> is planning a trip from{" "}
                    <span className="text-blue-700 font-medium">{trip.from}</span> to{" "}
                    <span className="text-blue-700 font-medium">{trip.destination}</span> on{" "}
                    <strong>{trip.date?.split("T")[0]}</strong>.
                  </p>
                  <p className="mt-2">
                    Duration:{" "}
                    <span className="text-green-700 font-semibold">
                      {trip.duration || "N/A"} days
                    </span>{" "}
                    | Budget:{" "}
                    <span className="text-pink-600 font-semibold">
                      ${trip.budget || "N/A"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanTrip;
