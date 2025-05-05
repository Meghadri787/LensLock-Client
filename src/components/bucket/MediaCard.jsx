import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiShare2, FiMoreHorizontal } from "react-icons/fi";

const MediaCard = ({ media, isLiked, onLike }) => {
    return (
        <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all"
            whileHover={{ y: -4 }}
            layout
        >
            <div className="relative group">
                <img
                    src={media.url}
                    alt={media.title}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button
                        onClick={() => onLike(media.id)}
                        className={`p-2 rounded-full ${
                            isLiked
                                ? "bg-red-500 text-white"
                                : "bg-white text-gray-700"
                        }`}
                    >
                        <FiHeart
                            size={18}
                            fill={isLiked ? "currentColor" : "none"}
                        />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800 line-clamp-1">
                        {media.title}
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600">
                        <FiMoreHorizontal size={18} />
                    </button>
                </div>

                {media.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {media.description}
                    </p>
                )}

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                        {new Date(media.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                            <FiShare2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MediaCard;
