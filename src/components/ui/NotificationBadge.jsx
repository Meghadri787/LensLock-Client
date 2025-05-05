import React from "react";

const NotificationBadge = ({ count }) => {
    return (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {count}
        </span>
    );
};

export default NotificationBadge;
