import React, { useState } from "react";
import {
  FaComments,
  FaSearch,
  FaPlane,
  FaMoon,
  FaSun,
  FaTag,
} from "react-icons/fa";

const questionsData = [
  { category: "General", question: "What documents do I need to travel abroad?", answer: "You'll typically need a valid passport, visa (if required), travel insurance, and ID proof." },
  { category: "Flights", question: "How to book cheap flights on TravelBuddy?", answer: "Use the 'Best Deals' filter, book early, and set fare alerts on the TravelBuddy flight section." },
  { category: "Safety", question: "Is TravelBuddy safe for solo travelers?", answer: "Yes! TravelBuddy verifies stays, experiences, and guides. Plus, you can chat with verified hosts." },
  { category: "Bookings", question: "How do I cancel a booking?", answer: "Go to 'My Bookings' → Select booking → Click 'Cancel'. Refund policies apply." },
  { category: "Bookings", question: "Can I reschedule my trip?", answer: "Yes. Use the 'Reschedule' option under 'My Bookings' if your booking supports flexible dates." },
  { category: "Payments", question: "What payment options are available?", answer: "Credit card, debit card, UPI, net banking, and wallets like Paytm and Google Pay." },
  { category: "Community", question: "Can I chat with other travelers?", answer: "Yes. Visit the 'Community' section to ask questions and meet fellow explorers." },
  { category: "Insurance", question: "Does TravelBuddy offer travel insurance?", answer: "Yes. You can add travel insurance during checkout at an additional cost." },
  { category: "Destinations", question: "What is the best time to visit Nepal?", answer: "October to December offers clear skies and the best trekking views." },
  { category: "Packing", question: "What should I pack for a beach vacation?", answer: "Sunscreen, swimwear, flip-flops, sunglasses, light clothes, and a power bank." },
  { category: "Gallery", question: "How can I share my travel moments?", answer: "Use the Gallery page to upload images, title, and description of your trip." },
  { category: "Support", question: "How to contact TravelBuddy support?", answer: "Click on 'Contact Us' in the footer or use live chat in the bottom-right corner." },
  { category: "Refunds", question: "What is TravelBuddy's refund policy?", answer: "Full refund if cancelled 7 days before; partial after that. Check your trip's cancellation terms." },
  { category: "Customization", question: "Can I customize my travel package?", answer: "Yes. Use the 'Plan Trip' page to choose your destination, days, budget, and activities." },
  { category: "Group", question: "Does TravelBuddy support group bookings?", answer: "Yes. You can add multiple people while creating your itinerary." },
  { category: "Guides", question: "Are local guides available?", answer: "Yes. All tours include certified local guides fluent in English and local languages." },
  { category: "Reviews", question: "Can I leave a review after my trip?", answer: "Yes. Visit 'My Trips' → Select trip → Click 'Leave a Review'." },
  { category: "Favorites", question: "How to save my favorite destinations?", answer: "Click the heart icon on any card to add it to your favorites." },
  { category: "Weekend", question: "Does TravelBuddy offer weekend getaways?", answer: "Yes! Check the 'Short Trips' category for weekend destinations under 3 days." },
  { category: "Adventure", question: "Can I filter trips by adventure type?", answer: "Absolutely. Use filters like Trekking, Beach, Wildlife, Historical, etc." },
  { category: "Pets", question: "Are pets allowed in accommodations?", answer: "Check each listing. Many offer pet-friendly stays with amenities." },
  { category: "Split", question: "Can I split payments with friends?", answer: "Yes, TravelBuddy offers group payment options. Each member gets a link to pay their share." },
  { category: "Privacy", question: "How secure is my personal information?", answer: "We follow end-to-end encryption and never share data with third parties." },
  { category: "Honeymoon", question: "How to plan a honeymoon on TravelBuddy?", answer: "Choose 'Honeymoon' under travel types and customize your romantic getaway." },
  { category: "Visa", question: "Do you offer visa assistance?", answer: "Yes. Add visa assistance at checkout or consult our Visa Helpdesk." },
  { category: "Itinerary", question: "Can I download my itinerary?", answer: "Yes. Go to 'My Trips' and click 'Download Itinerary PDF'." },
  { category: "Missed Flight", question: "What happens if I miss my flight?", answer: "Contact the airline immediately. TravelBuddy can help rebook if you purchased insurance." },
  { category: "Local Cuisine", question: "Can I try local cuisine during my trip?", answer: "Absolutely. Many packages include local food tours or home-dining experiences." },
  { category: "Languages", question: "What if I don't speak the local language?", answer: "Most guides speak English and apps are available to assist you." },
  { category: "Budget", question: "Can I travel on a student budget?", answer: "Yes. Use the 'Budget' filter and check out student-friendly hostels and shared tours." },
  { category: "Deals", question: "Does TravelBuddy offer seasonal discounts?", answer: "Yes. Sign up for our newsletter and check the 'Deals' page regularly." },
  { category: "Transfers", question: "Are airport transfers included?", answer: "Depends on the package. Check inclusions before booking." },
  { category: "Activities", question: "Can I add extra activities to my trip?", answer: "Yes. Use the 'Customize' button on your trip page to add activities." },
  { category: "Mobile App", question: "Does TravelBuddy have a mobile app?", answer: "Yes. Download it on iOS or Android for a better experience." },
  { category: "Notifications", question: "Will I get reminders before my trip?", answer: "Yes. We send timely notifications and reminders to your email and app." },
];

const categories = ["All", ...new Set(questionsData.map((q) => q.category))];

const ChatBoard = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(
    "👋 Hi traveler! Click on a question below to see the answer."
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const filteredQuestions = questionsData.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuestionClick = (answer) => {
    setSelectedAnswer(answer);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-blue-50 to-white text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2 text-blue-700 dark:text-blue-500">
            <FaComments /> TravelBuddy ChatBoard
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-blue-100 dark:bg-gray-400 hover:scale-110 transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Answer Panel */}
        <div
          className={`shadow-lg rounded-xl p-6 md:p-8 mb-8 border relative overflow-hidden ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"
          }`}
        >
          <div className="absolute right-3 bottom-3 text-blue-600 opacity-20 text-6xl">
            💬
          </div>
          <p className="text-lg md:text-xl leading-relaxed">{selectedAnswer}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-full shadow focus:ring-2 text-base ${
                darkMode
                  ? "bg-gray-700 text-gray-100 focus:ring-blue-500"
                  : "bg-white text-gray-900 border border-gray-300 focus:ring-blue-400"
              }`}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full md:w-48 px-4 py-3 rounded-full shadow focus:ring-2 text-base ${
              darkMode
                ? "bg-gray-700 text-gray-100 focus:ring-blue-500"
                : "bg-white text-gray-900 border border-gray-300 focus:ring-blue-400"
            }`}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Questions */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleQuestionClick(item.answer)}
                className={`cursor-pointer p-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition transform duration-200 border relative group ${
                  selectedAnswer === item.answer
                    ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 font-medium"
                    : darkMode
                    ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                    : "bg-white text-gray-900 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaPlane className="text-blue-400" />
                  <span className="text-sm font-semibold">Q{index + 1}</span>
                </div>
                <p className="text-sm md:text-base">{item.question}</p>
                <div
                  className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                    darkMode
                      ? "bg-gray-600 text-gray-200"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  <FaTag /> {item.category}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No matching questions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBoard;
