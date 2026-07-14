import { useEffect, useState } from "react";
import { verifyCheckoutSession } from "../pricing";

export default function Success() {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    const [status, setStatus] = useState<"loading" | "verified" | "error">(
        sessionId ? "loading" : "error",
    );

    useEffect(() => {
        const controller = new AbortController();

        if (!sessionId) {
            return;
        }

        void verifyCheckoutSession(sessionId, controller.signal).then((result) => {
            if (result.verified) {
                setStatus("verified");
            } else if (result.error || result.verified === false) {
                setStatus("error");
            }
        });

        return () => controller.abort();
    }, [sessionId]);

    const isVerified = status === "verified";
    const isLoading = status === "loading";

    return (
        <section className="SuccessPage">
            <div className="success-container">
                {/* Success Icon */}
                <div className="success-icon-wrapper">
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>

                <p className="success-status-text">
                    {isVerified
                        ? "Payment Successful"
                        : isLoading
                            ? "Verifying Payment"
                            : "Payment Not Verified"}
                </p>
                <h1 className="success-title">
                    {isVerified ? "Thank You!" : isLoading ? "Please Wait" : "Verification Required"}
                </h1>
                <p className="success-description">
                    {isVerified
                        ? "Your payment has been verified. Our team will contact you with the next steps."
                        : isLoading
                            ? "We are confirming the payment status with Stripe."
                            : "We could not confirm a completed payment. Please return and try again or contact support."}
                </p>

                {isVerified && sessionId && (
                    <div className="session-box">
                        <p className="session-label">
                            Receipt / Session ID
                        </p>
                        <code className="session-code">
                            {sessionId}
                        </code>
                    </div>
                )}

                <a 
                    href="/" 
                    className="success-return-btn" 
                >
                    Return to Dashboard
                </a>
            </div>
        </section>
    );
}