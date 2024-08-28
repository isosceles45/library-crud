import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const paymentSuccess = localStorage.getItem('paymentSuccess') === 'true';

    if (!paymentSuccess) {
        return <Navigate to="/payment" replace />;
    }

    return children;
};

export default ProtectedRoute;
