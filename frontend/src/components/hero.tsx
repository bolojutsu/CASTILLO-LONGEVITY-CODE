// components/Hero.tsx
const Hero = () => {
    return (
        <section className="Hero" id="hero">
            <div className="hero-content">
                <h1>CASTILLO LONGEVITY CODE</h1>
                <p>
                   Three decades of nutritional science, distilled into personalized protocols 
                   that extend your healthspan - not just your lifespan.
                </p>
                <div className="hero-btn-group">
                    <a href="#gateway-header" className="hero-btn hero-btn-primary">Contact US</a>
                    <a href="/learn-more" className="hero-btn hero-btn-secondary">Learn more</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;