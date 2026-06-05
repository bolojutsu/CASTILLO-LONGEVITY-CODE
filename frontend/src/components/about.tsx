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
                        Since 1992, I have dedicated my career as a professional Nutritionist to decoding 
                        the complex relationship between human biochemistry, premium clinical wellness, 
                        and longevity. What started as a passion for foundational health has evolved into 
                        a mission to deliver cutting-edge, innovative strategies that empower individuals 
                        to optimize their vitality.
                    </p>
                    <p>
                        Through disciplined research and a deep commitment to high-quality care, my goal 
                        is to provide actionable, science-backed pathways that secure a healthier, more 
                        vibrant future for everyone who steps into our ecosystem.
                    </p>

                    {/* {Consultation overview} */}
                    <div className="consultation-section1">
                        <h2>Our consultation service would give an edge over illness</h2>
                        <p>
                            our medicine is designed to effectively target and cure illness, 
                            offering pateints a path to recovery and improved health. With proven results and 
                            a commitment to quality, we are here to support your journy to wellness
                        </p>
                    </div>

                    <div className="consultation-section2">
                        <h2>Our Consultation Assurances</h2>
                        <p className="section2-intro">
                            Innovating health, enhancing lives, vitality, and extending your prime.
                        </p>

                        <div className="showcasing">
                            <div className="showcasing-card showcasing1">
                                <div className="card-icon-paceholder"></div>
                                <h3>Long life</h3>
                                <p>
                                    built to last, our product ensures durabulity and reliability
                                    for a lifetime of satisfaction.
                                </p>
                            </div>

                            <div className="showcasing-card showcasing2">
                                <div className="card-icon-placeholder"></div>
                                <h3>Cure Diseases</h3>
                                <p>
                                    Your trusted sheild against diseases, ensuring health and peace of mind.
                                </p>
                            </div>

                            <div className="showcasing-card showcasing3">
                                <div className="card-icon-placeholder"></div>
                                <h3>Good Health</h3>
                                <p>Promoting wellness one product at a time.</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About