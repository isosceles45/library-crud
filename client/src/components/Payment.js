import React, { useState, useEffect } from "react";
import SabpaisaPaymentGateway from "../SabpaisaPaymentGateway";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [payerName, setPayerName] = useState("");
    const [payerEmail, setPayerEmail] = useState("");
    const [payerMobile, setPayerMobile] = useState("");
    const [payerAddress, setPayerAddress] = useState("");
    const amount = 500;

    const clientCode = process.env.REACT_APP_CLIENT_CODE;
    const transUserName = process.env.REACT_APP_TRANS_USER_NAME;
    const transUserPassword = process.env.REACT_APP_TRANS_USER_PASSWORD;
    const authkey = process.env.REACT_APP_AUTH_KEY;
    const authiv = process.env.REACT_APP_AUTH_IV;
    const clientTxnId = process.env.REACT_APP_CLIENT_TXN_ID;
    const callbackUrl = process.env.REACT_APP_CALLBACK_URL;

    const location = useLocation();
    const navigate = useNavigate();

    const getQueryParams = (query) => {
        return query
            .substring(1)
            .split("&")
            .reduce((acc, param) => {
                const [key, value] = param.split("=");
                acc[key] = decodeURIComponent(value);
                return acc;
            }, {});
    };

    useEffect(() => {
        const params = getQueryParams(location.search);
        if (params.status === "SUCCESS") {
            localStorage.setItem("paymentSuccess", "true");
            navigate("/dashboard");
        } else if (params.status) {
            alert("Payment failed. Please try again.");
        }
    }, [location, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="max-w-lg w-full bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Library
                    </span>{" "}
                    Dashboard
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">
                            Payer Name
                        </label>
                        <input
                            type="text"
                            value={payerName}
                            onChange={(e) => setPayerName(e.target.value)}
                            className="bg-gray-700 border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">
                            Payer Email
                        </label>
                        <input
                            type="email"
                            value={payerEmail}
                            onChange={(e) => setPayerEmail(e.target.value)}
                            className="bg-gray-700 border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">
                            Payer Mobile
                        </label>
                        <input
                            type="text"
                            value={payerMobile}
                            onChange={(e) => setPayerMobile(e.target.value)}
                            className="bg-gray-700 border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500"
                            placeholder="Enter your mobile number"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">
                            Payer Address
                        </label>
                        <input
                            type="text"
                            value={payerAddress}
                            onChange={(e) => setPayerAddress(e.target.value)}
                            className="bg-gray-700 border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500"
                            placeholder="Enter your address"
                        />
                    </div>

                    <div className="flex items-center justify-start">
                        <button
                            type="submit"
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </form>

                <SabpaisaPaymentGateway
                    clientCode={clientCode}
                    transUserName={transUserName}
                    transUserPassword={transUserPassword}
                    authkey={authkey}
                    authiv={authiv}
                    payerName={payerName}
                    payerEmail={payerEmail}
                    payerMobile={payerMobile}
                    clientTxnId={clientTxnId}
                    amount={amount}
                    payerAddress={payerAddress}
                    callbackUrl={callbackUrl}
                    isOpen={isOpen}
                />
            </div>
        </div>
    );
};

export default Payment;
