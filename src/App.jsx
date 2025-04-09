import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ForgetPassword, Home, Login, Register, SplashScreen } from "./pages";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/home" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route
                    path="/auth/forget-password"
                    element={<ForgetPassword />}
                />
            </Routes>
        </BrowserRouter>
    );
}
