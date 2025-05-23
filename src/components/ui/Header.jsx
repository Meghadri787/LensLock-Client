import React, { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navigate = useNavigate();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const unsubscribe = scrollY.onChange((latest) => {
            setScrolled(latest > 10);
        });
        return () => unsubscribe();
    }, [scrollY]);

    const navItems = [
        { path: "/features", label: "Features" },
        { path: "/working-principals", label: "How it works" },
        { path: "/about", label: "About" },
    ];

    return (
        <>
            <motion.header
                initial={false}
                animate={{
                    backgroundColor: scrolled
                        ? "rgba(255, 255, 255, 0.85)"
                        : "rgba(255, 255, 255, 0)",
                    backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
                    WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
                    boxShadow: scrolled
                        ? "0 2px 8px rgba(0, 0, 0, 0.1)"
                        : "none",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 w-full h-16 flex items-center justify-center px-4 sm:px-10 py-2"
            >
                <nav className="container flex items-center justify-between">
                    <NavLink to="/" className="flex items-center">
                        <img
                            src="/images/logo.png"
                            className="h-10 sm:h-12"
                            alt="Company Logo"
                            loading="lazy"
                        />
                    </NavLink>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex gap-6 lg:gap-8 text-base lg:text-lg font-medium">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `transition-colors hover:text-blue-600 ${
                                            isActive
                                                ? "text-blue-600 font-semibold"
                                                : "text-gray-700"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:block">
                        <Button
                            label="Login"
                            mode="primary"
                            onClick={() => navigate("/auth/login")}
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 flex flex-col gap-1">
                            <span
                                className={`h-0.5 bg-gray-700 transition-all ${
                                    isMenuOpen
                                        ? "rotate-45 translate-y-1.5"
                                        : ""
                                }`}
                            ></span>
                            <span
                                className={`h-0.5 bg-gray-700 transition-all ${
                                    isMenuOpen ? "opacity-0" : "opacity-100"
                                }`}
                            ></span>
                            <span
                                className={`h-0.5 bg-gray-700 transition-all ${
                                    isMenuOpen
                                        ? "-rotate-45 -translate-y-1.5"
                                        : ""
                                }`}
                            ></span>
                        </div>
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg md:hidden"
                    >
                        <ul className="flex flex-col divide-y divide-gray-100">
                            {navItems.map((item) => (
                                <li key={`mobile-${item.path}`}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `block px-6 py-4 transition-colors ${
                                                isActive
                                                    ? "bg-blue-50 text-blue-600 font-semibold"
                                                    : "text-gray-700 hover:bg-gray-50"
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                            <li className="px-6 py-4">
                                <Button
                                    label="Login"
                                    mode="primary"
                                    className="w-full"
                                />
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
