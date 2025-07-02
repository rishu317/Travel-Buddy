import React, { useState } from "react";

const questionsData = [
  {
    question: "What documents do I need to travel abroad?",
    answer: "You'll typically need a valid passport, visa (if required), travel insurance, and ID proof."
  },
  {
    question: "How to book cheap flights on TravelBuddy?",
    answer: "Use the 'Best Deals' filter, book early, and set fare alerts on the TravelBuddy flight section."
  },
  {
    question: "Is TravelBuddy safe for solo travelers?",
    answer: "Yes! TravelBuddy verifies stays, experiences, and guides. Plus, you can chat with verified hosts."
  },
  {
    question: "How do I cancel a booking?",
    answer: "Go to 'My Bookings' → Select booking → Click 'Cancel'. Refund policies apply."
  },
  {
    question: "Can I reschedule my trip?",
    answer: "Yes. Use the 'Reschedule' option under 'My Bookings' if your booking supports flexible dates."
  },
  {
    question: "Does TravelBuddy offer travel insurance?",
    answer: "Yes. You can add travel insurance during checkout at an additional cost."
  },
  {
    question: "Are all destinations verified?",
    answer: "Yes. We partner only with licensed and verified vendors and guides."
  },
  {
    question: "What payment options are available?",
    answer: "Credit card, debit card, UPI, net banking, and wallets like Paytm and Google Pay."
  },
  {
    question: "How can I share my travel moments?",
    answer: "Use the Gallery page to upload images, title, and description of your trip."
  },
  {
    question: "What is TravelBuddy's refund policy?",
    answer: "Full refund if cancelled 7 days before; partial after that. Check your trip's cancellation terms."
  },
  {
    question: "Can I customize my travel package?",
    answer: "Yes. Use the 'Plan Trip' page to choose your destination, days, budget, and activities."
  },
  {
    question: "Does TravelBuddy support group bookings?",
    answer: "Yes. You can add multiple people while creating your itinerary."
  },
  {
    question: "How to contact TravelBuddy support?",
    answer: "Click on 'Contact Us' in the footer or use live chat in the bottom-right corner."
  },
  {
    question: "What is the best time to visit Nepal?",
    answer: "October to December offers clear skies and the best trekking views."
  },
  {
    question: "Are food and drinks included in packages?",
    answer: "Some include meals; details are available on the destination card or package detail page."
  },
  {
    question: "Can I travel on a student budget?",
    answer: "Yes. Use the 'Budget' filter and check out student-friendly hostels and shared tours."
  },
  {
    question: "Are local guides available?",
    answer: "Yes. All tours include certified local guides fluent in English and local languages."
  },
  {
    question: "Can I leave a review after my trip?",
    answer: "Yes. Visit 'My Trips' → Select trip → Click 'Leave a Review'."
  },
  {
    question: "What should I pack for a beach vacation?",
    answer: "Sunscreen, swimwear, flip-flops, sunglasses, light clothes, and a power bank."
  },
  {
    question: "Can I chat with other travelers?",
    answer: "Yes. Visit the 'Community' section to ask questions and meet fellow explorers."
  },
  {
    question: "What happens if I miss my flight?",
    answer: "Contact the airline immediately. TravelBuddy can help rebook if you purchased insurance."
  },
  {
    question: "How to save my favorite destinations?",
    answer: "Click the heart icon on any card to add it to your favorites."
  },
  {
    question: "Does TravelBuddy offer weekend getaways?",
    answer: "Yes! Check the 'Short Trips' category for weekend destinations under 3 days."
  },
  {
    question: "Can I filter trips by adventure type?",
    answer: "Absolutely. Use filters like Trekking, Beach, Wildlife, Historical, etc."
  },
  {
    question: "Are pets allowed in accommodations?",
    answer: "Check each listing. Many offer pet-friendly stays with amenities."
  },
  {
    question: "Can I split payments with friends?",
    answer: "Yes, TravelBuddy offers group payment options. Each member gets a link to pay their share."
  },
  {
    question: "How secure is my personal information?",
    answer: "We follow end-to-end encryption and never share data with third parties."
  },
  {
    question: "How to plan a honeymoon on TravelBuddy?",
    answer: "Choose 'Honeymoon' under travel types and customize your romantic getaway."
  },
  {
    question: "Do you offer visa assistance?",
    answer: "Yes. Add visa assistance at checkout or consult our Visa Helpdesk."
  },
  {
    question: "Can I download my itinerary?",
    answer: "Yes. Go to 'My Trips' and click 'Download Itinerary PDF'."
  }
];

const ChatBoard = () => {
  const [selectedAnswer, setSelectedAnswer] = useState("👋 Hi! Click on a question below to see the answer.");
  const [searchTerm, setSearchTerm] = useState("");

  const handleQuestionClick = (answer) => {
    setSelectedAnswer(answer);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredQuestions = questionsData.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Answer Panel */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-blue-300">
        <h2 className="text-2xl font-bold text-blue-700 mb-7">TravelBuddy Says:</h2>
        <p className="text-gray-800 text-base">{selectedAnswer}</p>
      </div>

      {/* Search Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Questions Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(item.answer)}
              className={`p-4 rounded-lg shadow-sm border hover:bg-blue-50 transition text-left ${
                selectedAnswer === item.answer
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "bg-white text-gray-800 hover:text-blue-700"
              }`}
            >
              <span className="font-medium text-sm text-blue-600">Q{index + 1}:</span> {item.question}
            </button>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No questions match your search.</p>
        )}
      </div>
    </div>
  );
};

export default ChatBoard;
