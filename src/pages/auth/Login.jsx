import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { ImSpinner6 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";
// import { fi } from "date-fns/locale";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { loginUser, isLoading, user } = useAuthStore();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await loginUser(formData);
        if (res.success) {
            toast.success(res.message);
            navigate("/dashboard");
        } else {
            toast.error(res.message);
        }
    };

    return (
        <section className="grid grid-cols-1 md:[grid-template-columns:2fr_1fr] h-screen">
            {/* Left Image */}
            <div className="hidden md:block relative">
                <img
                    src="/images/background.webp"
                    alt="Background"
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Right Login */}
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

                    <form onSubmit={handleLogin} className="space-y-4 mb-6">
                        <Input
                            icon={<MdOutlineMailOutline />}
                            placeholder="example@email.com"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            icon={<RiLockPasswordLine />}
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="h-14 w-full py-3 bg-slate-900 text-white rounded-md font-medium hover:opacity-90 transition flex items-center justify-center"
                        >
                            {isLoading ? (
                                <ImSpinner6
                                    size={26}
                                    className="animate-spin"
                                />
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>

                    <div className="flex justify-between text-sm text-[#333] mt-4">
                        {/* <Link
                            to="/auth/forget-password"
                            className="hover:underline"
                        >
                            Forgot password?
                        </Link> */}
                        <Link to="/auth/register" className="hover:underline">
                            Don't have an account?{" "}
                            <span className="font-bold">Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
