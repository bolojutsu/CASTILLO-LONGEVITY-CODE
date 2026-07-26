// hooks/useScrollReveal.ts
import { useEffect } from "react";

const useScrollReveal = () => {
    useEffect(() => {
        // Find elements dynamically when the effect fires
        const reveals = document.querySelectorAll(".reveal");
        
        if (reveals.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Corrected typo to "visible" and targeted the element directly
                        entry.target.classList.add("visible");
                        
                        // Stop observing this element once it has been revealed
                        observer.unobserve(entry.target);
                    }
                });
            },
            { 
                threshold: 0.15, // Triggers when 15% of the element is in view
                rootMargin: "0px 0px -50px 0px" // Triggers slightly before entry for smoother UX
            }
        );

        reveals.forEach((el) => observer.observe(el));
        
        // Clean up connections to avoid memory leaks[cite: 10]
        return () => observer.disconnect();
    }, []); // Runs once on component insertion
};

export default useScrollReveal;