import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Input from "../../components/ui/Input";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { registerUser, isLoading, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        if (isAuthenticated && isMounted) {
            // navigate("/dashboard");
        }
        return () => {
            isMounted = false;
        };
    }, [isAuthenticated]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm your password";
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await registerUser(formData);
                if (res.success) {
                    toast.success(res.message);
                    navigate("/dashboard");
                } else {
                    toast.error(res.message);
                    setErrors({ api: res.message });
                }
            } catch (error) {
                setErrors({ api: "An error occurred. Please try again later." });
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] h-screen">
            <div className="hidden md:block">
                <img
                    src="/images/background.webp"
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex items-center justify-center px-8">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-black mb-1">
                            Create a new Account
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">to</span>
                            <img
                                src="/images/logo-text.png"
                                alt="Lenslock Text Logo"
                                className="h-6"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        {/* Name */}
                        <div>
                            <Input
                                icon={<FaRegUser />}
                                label="Name"
                                placeholder="Enter your name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Input
                                icon={<MdOutlineMailOutline />}
                                label="Email"
                                placeholder="example@email.com"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Input
                                icon={<RiLockPasswordLine />}
                                label="Password"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                                role="button"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )}
                            </span>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <Input
                                icon={<RiLockPasswordLine />}
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                role="button"
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                            >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )}
                            </span>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>

                    {errors.api && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {errors.api}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-slate-900 text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>

                    <p className="text-sm text-[#3A3A3A] mt-4 text-center">
                        Already have an account?{" "}
                        <Link
                            to="/auth/login"
                            className="font-bold hover:underline text-black"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Register;
