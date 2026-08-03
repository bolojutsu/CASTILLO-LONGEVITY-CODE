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
        quote: "Enrique's biochemical approach completely transformed my energy. The customized roadmap felt like a comprehensive physical upgrade."
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
        setCurrentIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
    };

    // Format current file indicator (e.g., FILE — 01 / 03)
    const currentFormattedIndex = String(currentIndex + 1).padStart(2, "0");
    const totalFormattedCount = String(testimonialData.length).padStart(2, "0");

    return (
        <section className="Testimonies" id="testimonies">
            <div className="testimonies-container">
                <span className="testimonies-subtitle">Real impact</span>
                <h2>Validated experiences</h2>
                
                <div className="file-tag">
                    FILE — {currentFormattedIndex} / {totalFormattedCount}
                </div>

                <div className="carousel-wrapper">
                    <button 
                        className="carousel-arrow prev-arrow" 
                        onClick={prevSlide} 
                        aria-label="Previous slide"
                    >
                        &#8592;
                    </button>

                    <div className="carousel-viewport">
                        <div 
                            className="carousel-track" 
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonialData.map((item) => (
                                <div className="testimonial-slide" key={item.id}>
                                    <div className="quote-mark">&#8220;</div>
                                    <p className="testimonial-quote">{item.quote}</p>
                                    <div className="quote-divider"></div>
                                    <h3 className="testimonial-name">{item.name}</h3>
                                    <span className="testimonial-role">{item.role}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        className="carousel-arrow next-arrow" 
                        onClick={nextSlide} 
                        aria-label="Next slide"
                    >
                        &#8594;
                    </button>
                </div>

                <div className="carousel-dots-container">
                    {testimonialData.map((_, i) => (
                        <button
                            key={i}
                            className={`carousel-line ${currentIndex === i ? 'line-active' : ''}`}
                            onClick={() => setCurrentIndex(i)}
                            aria-label={`View slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonies;