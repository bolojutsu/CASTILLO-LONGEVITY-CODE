// components/header2.tsx
const Header2 = () => {
    return (
        <header>
            <h1 className="logo">CASTILLO LONGEVITY CODE</h1>
            <nav className="nav-bar">
                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="#about">About</a>
                    <a href="#gateway" className="nav-cta">BOOK US</a>
                </div>
            </nav>
        </header>
    );
};

export default Header2;