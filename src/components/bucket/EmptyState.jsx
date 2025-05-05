import React from "react";
import { motion } from "framer-motion";
import { FiFolder } from "react-icons/fi";

const EmptyState = ({ onCreate }) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <div className="p-6 mb-6 bg-gray-100 rounded-full">
                <FiFolder size={48} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">
                No buckets found
            </h2>
            <p className="text-gray-500 max-w-md mb-8">
                You haven't created any buckets yet. Create your first bucket to
                start organizing your photos and videos.
            </p>
            <button
                onClick={onCreate}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
                Create Bucket
            </button>
        </motion.div>
    );
};

export default EmptyState;
