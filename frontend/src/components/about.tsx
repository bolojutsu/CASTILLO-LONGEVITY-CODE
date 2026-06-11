const About = () => {
    return (
        <section className="About" id="about">
            <div className="about-container">
                <div className="about-image">
                    {}
                    <div className="image-fallback">EST. 1992</div>
                </div>
                <div className="about-content">
                    <span className="about-subtitle">Meet the Founder</span>
                    <h1>Hi, I am Enrique Castillo</h1>
                    <p className="lead-text">
                    Since 1992, I've worked as a professional nutritionist decoding the
                    relationship between human biochemistry and longevity. My mission is
                    simple: give you actionable, science-backed strategies to optimize
                    your vitality — for decades, not months.
                    </p>
                    {/* {Consultation overview} */}
                    <div className="consultation-section2">
                        <h2>Our Consultation Assurances</h2>
                        <p className="section2-intro">
                            Innovating health, enhancing lives, vitality, and extending your prime.
                        </p>

                        <div className="showcasing">
                            <div className="showcasing-card showcasing1">
                                <div className="card-icon-paceholder"></div>
                                <h3>Longevity First</h3>
                                <p>
                                    Protocols built for the long game: 
                                    sustanable habits that compound over a lifetime.
                                </p>
                            </div>

                            <div className="showcasing-card showcasing2">
                                <div className="card-icon-placeholder"></div>
                                <h3>Disease Resilliance</h3>
                                <p>
                                    Preventative, science-backed strategiesthat strengthen your body's natural defences.
                                </p>
                            </div>

                            <div className="showcasing-card showcasing3">
                                <div className="card-icon-placeholder"></div>
                                <h3>Daily Vitality</h3>
                                <p>Nutrition tuned to your biochemistry, so you feel the difference week to week.</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About