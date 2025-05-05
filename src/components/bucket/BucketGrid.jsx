import React, { useState } from "react";
import BucketCard from "./BucketCard";
import ShareBucketModal from "./ShareBucketModal";

const BucketGrid = ({ buckets, setBuckets }) => {
    const [selectedBucket, setSelectedBucket] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);

    const handleDelete = (bucketId) => {
        setBuckets(buckets.filter((bucket) => bucket.id !== bucketId));
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {buckets.map((bucket) => (
                    <BucketCard
                        key={bucket.id}
                        bucket={bucket}
                        onView={() => console.log("View bucket:", bucket.id)}
                        onShare={() => {
                            setSelectedBucket(bucket);
                            setShowShareModal(true);
                        }}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {showShareModal && selectedBucket && (
                <ShareBucketModal
                    bucket={selectedBucket}
                    onClose={() => setShowShareModal(false)}
                />
            )}
        </>
    );
};

export default BucketGrid;
