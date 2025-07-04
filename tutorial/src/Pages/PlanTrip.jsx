import TripForm from "../components/TripForm";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function PlanTrip() {
  const [submittedTrips, setSubmittedTrips] = useState([]);
  const location = useLocation();
  const prefilled = location.state || {};

  const handleAddTrip = (newTripFromBackend) => {
    setSubmittedTrips((prev) => [...prev, newTripFromBackend]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero Header */}
      <header className="w-full bg-white shadow-sm py-8 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          🌏 Plan Your Dream Adventure
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Share your journey & let us help craft unforgettable memories.
        </p>
      </header>

      <main className="flex flex-col items-center w-full max-w-6xl px-4 py-12 gap-12">
        {/* Trip Form Section */}
        <section className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
            📋 Enter Trip Details
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Please fill out all the fields carefully.
          </p>
          <TripForm onAddTrip={handleAddTrip} prefilled={prefilled} />
        </section>

        {/* Submitted Trips Section */}
        {submittedTrips.length > 0 && (
          <section className="w-full max-w-5xl">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
              ✨ Your Submitted Trips
            </h2>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {submittedTrips.map((trip, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow hover:shadow-md transition transform hover:-translate-y-1 p-6 text-center"
                >
                  <h3 className="text-lg font-semibold text-blue-800">
                    {trip.name}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm">
                    From <span className="font-medium">{trip.from}</span> to{" "}
                    <span className="font-medium">{trip.destination}</span>
                  </p>
                  <p className="text-gray-600 mt-1 text-sm">
                    Date:{" "}
                    <span className="font-medium">
                      {trip.date?.split("T")[0]}
                    </span>
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    <div>
                      <span className="block text-xs text-gray-500">
                        Duration
                      </span>
                      <span className="text-green-600 font-bold">
                        {trip.duration || "N/A"} days
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">
                        Budget
                      </span>
                      <span className="text-pink-600 font-bold">
                        ₹{trip.budget || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default PlanTrip;
