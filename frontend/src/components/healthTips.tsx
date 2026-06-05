// components/HealthTips.tsx
const HealthTips = () => {
    return (
        <section className="HealthTips" id="healthtips">
            <div className="healthtips-container">
                
                {/* Header block reveals instantly when entering viewport */}
                <div className="healthtips-header reveal">
                    <span className="healthtips-subtitle">Biotech Insights</span>
                    <h1>Health Protocols & Discoveries</h1>
                </div>

                {/* Cultural/Historical Hook Section */}
                <div className="healthtips-intro reveal">
                    <h2>Time-Honored Wisdom Validated by Science</h2>
                    <p>
                        For generations, traditional practitioners across the Caribbean and global cultures 
                        have advocated for the profound systemic benefits of the entire banana fruit, including its nutrient-dense skin. 
                        While early dietary philosophies were often dismissed as unconventional, contemporary 
                        biochemical research is rewriting the narrative on agricultural by-products.
                    </p>
                </div>

                {/* Dynamic Content Columns */}
                <div className="healthtips-grid">
                    
                    <div className="healthtips-content reveal">
                        <h2>US FDA NDI Notification & Global Market Entry</h2>
                        <p>
                            In a historic milestone for agricultural biotechnology, TCI in Taiwan announced that its proprietary 
                            "Banana Peel and Banana Stamen" extracts have successfully completed the US FDA's New Dietary Ingredient (NDI) 
                            safety review process. This marks a global first for banana-derived neuro-nutritional and metabolic health raw materials, 
                            transforming what was once discarded as agricultural waste into a premium bio-active asset poised to disrupt the global wellness market.
                        </p>

                        <p>
                            Utilizing a patented <em>Ultrasonic Cold Extraction</em> protocol, researchers isolated key bio-active compounds 
                            capable of positively influencing emotional equilibrium and sleep architecture. Behavioral models indicate that these specialized 
                            extracts help optimize the metabolic pathways associated with tryptophan expression—effectively accelerating the natural 
                            production of serotonin and melatonin to encourage systemic stress reduction and restorative sleep cycles.
                        </p>

                        <p>
                            Furthermore, scientific explorations into banana stamen extracts have demonstrated significant efficacy in supporting cellular health. 
                            By helping modulate the pathways responsible for dihydrotestosterone production, these extracts present an innovative, 
                            non-pharmaceutical approach to prostate health maintenance. These twin scientific breakthroughs have earned top honors, 
                            including special gold distinctions at the prestigious Geneva Invention Exhibition in Switzerland.
                        </p>
                    </div>

                    {/* Placeholder for an abstract scientific asset or premium medical layout graphic */}
                    <div className="healthtips-graphic reveal">
                        <div className="graphic-overlay">
                            <span>Fig. 04 // Extraction Blueprint</span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default HealthTips;