import React from "react";
import Header from "../components/ui/Header";
import {
    FiUploadCloud,
    FiFolder,
    FiShare2,
    FiDownload,
    FiLock,
    FiServer,
    FiImage,
} from "react-icons/fi";
import {
    MdOutlineCloudUpload,
    MdOutlineCollections,
    MdOutlineLink,
    MdOutlinePhotoLibrary,
} from "react-icons/md";

import SVG from "../assets/photography-lens-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans antialiased">
            <Header />

            {/* Hero Section */}
            <section className="py-32 px-4 text-center bg-gradient-to-b from-slate-200 to-white">
                <div className="max-w-6xl mx-auto">
                    <img
                        src={SVG}
                        alt="icon"
                        className="h-16 w-16 mx-auto mb-6"
                    />
                    <div className="inline-flex items-center bg-white text-slate-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                        <FiImage className="mr-2" /> PHOTOGRAPHY TOOL
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-purple-800 leading-tight mb-6">
                        Store, Share, Select, Deliver
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        The beautiful, professional solution for photographers
                        to showcase and deliver images to clients.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/auth/login")}
                            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                            <MdOutlineCloudUpload className="mr-2" /> Get
                            Started
                        </button>
                    </div>
                    <div className="mt-16 max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex justify-center space-x-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center"
                                >
                                    <FiImage className="text-blue-600 text-2xl" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Photographers{" "}
                            <span className="text-purple-700">
                                Love LensLock
                            </span>
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Professional features designed specifically for
                            photography workflows
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <FiLock className="text-3xl text-slate-600 group-hover:text-slate-50" />
                                ),
                                title: "Secure Storage",
                                description:
                                    "End-to-end encrypted storage with no external links or trails",
                            },
                            {
                                icon: (
                                    <FiServer className="text-3xl text-slate-600 group-hover:text-slate-50" />
                                ),
                                title: "Unlimited Galleries",
                                description:
                                    "Create as many galleries as you need for different clients",
                            },
                            {
                                icon: (
                                    <MdOutlinePhotoLibrary className="text-3xl text-slate-600 group-hover:text-slate-50" />
                                ),
                                title: "Client Proofing",
                                description:
                                    "Let clients select their favorites with easy marking",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl group"
                            >
                                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-600 group-hover:text-slate-50 transition-colors duration-300">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-semibold mb-3 text-gray-900">
                                    {item.title}
                                </h4>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gradient Divider */}
            <div className="h-2 bg-gradient-to-r from-slate-600 via-purple-600 to-pink-300"></div>

            {/* How It Works Section */}
            <section className="py-24 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Simple{" "}
                            <span className="text-purple-700 ">4-Step</span>{" "}
                            Workflow
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            From upload to delivery in minutes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <FiUploadCloud className="text-3xl" />,
                                title: "Upload",
                                description:
                                    "Drag and drop your photos to our secure cloud",
                            },
                            {
                                icon: <FiFolder className="text-3xl" />,
                                title: "Organize",
                                description:
                                    "Arrange in beautiful galleries and collections",
                            },
                            {
                                icon: <FiShare2 className="text-3xl" />,
                                title: "Share",
                                description:
                                    "Send private links with password protection",
                            },
                            {
                                icon: (
                                    <MdOutlineCollections className="text-3xl" />
                                ),
                                title: "Deliver",
                                description:
                                    "Clients select favorites for final delivery",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 text-center"
                            >
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to transform your client deliveries?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of photographers who deliver stunning
                        galleries.
                    </p>
                    <button className="bg-white text-slate-900 hover:bg-gray-100 font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto">
                        <MdOutlineCloudUpload className="mr-2" /> Start Free
                        Trial
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 bg-gray-900 text-gray-300">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            LensLock
                        </h3>
                        <p className="mb-4">
                            Professional image delivery for photographers and
                            creatives.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social icons would go here */}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-4">
                            Product
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Examples
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Tutorials
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-4">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} LensLock. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
