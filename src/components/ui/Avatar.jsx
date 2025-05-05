import React from "react";

const Avatar = ({ src, alt, size = "md", status }) => {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
    };

    const statusClasses = {
        online: "bg-green-500",
        offline: "bg-gray-400",
        busy: "bg-red-500",
    };

    return (
        <div className="relative">
            <img
                src={src}
                alt={alt}
                className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm`}
            />
            {status && (
                <span
                    className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${statusClasses[status]}`}
                />
            )}
        </div>
    );
};

export default Avatar;
