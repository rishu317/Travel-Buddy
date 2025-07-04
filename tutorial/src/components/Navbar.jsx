import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

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
    <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center py-3">
        {/* Logo */}
        <Link
          to="/home"
          className="text-3xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400 flex gap-1"
        >
          Travel<span className="text-xl text-blue-400 dark:text-blue-300">Buddy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-blue-600 dark:text-blue-300 border-b-2 border-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                } pb-1`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <Link
            to="/chatboard"
            className="text-lg hover:text-blue-500"
            title="Chat Board"
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
                    : "https://via.placeholder.com/40x40?text=👤"
                }
                alt="Profile"
                className="w-9 h-9 rounded-full border shadow object-cover hover:scale-105 transition"
              />
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-700 dark:text-gray-200"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-base py-1 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-300 font-semibold"
                    : "text-gray-800 dark:text-gray-200 hover:text-blue-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/chatboard"
            onClick={() => setIsOpen(false)}
            className="block text-lg py-1 hover:text-blue-500"
          >
            ✨ Chat Board
          </Link>

          <div className="flex justify-between items-center mt-3">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 bg-gray-200 dark:bg-gray-700"
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
                      : "https://via.placeholder.com/40x40?text=👤"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full border shadow object-cover"
                />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
