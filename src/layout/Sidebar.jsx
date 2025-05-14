import React from "react";
import SidebarLink from "./SidebarLink";
import {
    FiGrid,
    FiFolder,
    FiUpload,
    FiUser,
    FiBell,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
    const {  logoutUser } = useAuthStore();
    const navigate = useNavigate();
    const handleLogOut = async() => {
       const res = await logoutUser();
       console.log("res ====> " , res);
       if(res.success){
           toast.success(res.message);
           navigate("/auth/login")
       } else {
           console.log("error", res);
           toast.error(res.message);
       }
    }

    const links = [
        {
            path: "/dashboard",
            navLink: {
                label: "Dashboard",
                icon: <FiGrid size={20} />,
            },
        },
        {
            path: "/buckets",
            navLink: {
                label: "My Buckets",
                icon: <FiFolder size={20} />,
            },
        },
        {
            path: "/upload",
            navLink: {
                label: "Upload",
                icon: <FiUpload size={20} />,
            },
        },
        {
            path: "/profile",
            navLink: {
                label: "Profile",
                icon: <FiUser size={20} />,
            },
        },
        {
            path: "/notifications",
            navLink: {
                label: "Notifications",
                icon: <FiBell size={20} />,
            },
        },

        {
            path: "/settings",
            navLink: {
                label: "Settings",
                icon: <FiSettings size={20} />,
            },
        },
    ];

    return (
        <div className="flex flex-col h-screen w-72 shadow-md z-10">
            <div className="px-8 py-4 flex items-center justify-center border-b-[1px]">
                <img
                    src="/images/logo-image.png"
                    alt="LensLock"
                    className="h-20"
                />
            </div>
            <div className="flex-1 flex-col flex px-2 py-8">
                {links.map((item) => (
                    <SidebarLink
                        icon={item.navLink.icon}
                        label={item.navLink.label}
                        to={item.path}
                        key={item.path}
                    />
                ))}
            </div>
            <footer className="border-t-[1px] h-16 flex items-center justify-center text-base font-semibold">
                <button
                 className="flex items-center justify-center gap-3 h-full w-full bg-rose-50 text-rose-800 hover:bg-rose-100 transition-all"
                 onClick={handleLogOut}
                 >
                    <FiLogOut size={20} />
                    Logout
                </button>
            </footer>
        </div>
    );
};

export default Sidebar;
