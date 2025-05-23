import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/dashboard/Header";
import EmptyState from "../components/bucket/EmptyState";
import BucketGrid from "../components/bucket/BucketGrid";
import CreateBucketModal from "../components/bucket/CreateBucketModal";
import { useBucketStore } from "../store/useBucketStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";

const MyBuckets = () => {
    const { buckets, fetchBuckets } = useBucketStore();
    const { user } = useAuthStore();

    console.log("buckets ===> ", buckets);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const initialFetch = async () => {
        const res = await fetchBuckets();
        console.log("res ===> ", res);
        if (res.success) {
            toast.success(res.message);
            console.log("buckets ===> ", buckets);
        }
    };

    useEffect(() => {
        initialFetch();
    }, []);

    console.log("🚀 ~ MyBuckets ~ buckets:", buckets);

    return (
        <motion.section
            className="min-h-screen flex flex-col w-full bg-slate-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Header title={"My Buckets"} />

            <motion.main
                className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-y-auto"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
            >
                {user?.role === "photographer" && (
                    <div className="flex justify-end items-center mb-8">
                        {buckets.length > 0 && (
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Create Bucket
                            </button>
                        )}
                    </div>
                )}

                {buckets.length === 0 ? (
                    <EmptyState onCreate={() => setShowCreateModal(true)} />
                ) : (
                    <BucketGrid buckets={buckets} />
                )}

                {showCreateModal && (
                    <CreateBucketModal
                        onClose={() => setShowCreateModal(false)}
                    />
                )}
            </motion.main>
        </motion.section>
    );
};

export default MyBuckets;
