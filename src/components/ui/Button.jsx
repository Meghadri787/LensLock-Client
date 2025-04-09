import React from "react";

const CustomButton = ({
    type = "button",
    label,
    mode = "primary",
    onClick,
    rest,
}) => {
    return (
        <>
            <button
                type={type}
                className={`${mode === "primary" && "bg-slate-900"}
                ${mode === "success" && "bg-green-600"} 
                }  text-white px-4 rounded-lg`}
                onClick={onClick}
                {...rest}
            >
                {label}
            </button>
        </>
    );
};

export default CustomButton;
