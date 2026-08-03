import { useState } from "react";
import { createCheckoutSession } from "../../configs/pricing";
import { submitContactForm } from "../../configs/contact";

const ConsultationGateway = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
        type: 'idle',
        message: '',
    });

    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) =>  {
        e.preventDefault();
        setFormStatus({type: 'loading', message: 'Transmitting encrpyted protocol...'});
        const result = await submitContactForm(formData);

        if (result.success) {
            setFormStatus({
                type: 'success',
                message: "Intake file initiated successfully. Please proceed to payment below to lock in your priority slot."
            });
        }else {
            setFormStatus({type: 'error', message: result.message});
        }
    }

    // Stripe Checkout: Single Payment Triggering
    const handlePayment = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (formStatus.type !== "success") {
            setPaymentError("Please complete your clinical intake abouve before proceding to payment.");
            return;
        }

        setPaymentLoading(true);
        setPaymentError(null);

        const result = await createCheckoutSession("Foundation");

        if (result.url) {
            window.location.href = result.url;
        }else if (result.error) {
            setPaymentError(result.error);
            setPaymentLoading(false);
        }
    };

    return (
        <section className="ConsultationGateway" id="gateway">
            <div className="gateway-container">
                
                {/* Header Section */}
                <div className="gateway-header" id="gateway-header">
                    <span className="gateway-subtitle">Secure Ecosystem Access</span>
                    <h1>Initiate Longevity Protocol</h1>
                    <p>
                        Submit your initial clinical inquiry notes and secure your entry into the 
                        longevity track mapping environment.
                    </p>
                </div>
 
                <div className="gateway-grid">
                    
                    {/* Left: Intake Intake Form */}
                    <div className="gateway-form-card">
                        <h2>Step 1: Clinical Intake</h2>
                        <form onSubmit={handleFormSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Enrique Castillo"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={formStatus.type === 'loading'}
                                />
                            </div>
 
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="enrique@castillocode.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={formStatus.type === 'loading'}
                                />
                            </div>
 
                            <div className="form-group">
                                <label htmlFor="message">Clinical Inquiries / Notes</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    placeholder="Detail your personal health objectives or structural inquiries..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    disabled={formStatus.type === 'loading'}
                                ></textarea>
                            </div>
 
                            <button type="submit" className="form-submit-btn" disabled={formStatus.type === 'loading'}>
                                {formStatus.type === 'loading' ? 'Transmitting...' : 'Register Secure Intake File'}
                            </button>
 
                            {formStatus.type !== 'idle' && (
                                <div className={`form-feedback feedback-${formStatus.type}`}>
                                    {formStatus.message}
                                </div>
                            )}
                        </form>
                    </div>
 
                    {/* Right: Flattened Investment Tier */}
                    <div className="gateway-pricing-card">
                        <h2>Step 2: Program Access Fee</h2>
                        <div className="single-plan-box">
                            <p className="plan-name">Foundation Track</p>
                            <p className="plan-tagline">Comprehensive alignment toward optimized vitality.</p>
                            
                            <div className="plan-price">
                                <span className="amount">$1000 </span>
                                <span className="period">/ One-time setup fee</span>
                            </div>
 
                            <div className="plan-divider" />
                            
                            <ul className="plan-features">
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor"><polyline points="20 6 9 17 4 12" /></svg>
                                    1-on-1 consultation (45min - 1hr)
                                </li>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor"><polyline points="20 6 9 17 4 12" /></svg>
                                    Personalized nutrition baseline assessment
                                </li>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor"><polyline points="20 6 9 17 4 12" /></svg>
                                    Core longevity protocol & meal framework
                                </li>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor"><polyline points="20 6 9 17 4 12" /></svg>
                                    Direct email follow-ups within 48 hours
                                </li>
                            </ul>
 
                            {paymentError && <p className="error-text">{paymentError}</p>}
 
                            {formStatus.type !== 'success' && (
                                <p className="gateway-locked-hint">
                                    Complete Step 1: Clinical Intake to unlock payment.
                                </p>
                            )}
 
                            <button 
                                onClick={handlePayment} 
                                className="plan-btn featured-btn" 
                                disabled={paymentLoading || formStatus.type !== 'success'}
                                aria-disabled={paymentLoading || formStatus.type !== 'success'}
                            >
                                {paymentLoading ? "Deploying Gateway..." : "Proceed to Secure Payment"}
                            </button>
                        </div>
                        <p className="pricing-note">
                            Secured transaction layer powered by Stripe. One-time charge. No hidden recurring logic.
                        </p>
                    </div>
 
                </div>
            </div>
        </section>
    );
}
export default ConsultationGateway