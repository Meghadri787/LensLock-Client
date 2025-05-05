import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ title, value, icon, color }) => {
    const colorVariants = {
        blue: "bg-white text-blue-600 border",
        purple: "bg-white text-purple-600 border",
        green: "bg-white text-green-600 border",
        orange: "bg-white text-orange-600 border",
    };

    return (
        <motion.div
            className={`p-5 rounded-xl ${colorVariants[color]} flex flex-col gap-3 cursor-pointer`}
            whileHover={{
                y: -3,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium opacity-80">{title}</h3>
                <div className="p-2 rounded-lg bg-white bg-opacity-50">
                    {React.cloneElement(icon, { size: 28 })}
                </div>
            </div>
            <div className="flex items-end justify-between">
                <p className="text-3xl font-medium">{value}</p>
                {/* <div className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-70">
                    +0%
                </div> */}
            </div>
        </motion.div>
    );
};

export default StatsCard;
