import { motion } from "framer-motion";
import aboutImg from "../assets/images/about-travel.jpg";
import visionImg from "../assets/images/vision.jpg";
import teamImg from "../assets/images/team.jpg";

function AboutPage() {
  const vehicles = [
    { img: "car.jpg", title: "Car", desc: "Ideal for road trips and city exploration." },
    { img: "bus.jpg", title: "Bus", desc: "Budget-friendly group travel for long routes." },
    { img: "bike.jpg", title: "Bike", desc: "Perfect for solo travelers and mountain routes." },
    { img: "jeep.jpg", title: "Jeep", desc: "Reliable for rugged off-road journeys." },
    { img: "scooter.jpg", title: "Scooter", desc: "Convenient for short local rides." },
    { img: "van.jpg", title: "Van", desc: "Spacious choice for families or groups." },
    { img: "truck.jpg", title: "Pickup Truck", desc: "Adventure-friendly with gear storage." },
    { img: "train.jpg", title: "Train", desc: "Comfortable long-distance scenic routes." },
    { img: "boat.jpg", title: "Boat", desc: "Enjoy island hopping and coastal views." },
    { img: "plane.jpg", title: "Airplane", desc: "Fastest mode for international trips." },
    { img: "helicopter.jpg", title: "Helicopter", desc: "A thrilling aerial option ideal for sightseeing, mountain access, and remote destination travel with panoramic views." },
    { img: "jet.jpg", title: "Private Jet", desc: "The epitome of speed and luxury, jets offer the fastest way to travel long distances, perfect for international adventures and premium comfort." },
  ];

  return (
    <div className="text-gray-800 font-sans bg-gray-100">
      {/* Section 1: About */}
      <section className="py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
            About TravelBuddy ✈️
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto text-gray-600 leading-relaxed">
            TravelBuddy is your ultimate companion for planning, documenting, and sharing your travel adventures. Whether you're a solo backpacker or organizing a luxury retreat, we bring structure and soul to your journeys.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <img
            src={aboutImg}
            alt="About TravelBuddy"
            className="rounded-3xl w-full max-h-[550px] sm:h-[400px] md:h-[500px] lg:h-[550px] object-cover shadow-xl border border-gray-200"
          />
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Why Choose TravelBuddy?
            </h2>
            <ul className="space-y-5 text-gray-700 text-base sm:text-lg md:text-xl list-disc list-inside leading-relaxed">
              <li>Intuitive trip planner and itinerary builder</li>
              <li>Private & secure sharing of travel moments</li>
              <li>Collaborate in real time with co-travelers</li>
              <li>Offline access and automatic cloud syncing</li>
              <li>Rich media journal with maps, notes & photos</li>
              <li>AI-powered destination suggestions & weather tips</li>
              <li>Smart budget & expense tracking</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Vision */}
      <section className="py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ x: -70, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">Our Vision 🌍</h2>
          <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto text-gray-600 leading-relaxed">
            Travel should be inspiring, inclusive, and effortless. We aim to transform ordinary trips into unforgettable stories using smart, human-centered design.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6">Inspiring Exploration</h3>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
              At TravelBuddy, we believe every trip has the potential to change lives. We equip explorers with tools to document, discover, and revisit their most cherished travel moments.
            </p>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
              From adventure to relaxation, we help you weave purpose and passion into every destination.
            </p>
          </div>
          <img
            src={visionImg}
            alt="Vision"
            className="rounded-3xl w-full max-h-[550px] sm:h-[400px] md:h-[500px] lg:h-[550px] object-cover shadow-xl border border-gray-200"
          />
        </motion.div>
      </section>

      {/* Section 3: Team */}
      <section className="py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ scale: 0.92, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">Meet Our Team 👥</h2>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
            The dreamers, doers, and developers behind TravelBuddy are united by their love for travel and technology. Together, we’re shaping a better way to explore.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <img
            src={teamImg}
            alt="Our Team"
            className="rounded-3xl w-full max-h-[550px] sm:h-[400px] md:h-[500px] lg:h-[550px] object-cover shadow-xl border border-gray-200"
          />
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6">Our Culture & Values</h3>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
              TravelBuddy's culture is built on creativity, empathy, and the joy of shared experiences. We believe great tools come from great people working together.
            </p>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
              We foster an environment where experimentation is encouraged, diversity is celebrated, and users are always at the heart of what we do.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section 4: Travel Vehicles */}
      <section className="py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Explore Our Travel Vehicles 🚗🚌✈️
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
            From city rides to cross-country adventures, TravelBuddy supports every mode of travel. Here are some popular options our users love.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {vehicles.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: index * 0.12 }}
              viewport={{ once: true }}
            >
              <img
                src={require(`../assets/images/${item.img}`)}
                alt={item.title}
                className="w-full h-52 sm:h-56 md:h-60 lg:h-64 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
