import React from "react";
import { motion } from "framer-motion";
import Avatar from "../ui/Avatar";

const ActivityItem = ({ data , name ,  delay = 0 }) => {
    return (
        <motion.li
            className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
        >
            <div className="flex items-start gap-3">
                <Avatar src={data?.profile_pic?.url} size="md" />
                <div>
                    <p className="text-gray-800">{data.name} </p>
                     {/* <P>  </P> */}
                    <p className="text-xs text-gray-500 mt-1">{ data.createdAt }</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-md text-sm font-medium hover:bg-green-100 transition-colors">
                    Accept
                </button>
                <button className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors">
                    Reject
                </button>
            </div>
        </motion.li>
    );
};

export default ActivityItem;
