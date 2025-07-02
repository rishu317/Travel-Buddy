// src/components/DestinationCard.jsx

import { Link } from "react-router-dom";

function DestinationCard({ image, title, location, price }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-blue-600 font-bold mt-2">${price}</p>
        <Link
          to="/plan"
          state={{ destination: location, budget: price }}
          className="inline-block mt-3 text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Plan Trip
        </Link>

      </div>
    </div>
  );
}

export default DestinationCard;
