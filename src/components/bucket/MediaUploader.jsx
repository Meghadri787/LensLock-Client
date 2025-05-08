import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiUpload,
    FiX,
    FiImage,
    FiVideo,
    FiFile,
    FiCheck,
} from "react-icons/fi";

const MediaUploader = ({ onUpload, bucketId, onClose }) => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setFiles((prev) => [...prev, ...selectedFiles]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            setFiles((prev) => [...prev, ...droppedFiles]);
        }
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);

        try {
            // Simulate upload process
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const mediaItems = files.map((file) => ({
                id: `media-${Date.now()}-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                name: file.name,
                size: file.size,
                type: file.type.startsWith("image/")
                    ? "image"
                    : file.type.startsWith("video/")
                    ? "video"
                    : "file",
                url: URL.createObjectURL(file),
                thumbnail: file.type.startsWith("image/")
                    ? URL.createObjectURL(file)
                    : null,
                createdAt: new Date().toISOString(),
            }));

            onUpload(bucketId, mediaItems);
            setUploadComplete(true);
            setTimeout(() => {
                setFiles([]);
                setUploadComplete(false);
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    const getFileIcon = (file) => {
        if (file.type.startsWith("image/"))
            return <FiImage className="w-5 h-5 text-blue-500" />;
        if (file.type.startsWith("video/"))
            return <FiVideo className="w-5 h-5 text-purple-500" />;
        return <FiFile className="w-5 h-5 text-gray-500" />;
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-full"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                    Upload Media
                </h3>
                <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-gray-100"
                >
                    <FiX className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {uploadComplete ? (
                <motion.div
                    className="flex flex-col items-center justify-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <FiCheck className="w-10 h-10 text-green-500" />
                    </div>
                    <h4 className="text-xl font-medium text-gray-800 mb-2">
                        Upload Complete!
                    </h4>
                    <p className="text-gray-500">
                        {files.length} files uploaded successfully
                    </p>
                </motion.div>
            ) : (
                <>
                    <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                            isDragging
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 hover:border-blue-400 bg-gray-50"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                            className="hidden"
                            accept="image/*,video/*"
                        />

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <FiUpload className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                {files.length > 0
                                    ? "Add more files"
                                    : "Drag and drop files here"}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                or click to browse your device
                            </p>
                            <p className="text-xs text-gray-400">
                                Supports JPG, PNG, GIF, MP4 up to 50MB
                            </p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {files.length > 0 && (
                            <motion.div
                                className="mt-6"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <h4 className="text-sm font-medium text-gray-700 mb-3">
                                    Selected Files ({files.length})
                                </h4>

                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {files.map((file, index) => (
                                        <motion.div
                                            key={`${file.name}-${index}`}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex items-center min-w-0">
                                                <div className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center mr-3">
                                                    {getFileIcon(file)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatFileSize(
                                                            file.size
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFile(index);
                                                }}
                                                className="p-1 rounded-full hover:bg-gray-200 ml-2"
                                            >
                                                <FiX className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={onClose}
                                        disabled={uploading}
                                        className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <motion.button
                                        whileTap={{
                                            scale: uploading ? 1 : 0.95,
                                        }}
                                        onClick={handleUpload}
                                        disabled={
                                            uploading || files.length === 0
                                        }
                                        className={`px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2 ${
                                            uploading
                                                ? "bg-blue-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    >
                                        {uploading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Uploading...
                                            </>
                                        ) : (
                                            "Upload Files"
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </motion.div>
    );
};

export default MediaUploader;
