import React, { useState, useEffect } from "react";
import SabpaisaPaymentGateway from "../SabpaisaPaymentGateway";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = ({ setPaymentSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [payerName, setPayerName] = useState("");
    const [payerEmail, setPayerEmail] = useState("");
    const [payerMobile, setPayerMobile] = useState("");
    const [payerAddress, setPayerAddress] = useState("");
    const [amount, setAmount] = useState(500);

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
            setPaymentSuccess(true);
            localStorage.setItem("paymentSuccess", "true");
            navigate("/dashboard");
        } else if (params.status) {
            alert("Payment failed. Please try again.");
        }
    }, [location, navigate, setPaymentSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">
                Library Payment Gateway
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Payer Name
                    </label>
                    <input
                        type="text"
                        value={payerName}
                        onChange={(e) => setPayerName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Payer Email
                    </label>
                    <input
                        type="email"
                        value={payerEmail}
                        onChange={(e) => setPayerEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Payer Mobile
                    </label>
                    <input
                        type="text"
                        value={payerMobile}
                        onChange={(e) => setPayerMobile(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your mobile number"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Payer Address
                    </label>
                    <input
                        type="text"
                        value={payerAddress}
                        onChange={(e) => setPayerAddress(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your address"
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
    );
};

export default Payment;