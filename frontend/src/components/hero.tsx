// components/Hero.tsx
const Hero = () => {
    return (
        <section className="Hero" id="hero">
            <div className="hero-content">
                <h1>CASTILLO LONGEVITY CODE</h1>
                <p>
                   The Castillo Code is a simple practice that yeilds impressive results.
                   It is designed for everyone- whether you are still up on your feet managing an everyday
                   illness, or fcing the final stages or terminal cancer where chemotherapy has been exhausted,
                   hospital options arelimited, and you simply want to give yourself another chance. 
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