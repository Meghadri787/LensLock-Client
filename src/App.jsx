import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    Dashboard,
    ForgetPassword,
    Home,
    Login,
    Register,
    SplashScreen,
    MyBucket,
    Notification,
    Profile,
    Settings,
    Upload,
} from "./pages";
import Layout from "./layout/Layout";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/home" element={<Home />} />

                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/buckets" element={<MyBucket />} />
                    <Route path="/notifications" element={<Notification />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/upload" element={<Upload />} />
                </Route>

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
