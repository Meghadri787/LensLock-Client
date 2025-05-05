import React from "react";
import { FiBell, FiChevronLeft } from "react-icons/fi";
import Avatar from "../ui/Avatar";
import NotificationBadge from "../ui/NotificationBadge";
import { useNavigate } from "react-router-dom";

const Header = ({ title, backVisible = false }) => {
    const navigate = useNavigate();

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
            <div className="flex flex-row gap-4 items-center justify-center">
                {backVisible && (
                    <button onClick={() => navigate(-1)}>
                        <FiChevronLeft size={24} />
                    </button>
                )}
                <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {title}
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <FiBell size={20} className="text-gray-600" />
                    <NotificationBadge count={3} />
                </button>
                <Avatar
                    src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369990.png"
                    alt="Profile"
                    size="lg"
                    status="online"
                />
            </div>
        </header>
    );
};

export default Header;
