import React, { use, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuthStore } from "../store/useAuthStore";

const Layout = () => {
    const { isAuthenticated , user } = useAuthStore();
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth/login");
        }
    }, [isAuthenticated , user]);

    return (
        <section className="flex flex-row w-screen h-screen overflow-hidden">
            <Sidebar />
            <div className="flex w-full h-screen">
                <Outlet />
            </div>
        </section>
    );
};

export default Layout;
