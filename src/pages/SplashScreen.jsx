import React, { useEffect } from "react";
import SplashLogo from "../assets/splash.png";
import Loader from "../components/global/Loader";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate("/home");
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="h-screen flex flex-col items-center justify-center pb-10">
            <div className="flex flex-1 items-center justify-center">
                <img
                    src={SplashLogo}
                    alt="Logo"
                    className="h-32 w-48 object-contain"
                />
            </div>
            <Loader />
        </div>
    );
};

export default SplashScreen;
