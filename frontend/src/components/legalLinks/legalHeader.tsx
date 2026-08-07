import { useState } from "react"
const LegalHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((previous) => !previous);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };


    return (
        <header>
            <h1 className="logo">CASTILLO LONGEVITY CODE</h1>
            <nav className="nav-bar">

                {/* {Mobile Hamburger Toggle Button */}
                <button 
                 className={`hamburger ${isOpen ? 'open' : ''}`} 
                 onClick={toggleMenu}
                 aria-label="Toggle Navigation Menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <a href="/" onClick={closeMenu}>Terms Of Service</a>
                    <a href="">Privacy Policy</a>
                    <a href="#about" onClick={closeMenu}>Medical Disclaimer</a>
                    <a href="/gateway" className="nav-cta" onClick={closeMenu}>Refund Policy</a>
                </div>
            </nav>
        </header>
    );
};

export default LegalHeader