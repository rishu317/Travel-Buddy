import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-500 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo */}
        <div className="font-extrabold tracking-wide text-white mb-6 md:mb-0">
          <span className="bg-white text-3xl text-blue-700 px-3 py-1 rounded-lg shadow-sm">
            Travel<span className="text-xl text-blue-400">Buddy</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 text-lg font-medium mr-7">
          <a href="/about" className="hover:text-yellow-400 text-xl transition duration-300">About</a>
          <a href="/service" className="hover:text-yellow-400 text-xl transition duration-300">Service and Policy</a>
          
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-2xl mt-6 md:mt-0">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-yellow-300 transition duration-300">
            <FaFacebookF />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-yellow-300 transition duration-300">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-yellow-300 transition duration-300">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-yellow-300 transition duration-300">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Copyright */}
      {/* <p className="text-center text-sm text-gray-200 mt-10">
        &copy; {new Date().getFullYear()} <span className="font-semibold">TravelBuddy</span>. All rights reserved.
      </p> */}
    </footer>
  );
}

export default Footer;
