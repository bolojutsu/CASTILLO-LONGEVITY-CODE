import { useEffect, useState } from "react";
import { verifySession } from "../configs/pricing";

type VerificationState = 'verifying' | 'verified' | 'failed';

export default function Success() {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [status, setStatus] = useState<VerificationState>('verifying');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("session_id");
        setSessionId(id);

        if (!id) {
            setStatus('failed');
            setErrorMessage('No session ID was provided.');
            return;
        }

        const checkSession = async () => {
            const result = await verifySession(id);

            if (result.verified) {
                setStatus('verified');
            } else {
                setStatus('failed');
                setErrorMessage(result.error || 'We could not verify this payment.');
            }
        };

        checkSession();
    }, []);

    if (status === 'verifying') {
        return (
            <section className="SuccessPage">
                <div className="success-container">
                    <p className="success-status-text">
                        Verifying your payment...
                    </p>
                </div>
            </section>
        );
    }

    if (status === 'failed') {
        return (
            <section className="SuccessPage">
                <div className="success-container">
                    <div className="success-icon-wrapper">
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    </div>

                    <p className="success-status-text">
                        Payment Not Verified
                    </p>
                    <h1 className="success-title">
                        Something's Not Right
                    </h1>
                    <p className="success-description">
                        {errorMessage} If you completed a payment and are seeing this message,
                        please contact us so we can confirm your booking manually.
                    </p>

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
                    Payment Successful
                </p>
                <h1 className="success-title">
                    Thank You!
                </h1>
                <p className="success-description">
                    Your intake files and order processing sequences have cleared successfully. 
                    We've transferred confirmation instructions to your inbox to prepare for your live consultation.
                </p>

                {sessionId && (
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