import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChallengeCard {
  number: string;
  company: string;
  title: string;
  context: string[];
  coreChallenge: string;
  tension: string;
  opportunityAngle: string;
  successMetrics: string[];
}

const challenges: ChallengeCard[] = [
  {
    number: "1",
    company: "OP Pohjola",
    title: "Responsible AI at Scale (Banking & Regulated Industries)",
    context: [
      "AI-first strategy with AI assistants already live",
      "Rising ICT spend (cybersecurity + data protection)",
      "Strong regulatory pressure (ESG, CSRD, fraud risk)",
    ],
    coreChallenge: "How do we scale AI across customer and employee journeys while ensuring trust, compliance, and measurable business value?",
    tension: "Speed of AI innovation vs. regulatory risk, auditability, and customer trust",
    opportunityAngle: "Build a bank-grade AI operating model (governance + platform + value tracking)",
    successMetrics: [
      "Reduced fraud losses",
      "Improved cost-to-income ratio",
      "Faster AI deployment cycles",
    ],
  },
  {
    number: "2",
    company: "Euroclear Finland",
    title: "Post-Transformation Value Realization (Capital Markets Infra)",
    context: [
      "T2S migration completed",
      "Unified platform (TCS BaNCS)",
      "High operational complexity across market participants",
    ],
    coreChallenge: "After major platform modernization (T2S), how do we unlock sustained efficiency and reduce ecosystem friction?",
    tension: "Modern platform exists, but manual exceptions + participant friction still persist",
    opportunityAngle: "Drive \"next-horizon efficiency\" via automation, observability, and data services",
    successMetrics: [
      "Reduced settlement failures",
      "Lower cost-to-serve for participants",
      "Faster onboarding and processing",
    ],
  },
  {
    number: "3",
    company: "Kesko",
    title: "Digital Core Modernization Without Business Disruption (Retail)",
    context: [
      "Largest IT transformation in company history",
      "Multi-partner ecosystem",
      "Strong push on AI, personalization, and automation",
    ],
    coreChallenge: "How do we modernize SAP + digital core while ensuring zero disruption to stores, logistics, and customer experience?",
    tension: "Transformation scale vs. day-to-day retail execution stability",
    opportunityAngle: "Build an AI-powered digital core (SAP S/4 + data + AIOps)",
    successMetrics: [
      "Reduced waste and stockouts",
      "Improved availability and fulfillment",
      "Faster time-to-market for features",
    ],
  },
  {
    number: "4",
    company: "DNA",
    title: "Cloud Transformation with Reliability & Cost Discipline (Telecom)",
    context: [
      "5-year TCS partnership",
      "100+ apps migrating in 24 months",
      "AI depends on cloud data platform",
    ],
    coreChallenge: "How do we migrate 80% of enterprise apps to cloud while maintaining telecom-grade reliability and controlling costs?",
    tension: "Speed of migration vs. risk of outages, security gaps, and cost overruns",
    opportunityAngle: "Establish a cloud migration factory with control tower + FinOps + AI-ready data platform",
    successMetrics: [
      "Reduced run costs",
      "Improved deployment velocity",
      "Zero major service disruptions",
    ],
  },
  {
    number: "5",
    company: "Kalmar",
    title: "Post-Separation IT & Service Monetization (Industrial / Manufacturing)",
    context: [
      "Independent company (post-2024 demerger)",
      "€50M efficiency target by 2026",
      "Strong focus on automation, electrification, and digitalization",
    ],
    coreChallenge: "How do we simplify IT post-demerger while enabling new revenue streams from connected equipment and services?",
    tension: "Cost reduction vs. continued innovation and service growth",
    opportunityAngle: "Create a unified digital core + data-driven service platform",
    successMetrics: [
      "IT cost reduction",
      "Increased recurring service revenue",
      "Faster innovation cycles",
    ],
  },
];

function formatCardText(card: ChallengeCard): string {
  const lines = [
    `${card.company}`,
    `Challenge Card: "${card.title}"`,
    "",
    "Context:",
    ...card.context.map((c) => `● ${c}`),
    "",
    "Core Challenge:",
    card.coreChallenge,
    "",
    "Tension:",
    card.tension,
    "",
    "Opportunity Angle:",
    card.opportunityAngle,
    "",
    "Success Metrics:",
    ...card.successMetrics.map((m) => `● ${m}`),
  ];
  return lines.join("\n");
}

const ChallengeCards = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ChallengeCard | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedPopup, setCopiedPopup] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopy = async (card: ChallengeCard, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(formatCardText(card));
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handlePopupCopy = async (card: ChallengeCard) => {
    await navigator.clipboard.writeText(formatCardText(card));
    setCopiedPopup(true);
    setTimeout(() => setCopiedPopup(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            Challenge Cards
          </h1>
        </div>
      </header>

      {/* Cards */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {challenges.map((card, idx) => (
            <button
              key={idx}
              onClick={() => { setSelected(card); setCopiedPopup(false); }}
              className="group relative rounded-xl border border-border bg-card p-6 text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-accent rounded-t-xl" />

              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wide">
                  {card.company}
                </p>
                <button
                  onClick={(e) => handleCopy(card, idx, e)}
                  className="rounded-md p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  title="Copy challenge content"
                >
                  {copiedIdx === idx ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <h2 className="text-base font-semibold text-card-foreground font-display leading-snug mb-3 group-hover:text-primary transition-colors">
                {card.title}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {card.coreChallenge}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail popup */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-card rounded-2xl border border-border shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close + Copy buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => handlePopupCopy(selected)}
                className="rounded-full p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                title="Copy full challenge"
              >
                {copiedPopup ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{selected.company}</p>
            <h2 className="text-2xl font-bold font-display text-card-foreground mb-5 pr-16">{selected.title}</h2>

            <Section label="Context">
              <ul className="space-y-1.5">
                {selected.context.map((c, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5 shrink-0">●</span> {c}
                  </li>
                ))}
              </ul>
            </Section>

            <Section label="Core Challenge">
              <p className="text-sm text-card-foreground leading-relaxed font-medium italic">{selected.coreChallenge}</p>
            </Section>

            <Section label="Tension">
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.tension}</p>
            </Section>

            <Section label="Opportunity Angle">
              <p className="text-sm text-card-foreground leading-relaxed font-medium">{selected.opportunityAngle}</p>
            </Section>

            <Section label="Success Metrics" last>
              <ul className="space-y-1.5">
                {selected.successMetrics.map((m, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5 shrink-0">●</span> {m}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      )}
    </div>
  );
};

function Section({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? "" : "mb-5"}>
      <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-2">{label}</h3>
      {children}
    </div>
  );
}

export default ChallengeCards;
