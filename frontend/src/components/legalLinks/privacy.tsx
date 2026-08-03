const Privacy = () => {
    return (
        <div className="legal-page privacy-page">
            <div className="legal-header">
                <span className="legal-eyebrow">Legal</span>
                <h1>Privacy Policy</h1>
                <p className="legal-updated">Last updated: August 3, 2026</p>
            </div>

            <div className="legal-body">
                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        Castillo Longevity Code ("we," "us," or "our") respects your privacy and is committed to
                        protecting the personal information you share with us. This Privacy Policy explains what
                        information we collect, how we use it, and the choices you have.
                    </p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <p>When you use our site, we may collect:</p>
                    <ul>
                        <li><strong>Contact information</strong>: You submit through our intake form, including your name, email address, and any clinical notes or health objectives you choose to share.</li>
                        <li><strong>Payment information</strong>: Processed through Stripe when you purchase a consultation package. We do not store your card number or billing details ourselves — Stripe handles and secures this data directly.</li>
                        <li><strong>Basic technical information</strong>: Such as browser type and general usage data, collected automatically as part of normal website operation.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <p>We use the information you provide to:</p>
                    <ul>
                        <li>Respond to your consultation request and schedule appointments</li>
                        <li>Process payments for services you purchase</li>
                        <li>Send confirmation and follow-up communications related to your booking</li>
                        <li>Maintain the security and proper functioning of our website</li>
                    </ul>
                    <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
                </section>

                <section>
                    <h2>4. Third-Party Services</h2>
                    <p>We rely on trusted third-party providers to operate our services:</p>
                    <ul>
                        <li><strong>Stripe</strong> — processes all payments securely. Stripe's own privacy policy governs how they handle your payment data.</li>
                        <li><strong>Resend</strong> — delivers transactional emails, such as booking confirmations, on our behalf.</li>
                    </ul>
                </section>

                <section>
                    <h2>5. Data Retention</h2>
                    <p>
                        We retain intake form submissions and related correspondence only as long as necessary to
                        provide our services and comply with legal or accounting obligations. You may request
                        deletion of your information at any time using the contact details below.
                    </p>
                </section>

                <section>
                    <h2>6. Your Rights</h2>
                    <p>
                        You may request access to, correction of, or deletion of the personal information we hold
                        about you by contacting us. We will respond to verified requests within a reasonable timeframe.
                    </p>
                </section>

                <section>
                    <h2>7. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Material changes will be reflected by
                        updating the "Last updated" date above.
                    </p>
                </section>

                <section>
                    <h2>8. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy or how your information is handled, please
                        reach out through our consultation intake form.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;