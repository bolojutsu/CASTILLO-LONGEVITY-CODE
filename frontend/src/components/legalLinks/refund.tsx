const Refund = () => {
    return (
        <div className="legal-page refund-page" id="refund">
            <div className="legal-header">
                <span className="legal-eyebrow">Legal</span>
                <h1>Refund Policy</h1>
                <p className="legal-updated">Last updated: August 3, 2026</p>
            </div>

            <div className="legal-body">
                <section>
                    <h2>1. Overview</h2>
                    <p>
                        This policy outlines the terms under which refunds are issued for consultation packages
                        purchased through Castillo Longevity Code. Our Foundation Track is a one-time, flat-fee
                        service — there is no recurring or subscription billing.
                    </p>
                </section>

                <section>
                    <h2>2. Eligibility for a Refund</h2>
                    <div className="refund-callout">
                        You may request a full refund if you cancel <strong>before your scheduled consultation
                        has taken place</strong>, provided the request is made within 14 days of your original
                        purchase.
                    </div>
                    <p>Refund requests are evaluated on a case-by-case basis and generally granted when:</p>
                    <ul>
                        <li>The consultation has not yet occurred</li>
                        <li>The request is made within 14 days of purchase</li>
                        <li>No custom protocol or written materials have yet been delivered</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Non-Refundable Circumstances</h2>
                    <p>Refunds are generally not available once:</p>
                    <ul>
                        <li>The 1-on-1 consultation has been completed</li>
                        <li>A personalized nutrition assessment or longevity protocol has been delivered</li>
                        <li>More than 14 days have passed since the original purchase date</li>
                    </ul>
                </section>

                <section>
                    <h2>4. How to Request a Refund</h2>
                    <p>
                        To request a refund, contact us through our consultation intake form with your name, the
                        email used at checkout, and your Stripe receipt or session ID (found on your payment
                        confirmation page). We aim to respond to all refund requests within 5 business days.
                    </p>
                </section>

                <section>
                    <h2>5. Processing Time</h2>
                    <p>
                        Approved refunds are issued to your original payment method through Stripe. Depending on
                        your bank or card issuer, refunds may take 5–10 business days to appear on your statement.
                    </p>
                </section>

                <section>
                    <h2>6. Rescheduling</h2>
                    <p>
                        If you're unable to attend your scheduled consultation but still wish to proceed, please
                        contact us to reschedule rather than requesting a refund — we're happy to find a time that
                        works.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Refund;