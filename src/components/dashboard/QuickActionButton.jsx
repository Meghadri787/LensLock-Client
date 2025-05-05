import React from "react";
import { motion } from "framer-motion";
import { FiPlus, FiUpload } from "react-icons/fi";

const QuickActionButton = ({ icon, text, color }) => {
    const colors = {
        blue: {
            bg: "bg-blue-600",
            hover: "hover:bg-blue-700",
            text: "text-white",
        },
        purple: {
            bg: "bg-purple-600",
            hover: "hover:bg-purple-700",
            text: "text-white",
        },
    };

    const iconMap = {
        plus: <FiPlus size={18} />,
        upload: <FiUpload size={18} />,
    };

    return (
        <motion.button
            className={`flex items-center gap-2 px-5 py-3 ${colors[color].bg} ${colors[color].text} rounded-lg shadow-sm ${colors[color].hover} transition-colors`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            {iconMap[icon]}
            <span className="font-medium">{text}</span>
        </motion.button>
    );
};

export default QuickActionButton;
