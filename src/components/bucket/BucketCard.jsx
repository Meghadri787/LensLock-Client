import React from "react";
import { motion } from "framer-motion";
import {
    FiFolder,
    FiShare2,
    FiTrash2,
    FiEye,
    FiImage,
    FiUsers,
} from "react-icons/fi";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const BucketCard = ({ bucket, onShare, onDelete }) => {
    return (
        <motion.div
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg mr-4">
                            <FiFolder size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {bucket.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Created{" "}
                                {format(
                                    new Date(bucket.createdAt),
                                    "MMM d, yyyy"
                                )}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(bucket.id);
                        }}
                        className="text-red-500 bg-red-50 p-2 rounded-full hover:text-red-700 transition-colors"
                        aria-label="Delete bucket"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {bucket.description || "No description"}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center justify-center gap-1">
                        <FiImage /> {bucket.itemCount || 0} items
                    </span>
                    <span className="flex items-center justify-center gap-1">
                        <FiUsers /> {bucket.viewerCount || 0} viewers
                    </span>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-4">
                    <Link
                        to={`/buckets/${bucket.id}`}
                        className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <FiEye size={16} className="mr-2" />
                        View Details
                    </Link>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onShare();
                        }}
                        className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <FiShare2 size={16} className="mr-2" />
                        Share
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default BucketCard;
