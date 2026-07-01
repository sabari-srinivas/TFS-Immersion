import { useNavigate } from "react-router-dom";
import { Download, Images, MessageSquare, ArrowRight, ChevronRight } from "lucide-react";

const steps = [
  {
    step: 1,
    tag: "Step 1 · Get Context",
    title: "Deep Research Report",
    description:
      "Read the TSF Group Consolidated AI Immersion Knowledge Pack — entity briefs and cross-vertical synthesis across auto components, distribution and financial services.",
    icon: Download,
    path: "/deep-research",
  },
  {
    step: 2,
    tag: "Step 2 · Pick Challenge",
    title: "Challenge Cards",
    description:
      "Explore 20 group-level challenges across ten cross-functional tables — framed as business problems for the immersion breakout discussions.",
    icon: Images,
    path: "/challenge-cards",
  },
  {
    step: 3,
    tag: "Step 3 · Run Prompt",
    title: "Prompts",
    description:
      "Double Diamond framework prompts tailored to the challenge you pick. Copy and use with your preferred AI assistant.",
    icon: MessageSquare,
    path: "/prompts",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full animate-fade-in">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src="/tsf_favicon.jpg" alt="TSF Group" className="h-12 w-auto rounded-md" />
          </div>
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-3">
            TSF Group
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            AI Immersion Day
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resources for the rapid build immersion — customer intelligence, the Double Diamond framework, and prompts to
            turn business problems into AI-driven pilots across the TSF Group enterprises.
          </p>
        </div>

        {/* Three-step journey */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-2">
          {steps.map((section, i) => (
            <div key={section.path} className="flex items-center gap-2 lg:gap-2 flex-1">
              <button
                onClick={() => navigate(section.path)}
                className="group relative flex-1 h-full overflow-hidden rounded-xl bg-card border border-border p-6 text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 w-full"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-accent" />
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {section.step}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        {section.tag}
                      </span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3 w-fit">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold font-display text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {section.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              </button>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden lg:block h-6 w-6 shrink-0 text-primary/50" />
              )}
            </div>
          ))}
        </div>

        {/* Journey footer */}
        <p className="mt-10 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          A guided three-step journey · Get context → Pick challenge → Run prompt
        </p>
      </div>
    </div>
  );
};

export default Index;
