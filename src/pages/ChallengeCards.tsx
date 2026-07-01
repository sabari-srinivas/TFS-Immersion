import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ChevronRight,
  CheckCircle2,
  ImageIcon,
  Maximize,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  challenges,
  COMPANY,
  formatChallengeCard,
  getSelectedChallenge,
  setSelectedChallenge,
  type Challenge,
} from "@/data/challenges";

const ChallengeCards = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const existing = getSelectedChallenge();
    const initial = existing?.id ?? challenges[0].id;
    setActiveId(initial);
    setSelectedChallenge(initial);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active: Challenge | null =
    challenges.find((c) => c.id === activeId) ?? null;

  const select = async (c: Challenge) => {
    setActiveId(c.id);
    setSelectedChallenge(c.id);
    // Selecting a card automatically copies its title + statement to the clipboard.
    try {
      await navigator.clipboard.writeText(formatChallengeCard(c));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Challenge card copied", { description: c.title });
    } catch {
      /* clipboard unavailable */
    }
  };

  const clear = () => {
    setActiveId(null);
    setSelectedChallenge(null);
    setFullscreen(false);
  };

  const copyCard = async () => {
    if (!active) return;
    await navigator.clipboard.writeText(formatChallengeCard(active));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goToPrompts = () => navigate("/prompts");

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2.5 shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <h1 className="text-lg font-semibold font-display text-card-foreground">
              Challenge Cards
            </h1>
          </div>
          {active && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground max-w-[320px] truncate">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                Selected: <b className="text-card-foreground font-semibold truncate">{active.title}</b>
              </span>
              <Button variant="outline" size="sm" onClick={clear}>
                Clear
              </Button>
              <Button size="sm" onClick={goToPrompts}>
                Go to Prompts <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Intro */}
      <div className="shrink-0 px-4 pt-3 pb-1">
        <p className="max-w-[1600px] mx-auto text-sm text-muted-foreground text-center">
          Twenty group-level challenges across ten cross-functional tables for the{" "}
          <b className="text-card-foreground">{COMPANY}</b> AI Immersion Day. Click any card on the left to view its
          full card, then carry one into the prompts page.
        </p>
      </div>

      {/* Master–detail */}
      <div className="flex-1 min-h-0">
        <div className="max-w-[1600px] mx-auto h-full p-4 flex gap-5">
          {/* Left: scrollable list */}
          <div className="w-full lg:w-[38%] shrink-0 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-1 pb-2 shrink-0">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {challenges.length} Challenges
              </span>
              <span className="text-xs text-muted-foreground">Click to copy &amp; preview · anchors the prompts</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
              {challenges.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    onClick={() => select(c)}
                    className={`group relative w-full text-left rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      isActive
                        ? "border-green-500/60 bg-green-500/5 ring-1 ring-green-500/40"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-flex items-center justify-center rounded bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
                        {c.table} · {c.type[0]}
                      </span>
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          <Check className="h-3 w-3" /> Selected
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold uppercase tracking-wide text-primary">
                          {c.type}
                        </span>
                      )}
                      <ChevronRight
                        className={`ml-auto h-4 w-4 transition-colors ${
                          isActive ? "text-green-600" : "text-muted-foreground group-hover:text-primary"
                        }`}
                      />
                    </div>
                    <h3 className="text-[15px] font-semibold text-card-foreground font-display leading-snug mb-1">
                      {c.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
                      {c.statement}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: image detail */}
          <div className="hidden lg:flex flex-1 min-w-0 flex-col rounded-xl border border-border bg-card overflow-hidden">
            {active ? (
              <>
                <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border bg-muted/30 shrink-0 flex-wrap">
                  {/* Title + copy */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center justify-center rounded bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground shrink-0">
                      {active.table} · {active.type[0]}
                    </span>
                    <h2 className="text-base font-semibold font-display text-card-foreground truncate">
                      {active.title}
                    </h2>
                    <button
                      onClick={copyCard}
                      title="Copy challenge card"
                      className={`shrink-0 rounded-md p-1.5 transition-colors ${
                        copied ? "text-green-600" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                      }`}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setFullscreen(true)}>
                      <Maximize className="h-4 w-4 mr-1" /> Fullscreen
                    </Button>
                    <Button variant="outline" size="sm" onClick={clear}>
                      Clear
                    </Button>
                    <Button size="sm" onClick={goToPrompts}>
                      Go to Prompts <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto p-5 bg-[#0a0c10] flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setFullscreen(true)}
                    className="w-full cursor-zoom-in"
                    title="Click to view fullscreen"
                  >
                    <img
                      src={active.image}
                      alt={`${active.title} — challenge card`}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-10 text-muted-foreground">
                <ImageIcon className="h-10 w-10 mb-3 opacity-40" />
                <p className="text-sm max-w-xs">
                  Select a challenge on the left to preview its card and carry it into the prompts page.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen image overlay */}
      {fullscreen && active && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          onClick={() => setFullscreen(false)}
        >
          <img
            src={active.image}
            alt={`${active.title} — challenge card`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setFullscreen(false)}
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

export default ChallengeCards;
