// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Header from "../components/dashboard/Header";
// import MediaGrid from "../components/bucket/MediaGrid";
// import EmptyBucket from "../components/bucket/EmptyBucket";
// import { useBucketStore } from "../store/useBucketStore";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";

// const BucketDetails = () => {

//     const { id } = useParams();
//     const { selectedBucket , fetchBucketInfo  } = useBucketStore()
//     const { user , isAuthenticated } = useAuthStore();
//     const navigate = useNavigate();
//     const [bucket, setBucket] = useState({
//         id: "1",
//         title: "Travel Memories",
//         description: "My summer 2025 vacation photos",
//         createdAt: "2025-05-05T00:00:00Z",
//         itemCount: 0,
//         viewerCount: 12,
//         media: [],
//     });

//     const handleUpload = (bucketId, mediaItems) => {
//         setBucket((prev) => ({
//             ...prev,
//             media: [...prev.media, ...mediaItems],
//             itemCount: prev.itemCount + mediaItems.length,
//         }));
//     };



//     const initialFetch = async ()=>{
//         const res = await fetchBucketInfo(id);
//         console.log("res ====> " , res);

//     }

//     useEffect(()=>{
//         initialFetch();
//     } , [id])

//     useEffect(()=>{
//        if(!isAuthenticated){
//          navigate("/auth/login");  
//        } else if(user && selectedBucket){
//           if(user._id !== selectedBucket.ownerId){
//             // create a bucket request design and a button for the user to request access to the bucket
//           }
//        }
//     } , [isAuthenticated , user , selectedBucket])



//     return (
//         <motion.section
//             className="min-h-screen flex flex-col w-full bg-gray-50 "
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//         >
//             <Header
//                 title={`My Buckets / ${selectedBucket.name}`}
//                 backVisible={true}
//                 // meta={`${bucket.itemCount} items • ${bucket.viewerCount} viewers`}
//             />

//             <div className="container mx-auto px-4 py-2 max-w-7xl overflow-y-auto">
//                 {/* {bucket.description &&  (
//                     <motion.p
//                         className="text-gray-600 mb-8 max-w-3xl"
//                         initial={{ y: 10, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.1 }}
//                     >
//                         {bucket.description}
//                     </motion.p>
//                 )} */}

//                 {bucket.media.length > 0 ? (
//                     <MediaGrid media={bucket.media} />
//                 ) : (
//                     <EmptyBucket bucketId={bucket.id} onUpload={handleUpload} />
//                 )}
//             </div>
//         </motion.section>
//     );
// };

// export default BucketDetails;



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/dashboard/Header";
import MediaGrid from "../components/bucket/MediaGrid";
import EmptyBucket from "../components/bucket/EmptyBucket";
import { useBucketStore } from "../store/useBucketStore";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";

const BucketDetails = () => {
    const { id } = useParams();
    const { selectedBucket, fetchBucketInfo , bucketAccessRequest } = useBucketStore();
    const { user, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [bucket, setBucket] = useState({
        id: "1",
        title: "Travel Memories",
        description: "My summer 2025 vacation photos",
        createdAt: "2025-05-05T00:00:00Z",
        itemCount: 0,
        viewerCount: 12,
        media: [],
    });

    const [hasAccess, setHasAccess] = useState(true);
    const [requestSent, setRequestSent] = useState(false);

    const handleUpload = (bucketId, mediaItems) => {
        setBucket((prev) => ({
            ...prev,
            media: [...prev.media, ...mediaItems],
            itemCount: prev.itemCount + mediaItems.length,
        }));
    };

    const initialFetch = async () => {
        const res = await fetchBucketInfo(id);
        console.log("res ====> ", res);
    };

    useEffect(() => {
        initialFetch();
    }, [id]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth/login");
        } else if (user && selectedBucket) {
            console.log("user ====> ", user);
            console.log("selectedBucket ====> ", selectedBucket);
            
            if (user._id !== selectedBucket?.user?._id) {
                setHasAccess(false);
            } 

            const isMatch = selectedBucket?.accessRequests?.find((item) => item?.user === user._id)

            if( isMatch ){
                  setRequestSent(true);
            }
        }
    }, [isAuthenticated, user, selectedBucket , id  ]);

    const handleRequestAccess = async() => {
        // 🔄 send a request here (e.g., API call)
        console.log("Access request sent for bucket ID:", id);
        const res =await bucketAccessRequest(id);
        if(res.success){
            toast.success(res.message)
            setRequestSent(true);
        }else{
            toast.error(res.message)
        }
    };

    return (
        <motion.section
            className="min-h-screen flex flex-col w-full bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Header
                title={`My Buckets / ${selectedBucket?.name || "Bucket"}`}
                backVisible={true}
            />

            <div className="container mx-auto px-4 py-2 max-w-7xl overflow-y-auto">
                {!hasAccess ? (
                    <div className="bg-white border border-gray-300 rounded-xl p-8 shadow-md text-center">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            You don't have access to this bucket.
                        </h2>
                        <p className="text-gray-500 mb-4">
                            Only the owner can grant access. You can request access below.
                        </p>
                        {requestSent ? (
                            <span className="text-green-500 font-medium">Request sent ✅</span>
                        ) : (
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                                onClick={handleRequestAccess}
                            >
                                Request Access
                            </button>
                        )}
                    </div>
                ) : bucket.media.length > 0 ? (
                    <MediaGrid media={bucket.media} />
                ) : (
                    <EmptyBucket bucketId={bucket.id} onUpload={handleUpload} />
                )}
            </div>
        </motion.section>
    );
};

export default BucketDetails;

