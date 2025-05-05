import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
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
