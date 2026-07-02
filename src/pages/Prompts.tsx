import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Maximize, X, CheckCircle2, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, formatChallengeCard, getSelectedChallenge, type Challenge } from "@/data/challenges";

const promptTemplates = [
  {
    step: 0,
    label: "Learn",
    text: `Here is a Deep research report for the topic we are going to discuss today.
No action required. Use this as additional context for your responses apart from web search and other resources.`,
  },
  {
    step: 1,
    label: "Widen",
    text: `Act as a research aide for {{company}} on the {{challenge}} challenge. List key personas, top pains, current workarounds, and success metrics.
Return 5 insights & 3 risks tailored to this challenge context.`,
  },
  {
    step: 2,
    label: "Diagnose",
    text: `Let's pick the top [#] pains for this challenge. For each of these listed top pains, run an individual Five Whys.

For each pain point, propose 3 root-cause hypotheses and the disproof evidence for each.

Specify the minimum data cut & owners to pull.

Output a root-cause map, test plan, and privacy constraints.`,
  },
  {
    step: 3,
    label: "Ideate",
    text: `Generate and Cluster possible AI driven ideas into 3 Options. Generate 5 ideas in each cluster:

1. Process (policy, ways of working),

2. Analytics/ML (forecast, optimise, recommend),

3. Automation (CV, RAG/Co-Pilot, tasking).

Score each on Impact × Feasibility × Confidence × Time-to-Value.

Recommend one pilot with the smallest integration surface and clearest value proof to ${COMPANY}.`,
  },
  {
    step: 4,
    label: "Brief",
    text: `For option [#], create a one-page pilot brief including:

Target user(s), problem statement, success metrics & baselines, target uplift,

key flow (5–7 steps), screens/components, sample UI copy,

representative sample data, integration points, and relevant guardrails

(GDPR/PCI, domain specific regulation boundaries, bias tests, fallback behaviour)`,
  },
  {
    step: 5,
    label: "Build",
    text: `You are a product design expert. Using only the brief above, write a single [platform] product requirements prompt for {{company}} that includes Product name + one liner description (actions, process, capabilities), who it's for, screens + key components, brand colors, main user flow, sample data, concise headlines/CTAs, UI instructions, success metric card, constraints (no PII). Return the [platform] prompt only`,
  },
  {
    step: 6,
    label: "Storyboard",
    text: `Turn the brief above into a single storyboard of the pilot as a flow. The flow is the storyboard: no UI descriptions, no screen mock-ups.

FLOW FIRST, DRAWING SECOND
Before rendering anything, write the flow as an explicit edge list: every connection as (from-node -> to-node, one-bracketed-word label if it is a fallback or escape hatch). Every rendering below must be generated from this edge list. Never draw an arrow that is not in the list; never draw an arrow by visual position alone.

RENDERING
Render the flowchart inline in the chat — not a file: a single vertical column of boxes, top to bottom. Draw a downward arrow ONLY between consecutive boxes that are directly connected in the edge list. For every edge that is NOT a consecutive forward step — backward edges, jumps, and all fallback/escape-hatch edges — do NOT draw a connector: render it as a small labelled chip on the source box (e.g. "[reject] -> 4") and a matching entry chip on the target box (e.g. "from 7"). Mark AI steps and the human decision visibly (an [AI] tag on the box; the decision node in a distinct colour) and add a one-line legend. Keep box text short and legible; the column may scroll vertically. If inline rendering is unavailable, fall back to a plain-text flowchart in a code block: every line under 60 characters, jump targets by node number only (e.g. --> [6]), vertical flow.

FLOW RULES (apply in every rendering)
- Walk the golden path end to end, from trigger to outcome, labelling who acts at each step (persona, system, or human decision-maker).
- Mark every step where AI does work with [AI], and the final human decision with [HUMAN DECIDES].
- 8-12 nodes maximum. Render at most 3 fallback/escape-hatch edges — the ones the room must see; fold the rest into captions.
- NUMBER nodes in reading order, top to bottom down the single column. Renumber the edge list to match the final layout before rendering — no gaps or jumps in the sequence.
- Add a one-line caption under the chart only for nodes whose box text alone is unclear.

VERIFY (always, after the chart, as plain text in the chat)
Print the edge list as a short table: FROM | TO | LABEL. Then check every rendered connector and chip against it and state either "ARROWS VERIFIED AGAINST EDGE LIST" or name the mismatch and fix it before continuing.

UNDER THE FLOWCHART, as plain text in the chat (never inside the diagram), exactly three lines:
STARTS WHEN: ...
ENDS WHEN: ...
THE METRIC MOVES BECAUSE: ...

Then stop and ask the room: "Does this flow match what you think we are building? Name anything wrong or missing before the demo." Do not anticipate or invent corrections yourself — stop after asking and wait for the room's reply. Apply at most one round of corrections from the room — the corrected flow is the walkthrough script the demo is judged against.`,
  },
];

function fill(text: string, challenge: Challenge | null): string {
  const challengeToken = challenge
    ? `"${challenge.title}\n\n${challenge.statement}"`
    : "[selected challenge]";
  return text.replaceAll("{{company}}", COMPANY).replaceAll("{{challenge}}", challengeToken);
}

const Prompts = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedCard, setCopiedCard] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [showCardImage, setShowCardImage] = useState(false);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    setChallenge(getSelectedChallenge());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowFullscreen(false);
        setShowCardImage(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopy = useCallback(async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const handleCopyCard = useCallback(async () => {
    if (!challenge) return;
    await navigator.clipboard.writeText(formatChallengeCard(challenge));
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2000);
  }, [challenge]);

  const prompts = promptTemplates.map((p) => ({ ...p, text: fill(p.text, challenge) }));

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            From Abstract Ideas to Working Demos
          </h1>
        </div>
      </header>

      {/* Anchor banner */}
      <div className="shrink-0 border-b border-border bg-muted/30 px-4 py-2.5">
        <div className="max-w-[1600px] mx-auto flex items-start justify-between gap-3 flex-wrap">
          {challenge ? (
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                <span className="text-muted-foreground">Prompts anchored to</span>
                <span className="inline-flex items-center justify-center rounded bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
                  {challenge.table} · {challenge.type[0]}
                </span>
                <b className="text-card-foreground font-semibold">{challenge.title}</b>
                <span className="text-muted-foreground">· {challenge.domain} · Impact {challenge.impact} · {COMPANY}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-[80ch]">
                {challenge.statement}
              </p>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">
              No challenge selected — placeholders show <code className="text-xs">[selected challenge]</code>. Pick one to
              personalise every prompt.
            </span>
          )}
          <div className="flex items-center gap-2 shrink-0">
            {challenge && (
              <>
                <button
                  onClick={() => setShowCardImage(true)}
                  className="relative shrink-0 rounded-md overflow-hidden border border-border hover:border-primary/50 transition-colors group"
                  title="View challenge card"
                >
                  <img src={challenge.image} alt="" className="h-11 w-auto max-w-[150px] object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize className="h-4 w-4 text-white" />
                  </span>
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyCard}
                  className={copiedCard ? "text-green-600 border-green-300" : ""}
                >
                  {copiedCard ? (
                    <>
                      <Check className="h-4 w-4 mr-1" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" /> Copy challenge card
                    </>
                  )}
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={() => navigate("/challenge-cards")}>
              <LayoutGrid className="h-4 w-4 mr-1" /> {challenge ? "Change challenge" : "Pick a challenge"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content: Image left, All prompts right */}
      <div className="flex-1 min-h-0">
        <div className="max-w-[1600px] mx-auto h-full p-4 flex gap-5">
          {/* Left: Image */}
          <div className="w-[45%] shrink-0 rounded-lg border border-border overflow-hidden bg-black relative hidden lg:flex flex-col">
            <div className="w-full h-full bg-black flex items-center justify-center">
              <img
                src="/dd-prompt.jpeg"
                alt="Framework diagram"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              className="absolute top-3 right-3 h-8 w-8 rounded-md bg-black/60 hover:bg-black/80 text-white flex items-center justify-center z-10"
              onClick={() => setShowFullscreen(true)}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile: Image shown above prompts */}
          <div className="lg:hidden rounded-lg border border-border overflow-hidden bg-black relative mb-4">
            <img
              src="/dd-prompt.jpeg"
              alt="Framework diagram"
              className="w-full h-auto object-contain"
            />
            <button
              className="absolute top-3 right-3 h-8 w-8 rounded-md bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              onClick={() => setShowFullscreen(true)}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>

          {/* Right: All prompts visible, scrollable */}
          <div className="flex-1 min-w-0 overflow-y-auto pr-1 space-y-3">
            <h2 className="text-base font-bold font-display text-foreground mb-3">
              Follow the {prompts.length}-Step Framework
            </h2>

            {prompts.map((prompt, index) => (
              <div
                key={prompt.step}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {prompt.step}
                    </span>
                    <span className="text-sm font-semibold text-card-foreground font-display">
                      {prompt.label}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-7 text-xs ${copiedIndex === index ? "text-green-600 border-green-300" : ""}`}
                    onClick={() => handleCopy(prompt.text, index)}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3 w-3 mr-1" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" /> Copy
                      </>
                    )}
                  </Button>
                </div>

                {/* Prompt content */}
                <div className="px-4 py-3">
                  <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-line">
                    {prompt.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen image overlay */}
      {showFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setShowFullscreen(false)}
        >
          <img
            src="/dd-prompt.jpeg"
            alt="Framework diagram fullscreen"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Challenge card fullscreen overlay */}
      {showCardImage && challenge && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          onClick={() => setShowCardImage(false)}
        >
          <img
            src={challenge.image}
            alt={`${challenge.title} — challenge card`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setShowCardImage(false)}
            title="Close (Esc)"
            className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Prompts;
