import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/ui/Header";

const Home = () => {
    return (
        <main>
            <Header className="fixed top-0 left-0" />
            <section className="h-screen flex flex-col items-center justify-center bg-[url(/background.jpg)] bg-cover gap-4">
                <h1 className="text-6xl text-white font-semibold">
                    Store. Share. Select. Deliver.
                </h1>
                <p className="text-center w-[50%] text-2xl text-white">
                    Beautiful and effective tool for store and share image to
                    the clients for Photographers.
                </p>
            </section>
        </main>
    );
};

export default Home;
