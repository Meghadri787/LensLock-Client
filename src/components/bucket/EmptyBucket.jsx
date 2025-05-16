import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiImage, FiUpload } from "react-icons/fi";
import MediaUploader from "./MediaUploader";
import { useLayoutEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useMediaStore } from "../../store/useMediaStore";


const EmptyBucket = ({ bucketId, onUpload }) => {
    const [uploadActive, setUploadActive] = useState(false);
    const { mediaList } = useMediaStore()
    const { user } = useAuthStore();

    console.log("========================" , mediaList);
    

    return (
        <div className="relative w-full">
            <AnimatePresence>
                {uploadActive ? (
                    <MediaUploader
                        bucketId={bucketId}
                        onUpload={onUpload}
                        onClose={() => setUploadActive(false)}
                    />
                ) : (
                    <motion.div
                        className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border-2 border-dashed border-gray-200 bg-white w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-5 mb-6 bg-gray-100 rounded-full">
                            <FiImage size={32} className="text-gray-400" />
                        </div>
                        <h2 className="text-xl font-medium text-gray-700 mb-2">
                            This bucket is empty
                        </h2>
                        <p className="text-gray-500 max-w-md mb-8">
                            Upload photos or videos to start building your
                            collection
                        </p>
                      

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setUploadActive(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <FiUpload size={18} />
                            Upload Media
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EmptyBucket;
