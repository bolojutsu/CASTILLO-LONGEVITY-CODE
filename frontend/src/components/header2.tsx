// components/header2.tsx
const Header2 = () => {
    return (
        <header>
            <h1 className="logo">CASTILLO LONGEVITY CODE</h1>
            <nav className="nav-bar">
                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="#bio">BIO</a>
                    <a href="#testimonies">Testimonies</a>
                    <a href="#healthtips">Health Tips</a>
                    <a href="#footer" className="nav-cta">Contact</a>
                </div>
            </nav>
        </header>
    );
};

export default Header2;