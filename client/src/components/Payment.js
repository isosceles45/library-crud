import React, { useState, useEffect } from "react";
import SabpaisaPaymentGateway from "../SabpaisaPaymentGateway";
import { useLocation, useNavigate } from "react-router-dom";
import '../App.css';

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
            localStorage.setItem('paymentSuccess', 'true');
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
        <div className="payment-form">
            <h2>Library Payment Gateway</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Payer Name</label>
                    <input
                        type="text"
                        value={payerName}
                        onChange={(e) => setPayerName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Payer Email</label>
                    <input
                        type="email"
                        value={payerEmail}
                        onChange={(e) => setPayerEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Payer Mobile</label>
                    <input
                        type="text"
                        value={payerMobile}
                        onChange={(e) => setPayerMobile(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Payer Address</label>
                    <input
                        type="text"
                        value={payerAddress}
                        onChange={(e) => setPayerAddress(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Proceed to Payment
                </button>
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
