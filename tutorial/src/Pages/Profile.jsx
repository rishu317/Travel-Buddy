import { useState, useEffect } from "react";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../utils/serverHelpers";
import { toast } from "react-toastify";
import {
  FaImage,
  FaSave,
  FaTrashAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Profile() {
  const [user, setUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await makeAuthenticatedGETRequest("/auth/profile");
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data.");
      }
    };

    fetchUserData();
  }, []);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Delete bio
  const handleDeleteBio = () => {
    setUser((prev) => ({ ...prev, bio: "" }));
  };

  // Delete profile picture
  const handleDeleteDP = async () => {
    try {
      await makeAuthenticatedPOSTRequest("/auth/delete-dp", {});
      setUser((prev) => ({ ...prev, dp: "" }));
      toast.success("Profile picture deleted.");
    } catch (err) {
      toast.error("Failed to delete profile picture.");
    }
  };

  // Update profile
  const handleUpdate = async () => {
    try {
      const payload = { ...user };
      if (password.trim()) payload.password = password;

      const response = await makeAuthenticatedPOSTRequest("/auth/update", payload);

      if (response.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.message || "Update failed on server.");
      }
    } catch (err) {
      console.error("Update Error:", err.message);
      toast.error("Update failed. Check console for details.");
    }
  };

  // Handle file input
  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload profile picture
  const uploadImage = async () => {
    if (!selectedFile) return toast.warning("Please select an image to upload.");

    const formData = new FormData();
    formData.append("dp", selectedFile);

    try {
      const res = await fetch("http://localhost:8080/auth/upload-dp", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          )}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.dp) {
        setUser((prev) => ({ ...prev, dp: data.dp }));
        toast.success("Profile picture uploaded.");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (err) {
      console.error("Upload Error:", err.message);
      toast.error("Failed to upload image.");
    }
  };

  // Logout
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <div
      className="min-h-screen py-12 px-4 bg-stone-100"
      
    >
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 md:p-10 border border-blue-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-blue-800 drop-shadow-sm">
          Your TravelBuddy Profile
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Profile Picture Section */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow p-6 border border-gray-200 text-center">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Profile Picture</h2>
            <img
              src={user.dp ? user.dp : "/default-avatar.png"}
              alt="Profile"
              className="w-40 h-40 mx-auto rounded-full object-cover border-2 border-black shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="mt-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-blue-200 rounded-3xl w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={uploadImage}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-full shadow transition-all"
                >
                  <FaImage className="inline mr-2" /> Upload Picture
                </button>
                <button
                  onClick={handleDeleteDP}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 rounded-full shadow transition-all"
                >
                  <FaTrashAlt className="inline mr-2" /> Delete Picture
                </button>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">User ID</label>
              <input
                name="userId"
                value={user.userId || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 px-4 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">First Name</label>
              <input
                name="firstName"
                value={user.firstName || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 px-4 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={user.bio || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-1 pl-4 text-gray-800 focus:ring-2 focus:ring-blue-400"
                rows="3"
              />
              <button
                onClick={handleDeleteBio}
                className="text-base text-red-500 hover:underline mt-1"
              >
                <FaTrashAlt className="inline mr-1 text-sm" /> Clear Bio
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">External Link</label>
              <input
                name="externalLink"
                value={user.externalLink || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 px-4 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Change Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank if not changing"
                className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 px-4 py-2 text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
          <button
            onClick={handleUpdate}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-xl transition-all text-lg"
          >
            <FaSave className="inline mr-2" /> Save Changes
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-xl transition-all text-lg"
          >
            <FaSignOutAlt className="inline mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
