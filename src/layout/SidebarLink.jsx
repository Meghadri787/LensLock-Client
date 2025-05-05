import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarLink = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `relative flex items-center px-4 py-3 text-base transition-colors ${
                    isActive
                        ? "text-slate-900 bg-slate-50 font-semibold"
                        : "text-gray-500 hover:text-gray-700 font-normal"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <span className="mr-3 text-lg">{icon}</span>
                    {label}

                    {isActive && (
                        <motion.span
                            layoutId="sidebar-active-indicator"
                            className="absolute left-0 top-0 h-full w-1 bg-slate-900 rounded-r-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        />
                    )}
                </>
            )}
        </NavLink>
    );
};

export default SidebarLink;
