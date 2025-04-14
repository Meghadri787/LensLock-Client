import React from "react";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiKey } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";

const ForgetPassword = () => {
    return (
        <>
            <section className="grid grid-cols-1 md:[grid-template-columns:2fr_1fr] h-screen">
                <div className="hidden md:block relative">
                    <img
                        src="/background.webp"
                        alt="Background"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center px-8">
                    <div className="w-full max-w-md">
                        <div className="mb-7">
                            <h2 className="text-3xl font-bold text-black mb-1">
                                Forget Password?
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">of</span>
                                <img
                                    src="/logo-text.png"
                                    alt="logo-text"
                                    className="h-6"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 mb-4">
                            <Input
                                icon={<MdOutlineMailOutline />}
                                type="email"
                                placeholder="example@email.com"
                            />

                            <div className="flex gap-2 w-full">
                                <Input
                                    icon={<FiKey />}
                                    type="number"
                                    placeholder="Enter your OTP"
                                />
                                <button className="bg-green-700 text-white px-4 rounded-md hover:bg-green-800 transition">
                                    Verify
                                </button>
                            </div>

                            <Input
                                icon={<RiLockPasswordLine />}
                                type="password"
                                placeholder="New Password"
                            />
                            <Input
                                icon={<RiLockPasswordLine />}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </div>

                        {/* Change Password Button */}
                        <button className="w-full py-3 bg-[#2B152D] text-white rounded-md font-medium hover:opacity-90 transition mb-3">
                            Change Password
                        </button>

                        {/* Link to Login */}
                        <p className="text-sm text-[#3A3A3A] text-center">
                            Already have an account?{" "}
                            <Link
                                to="/auth/login"
                                className="font-bold hover:underline text-black"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ForgetPassword;
