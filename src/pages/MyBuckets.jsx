import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/dashboard/Header";
import EmptyState from "../components/bucket/EmptyState";
import BucketGrid from "../components/bucket/BucketGrid";
import CreateBucketModal from "../components/bucket/CreateBucketModal";
import { useBucketStore } from "../store/useBucketStore";
import { useEffect } from "react";
import { toast } from "react-toastify";

const MyBuckets = () => {
    // const [buckets, setBuckets] = useState([
    //     {
    //         id: "1",
    //         title: "Bucket 1",
    //         description: "dsfsfsgsgfg",
    //         createdAt: "2025-05-05T00:00:00Z",
    //         itemCount: 0,
    //         viewerCount: 0,
    //     },
    //     {
    //         id: "2",
    //         title: "Bucket 1",
    //         description: "lorem",
    //         createdAt: "2025-05-05T00:00:00Z",
    //         itemCount: 0,
    //         viewerCount: 0,
    //     },
    //     {
    //         id: "3",
    //         title: "Bucket 1",
    //         description:
    //             " Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo minus consectetur aspernatur perferendis assumenda optio minima ex, pariatur qui earum quisquam eaque voluptatibus iusto? Quibusdam, modi aut nam reiciendis fuga cum odio ratione molestiae ipsum a eum, placeat delectus quos nisi mollitia ab atque ut hic dolorem laudantium. Dolores ut ad, laboriosam velit quia ducimus ex totam rerum natus quo necessitatibus corporis, et beatae, impedit deserunt quisquam molestias. Asperiores sequi consequatur, numquam corrupti, quos nemo possimus placeat ducimus mollitia cupiditate dolorum, quam vero consequuntur exercitationem. Omnis molestiae adipisci amet. Iusto, ducimus totam soluta, voluptate placeat officia praesentium enim laudantium accusantium magni cumque dolor nesciunt id esse voluptatibus. Id, assumenda consequatur! Minus, provident debitis dolore laboriosam at sed necessitatibus doloribus ipsam eius. Repellat possimus autem, amet facere doloremque delectus suscipit sit quae ex similique assumenda eligendi, inventore nisi cum iure ipsa est natus nemo nostrum! Eum praesentium rem cum vero molestias.",
    //         createdAt: "2025-05-05T00:00:00Z",
    //         itemCount: 30,
    //         viewerCount: 2,
    //     },
    //     {
    //         id: "4",
    //         title: "Bucket 1",
    //         description: "dsfsfsgsgfg",
    //         createdAt: "2025-05-05T00:00:00Z",
    //         itemCount: 0,
    //         viewerCount: 0,
    //     },
    //     {
    //         id: "5",
    //         title: "Bucket 1",
    //         description: "lorem",
    //         createdAt: "2025-05-05T00:00:00Z",
    //         itemCount: 0,
    //         viewerCount: 0,
    //     },
    //     {
    //         id: "6",
    //         title: "Bucket 1",
    //         description: "dsfsfsgsgfg",
    //         createdAt: "2025-05-05T00:00:00Z",
    //         itemCount: 0,
    //         viewerCount: 0,
    //     },
    //     {
    //         id: "7",
    //         title: "Bucket 1",
    //         description: "lorem",
    //         createdAt: "2025-05-05T00:00:00Z",
    //         itemCount: 0,
    //         viewerCount: 0,
    //     },
    //     {
    //         id: "8",
    //         title: "Bucket 1",
    //         description: "dsfsfsgsgfg",
    //         createdAt: "2025-05-05T00:00:00Z",
    //         itemCount: 0,
    //         viewerCount: 0,
    //     },
    //     {
    //         id: "9",
    //         title: "Bucket 1",
    //         description: "lorem",
    //         createdAt: "2025-05-05T00:00:00Z",
    //         itemCount: 0,
    //         viewerCount: 0,
    //     },
    // ]);

    const { buckets , fetchBuckets } = useBucketStore()

    console.log("buckets ===> ", buckets);


    const [showCreateModal, setShowCreateModal] = useState(false);

    // const handleCreateBucket = (newBucket) => {
    //     setBuckets([...buckets, newBucket]);
    //     setShowCreateModal(false);
    // };

    const initialFetch = async()=>{
         const res = await fetchBuckets();
            console.log("res ===> ", res);
            if(res.success){
                toast.success(res.message);
                console.log("buckets ===> ", buckets);
            }

    }

    useEffect(() => {
        initialFetch();
    } , [])

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

                {buckets.length === 0 ? (
                    <EmptyState onCreate={() => setShowCreateModal(true)} />
                ) : (
                    <BucketGrid buckets={buckets}  />
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
