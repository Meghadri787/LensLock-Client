import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiLoader, FiTrash2 } from "react-icons/fi";
import { format } from "date-fns";
import { useMediaStore } from "../../store/useMediaStore";
import { useAuthStore } from "../../store/useAuthStore";

const MediaCard = ({ media, isLiked, onLike }) => {
    const { deleteMedia, isLoading } = useMediaStore();
    const { user } = useAuthStore();

    console.log("=============>", user?._id);

    return (
        <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all"
            whileHover={{ y: -4 }}
            layout
        >
            <>
                <div className="relative group">
                    <img
                        src={media?.media?.url}
                        alt={media}
                        className="w-full h-64 object-cover"
                    />
                    {user?.role === "photographer" && (
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <button
                                onClick={() => deleteMedia(media?._id)}
                                className={
                                    "p-2 rounded-full bg-white text-gray-700"
                                }
                            >
                                <FiTrash2 size={18} className="text-red-600" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="pb-4 px-4">
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400">
                            {/* {new Date(media.createdAt).toLocaleDateString()} */}
                            {format(
                                new Date(media?.createdAt),
                                "MMMM d,yyyy 'at' hh:mm a"
                            )}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    onLike(media?._id);
                                    console.log(media?._id);
                                }}
                                className={`p-2 rounded-full ${
                                    media?.likes?.includes(user?._id)
                                        ? "bg-red-100/20 text-red-600"
                                        : "bg-white text-gray-700"
                                }`}
                            >
                                <FiHeart
                                    size={18}
                                    fill={
                                        media?.likes?.includes(user?._id)
                                            ? "#dc2626"
                                            : "none"
                                    }
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </motion.div>
    );
};

export default MediaCard;
