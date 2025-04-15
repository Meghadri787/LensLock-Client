import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <section className="grid grid-cols-1 md:[grid-template-columns:2fr_1fr] h-screen">
                <div className="hidden md:block relative">
                    <img
                        src="/images/background.webp"
                        alt="Background"
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>

                <div className="flex items-center justify-center px-8">
                    <div className="w-full max-w-md">
                        <div className="mb-7">
                            <h2 className="text-3xl font-bold text-black mb-1">
                                Welcome Back!
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">to</span>
                                <img
                                    src="/images/logo-text.png"
                                    alt="logo-text"
                                    className="h-6"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <Input
                                icon={<MdOutlineMailOutline />}
                                placeholder="example@email.com"
                                type="email"
                            />
                            <Input
                                icon={<RiLockPasswordLine />}
                                placeholder="Password"
                                type="password"
                            />
                        </div>

                        <button className="w-full py-3 bg-slate-900 text-white rounded-md font-medium hover:opacity-90 transition">
                            Login
                        </button>

                        <div className="flex justify-between text-sm text-[#333] mt-4">
                            <Link
                                to="/auth/forget-password"
                                className="hover:underline"
                            >
                                Forgot password?
                            </Link>
                            <Link
                                to="/auth/register"
                                className="hover:underline"
                            >
                                Don't have an account?{" "}
                                <span className="font-bold">Register</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
