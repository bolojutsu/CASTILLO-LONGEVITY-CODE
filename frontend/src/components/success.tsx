import { useEffect, useState } from "react";

export default function Success() {
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("session_id");
        setSessionId(id);
    }, []);

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
                    Your subscription has been successfully activated. We've sent a confirmation email along with the next steps for your personalized longevity protocol.
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
                    className="plan-btn success-return-btn" /* Keeps your global plan-btn styling combined with the specific return layout */
                >
                    Return to Dashboard
                </a>
            </div>
        </section>
    );
}