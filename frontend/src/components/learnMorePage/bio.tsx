const Bio = () => {
    return (
        <section className="Bio" id="bio">
            <div className="bio-container">
                {/* Main Section Header */}
                <header className="bio-header">
                    <span className="bio-subtitle">Philosophy & Framework</span>
                    <h1>The Castillo Code: A Revolutionary framework, three decades in the making.</h1>
                </header>

                {/* Narrative Grid Content */}
                <div className="bio-grid">
                    <div className="bio-card bio-section1">
                        <h2>Introduction: A Revolutionary Discovery</h2>
                        <p>
                        The Castillo Code is the result of 30+ years decoding the hidden
                        patterns that connect time, environment, and human health. It
                        challenges conventional models of disease — proposing that illness
                        follows traceable patterns we can anticipate and disrupt before they
                        manifest. Every consultation applies this framework to your unique biochemistry.
                        </p>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};

export default Bio;