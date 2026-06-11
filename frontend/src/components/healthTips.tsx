// components/HealthTips.tsx
const HealthTips = () => {
    return (
        <section className="HealthTips" id="healthtips">
            <div className="healthtips-container">
                
                {/* Header block reveals instantly when entering viewport */}
                <div className="healthtips-header reveal">
                    <span className="healthtips-subtitle">Biotech Insights</span>
                    <h1>From Folk Wisdom To FDA Milestone</h1>
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
                            Carribian practioniners have long prized the whole banana- peel included. Modern scinece agrees:
                            banana peel and stamen extracts recently clreared the US FDA's new Dietary Ingredient review,
                            validating their benifits for sleep, stress, and cellular health.
                        </p>
                        <p>
                            A signal of where longevity nutrition is heading-and the kind of reasurch that informs every Castillo protocol.
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