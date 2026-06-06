// components/Header.tsx
const Header = () => {
    return (
        <header>
            <h1 className="logo">CASTILLO LONGEVITY CODE</h1>
            <nav className="nav-bar">
                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <a href="#bio">Bio</a>
                    <a href="#tips">Health Tips</a>
                   
                </div>
            </nav>
        </header>
    );
};

export default Header;