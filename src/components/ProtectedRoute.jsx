import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authSore";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
