const Disclaimer = () => {
    return (
        <div className="legal-page disclaimer-page">
            <div className="legal-header">
                <span className="legal-eyebrow">Legal</span>
                <h1>Medical Disclaimer</h1>
                <p className="legal-updated">Last updated: August 3, 2026</p>
            </div>

            <div className="legal-body">
                <div className="disclaimer-callout">
                    <strong>Important:</strong> The information and services provided by Castillo Longevity Code
                    are for general wellness and educational purposes only. They are not intended to diagnose,
                    treat, cure, or prevent any disease, and do not constitute medical advice.
                </div>

                <section>
                    <h2>1. Not a Substitute for Medical Care</h2>
                    <p>
                        Nothing shared during a consultation, in written protocols, or on this website is a
                        substitute for professional medical advice, diagnosis, or treatment. Always seek the advice
                        of your physician or other qualified health provider with any questions you may have
                        regarding a medical condition.
                    </p>
                </section>

                <section>
                    <h2>2. No Doctor-Patient Relationship</h2>
                    <p>
                        Engaging with Castillo Longevity Code's consultation services does not create a
                        doctor-patient relationship. Our guidance is advisory and educational, grounded in
                        research-informed wellness practices, but is not clinical medical treatment.
                    </p>
                </section>

                <section>
                    <h2>3. Consult Your Physician</h2>
                    <p>
                        Before beginning any new diet, supplement, exercise regimen, or lifestyle protocol discussed
                        during a consultation, please consult your physician — particularly if you are pregnant,
                        nursing, taking medication, or managing an existing health condition.
                    </p>
                </section>

                <section>
                    <h2>4. Individual Results Vary</h2>
                    <p>
                        Testimonials and outcomes described on this site reflect individual experiences and are not
                        a guarantee of results for any other person.
                    </p>
                </section>

                <section>
                    <h2>5. Emergencies</h2>
                    <p>
                        If you are experiencing a medical emergency, call your local emergency number or go to the
                        nearest emergency room immediately. Do not rely on this website or consultation services for
                        urgent medical needs.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Disclaimer;