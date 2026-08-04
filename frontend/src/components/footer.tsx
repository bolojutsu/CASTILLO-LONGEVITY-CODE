// components/Footer.tsx
interface LinkItem {
    label: string;
    href: string;
}

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const exploreLinks: LinkItem[] = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/#about' },
        { label: 'Bio', href: '/learn-more#bio' },
        { label: 'Health Tips', href: '/learn-more#healthtips' },
    ];

    const serviceLinks: LinkItem[] = [
        { label: 'Consultation', href: '/gateway' },
        { label: 'Learn More', href: '/learn-more' },
        { label: 'Testimonies', href: '/learn-more#testimonies'}
    ];

    const legalLinks: LinkItem[] = [
        { label: 'Terms Of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Medical Disclaimer', href: '/disclaimer'},
        { label: 'Refund Policy', href: '/refunds'},
    ]

    return (
        <footer className="site-footer" id="footer">
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
                            {exploreLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="footer-column">
                        <h4>Services</h4>
                        <ul>
                            {serviceLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer-column'>
                        <h4>Legal</h4>
                        <ul>
                            {legalLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
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