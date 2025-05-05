import React, { useState } from "react";
import { motion } from "framer-motion";
// import QRCode from "qrcode.react";
import { FiCopy } from "react-icons/fi";

const ShareBucketModal = ({ bucket, onClose }) => {
    const [copied, setCopied] = useState(false);
    const shareLink = `${window.location.origin}/bucket/${bucket.id}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
                className="bg-white rounded-xl w-full max-w-md"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Share Bucket</h2>
                    <div className="flex flex-col items-center mb-6">
                        <div className="p-4 bg-white border border-gray-200 rounded-lg mb-4">
                            {/* <QRCode value={shareLink} size={128} /> */}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                            Scan QR code or share link
                        </p>
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <input
                            type="text"
                            readOnly
                            value={shareLink}
                            className="flex-1 px-3 py-2 text-sm focus:outline-none"
                        />
                        <button
                            onClick={copyToClipboard}
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <FiCopy
                                size={18}
                                className={
                                    copied ? "text-green-500" : "text-gray-600"
                                }
                            />
                        </button>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ShareBucketModal;
