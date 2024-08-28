import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Payment from "./components/Payment";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

const App = () => {
    const paymentSuccess = localStorage.getItem('paymentSuccess') === 'true';

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/payment"
                    element={<Payment />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/"
                    element={<Navigate to={paymentSuccess ? "/dashboard" : "/payment"} replace />}
                />
                <Route
                    path="*"
                    element={<Navigate to={paymentSuccess ? "/dashboard" : "/payment"} replace />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
