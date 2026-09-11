import img from "../../images/Banana_Tree_road.jpeg";
const Hero = () => {
    return (
        <section className="Hero" id="hero">
            <img
                src={img}
                alt=""
                className="hero-bg-image"
                // This is the LCP element for most users — load it eagerly,
                // with high priority, so it isn't deprioritized behind other assets.
                loading="eager"
                fetchPriority="high"
                decoding="async"
            />
            <div className="hero-content">
                <h1>CASTILLO LONGEVITY CODE</h1>
                <p>
                    The Castillo Code is a simple practice centered on 
                    lifestyle and dietary changes. It is designed for everyone 
                    seeking to build healthier daily habits and improve overall well-being.
                </p>
                <div className="hero-btn-group">
                    <a href="/learn-more" className="hero-btn hero-btn-primary">Learn more</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;