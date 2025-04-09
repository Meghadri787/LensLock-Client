import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const Header = () => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setScrolled(latest > 10); // You can adjust this value
        });
    }, [scrollY]);

    return (
        <motion.header
            animate={{
                backgroundColor: scrolled
                    ? "rgba(255, 255, 255, 0.7)" // light frosted look
                    : "rgba(255, 255, 255, 0.0)",
                backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
                WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)", // For Safari
                boxShadow: scrolled
                    ? "0 2px 8px rgba(0, 0, 0, 0.1)"
                    : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 w-full h-16 flex items-center justify-center px-10 py-2"
        >
            <nav className="container flex flex-row items-center justify-between">
                <img src="/logo.png" className="h-12" alt="Logo" />
                <ul className="flex flex-row gap-8 text-lg font-medium">
                    <li>
                        <NavLink to={"/features"}>Features</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/working-principals"}>
                            How it works
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/about"}>About</NavLink>
                    </li>
                </ul>
                <Button label={"Login"} mode="primary" />
            </nav>
        </motion.header>
    );
};

export default Header;

// import React from "react";
// import Button from "./Button";
// import { NavLink } from "react-router-dom";

// const Header = () => {
//     return (
//         <header className="flex items-center justify-center w-full h-16 px-10 py-2 bg-transparent sticky top-0 left-0 right-0">
//             <nav className="container flex flex-row items-center justify-between">
//                 <img src="/logo.png" className="h-12" />
//                 <ul className="flex flex-row gap-8 text-lg">
//                     <li>
//                         <NavLink to={"/features"}>Features</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to={"/working-principals"}>
//                             How it works
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to={"/about"}>About</NavLink>
//                     </li>
//                 </ul>
//                 <Button label={"Login"} mode="primary" />
//             </nav>
//         </header>
//     );
// };

// export default Header;
