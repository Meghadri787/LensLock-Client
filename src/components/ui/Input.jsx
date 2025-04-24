import React from "react";

const Input = ({
    type,
    placeholder,
    icon,
    name,
    value,
    onChange,
    required,
    props,
}) => {
    return (
        <div className="flex flex-row gap-3 h-14 bg-slate-200/80 w-full max-w-md items-center justify-center rounded-lg px-5 py-2">
            <span className="text-2xl">{icon}</span>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="bg-transparent outline-none w-full text-base"
                required={required}
                {...props}
            />
        </div>
    );
};

export default Input;
