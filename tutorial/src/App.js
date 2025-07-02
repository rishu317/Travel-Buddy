import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Pages
import Home from "./Pages/Home";
import Destinations from "./Pages/Destinations";
import PlanTrip from "./Pages/PlanTrip";
import Blog from "./Pages/Blog";
import BlogDetail from "./Pages/BlogDetail";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LoggedInHome from "./Pages/LoggedInHome";
import About from "./Pages/About";
import ServiceAndPolicy from "./Pages/ServiceAndPolicy";
import IndiaDest from "./Pages/IndiaDest";
import EnglandDest from "./Pages/EnglandDest";
import ChinaDest from "./Pages/ChinaDest";
import NepalDest from "./Pages/NepalDest";
import PakistanDest from "./Pages/Pakistan";
import UsaDest from "./Pages/UsaDest";
import NewZealandDest from "./Pages/NewZealandDest";
import CostaRicaDest from "./Pages/CostaRicaDest";
import IcelandDest from "./Pages/IcelandDest";
import SrilankaDest from "./Pages/SrilankaDest";
import PortugalDest from "./Pages/PortugalDest";
import JapanDest from "./Pages/JapanDest";
import SpainDest from "./Pages/SpainDest";
import ChatBoard from "./Pages/ChatBoard";
import Profile from "./Pages/Profile";
import MyTrip from "./Pages/MyTrip";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  return (
    <Router>
      <Navbar />
      {cookie.token ? (
        <Routes>
          /* Logged In Routes */
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<LoggedInHome />} />
          <Route path="/plan" element={<PlanTrip />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          {/* Destination Routs */}
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/india" element={<IndiaDest />} />
          <Route path="/destinations/england" element={<EnglandDest />} />
          <Route path="/destinations/china" element={<ChinaDest />} />
          <Route path="/destinations/nepal" element={<NepalDest />} />
          <Route path="/destinations/pakistan" element={<PakistanDest />} />
          <Route path="/destinations/usa" element={<UsaDest />} />
          <Route path="/destinations/pakistan" element={<PakistanDest />} />
          <Route path="/destinations/newzealand" element={<NewZealandDest />} />
          <Route path="/destinations/costarice" element={<CostaRicaDest />} />
          <Route path="/destinations/iceland" element={<IcelandDest />} />
          <Route path="/destinations/srilanka" element={<SrilankaDest />} />
          <Route path="/destinations/portugal" element={<PortugalDest />} />
          <Route path="/destinations/japan" element={<JapanDest />} />
          <Route path="/destinations/spain" element={<SpainDest />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/my-trips" element={<MyTrip />} />


          <Route path="chatboard" element={<ChatBoard />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<ServiceAndPolicy />} />
          <Route path="*" element={<Navigate to="/home" />} />
          
        </Routes>
      )
      :
      (
        <Routes>
          /* Logged out Routes */
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      <Footer />
    </Router>
  );
}

export default App;
