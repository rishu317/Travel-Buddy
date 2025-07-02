import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import rishu from "../assets/images/rishu.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [cookies] = useCookies(["token"]);
  const [userDp, setUserDp] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = !!cookies.token;

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Destinations", path: "/destinations" },
    { name: "Add Trip", path: "/plan" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    ...(isLoggedIn ? [{ name: "My Trips", path: "/my-trips" }] : []),
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  useEffect(() => {
    const fetchUserDp = async () => {
      try {
        if (isLoggedIn) {
          const userData = await makeAuthenticatedGETRequest("/auth/profile");
          setUserDp(userData.dp || "");
        }
      } catch (err) {
        console.error("Navbar profile fetch error:", err);
      }
    };
    fetchUserDp();
  }, [cookies.token]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/home"
          className="text-4xl font-bold flex items-center gap-1 transition-transform duration-300 hover:scale-105"
        >
          <span className="text-5xl font-serif text-blue-800 dark:text-blue-300">Travel</span>
          <span className="text-2xl font-normal text-blue-600 dark:text-blue-400">Buddy</span>
        </Link>

        <div className="hidden md:flex gap-6 justify-center items-center mr-28">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-lg transition-colors duration-200 ${
                  isActive
                    ? "font-bold text-blue-900 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-110 transition duration-300"
            title="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <Link
            to="/chatboard"
            className="text-xl hover:scale-125 transition-transform duration-200"
            title="Open Chat Board"
          >
            ✨
          </Link>

          {isLoggedIn && (
            <Link to="/profile" title="Profile">
              <img
                src={
                  userDp
                    ? userDp.startsWith("http")
                      ? userDp
                      : `http://localhost:8080${userDp}`
                    : ""
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-black shadow hover:scale-110 transition duration-300"
              />
            </Link>
          )}
        </div>

        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 transition-all duration-300 ease-in-out">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-base py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-blue-700 dark:text-blue-300 font-semibold"
                    : "text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/chatboard"
            className="text-xl hover:scale-125 transition-transform duration-200 block"
            title="Open Chat Board"
          >
            ✨ Chat Board
          </Link>

          <div className="flex items-center justify-between mt-3">
            <button
              onClick={toggleTheme}
              className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full text-gray-900 dark:text-white"
              title="Toggle Theme"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {isLoggedIn && (
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                <img
                  src={
                    userDp
                      ? userDp.startsWith("http")
                        ? userDp
                        : `http://localhost:8080${userDp}`
                      : ""
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border border-blue-500 shadow"
                />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
