import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { FaEdit, FaTrashAlt, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

function MyTrip() {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await makeAuthenticatedGETRequest("/trip/my");
      setTrips(res);
    } catch (error) {
      toast.error("Failed to load trips.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await makeAuthenticatedPOSTRequest("/trip/delete", { id });
      toast.success("Trip deleted!");
      fetchTrips();
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip._id);
    setFormData(trip);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await makeAuthenticatedPOSTRequest("/trip/update", formData);
      if (res.success) {
        toast.success("Trip updated!");
        setEditingTrip(null);
        fetchTrips();
      } else {
        toast.error(res.message || "Update failed.");
      }
    } catch (err) {
      toast.error("Error updating trip.");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("My Trips", 14, 22);

    const tableData = trips.map((trip, index) => [
      index + 1,
      trip.name,
      trip.from,
      trip.destination,
      `₹${trip.budget}`,
      `${trip.duration} days`,
      new Date(trip.date).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [["#", "Name", "From", "To", "Budget", "Duration", "Date"]],
      body: tableData,
      startY: 30,
    });

    doc.save("MyTrips.pdf");
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-rose-100 via-white to-sky-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-blue-700">🧭 My Trips</h2>
        {trips.length > 0 && (
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FaDownload /> Download PDF
          </button>
        )}
      </div>

      {trips.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No trips found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white border rounded-2xl shadow-lg p-5 hover:shadow-xl transition duration-300"
            >
              {editingTrip === trip._id ? (
                <form className="space-y-2">
                  <div>
                    <label className="block text-sm font-semibold">Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">From</label>
                    <input
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Destination</label>
                    <input
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold">Budget</label>
                      <input
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        type="number"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold">Duration</label>
                      <input
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        type="number"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Date</label>
                    <input
                      name="date"
                      value={formData.date?.split("T")[0]}
                      onChange={handleChange}
                      type="date"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={handleUpdate}
                      type="button"
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTrip(null)}
                      type="button"
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-1">{trip.name}</h3>
                  <p className="text-sm mb-1">
                    From <strong>{trip.from}</strong> to <strong>{trip.destination}</strong>
                  </p>
                  <p className="text-sm mb-1">
                    Budget: ₹{trip.budget} | Days: {trip.duration}
                  </p>
                  <p className="text-sm mb-3">
                    Date: <strong>{trip.date?.split("T")[0]}</strong>
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(trip)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(trip._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrip;
