interface SourceLink {
    name: string;
    href: string;
    description: string;
    category?: string;
}

const Sources = () => {
    const sources: SourceLink[] = [
        { 
            name: "Longevity & Lifestyle Study (2024)", 
            href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9428423/", 
            description: "A comprehensive review examining the rich bioactive profile of banana peels—including phenolics, flavonoids, and fibers—and evaluating both conventional and novel extraction methods for use in functional foods and health applications.",
            category: "Clinical Research" 
        },
        { 
            name: "Dietary Impact on Habit Formation", 
            href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9900702/", 
            description: "A clinical study demonstrating how fermenting banana peels with specific lactic acid bacteria (LAB) strains boosts heavy metal (cadmium) clearance, reduces inflammatory markers like IL-8, and protects cells from oxidative stress.",
            category: "Nutrition" 
        },
        { 
            name: "Circadian Rhythm & Recovery Metrics", 
            href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10341257/", 
            description: "An in vitro and in vivo research paper showing that nanoemulsions of banana peel extract inhibit acetylcholinesterase activity and significantly improve short-term memory performance in animal models.",
            category: "Wellness" 
        },
        {
            name: "Cureus",
            href: "https://link.springer.com/article/10.1007/s44187-025-00276-y",
            description: "An in vitro laboratory study assessing the natural antimicrobial and antibacterial properties of Musa extracts incorporated into materials like cotton balls for hygiene and clinical use.",
            category: "More Research",
        },
        {
            name: "Potential Waste Product",
            href: "https://www.academia.edu/123351050/Banana_Peel_A_potential_waste_product_with_numerous_pharmacological_activities",
            description: "An overview examining the medicinal potential of banana peel waste—accounting for 35–38% of the fruit's total weight—focusing on its antibacterial, antioxidant, and anti-inflammatory mechanisms across various plant species.",
            category: "More Research",

        },
        {
            name: "Promising Alternative For Medical Activities",
            href: "https://www.academia.edu/109542132/BANANA_PEEL_CAN_BE_UTILIZE_AS_A_PROMISING_ALTERNATIVE_FOR_MEDICINAL_ACTIVITIES",
            description: "A research review highlighting the rich phytochemical profile of banana peels (phenolics, flavonoids, tannins) and exploring their potential anti-tumor properties, particularly how ripe banana peels generate Tumor Necrosis Factor (TNF) to combat cancer cells.",
            category: "More Research"

        }
    ];

    return (
        <section className="sources" id="sources">
            <div className="sources-container">
                <span className="sources-subtitle">References & Evidence</span>
                <h2 className="sources-title">Scientific Sources</h2>
                
                <div className="sources-grid">
                    {sources.map((item, index) => (
                        <a 
                            key={index} 
                            href={item.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="source-card"
                        >
                            <div className="source-card-header">
                                {item.category && <span className="source-category">{item.category}</span>}
                                <h3 className="source-name">{item.name}</h3>
                                <p className="source-description">{item.description}</p>
                            </div>

                            <span className="source-link-action">
                                Read Research 
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sources;