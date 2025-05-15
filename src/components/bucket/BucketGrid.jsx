import React, { useState } from "react";
import BucketCard from "./BucketCard";
import ShareBucketModal from "./ShareBucketModal";
import { useBucketStore } from "../../store/useBucketStore";

const BucketGrid = () => {
    const [selectedBucket, setSelectedBucket] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const { buckets } = useBucketStore()
  

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {buckets.length && buckets?.map((bucket) => (
                    <BucketCard
                        key={bucket._id}
                        bucket={bucket}
                        onView={() => console.log("View bucket:", bucket._id)}
                        onShare={() => {
                            setSelectedBucket(bucket);
                            setShowShareModal(true);
                        }}
                        
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
