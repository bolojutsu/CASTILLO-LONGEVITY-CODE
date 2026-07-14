import { useState } from "react";
import { createCheckoutSession } from "../pricing.ts";


interface PricingPlan {
    name: string,
    tagline: string,
    price: number,
    features: string[]
    ctaLabel: string,
    ctaHref: string;
    featured?: boolean;
    badge?: string
}

const plans: PricingPlan[] = [
    {
        name: "Foundation",
        tagline: "For those beginning their journy toward optimized vitality.",
        price: 1000,
        features: [
        "1-on-1 consultation (45min - 1hr)",
        "Personalized nutrition baseline assessment",
        "Core longevity protocol & meal framework",
        "Email support within 48 hours",
        ],
        ctaHref: "Start Foundation",
        ctaLabel:"Starter"
    },
];

const CheckIcon = () => {
    return (
        <svg
        className="check-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const handleCheckout = async (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        // 2. Consume your refactored API layer
        const result = await createCheckoutSession(plan.name);

        if (result.url) {
            // Secure pass-off directly to the vendor's payment system
            window.location.href = result.url;
        } else {
            setErrorMessage(result.error ?? 'Unable to start checkout. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className={`pricing-card${plan.featured ? " featured" : ""}`}>
            {plan.badge && <span className="popular-badge">{plan.badge}</span>}
            <p className="plan-name">{plan.name}</p>
            <p className="plan-tagline">{plan.tagline}</p>
            <div className="plan-price">
                <span className="amount">${plan.price}</span>
            </div>
            <div className="plan-divider" />
            <ul className="plan-features">
                {plan.features.map((feature) => (
                    <li key={feature}>
                        <CheckIcon />
                        {feature}
                    </li>
                ))}
            </ul>

            {/* Display local processing error if something breaks */}
            {errorMessage && <p className="error-text" style={{ color: '#ff4d4d', fontSize: '14px', marginBottom: '10px' }}>{errorMessage}</p>}

            <button 
                onClick={handleCheckout} 
                className="plan-btn" 
                disabled={loading}
                style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
                {loading ? "Processing..." : plan.ctaLabel}
            </button>
        </div>
    );
  }
  
export default function Pricing() {
    return (
        <section className="Pricing" id="pricing">
          <div className="pricing-header">
            <p className="pricing-subtitle">Investment Tiers</p>
            <h1>Payment Packages</h1>
            <p>
              Choose the longevity track that matches your goals. Every tier is
              built on the same research-driven foundation — scaled to the depth of
              guidance and access you need.
            </p>
          </div>
    
          <div className="pricing-grid">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
    
          <p className="pricing-note">
            All packages are billed monthly. Cancel anytime — no long-term
            contracts required.
          </p>
        </section>
      );
}