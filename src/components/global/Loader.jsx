import React from "react";

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="border-[#131836] border-[3px] h-10 w-10 rounded-full border-r-[transparent] animate-spin"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loader;
