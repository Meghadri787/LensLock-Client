import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/dashboard/Header";
import MediaGrid from "../components/bucket/MediaGrid";
import EmptyBucket from "../components/bucket/EmptyBucket";

const BucketDetails = () => {
    const [likedMedia, setLikedMedia] = useState({});

    // Mock data - replace with your actual data source
    const bucket = {
        id: "1",
        title: "Travel Memories",
        description: "My summer 2025 vacation photos",
        createdAt: "2025-05-05T00:00:00Z",
        itemCount: 0,
        viewerCount: 12,
        media: [], // Empty array for demo - populate with your media items
    };

    const handleLike = (mediaId) => {
        setLikedMedia((prev) => ({
            ...prev,
            [mediaId]: !prev[mediaId],
        }));
    };

    return (
        <motion.section
            className="min-h-screen flex flex-col w-full bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Header
                title={bucket.title}
                backVisible={true}
                meta={`${bucket.itemCount} items • ${bucket.viewerCount} viewers`}
            />

            <div className="container mx-auto px-4 py-6 max-w-7xl">
                {bucket.description && (
                    <motion.p
                        className="text-gray-600 mb-8 max-w-3xl"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {bucket.description}
                    </motion.p>
                )}

                {bucket.media && bucket.media.length > 0 ? (
                    <MediaGrid
                        media={bucket.media}
                        likedMedia={likedMedia}
                        onLike={handleLike}
                    />
                ) : (
                    <EmptyBucket bucketId={bucket.id} />
                )}
            </div>
        </motion.section>
    );
};

export default BucketDetails;
