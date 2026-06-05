import { useState } from "react";

interface Testimonial {
    id: number;
    name: string;
    role: string; 
    quote: string;
}

const testimonialData: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Client since 2024",
        quote: "Enrique's biochemical approach completely transformed my energy. The customized roadmap wasn't just a basic dietary routine; it felt like a comprehensive physical upgrade."
    },
    {
        id: 2,
        name: "Dr. Marcus Vance",
        role: "Clinical Researcher",
        quote: "As a professional working in the medical space, I highly value precision. Castillo's dedication to research-driven, high-quality protocols yields structural, proven results."
    },
    {
        id: 3,
        name: "Elena Rostova",
        role: "Wellness Advocate",
        quote: "The assurance of safe, long-term longevity protocols brought me here. Having a science-backed preventative strategy gives me an indisputable edge against fatigue."
    }
];


const Testimonies = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    
    const nextSlide = () => {
        setCurrentIndex((previousIndex) => 
            previousIndex === testimonialData.length - 1 ? 0 : previousIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((previousIndex) => 
          previousIndex === 0 ? testimonialData.length - 1 : previousIndex - 1
        );
    };

    const indicatorDots = [];
    for (let i =0; i < testimonialData.length; i++) {
        indicatorDots.push(
            <button
                key={i}
                className={`carousel-dot ${currentIndex === i ? 'dot-active' : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`View slide ${i + 1}`}
            />
        );
    };

    return (
        <section className="Testimonies" id="testimonies">
            <div className="testimonies-container">
                <span className="testimonies-subtitle">Real Impact</span>
                <h2>Validated Experiences</h2>

                <div className="carousel-wrapper">
                    <button className="carousel-arrow previous-arrow" onClick={prevSlide} aria-label="Previous slide">
                        &#8592;
                    </button>
                </div>

                <div className="carousel-viewport">
                    <div 
                    className="carousel-track" 
                    style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                    {testimonialData.map((item) => (
                        <div className="testimonial-slide" key={item.id}>
                            <p className="testimonial-quote">"{item.quote}"</p>
                            <h3 className="testimonial-name">{item.name}</h3>
                            <span className="testimonial-role">{item.role}</span>
                        </div>
                    ))}
                    </div>
                </div>

                <button className="carousel-arrow next-arrow" onClick={nextSlide} aria-label="Next slide">
                    &#8594;
                </button>
            </div>
            <div className="carousel-dots-container">
                {indicatorDots}
            </div>
        </section>
    )
}
export default Testimonies