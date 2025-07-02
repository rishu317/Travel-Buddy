import React from "react";
import { Link, useLocation } from "react-router-dom";

const DestinationsForContries = () => {
  const location = useLocation();

  const countries = [
    { name: "All", path: "/destinations" },
    { name: "India", path: "/destinations/india" },
    { name: "England", path: "/destinations/england" },
    { name: "China", path: "/destinations/china" },
    { name: "Nepal", path: "/destinations/nepal" },
    { name: "Pakistan", path: "/destinations/pakistan" },
    { name: "USA", path: "/destinations/usa" },
    { name: "New Zealand", path: "/destinations/newzealand" },
    { name: "Costa Rica", path: "/destinations/costarice" },
    { name: "Iceland", path: "/destinations/iceland" },
    { name: "Sri Lanka", path: "/destinations/srilanka" },
    { name: "Portugal", path: "/destinations/portugal" },
    { name: "Japan", path: "/destinations/japan" },
    { name: "Spain", path: "/destinations/spain" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-3 py-3 px-2 w-max min-w-full">
        {countries.map((country, idx) => (
          <Link
            key={idx}
            to={country.path}
            className={`text-nowrap px-4 py-2 rounded cursor-pointer text-sm md:text-base transition font-medium
              ${
                location.pathname === country.path
                  ? "text-red-600 font-bold"
                  : "text-gray-700 hover:text-red-500"
              }
            `}
          >
            {country.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DestinationsForContries;
