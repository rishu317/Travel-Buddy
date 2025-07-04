import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const DestinationsForCountries = () => {
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

  const containerRef = useRef();
  const itemRefs = useRef([]);

  useEffect(() => {
    const activeIndex = countries.findIndex(
      (c) => c.path === location.pathname
    );

    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [location.pathname]);

  return (
    <div className="relative w-full">
      <div ref={containerRef} className="w-full overflow-x-auto">
        <div className="flex space-x-2 md:space-x-3 py-4 px-2 w-max min-w-full">
          {countries.map((country, idx) => {
            const isActive = location.pathname === country.path;
            return (
              <Link
                key={idx}
                ref={(el) => (itemRefs.current[idx] = el)}
                to={country.path}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm md:text-base font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"
                  }
                `}
              >
                {country.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Optional gradient edges */}
      <div className="absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-white/90 to-transparent pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-white/90 to-transparent pointer-events-none hidden md:block"></div>
    </div>
  );
};

export default DestinationsForCountries;
