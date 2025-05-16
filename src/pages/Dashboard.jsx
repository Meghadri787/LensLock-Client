import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/dashboard/Header";
import StatsCard from "../components/dashboard/StatsCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActionButton from "../components/dashboard/QuickActionButton";
import { FiFolder, FiImage, FiClock, FiBell } from "react-icons/fi";
import { useBucketStore } from "../store/useBucketStore";


const Dashboard = () => {

    const { fetchBuckets , buckets  } = useBucketStore()

 const initialFetch = async()=>{
         const res = await fetchBuckets();
            console.log("res ===> ", res);
            if(res.success){
                // toast.success(res.message);
                console.log("buckets ===> ", buckets);
            }

    }

    useEffect(() => {
        initialFetch();
    } , [])



    const stats = [
        {
            title: "Total Buckets",
            value: 12,
            icon: <FiFolder />,
            color: "blue",
        },
        { title: "Total Media", value: 45, icon: <FiImage />, color: "purple" },
        {
            title: "Pending Requests",
            value: 3,
            icon: <FiClock />,
            color: "green",
        },
        { title: "Notifications", value: 3, icon: <FiBell />, color: "orange" },
    ];

    const activities = [
        {
            id: 1,
            message: "User John Doe requested access to Bucket A",
            time: "10 mins ago",
            userAvatar:
                "https://img.freepik.com/premium-vector/profile-picture-african-american-person-flat-cartoon-style-minimalist-style_1099486-1.jpg?w=2000",
        },
        {
            id: 2,
            message: "User Jane Smith requested access to Bucket B",
            time: "25 mins ago",
            userAvatar:
                "https://img.freepik.com/premium-vector/profile-picture-african-american-person-flat-cartoon-style-minimalist-style_1099486-1.jpg?w=2000",
        },
    ];

    return (
        <motion.section
            className="min-h-screen flex flex-col w-full bg-gradient-to-br from-white to-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Header title={"Dashboard"} />

            <motion.main
                className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-y-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} delay={index * 0.1} />
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap items-end justify-end gap-4 my-6">
                    <QuickActionButton
                        icon="plus"
                        text="Create New Bucket"
                        color="blue"
                    />
                    <QuickActionButton
                        icon="upload"
                        text="Upload Media"
                        color="purple"
                    />
                </div>

                {/* Recent Activity */}
                <RecentActivity activities={buckets} />
            </motion.main>
        </motion.section>
    );
};

export default Dashboard;
