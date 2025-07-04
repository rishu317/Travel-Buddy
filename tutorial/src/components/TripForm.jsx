import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

function TripForm({ onAddTrip, prefilled = {} }) {
  const USD_TO_INR = 85.6;

  const countryCodes = [
    { name: "Afghanistan", code: "+93" },
    { name: "Albania", code: "+355" },
    // { name: "Algeria", code: "+213" },
    // { name: "Andorra", code: "+376" },
    // { name: "Angola", code: "+244" },
    // { name: "Argentina", code: "+54" },
    // { name: "Armenia", code: "+374" },
    // { name: "Australia", code: "+61" },
    // { name: "Austria", code: "+43" },
    // { name: "Azerbaijan", code: "+994" },
    // { name: "Bahamas", code: "+1-242" },
    // { name: "Bahrain", code: "+973" },
    // { name: "Bangladesh", code: "+880" },
    // { name: "Belarus", code: "+375" },
    // { name: "Belgium", code: "+32" },
    // { name: "Bhutan", code: "+975" },
    // { name: "Bolivia", code: "+591" },
    // { name: "Bosnia", code: "+387" },
    // { name: "Brazil", code: "+55" },
    // { name: "Bulgaria", code: "+359" },
    // { name: "Cambodia", code: "+855" },
    // { name: "Canada", code: "+1" },
    // { name: "Chile", code: "+56" },
    // { name: "China", code: "+86" },
    // { name: "Colombia", code: "+57" },
    // { name: "Croatia", code: "+385" },
    // { name: "Cyprus", code: "+357" },
    // { name: "Czech Republic", code: "+420" },
    // { name: "Denmark", code: "+45" },
    // { name: "Ecuador", code: "+593" },
    // { name: "Egypt", code: "+20" },
    // { name: "Estonia", code: "+372" },
    // { name: "Finland", code: "+358" },
    // { name: "France", code: "+33" },
    // { name: "Georgia", code: "+995" },
    // { name: "Germany", code: "+49" },
    // { name: "Greece", code: "+30" },
    // { name: "Hong Kong", code: "+852" },
    // { name: "Hungary", code: "+36" },
    // { name: "Iceland", code: "+354" },
    // { name: "India", code: "+91" },
    // { name: "Indonesia", code: "+62" },
    // { name: "Iran", code: "+98" },
    // { name: "Iraq", code: "+964" },
    // { name: "Ireland", code: "+353" },
    // { name: "Israel", code: "+972" },
    // { name: "Italy", code: "+39" },
    // { name: "Japan", code: "+81" },
    // { name: "Jordan", code: "+962" },
    // { name: "Kazakhstan", code: "+7" },
    // { name: "Kenya", code: "+254" },
    // { name: "Kuwait", code: "+965" },
    // { name: "Laos", code: "+856" },
    // { name: "Latvia", code: "+371" },
    // { name: "Lebanon", code: "+961" },
    // { name: "Lithuania", code: "+370" },
    // { name: "Luxembourg", code: "+352" },
    // { name: "Malaysia", code: "+60" },
    // { name: "Maldives", code: "+960" },
    // { name: "Mexico", code: "+52" },
    // { name: "Mongolia", code: "+976" },
    // { name: "Morocco", code: "+212" },
    // { name: "Nepal", code: "+977" },
    // { name: "Netherlands", code: "+31" },
    // { name: "New Zealand", code: "+64" },
    // { name: "Nigeria", code: "+234" },
    // { name: "Norway", code: "+47" },
    // { name: "Oman", code: "+968" },
    // { name: "Pakistan", code: "+92" },
    // { name: "Panama", code: "+507" },
    // { name: "Peru", code: "+51" },
    // { name: "Philippines", code: "+63" },
    // { name: "Poland", code: "+48" },
    // { name: "Portugal", code: "+351" },
    // { name: "Qatar", code: "+974" },
    // { name: "Romania", code: "+40" },
    // { name: "Russia", code: "+7" },
    // { name: "Saudi Arabia", code: "+966" },
    // { name: "Serbia", code: "+381" },
    // { name: "Singapore", code: "+65" },
    // { name: "Slovakia", code: "+421" },
    // { name: "Slovenia", code: "+386" },
    // { name: "South Africa", code: "+27" },
    // { name: "South Korea", code: "+82" },
    // { name: "Spain", code: "+34" },
    // { name: "Sri Lanka", code: "+94" },
    // { name: "Sweden", code: "+46" },
    // { name: "Switzerland", code: "+41" },
    // { name: "Syria", code: "+963" },
    // { name: "Taiwan", code: "+886" },
    // { name: "Tajikistan", code: "+992" },
    // { name: "Thailand", code: "+66" },
    // { name: "Turkey", code: "+90" },
    // { name: "Ukraine", code: "+380" },
    // { name: "UAE", code: "+971" },
    // { name: "UK", code: "+44" },
    // { name: "USA", code: "+1" },
    // { name: "Uzbekistan", code: "+998" },
    // { name: "Vietnam", code: "+84" },
    // { name: "Yemen", code: "+967" },  
  ];

  // Convert USD to INR if prefilled budget exists
  const prefilledBudgetINR = prefilled.budget ? Math.round(prefilled.budget * USD_TO_INR) : 0;

  // Base price per day in INR (default duration = 6 days)
  const basePricePerDay = prefilledBudgetINR ? prefilledBudgetINR / 6 : 0;

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    countryCode: "+91",
    from: "",
    destination: prefilled.destination || "",
    budget: prefilledBudgetINR || "",
    people: 1,
    date: "",
    duration: prefilledBudgetINR ? 6 : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "budget" || name === "duration" || name === "people") && value !== "") {
      const numericValue = parseInt(value, 10);
      if (isNaN(numericValue) || numericValue < 1) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Auto-update budget in INR based on people and duration
  useEffect(() => {
    if (prefilledBudgetINR && formData.duration && formData.people) {
      const updatedBudget = basePricePerDay * formData.duration * formData.people;
      setFormData((prev) => ({ ...prev, budget: Math.round(updatedBudget) }));
    }
  }, [formData.duration, formData.people]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.destination || !formData.date || !formData.from) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.contact.length < 10) {
      toast.error("Phone number must be at least 10 digits.");
      return;
    }

    try {
      const result = await makeAuthenticatedPOSTRequest("/trip/create", {
        ...formData,
        contact: formData.countryCode + formData.contact,
      });

      onAddTrip(result);
      toast.success("Trip added successfully!");

      setFormData({
        name: "",
        contact: "",
        countryCode: "+91",
        from: "",
        destination: "",
        budget: "",
        people: 1,
        date: "",
        duration: prefilledBudgetINR ? 6 : "",
      });
    } catch (err) {
      console.error("Trip submission failed:", err.message);
      toast.error("Trip submission failed. Make sure you're logged in.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-5 rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600 text-center">
        Plan Your Trip
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded text-sm"
        required
      />

      <div className="flex mb-3 gap-2">
        <select
          name="countryCode"
          value={formData.countryCode}
          onChange={handleChange}
          className="w-2/5 p-2 border rounded text-sm"
        >
          {countryCodes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
        </select>

        <input
          type="tel"
          name="contact"
          placeholder="Phone Number"
          value={formData.contact}
          onChange={(e) => {
            const input = e.target.value.replace(/\D/g, "");
            if (input.length <= 15) {
              setFormData((prev) => ({ ...prev, contact: input }));
            }
          }}
          className="w-3/5 p-2 border rounded text-sm"
          required
        />
      </div>

      <input
        type="text"
        name="from"
        placeholder="From"
        value={formData.from}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded text-sm"
        required
      />

      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded text-sm"
        required
      />

      <input
        type="number"
        name="budget"
        placeholder="Budget (INR)"
        value={formData.budget}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded text-sm"
        readOnly={!!prefilled.budget}
        min="1"
        title={prefilled.budget ? "Budget auto-calculated from destination card (converted to INR)." : "Enter your own budget"}
        required
      />

      <input
        type="number"
        name="people"
        placeholder="Number of People"
        value={formData.people}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded text-sm"
        min="1"
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        min={new Date().toISOString().split("T")[0]}
        className="w-full mb-2 p-2 border rounded text-sm"
        required
      />

      <input
        type="number"
        name="duration"
        placeholder="Duration (days)"
        value={formData.duration}
        onChange={handleChange}
        min="1"
        className="w-full mb-3 p-2 border rounded text-sm"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm font-semibold"
      >
        Add Trip
      </button>
    </form>
  );
}

export default TripForm;
