import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/dashboard/Header";
import MediaGrid from "../components/bucket/MediaGrid";
import EmptyBucket from "../components/bucket/EmptyBucket";

const BucketDetails = () => {
    const [bucket, setBucket] = useState({
        id: "1",
        title: "Travel Memories",
        description: "My summer 2025 vacation photos",
        createdAt: "2025-05-05T00:00:00Z",
        itemCount: 0,
        viewerCount: 12,
        media: [],
    });

    const handleUpload = (bucketId, mediaItems) => {
        setBucket((prev) => ({
            ...prev,
            media: [...prev.media, ...mediaItems],
            itemCount: prev.itemCount + mediaItems.length,
        }));
    };

    return (
        <motion.section
            className="min-h-screen flex flex-col w-full bg-gray-50 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Header
                title={bucket.title}
                backVisible={true}
                // meta={`${bucket.itemCount} items • ${bucket.viewerCount} viewers`}
            />

            <div className="container mx-auto px-4 py-2 max-w-7xl overflow-y-auto">
                {/* {bucket.description &&  (
                    <motion.p
                        className="text-gray-600 mb-8 max-w-3xl"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {bucket.description}
                    </motion.p>
                )} */}

                {bucket.media.length > 0 ? (
                    <MediaGrid media={bucket.media} />
                ) : (
                    <EmptyBucket bucketId={bucket.id} onUpload={handleUpload} />
                )}
            </div>
        </motion.section>
    );
};

export default BucketDetails;
