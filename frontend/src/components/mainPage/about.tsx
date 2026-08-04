const About = () => {
    return (
        <section className="About" id="about">
            <div className="about-container">
                
                {/* Left Side: Large Serif Header */}
                <div className="about-header-card">
                    <h2 className="about-title">
                        The Castillo Code was founded with one singular purpose: 
                    </h2>
                    <h2 className="about-tagline">
                        empower you to harness what we throw away everyday to support lasting vitality.
                    </h2>
                </div>

                {/* Right Side: Narrative Content & Button */}
                <div className="about-content">
                    <p>
                        Through my own health journey and independent study of 
                        nutrition and biochemistry, I discovered the simple lifestyle 
                        and dietary changes that support lasting vitality.
                    </p>

                    <p>
                        Through years of personal study and lived results, we discovered how this overlooked 
                        ingredient becomes your simplest, most powerful daily practice. It turns ordinary nutrition 
                        into lasting energy and resilience.
                    </p>

                    <p className="about-bold-text">
                        Welcome to your health.
                    </p>

                    <a href="/gateway" className="about-btn">Contact US</a>
                </div>

            </div>
        </section>
    );
};

export default About;