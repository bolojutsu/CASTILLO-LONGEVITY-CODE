// components/Hero.tsx
const Hero = () => {
    return (
        <section className="Hero" id="hero">
            <div className="hero-content">
                <h1>CASTILLO LONGEVITY CODE</h1>
                <p>
                   Three decades of nutritional science, distilled into personalized protocals 
                   that extend your healthspan - not just your lifespan.
                </p>
                <div className="hero-btn-group">
                    <button className="hero-btn hero-btn-primary">Contact US</button>
                    <a href="/learn-more" className="hero-btn hero-btn-secondary">Learn more</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;