import React from "react";

const Input = ({ type, placeholder, icon, rest }) => {
    return (
        <div className="flex flex-row gap-3 h-14 bg-slate-200/80 max-w-md items-center justify-center rounded-lg px-5 py-2">
            <span className="text-2xl">{icon}</span>
            <input
                type={type}
                placeholder={placeholder}
                className="bg-transparent outline-none w-full text-base
                "
                {...rest}
            />
        </div>
    );
};

export default Input;
