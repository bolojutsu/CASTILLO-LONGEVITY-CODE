// components/Contact.tsx
import React, { useState } from 'react';

const Contact = () => {
    // Manage input field state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Track submission status for the UI
    const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
        type: 'idle',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Transmitting encrypted protocol...' });

        try {
            // Point this URL to your local Flask development server port (usually 5000)
            const response = await fetch('http://127.0.0.1:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Submission successful. Our clinical team will reach out shortly.' });
                setFormData({ name: '', email: '', message: '' }); // Clear form fields
            } else {
                setStatus({ type: 'error', message: data.error || 'Transmission failed. Please check inputs.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Unable to connect to security servers. Please try again later.' });
        }
    };

    return (
        <section className="Contact" id="contact">
            <div className="contact-container">
                <div className="contact-header reveal">
                    <span className="contact-subtitle">Secure Gateway</span>
                    <h1>Initiate Consultation</h1>
                    <p>Connect with Enrique Castillo and the longevity research ecosystem to map your personalized biological vitality track.</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form reveal">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Enrique Castillo"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={status.type === 'loading'}
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
                            onChange={handleChange}
                            disabled={status.type === 'loading'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Clinical Inquiries / Notes</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            placeholder="Detail your personal health objectives or structural inquiries..."
                            value={formData.message}
                            onChange={handleChange}
                            disabled={status.type === 'loading'}
                        ></textarea>
                    </div>

                    <button type="submit" className="form-submit-btn" disabled={status.type === 'loading'}>
                        {status.type === 'loading' ? 'Processing...' : 'Secure Booking Request'}
                    </button>

                    {status.type !== 'idle' && (
                        <div className={`form-feedback feedback-${status.type}`}>
                            {status.message}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;