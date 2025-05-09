import React, { useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { FiCopy, FiX, FiShare2 } from "react-icons/fi";

const ShareBucketModal = ({ bucket, onClose }) => {
    const [copied, setCopied] = useState(false);
    const shareLink = `${window.location.origin}/bucket/${bucket.id}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
                className="bg-white rounded-xl w-full max-w-md shadow-xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <FiShare2 className="text-gray-600" />
                            <h2 className="text-xl font-semibold text-gray-800">
                                Share "{bucket.title}"
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <FiX className="text-gray-500" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center mb-6">
                        <div className="p-4 bg-white border border-gray-200 rounded-lg mb-4">
                            <QRCode
                                value={shareLink}
                                size={180}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="Q" // Error correction level
                            />
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                            Scan QR code to access this bucket
                        </p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Shareable link
                        </label>
                        <div className="flex rounded-lg overflow-hidden border border-gray-300">
                            <input
                                type="text"
                                readOnly
                                value={shareLink}
                                className="flex-1 px-4 py-2 text-sm bg-gray-50 truncate"
                                onClick={(e) => e.target.select()}
                            />
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={copyToClipboard}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <FiCopy
                                    className={
                                        copied
                                            ? "text-green-500"
                                            : "text-gray-600"
                                    }
                                />
                                <span className="text-sm">
                                    {copied ? "Copied!" : "Copy"}
                                </span>
                            </motion.button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Done
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ShareBucketModal;
