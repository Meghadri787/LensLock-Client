import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    Dashboard,
    ForgetPassword,
    Home,
    Login,
    Register,
    SplashScreen,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route
                    path="/auth/forget-password"
                    element={<ForgetPassword />}
                />
            </Routes>
        </Router>
    );
}
