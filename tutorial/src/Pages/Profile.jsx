import { useState, useEffect } from "react";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../utils/serverHelpers";
import { toast } from "react-toastify";
import { FaSave, FaSignOutAlt, FaTrash, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Profile() {
  const [user, setUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await makeAuthenticatedGETRequest("/auth/profile");
        setUser(res);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile.");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteBio = () => setUser((prev) => ({ ...prev, bio: "" }));

  const handleDeleteDp = async () => {
    try {
      await makeAuthenticatedPOSTRequest("/auth/delete-dp", {});
      setUser((prev) => ({ ...prev, dp: "" }));
      toast.success("Profile picture removed.");
    } catch {
      toast.error("Failed to remove picture.");
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = { ...user };
      if (password.trim()) payload.password = password;

      const res = await makeAuthenticatedPOSTRequest("/auth/update", payload);
      if (res.success) {
        toast.success("Profile updated.");
      } else {
        toast.error(res.message || "Update failed.");
      }
    } catch {
      toast.error("Failed to update.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return toast.warning("Select an image first.");
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
        toast.success("Picture updated.");
      } else toast.error("Failed to upload.");
    } catch {
      toast.error("Upload error.");
    }
  };

  const logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
    toast.info("Logged out.");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 dark:text-blue-300">
          Profile Settings
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {/* Enhanced Profile Picture Section */}
          <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-3">
              Profile Picture
            </h2>

            <div className="relative group">
              <img
                src={user.dp || "/default-avatar.png"}
                alt="avatar"
                className="w-28 h-28 rounded-full border-2 border-blue-300 shadow object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <label
                htmlFor="dpUpload"
                className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full text-white shadow cursor-pointer hover:bg-blue-700 text-xs"
                title="Upload new picture"
              >
                <FaCamera />
              </label>
              <input
                type="file"
                id="dpUpload"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
                accept="image/*"
              />
            </div>

            <div className="mt-4 flex flex-col gap-2 w-full">
              <button
                onClick={handleUpload}
                className="text-xs px-3 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Upload Picture
              </button>

              <button
                onClick={handleDeleteDp}
                className="text-xs px-3 py-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                <FaTrash className="inline mr-1 text-sm" /> Remove
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <label className="text-gray-700 dark:text-gray-300">User ID</label>
              <input
                name="userId"
                value={user.userId || ""}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-300">First Name</label>
              <input
                name="firstName"
                value={user.firstName || ""}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-300">Bio</label>
              <textarea
                name="bio"
                rows="2"
                value={user.bio || ""}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleDeleteBio}
                className="text-red-500 text-sm hover:underline mt-1"
              >
                Clear Bio
              </button>
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-300">External Link</label>
              <input
                name="externalLink"
                value={user.externalLink || ""}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-300">Change Password</label>
              <input
                type="password"
                placeholder="Leave blank if not changing"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-4 mt-8">
          <button
            onClick={handleUpdate}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full shadow text-lg"
          >
            <FaSave className="inline mr-2" /> Save Changes
          </button>

          <button
            onClick={logout}
            className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow text-lg"
          >
            <FaSignOutAlt className="inline mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
