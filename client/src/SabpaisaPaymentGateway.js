import React, { useState, useEffect } from "react";
import { PaymentInitModal } from "pg-test-project";
import uniqid from "uniqid";

function SabpaisaPaymentGateway(props) {
    const [isOpen, setIsOpen] = useState(false);

    const {
        clientCode,
        transUserName,
        transUserPassword,
        authkey,
        authiv,
        payerName,
        payerEmail,
        payerMobile,
        amount,
        payerAddress,
    } = props;

    useEffect(() => {
        setIsOpen(props.isOpen);
    }, [props.isOpen]);

    return (
        <div>
            <PaymentInitModal
                clientCode={clientCode}
                transUserPassword={transUserPassword}
                transUserName={transUserName}
                isOpen={isOpen}
                clientTxnId={uniqid()}
                authkey={authkey}
                authiv={authiv}
                payerName={payerName}
                payerEmail={payerEmail}
                payerMobile={payerMobile}
                payerAddress={payerAddress}
                amount={amount}
                amountType="" // Keeping amountType empty if not needed
                udf12="" // Optional User Defined Fields (UDF)
                udf13=""
                udf14=""
                udf15=""
                udf16=""
                udf17=""
                onToggle={() => setIsOpen(!isOpen)}
                channelId="" // Channel ID if required
                programId="" // Program ID if required
                mcc="" // MCC if required
                label={"Production"}
                env={"stag"}
            />
        </div>
    );
}

export default SabpaisaPaymentGateway;
