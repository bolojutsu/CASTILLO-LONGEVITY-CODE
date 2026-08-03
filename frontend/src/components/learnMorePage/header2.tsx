import { useState } from 'react';

const Header2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <h1 className="logo">CASTILLO LONGEVITY CODE</h1>
      
      <nav className="nav-bar">
        {/* Mobile Hamburger Toggle Button */}
        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="#bio" onClick={closeMenu}>BIO</a>
          <a href="#testimonies" onClick={closeMenu}>Testimonies</a>
          <a href="#healthtips" onClick={closeMenu}>Health Tips</a>
          <a href="#footer" className="nav-cta" onClick={closeMenu}>Contact</a>
        </div>
      </nav>
    </header>
  );
};

export default Header2;