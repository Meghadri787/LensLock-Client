import React from "react";
import { motion } from "framer-motion";
import ActivityItem from "./ActivityItem";

const RecentActivity = ({ activities }) => {
    return (
        <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Recent Activity
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View All
                </button>
            </div>
            <ul className="space-y-4">
                {activities.map((activity, index) => (
                    <ActivityItem
                        key={activity.id}
                        {...activity}
                        delay={0.1 * index}
                    />
                ))}
            </ul>
        </motion.div>
    );
};

export default RecentActivity;
