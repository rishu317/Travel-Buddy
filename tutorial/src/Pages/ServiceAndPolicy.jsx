import { motion } from "framer-motion";
import { FaUserShield, FaRegHandshake, FaShieldAlt, FaUndoAlt } from "react-icons/fa";

function ServiceAndPolicy() {
    return (
        <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800 font-sans">
            <div className="max-w-6xl mx-auto px-6 py-20">
                {/* Header */}
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-4">
                        🛡️ Services & Policies
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        Explore how <a href="/home" className="font-semibold text-blue-700 underline hover:text-blue-900 transition">TravelBuddy</a> ensures a secure, inspiring, and fair experience for all travelers.
                    </p>

                </motion.div>

                {/* Services Section */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="mb-20 bg-white shadow-md rounded-2xl p-8"
                >
                    <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                        <FaRegHandshake className="text-blue-500" />
                        Our Services
                    </h2>
                    <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 ml-2">
                        <li>📅 Personalized Trip Planning with smart AI suggestions.</li>
                        <li>🤝 Real-time Collaboration with your travel buddies.</li>
                        <li>🗺️ Cloud-Synced Journals with notes, maps & photos.</li>
                        <li>💸 Expense tracking to manage travel budgets.</li>
                        <li>📡 Offline access for remote and international travel.</li>
                        <li>🔒 Private sharing of moments & gallery access.</li>
                    </ul>
                </motion.section>

                {/* Terms of Service */}
                <motion.section
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="mb-20 bg-blue-50 rounded-2xl shadow-inner p-8"
                >
                    <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                        <FaUserShield className="text-blue-500" />
                        Terms of Service
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        By using TravelBuddy, you agree to behave respectfully and responsibly online. Harmful, illegal, or plagiarized content is not allowed. Violating users may face suspension.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We may update these terms occasionally — users will be notified of significant changes.
                    </p>
                </motion.section>

                {/* Privacy Policy */}
                <motion.section
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="mb-20 bg-white rounded-2xl shadow-md p-8"
                >
                    <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                        <FaShieldAlt className="text-blue-500" />
                        Privacy Policy
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        🔐 Your data — including trips, emails, and photos — is encrypted and never sold. We value your trust.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        🔒 You control what you share. Only you decide which memories go public.
                    </p>
                </motion.section>

                {/* Refund Policy */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="bg-blue-50 rounded-2xl shadow-inner p-8"
                >
                    <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                        <FaUndoAlt className="text-blue-500" />
                        Refund Policy
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        💡 TravelBuddy offers free and premium tools. For premium purchases:
                    </p>
                    <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg ml-2">
                        <li>✅ Refunds valid within 7 days if features haven't been heavily used.</li>
                        <li>⛔ No refunds after 3rd-party bookings or extensive usage.</li>
                        <li>📩 Reach us at <a href="mailto:rishukumar02751@gmail.com" className="text-blue-600 underline">rishukumar02751@gmail.com</a> for help.</li>
                    </ul>
                </motion.section>
            </div>

            {/* Footer Note */}
            <div className="bg-blue-700 text-white text-sm py-6 mt-16 text-center rounded-t-2xl">
                &copy; {new Date().getFullYear()} <span className="font-semibold text-white">TravelBuddy</span> — All rights reserved.
            </div>
        </div>
    );
}

export default ServiceAndPolicy;
