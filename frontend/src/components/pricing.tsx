interface PricingPlan {
    name: string,
    tagline: string,
    price: number,
    period: string,
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
        price: 149,
        period:"/ month",
        features: [
        "Monthly 1-on-1 consultation (45 min)",
        "Personalized nutrition baseline assessment",
        "Core longevity protocol & meal framework",
        "Email support within 48 hours",
        ],
        ctaHref: "Start Foundation",
        ctaLabel:"Starter"
    },
    {
        name: "Optimizaion",
        tagline: "A comprihensive protocol for measurable, lasting transformation",
        price: 299,
        period: "/ month",
        features: [
            "Bi-weekly 1-on-1 consultations (60 min)",
            "Full biochemical & lifestyle analysis",
            "Customized supplement & nutrition roadmap",
            "Quarterly progress reviews & plan recalibration",
            "Priority email & chat support within 24 hours",
        ],
        ctaLabel: "begin Optimization",
        ctaHref: "#contact",
        featured: true,
        badge: "Most Popular"
    },
    {
        name: "longevity Elite",
        tagline: "Full-access concierge care with Enreiqu Castillo directly.",
        price: 599,
        period: "/ month",
        features: [
            "Weekly private consultations with Enrique",
            "Advanced longevity & anti-aging protocol design",
            "Lab work interpretation & biomarker tracking",
            "Direct line access, 7 days a week",
        ],
        ctaLabel: "Apply for Elite",
        ctaHref: "#contact"
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
    return (
      <div className={`pricing-card${plan.featured ? " featured" : ""}`}>
        {plan.badge && <span className="popular-badge">{plan.badge}</span>}
        <p className="plan-name">{plan.name}</p>
        <p className="plan-tagline">{plan.tagline}</p>
        <div className="plan-price">
          <span className="amount">${plan.price}</span>
          <span className="period">{plan.period}</span>
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
        <a href={plan.ctaHref} className="plan-btn">
          {plan.ctaLabel}
        </a>
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