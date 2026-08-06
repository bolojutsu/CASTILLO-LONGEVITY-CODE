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
            href: "https://example.com/study-1", 
            description: "A comprehensive clinical review analyzing daily movement patterns and key biomarkers associated with healthy cellular aging.",
            category: "Clinical Research" 
        },
        { 
            name: "Dietary Impact on Habit Formation", 
            href: "https://example.com/study-2", 
            description: "Investigates how consistent nutritional timing and whole-food choices influence long-term habit adherence and sustained cognitive energy.",
            category: "Nutrition" 
        },
        { 
            name: "Circadian Rhythm & Recovery Metrics", 
            href: "https://example.com/study-3", 
            description: "Examines light exposure protocols, sleep architecture optimization, and their direct measurable impact on heart rate variability.",
            category: "Wellness" 
        },
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