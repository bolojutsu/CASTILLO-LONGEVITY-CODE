// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = 2026;

    const exploreLinks = ['Home', 'About', 'Bio', 'Health Tips'];
    const serviceLinks = ['Consultation', 'Book us'];

    // Utilizing traditional integer-based loops to build out list elements
    const exploreElements = [];
    for (let i = 0; i < exploreLinks.length; i++) {
        const linkText = exploreLinks[i];
        const linkHref = `#${linkText.toLowerCase().replace(' ', '')}`;
        exploreElements.push(
            <li key={i}>
                <a href={linkHref}>{linkText}</a>
            </li>
        );
    }

    const serviceElements = [];
    for (let i = 0; i < serviceLinks.length; i++) {
        const linkText = serviceLinks[i];
        const linkHref = `#${linkText.toLowerCase().replace(' ', '')}`;
        serviceElements.push(
            <li key={i}>
                <a href={linkHref}>{linkText}</a>
            </li>
        );
    }

    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* Branding and Vision Statement */}
                <div className="footer-brand">
                    <h3>CASTILLO LONGEVITY CODE</h3>
                    <p>
                        Optimizing human biochemistry, premium clinical wellness, and 
                        vibrant longevity pathways since 1992.
                    </p>
                </div>
                
                {/* Navigational Column Groups */}
                <div className="footer-links-group">
                    <div className="footer-column">
                        <h4>Explore</h4>
                        <ul>
                            {exploreElements}
                        </ul>
                    </div>
                    
                    <div className="footer-column">
                        <h4>Services</h4>
                        <ul>
                            {serviceElements}
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Regulatory and Metadata Baseline */}
            <div className="footer-bottom">
                <p>&copy; {currentYear} Castillo Longevity Code. All rights reserved.</p>
                <p className="footer-legal">Designed for Premium Clinical Wellness.</p>
            </div>
        </footer>
    );
};

export default Footer;