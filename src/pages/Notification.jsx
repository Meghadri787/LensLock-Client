import React from "react";
import { FiBell } from "react-icons/fi";
import Header from "../components/dashboard/Header";

const Notification = () => {
    return (
        <div className="min-h-screen bg-gray-50 w-full flex flex-col items-center justify-center">
            <Header title="Notification" />
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="bg-yellow-100  p-6 rounded-full mb-6">
                    {/* <Bell className="w-12 h-12 text-yellow-500 " /> */}
                    <FiBell className="w-12 h-12 text-yellow-500 " />
                </div>
                <h1 className="text-2xl font-bold text-gray-800  mb-2">
                    Notifications Coming Soon
                </h1>
                <p className="text-gray-600  max-w-md">
                    We’re working on this feature. Soon, you'll be able to
                    receive updates, alerts, and important messages right here.
                </p>
            </div>
        </div>
    );
};

export default Notification;
