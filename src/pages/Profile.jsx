import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiMail, FiUser, FiMapPin, FiLink } from "react-icons/fi";
import Header from "../components/dashboard/Header";
import { useAuthStore } from "../store/useAuthStore";
import axiosInstance from "../api/axiosInstance";

const Profile = () => {
    const { user, loginUser: login, fetchUser } = useAuthStore();

    const [isLoading, setIsLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        bio:
            user?.bio ||
            "Digital designer & photographer. Creating meaningful experiences through visual storytelling.",
        location: user?.address || "San Francisco, CA",
        website: user?.url || "alexjohnson.design",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsEditing(false);
        setIsLoading(true);
        // Save to API would go here
        try {
            const { data } = await axiosInstance.put("/user/profile", {
                name: formData.name,
                // bio: formData.bio,
                address: formData.location,
                // website: formData.website,
            });
            console.log(data);
            // Update user state in store
            // login({
            //     _id: data?.data?._id,
            //     name: data?.data?.name,
            //     email: data?.data?.email,
            //     isPrisProfileComplete: data?.data?.isPrisProfileComplete,
            //     profile_pic: data?.data?.profile_pic,
            //     role: data?.data?.role,
            // });
            fetchUser();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
            setIsEditing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 w-full flex flex-col items-center justify-center">
            <Header title="Profile" />
            <div className="mx-auto px-4 py-8 w-full max-w-5xl h-full overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl shadow-sm overflow-y-auto"
                >
                    {/* Cover */}
                    <div className="h-40 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute bottom-4 right-4 bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-sm"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? (
                                <>
                                    <span>Cancel</span>
                                </>
                            ) : (
                                <>
                                    <FiEdit className="mr-1" />
                                    <span>Edit Profile</span>
                                </>
                            )}
                        </motion.button>
                    </div>

                    {/* Profile Content */}
                    <div className="px-6 pb-8 relative">
                        {/* Avatar */}
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-12 left-6 border-4 border-white rounded-full"
                        >
                            <img
                                src={user?.profile_pic?.url}
                                alt="Profile Picture"
                                loading="lazy"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        </motion.div>

                        <div className="pt-16">
                            <AnimatePresence mode="wait">
                                {isEditing ? (
                                    <motion.div
                                        key="edit"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name
                                            </label>
                                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                                <FiUser className="text-gray-400 mr-2" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                                <FiMail className="text-gray-400 mr-2" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full outline-none"
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Location
                                            </label>
                                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                                <FiMapPin className="text-gray-400 mr-2" />
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    className="w-full outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Website
                                            </label>
                                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                                <FiLink className="text-gray-400 mr-2" />
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    className="w-full outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Bio
                                            </label>
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleChange}
                                                rows="3"
                                                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSave}
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium mt-4"
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg
                                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        aria-hidden="true"
                                                    >
                                                        <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            fill="none"
                                                        />
                                                        <path
                                                            d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                    Saving...
                                                </span>
                                            ) : (
                                                <span>Save Changes</span>
                                            )}
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="view"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <h1 className="text-2xl font-bold text-gray-800">
                                            {formData.name}
                                        </h1>
                                        <p className="text-gray-600 mt-1 flex items-center">
                                            <FiMail
                                                className="mr-2"
                                                size={14}
                                            />
                                            {formData.email}
                                        </p>

                                        <p className="text-gray-700 mt-4 whitespace-pre-line">
                                            {formData.bio}
                                        </p>

                                        <div className="mt-6 space-y-2">
                                            {formData.location && (
                                                <p className="text-gray-600 flex items-center">
                                                    <FiMapPin
                                                        className="mr-2"
                                                        size={14}
                                                    />
                                                    {formData.location}
                                                </p>
                                            )}
                                            {formData.website && (
                                                <a
                                                    href={`https://${formData.website}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                                >
                                                    <FiLink
                                                        className="mr-2"
                                                        size={14}
                                                    />
                                                    {formData.website}
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
