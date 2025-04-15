import { useState, useEffect } from "react";
import {
    FiUpload,
    FiFolderPlus,
    FiShare2,
    FiPieChart,
    FiImage,
    FiThumbsUp,
    FiMail,
} from "react-icons/fi";
import { QRCodeSVG } from "qrcode.react";
import { create } from "zustand";

// Zustand store for state management
export const useStore = create((set) => ({
    buckets: [],
    storageUsed: 0,
    totalLikes: 0,
    addBucket: (bucket) =>
        set((state) => ({ buckets: [...state.buckets, bucket] })),
    addImage: (bucketId, image) =>
        set((state) => ({
            buckets: state.buckets.map((bucket) =>
                bucket.id === bucketId
                    ? { ...bucket, images: [...bucket.images, image] }
                    : bucket
            ),
        })),
    incrementLikes: (bucketId) =>
        set((state) => ({
            buckets: state.buckets.map((bucket) =>
                bucket.id === bucketId
                    ? { ...bucket, likes: bucket.likes + 1 }
                    : bucket
            ),
            totalLikes: state.totalLikes + 1,
        })),
    updateStorage: (size) =>
        set((state) => ({
            storageUsed: state.storageUsed + size,
        })),
}));

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("upload");
    const [bucketName, setBucketName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedBucket, setSelectedBucket] = useState(null);
    const [shareLink, setShareLink] = useState("");

    const {
        buckets,
        storageUsed,
        totalLikes,
        addBucket,
        addImage,
        incrementLikes,
        updateStorage,
    } = useStore();

    // Create new bucket
    const handleCreateBucket = () => {
        if (!bucketName) return;

        const newBucket = {
            id: Date.now().toString(),
            name: bucketName,
            images: [],
            likes: 0,
            createdAt: new Date().toISOString(),
        };

        addBucket(newBucket);
        setBucketName("");
    };

    // Upload images to bucket
    const handleUpload = () => {
        if (!selectedBucket || selectedFiles.length === 0) return;

        selectedFiles.forEach((file) => {
            const newImage = {
                id:
                    Date.now().toString() +
                    Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: file.size,
                url: URL.createObjectURL(file),
                uploadedAt: new Date().toISOString(),
            };

            addImage(selectedBucket, newImage);
            updateStorage(file.size);
        });

        setSelectedFiles([]);
    };

    // Generate share link
    const generateShareLink = (bucketId) => {
        const bucket = buckets.find((b) => b.id === bucketId);
        if (!bucket) return;

        const link = `${
            window.location.origin
        }/client/${bucketId}?email=${encodeURIComponent(clientEmail)}`;
        setShareLink(link);
        setSelectedBucket(bucketId);
    };

    // Format storage size
    const formatStorage = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        if (bytes < 1024 * 1024 * 1024)
            return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        LensLock Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <FiPieChart className="text-blue-500" />
                            <span className="text-sm font-medium">
                                Storage: {formatStorage(storageUsed)} / 100GB
                            </span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                            JP
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-50 mr-4">
                                <FiFolderPlus className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Buckets</p>
                                <p className="text-2xl font-semibold">
                                    {buckets.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-purple-50 mr-4">
                                <FiImage className="h-6 w-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Images
                                </p>
                                <p className="text-2xl font-semibold">
                                    {buckets.reduce(
                                        (sum, bucket) =>
                                            sum + bucket.images.length,
                                        0
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-green-50 mr-4">
                                <FiThumbsUp className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Client Likes
                                </p>
                                <p className="text-2xl font-semibold">
                                    {totalLikes}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Buckets List */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-medium">
                                    Your Buckets
                                </h2>
                                <button
                                    onClick={() => setActiveTab("create")}
                                    className="text-sm text-blue-600 hover:text-blue-500"
                                >
                                    + New
                                </button>
                            </div>
                            <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                                {buckets.map((bucket) => (
                                    <li
                                        key={bucket.id}
                                        className={`px-6 py-4 cursor-pointer hover:bg-gray-50 ${
                                            selectedBucket === bucket.id
                                                ? "bg-blue-50"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedBucket(bucket.id)
                                        }
                                    >
                                        <div className="flex justify-between">
                                            <p className="font-medium">
                                                {bucket.name}
                                            </p>
                                            <span className="text-sm text-gray-500">
                                                {bucket.images.length} images
                                            </span>
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span className="text-xs text-gray-400">
                                                {new Date(
                                                    bucket.createdAt
                                                ).toLocaleDateString()}
                                            </span>
                                            <span className="text-xs flex items-center">
                                                <FiThumbsUp className="mr-1 text-green-500" />
                                                {bucket.likes}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Content Area */}
                    <div className="lg:col-span-2">
                        {activeTab === "upload" && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-medium mb-4">
                                    Upload Images
                                </h2>

                                {selectedBucket ? (
                                    <>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                multiple
                                                onChange={(e) =>
                                                    setSelectedFiles([
                                                        ...e.target.files,
                                                    ])
                                                }
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className="cursor-pointer flex flex-col items-center justify-center"
                                            >
                                                <FiUpload className="h-10 w-10 text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-600">
                                                    {selectedFiles.length > 0
                                                        ? `${selectedFiles.length} files selected`
                                                        : "Drag & drop files or click to browse"}
                                                </p>
                                            </label>
                                        </div>

                                        {selectedFiles.length > 0 && (
                                            <div className="mb-4">
                                                <h3 className="text-sm font-medium mb-2">
                                                    Selected Files:
                                                </h3>
                                                <ul className="border rounded-lg divide-y divide-gray-200">
                                                    {Array.from(
                                                        selectedFiles
                                                    ).map((file, index) => (
                                                        <li
                                                            key={index}
                                                            className="px-4 py-2 text-sm flex justify-between"
                                                        >
                                                            <span>
                                                                {file.name}
                                                            </span>
                                                            <span>
                                                                {formatStorage(
                                                                    file.size
                                                                )}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleUpload}
                                            disabled={
                                                selectedFiles.length === 0
                                            }
                                            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                                                selectedFiles.length > 0
                                                    ? "bg-blue-600 hover:bg-blue-700"
                                                    : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                        >
                                            Upload to{" "}
                                            {
                                                buckets.find(
                                                    (b) =>
                                                        b.id === selectedBucket
                                                )?.name
                                            }
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        Please select a bucket to upload images
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "create" && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-medium mb-4">
                                    Create New Bucket
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Bucket Name
                                        </label>
                                        <input
                                            type="text"
                                            value={bucketName}
                                            onChange={(e) =>
                                                setBucketName(e.target.value)
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., Wedding Portfolio"
                                        />
                                    </div>
                                    <button
                                        onClick={handleCreateBucket}
                                        disabled={!bucketName}
                                        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                                            bucketName
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        Create Bucket
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "share" && selectedBucket && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-medium mb-4">
                                    Share Bucket
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Client Email
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="email"
                                                value={clientEmail}
                                                onChange={(e) =>
                                                    setClientEmail(
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="client@example.com"
                                            />
                                            <button
                                                onClick={() =>
                                                    generateShareLink(
                                                        selectedBucket
                                                    )
                                                }
                                                disabled={!clientEmail}
                                                className={`py-2 px-4 rounded-r-md text-white font-medium ${
                                                    clientEmail
                                                        ? "bg-blue-600 hover:bg-blue-700"
                                                        : "bg-gray-400 cursor-not-allowed"
                                                }`}
                                            >
                                                <FiMail className="inline mr-1" />{" "}
                                                Generate Link
                                            </button>
                                        </div>
                                    </div>

                                    {shareLink && (
                                        <div className="space-y-4">
                                            <div className="border rounded-lg p-4">
                                                <h3 className="text-sm font-medium mb-2">
                                                    Share Link:
                                                </h3>
                                                <div className="flex items-center">
                                                    <input
                                                        type="text"
                                                        value={shareLink}
                                                        readOnly
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            navigator.clipboard.writeText(
                                                                shareLink
                                                            )
                                                        }
                                                        className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-r-md text-sm font-medium"
                                                    >
                                                        Copy
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="p-4 bg-white border rounded-lg">
                                                    <QRCodeSVG
                                                        value={shareLink}
                                                        size={128}
                                                    />
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Scan to share with client
                                                </p>
                                            </div>

                                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                                <p className="text-sm text-blue-800">
                                                    Only {clientEmail} will be
                                                    able to access this bucket.
                                                    They'll receive an email
                                                    with the link.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 flex justify-around">
                    <button
                        onClick={() => setActiveTab("upload")}
                        className={`flex flex-col items-center ${
                            activeTab === "upload"
                                ? "text-blue-600"
                                : "text-gray-500"
                        }`}
                    >
                        <FiUpload className="h-6 w-6" />
                        <span className="text-xs mt-1">Upload</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("create")}
                        className={`flex flex-col items-center ${
                            activeTab === "create"
                                ? "text-blue-600"
                                : "text-gray-500"
                        }`}
                    >
                        <FiFolderPlus className="h-6 w-6" />
                        <span className="text-xs mt-1">Create</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("share")}
                        className={`flex flex-col items-center ${
                            activeTab === "share"
                                ? "text-blue-600"
                                : "text-gray-500"
                        }`}
                    >
                        <FiShare2 className="h-6 w-6" />
                        <span className="text-xs mt-1">Share</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
