// pages/Upload.js
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateBucketModal from "../components/bucket/CreateBucketModal";
import MediaUploader from "../components/bucket/MediaUploader";
import { FiUpload, FiPlus, FiFolder, FiArrowLeft } from "react-icons/fi";
import Header from "../components/dashboard/Header";
import { useBucketStore } from "../store/useBucketStore";
import EmptyState from "../components/bucket/EmptyState";

const Upload = () => {
    const { buckets, fetchBuckets, createBucket, addMediaToBucket, isLoading } =
        useBucketStore();

    const [selectedBucketId, setSelectedBucketId] = useState(null);
    const [showCreateBucketModal, setShowCreateBucketModal] = useState(false);
    const [showMediaUploader, setShowMediaUploader] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const res = await fetchBuckets();
            console.log("🚀 ~ useEffect ~ res:", res);
        };
        fetch();
    }, [fetchBuckets]);

    const handleCreateBucket = async (newBucket) => {
        const res = await createBucket(newBucket);
        if (res.success) {
            setShowCreateBucketModal(false);
        }
    };

    const handleUpload = (bucketId, mediaItems) => {
        addMediaToBucket(bucketId, mediaItems);
        setShowMediaUploader(false);
    };

    const selectedBucket = buckets.find((b) => b._id === selectedBucketId);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    console.log("===================>", selectedBucket);

    return (
        <div className="h-screen w-full bg-gray-50">
            <Header title="Upload Media" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mx-auto p-6 overflow-y-scroll"
            >
                <motion.div
                    className="rounded-2xl p-8 relative"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {selectedBucket ? (
                                <button
                                    onClick={() => setSelectedBucketId(null)}
                                    className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
                                >
                                    <FiArrowLeft className="mr-2" />
                                    Back to buckets
                                </button>
                            ) : (
                                // "Upload Media"
                                ""
                            )}
                        </h1>
                        <p className="text-gray-500">
                            {selectedBucket
                                ? `Adding to ${selectedBucket?.name}`
                                : // "Organize your photos and videos in buckets"
                                  ""}
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12 text-gray-500">
                            Loading buckets...
                        </div>
                    ) : buckets.length === 0 ? (
                        <EmptyState
                            onCreate={() => setShowCreateBucketModal(true)}
                        />
                    ) : // <motion.div
                    //     className="text-center py-12 flex flex-col items-center justify-center"
                    //     initial={{ scale: 0.95, opacity: 0 }}
                    //     animate={{ scale: 1, opacity: 1 }}
                    // >
                    //     <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    //         <FiFolder className="w-8 h-8 text-blue-500" />
                    //     </div>
                    //     <h2 className="text-xl font-medium text-gray-700 mb-3">
                    //         No buckets found
                    //     </h2>
                    //     <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    //         Create your first bucket to start organizing
                    //         your media files
                    //     </p>
                    //     <motion.button
                    //         whileHover={{ scale: 1.03 }}
                    //         whileTap={{ scale: 0.97 }}
                    //         onClick={() => setShowCreateBucketModal(true)}
                    //         className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition"
                    //     >
                    //         <FiPlus className="text-lg" />
                    //         Create Bucket
                    //     </motion.button>
                    // </motion.div>
                    selectedBucket ? (
                        <MediaUploader
                            bucketId={selectedBucket._id}
                            onClose={() => setSelectedBucketId(null)}
                            // onUpload={(mediaItems) =>
                            //     handleUpload(selectedBucket.id, mediaItems)
                            // }
                        />
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        >
                            {buckets.map((bucket) => {
                                console.log(
                                    "🚀 ~ {buckets.map ~ bucket:",
                                    bucket._id
                                );
                                return (
                                    <motion.div
                                        key={bucket._id}
                                        variants={itemVariants}
                                        className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
                                        onClick={() => {
                                            setSelectedBucketId(bucket._id);
                                            setShowMediaUploader(true);
                                        }}
                                    >
                                        <div className="aspect-square overflow-hidden rounded-t-2xl">
                                            <img
                                                src={
                                                    bucket?.mediaList[0].media
                                                        ?.url ||
                                                    "/default-cover.jpg"
                                                }
                                                alt={bucket.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {bucket?.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {bucket?.mediaList?.length} item
                                                {bucket.itemCount !== 1 && "s"}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {showCreateBucketModal && (
                    <CreateBucketModal
                        onClose={() => setShowCreateBucketModal(false)}
                        onCreate={handleCreateBucket}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Upload;

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import CreateBucketModal from "../components/bucket/CreateBucketModal";
// import MediaUploader from "../components/bucket/MediaUploader";
// import { FiUpload, FiPlus, FiFolder, FiArrowLeft } from "react-icons/fi";
// import Header from "../components/dashboard/Header";
// import { useBucketStore } from "../store/useBucketStore";

// const Upload = () => {
//     const [buckets, setBuckets] = useState([
//         {
//             id: "1",
//             title: "Vacation Photos",
//             description: "Summer 2023 memories",
//             itemCount: 12,
//             coverImage: "https://source.unsplash.com/random/800x600/?vacation",
//         },
//         {
//             id: "2",
//             title: "Work Projects",
//             description: "Client deliverables",
//             itemCount: 8,
//             coverImage: "https://source.unsplash.com/random/800x600/?office",
//         },
//     ]);

//     const { fetchBuckets } = useBucketStore();

//     const [selectedBucket, setSelectedBucket] = useState(null);
//     const [showCreateBucketModal, setShowCreateBucketModal] = useState(false);
//     const [showMediaUploader, setShowMediaUploader] = useState(false);

//     useEffect(async () => {
//         await fetchBuckets();
//         console.log("🚀 ~ useEffect ~ res:", res);
//     }, []);

//     const handleCreateBucket = (newBucket) => {
//         setBuckets([
//             ...buckets,
//             {
//                 ...newBucket,
//                 id: Date.now().toString(),
//                 itemCount: 0,
//                 coverImage:
//                     "https://source.unsplash.com/random/800x600/?folder",
//             },
//         ]);
//         setShowCreateBucketModal(false);
//     };

//     const handleUpload = (bucketId, mediaItems) => {
//         setBuckets(
//             buckets.map((bucket) =>
//                 bucket.id === bucketId
//                     ? {
//                           ...bucket,
//                           itemCount: bucket.itemCount + mediaItems.length,
//                           coverImage: mediaItems[0]?.url || bucket.coverImage,
//                       }
//                     : bucket
//             )
//         );
//         setShowMediaUploader(false);
//     };

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 type: "spring",
//                 stiffness: 100,
//             },
//         },
//     };

//     return (
//         <div className="min-h-screen w-full bg-gray-50">
//             <Header title="Upload Media" />

//             <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="max-w-6xl mx-auto p-6"
//             >
//                 <motion.div
//                     className="bg-white rounded-2xl shadow-sm p-8 relative"
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                 >
//                     <div className="mb-8">
//                         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                             {selectedBucket ? (
//                                 <button
//                                     onClick={() => setSelectedBucket(null)}
//                                     className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
//                                 >
//                                     <FiArrowLeft className="mr-2" />
//                                     Back to buckets
//                                 </button>
//                             ) : (
//                                 "Upload Media"
//                             )}
//                         </h1>
//                         <p className="text-gray-500">
//                             {selectedBucket
//                                 ? `Adding to ${
//                                       buckets.find(
//                                           (b) => b.id === selectedBucket
//                                       )?.title
//                                   }`
//                                 : "Organize your photos and videos in buckets"}
//                         </p>
//                     </div>

//                     {buckets.length === 0 ? (
//                         <motion.div
//                             className="text-center py-12"
//                             initial={{ scale: 0.95, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                         >
//                             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
//                                 <FiFolder className="w-8 h-8 text-blue-500" />
//                             </div>
//                             <h2 className="text-xl font-medium text-gray-700 mb-3">
//                                 No buckets found
//                             </h2>
//                             <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                                 Create your first bucket to start organizing
//                                 your media files
//                             </p>
//                             <motion.button
//                                 whileHover={{ scale: 1.03 }}
//                                 whileTap={{ scale: 0.97 }}
//                                 onClick={() => setShowCreateBucketModal(true)}
//                                 className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
//                             >
//                                 <FiPlus className="mr-2" />
//                                 Create Bucket
//                             </motion.button>
//                         </motion.div>
//                     ) : (
//                         <>
//                             {!selectedBucket ? (
//                                 <>
//                                     <motion.div
//                                         variants={containerVariants}
//                                         initial="hidden"
//                                         animate="visible"
//                                         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
//                                     >
//                                         {buckets.map((bucket) => (
//                                             <motion.div
//                                                 key={bucket.id}
//                                                 variants={itemVariants}
//                                                 whileHover={{
//                                                     y: -4,
//                                                     scale: 1.02,
//                                                 }}
//                                                 onClick={() =>
//                                                     setSelectedBucket(bucket.id)
//                                                 }
//                                                 className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
//                                             >
//                                                 <div className="h-40 bg-gray-100 overflow-hidden">
//                                                     <img
//                                                         src={bucket.coverImage}
//                                                         alt={bucket.title}
//                                                         className="w-full h-full object-cover transition-transform group-hover:scale-105"
//                                                     />
//                                                 </div>
//                                                 <div className="p-5">
//                                                     <div className="flex items-start">
//                                                         <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mr-3">
//                                                             <FiFolder className="w-4 h-4" />
//                                                         </div>
//                                                         <div>
//                                                             <h3 className="font-semibold text-gray-800">
//                                                                 {bucket.title}
//                                                             </h3>
//                                                             <p className="text-sm text-gray-500 mt-1 line-clamp-1">
//                                                                 {
//                                                                     bucket.description
//                                                                 }
//                                                             </p>
//                                                             <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 rounded-full">
//                                                                 {
//                                                                     bucket.itemCount
//                                                                 }{" "}
//                                                                 {bucket.itemCount ===
//                                                                 1
//                                                                     ? "item"
//                                                                     : "items"}
//                                                             </span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </motion.div>
//                                         ))}
//                                     </motion.div>

//                                     <div className="flex justify-center">
//                                         <motion.button
//                                             whileHover={{ scale: 1.03 }}
//                                             whileTap={{ scale: 0.97 }}
//                                             onClick={() =>
//                                                 setShowCreateBucketModal(true)
//                                             }
//                                             className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
//                                         >
//                                             <FiPlus className="mr-2" />
//                                             Create New Bucket
//                                         </motion.button>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <div className="text-center py-12">
//                                     <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
//                                         <FiUpload className="w-10 h-10 text-blue-500" />
//                                     </div>
//                                     <h2 className="text-xl font-medium text-gray-700 mb-3">
//                                         Ready to upload to{" "}
//                                         {
//                                             buckets.find(
//                                                 (b) => b.id === selectedBucket
//                                             )?.title
//                                         }
//                                     </h2>
//                                     <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                                         {
//                                             buckets.find(
//                                                 (b) => b.id === selectedBucket
//                                             )?.description
//                                         }
//                                     </p>
//                                     <motion.button
//                                         whileHover={{ scale: 1.03 }}
//                                         whileTap={{ scale: 0.97 }}
//                                         onClick={() =>
//                                             setShowMediaUploader(true)
//                                         }
//                                         className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
//                                     >
//                                         <FiUpload className="mr-2" />
//                                         Upload Media Now
//                                     </motion.button>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </motion.div>
//             </motion.div>

//             <AnimatePresence>
//                 {showCreateBucketModal && (
//                     <CreateBucketModal
//                         onClose={() => setShowCreateBucketModal(false)}
//                         onCreate={handleCreateBucket}
//                     />
//                 )}
//             </AnimatePresence>

//             <AnimatePresence>
//                 {showMediaUploader && selectedBucket && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//                     >
//                         <motion.div
//                             initial={{ scale: 0.95, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.95, y: 20 }}
//                             className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//                         >
//                             <MediaUploader
//                                 bucketId={selectedBucket}
//                                 onUpload={handleUpload}
//                                 onClose={() => setShowMediaUploader(false)}
//                             />
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default Upload;
