import React from "react";
import { motion } from "framer-motion";
import Avatar from "../ui/Avatar";
import { useBucketStore } from "../../store/useBucketStore";
import { toast } from "react-toastify";

const ActivityItem = ({ data , name ,bucketId,  delay = 0 }) => {

    const { manageAccessRequest } = useBucketStore()
    // console.log("data=====>" , data , name);
    const { user } = data
    const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
   };

     const handleRequestManage = async(id , requestId , response)=>{
          const res = await manageAccessRequest({ id , requestId , response})
          console.info(res , "---------------------------")

          if(res.success){
            toast.success(res.message)
          }else{
            toast.error(res.message)
          }
     }

    return (
        <motion.li
            className="flex flex-wrap items-start justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
        >
            <div className="flex items-start gap-3">
                <Avatar src={user?.profile_pic?.url} size="md" />
               <div className="space-y-1">
                    <p className="text-base font-semibold text-gray-900">{user.name} requested bucket "{ name }"</p>
                    <p className="text-sm text-gray-700">{user.email}</p>
                <p className="text-xs text-gray-500">{formatDate(data.createdAt)}</p>
                </div>
            </div>
             

            <div className="flex gap-2">
                <button onClick={()=> handleRequestManage(bucketId , user._id , "accept")} className="px-3 py-1.5 bg-green-50 text-green-600 rounded-md text-sm font-medium hover:bg-green-100 transition-colors">
                    Accept
                </button>
                <button onClick={()=> handleRequestManage(bucketId , user._id , "reject")} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors">
                    Reject
                </button>
            </div>
        </motion.li>
    );
};

export default ActivityItem;
