export interface Challenge {
  id: string;
  table: string;
  type: "Primary" | "Secondary";
  domain: string;
  impact: string;
  title: string;
  statement: string;
  challenge: string;
  whyNow: string;
  anchors: string[];
  aiFit: string;
  guardrails: string;
  image: string;
}

export const COMPANY = "TSF Group";

export const challenges: Challenge[] = [
  {
    id: "T1-P",
    table: "T1",
    type: "Primary",
    domain: "Growth / where-to-play",
    impact: "5/5",
    title: "Coordinated Group Growth",
    statement:
      "No one holds a single group view of where the 1,200-branch, multi-vertical footprint is under- or over-served.",
    challenge:
      "Each entity grows on its own map, so a town strong in finance may be blind in insurance, parts or savings — and the group can neither see the white space nor sequence its expansion. Around this table: a lender, a manufacturer, an AMC and a parts house each “know their patch” but none sees the household or region as a whole.",
    whyNow:
      "Footprints are large enough that overlap and gaps now cost real growth, and consented data finally makes a shared view possible.",
    anchors: ["1,200+ branches", "15 entities", "SF 600 br", "AMC 71,816 distributors"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Consent-safe data only; respect RBI/SEBI/IRDAI segregation; no cross-entity pooling without governance.",
    image: "/challenges/T1-P.png",
  },
  {
    id: "T1-S",
    table: "T1",
    type: "Secondary",
    domain: "Data governance / enablement",
    impact: "4/5",
    title: "Common Consent-Safe Data Sharing",
    statement:
      "There is no common, consent-safe way for entities to share data or AI capability; each rebuilds governance, models and guardrails alone, with no group AI centre to reuse.",
    challenge:
      "Every entity stands up its own data controls, model governance and guardrails from zero, so effort is duplicated, standards drift and no shared spine exists to build on. Around this table: a regulated lender, an insurer, a fund house and a manufacturer each solve the same governance problem from scratch.",
    whyNow:
      "AI ambition rises across all entities while a federated structure leaves no shared spine, multiplying cost and risk.",
    anchors: ["15 entities", "Federated, no group AI CoE", "RBI/NHB/SEBI/IRDAI"],
    aiFit: "Process · Build M",
    guardrails: "Regulator-specific data residency; consent ledger; no commingling of regulated datasets.",
    image: "/challenges/T1-S.png",
  },
  {
    id: "T2-P",
    table: "T2",
    type: "Primary",
    domain: "Quality / first-time-right",
    impact: "5/5",
    title: "Group-Wide First-Time-Right Quality",
    statement:
      "Plants define “good” differently, so there is no group view of quality or yield, and a defect learned in one plant is not shared with the next.",
    challenge:
      "Foundry yield sits at 55–65%, so a third or more of effort is scrapped or reworked — and a lesson learned on one line rarely reaches the next. Around this table: a brake maker, a wheel maker, a turbo maker and a die-caster each carry their own quality language with no common standard.",
    whyNow:
      "Yield gaps are large and persistent, and customers increasingly demand demonstrable, consistent quality.",
    anchors: ["Brakes India 16 plants", "Foundry yield 55–65%", "Wheels India", "Sundaram Dynacast"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Plant-floor data stays with owning entity; no use that overrides safety-critical sign-off.",
    image: "/challenges/T2-P.png",
  },
  {
    id: "T2-S",
    table: "T2",
    type: "Secondary",
    domain: "Environment / sustainability",
    impact: "4/5",
    title: "One Environmental Picture",
    statement:
      "Energy and emissions across 36+ factories are told plant-by-plant, so the group has no consolidated environmental picture to manage, report or improve against.",
    challenge:
      "Each site reports its own meters in its own format, so no one can add them up, benchmark plant against plant, or steer the group's energy and emissions as a single number. Around this table: every plant tracks its own meters, but no one can see or steer the group footprint.",
    whyNow:
      "Reporting and decarbonisation expectations are rising and a fragmented view blocks credible commitments.",
    anchors: ["36+ factories"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Verified-data only for any external disclosure; avoid unsubstantiated claims.",
    image: "/challenges/T2-S.png",
  },
  {
    id: "T3-P",
    table: "T3",
    type: "Primary",
    domain: "Customer experience / relationship",
    impact: "5/5",
    title: "Disjointed Customer Experience",
    statement:
      "A customer who is financed, insured and serviced by the group arrives as a fresh stranger at every touchpoint, because no one holds the whole relationship.",
    challenge:
      "The same person is re-asked, re-verified and re-sold at every step, so effort is wasted and the next genuine need goes unseen. Around this table: a dealer financing a vehicle, an insurer covering it and a service arm maintaining it each see only their slice of the same customer.",
    whyNow:
      "Customers expect to be recognised, and the data to join the relationship exists but is siloed.",
    anchors: ["SF 600 br", "Royal Sundaram 27.39 lakh policies", "AMC 3.5M+ investors"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Consent-gated identity resolution; honour IRDAI/RBI data-use limits.",
    image: "/challenges/T3-P.png",
  },
  {
    id: "T3-S",
    table: "T3",
    type: "Secondary",
    domain: "Decision speed & consistency",
    impact: "4/5",
    title: "Consistent Frontline Decisions",
    statement:
      "Daily credit, pricing, claims and quote decisions are slower and more uneven than they should be, varying by which branch or assessor handles them and leaning on manual judgement and scattered information.",
    challenge:
      "Outcomes depend on who happens to handle the case and what they can find, so similar customers get different answers, decisions take longer and value leaks. Around this table: a credit officer, a claims assessor and a service advisor each decide differently for similar cases.",
    whyNow:
      "Volume and customer expectations make uneven, manual decisions a growing source of leakage and unfairness.",
    anchors: ["SF net stage-3 0.69%", "Royal Sundaram 3.68 lakh claims", "SF 600 br"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Human-in-the-loop on adverse decisions; audit trail; fair-lending/IRDAI compliance.",
    image: "/challenges/T3-S.png",
  },
  {
    id: "T4-P",
    table: "T4",
    type: "Primary",
    domain: "Working capital / cash-to-cash",
    impact: "5/5",
    title: "Working Capital Across The Chain",
    statement:
      "Working capital is trapped across the make-sell-finance chain as inventory, receivables and float that no single owner sees end to end.",
    challenge:
      "Each link optimises its own balance sheet while cash sits idle in the gaps between them, so the chain as a whole carries far more working capital than it needs. Around this table: a manufacturer holding stock, a dealer network carrying receivables and a financier funding the float each manage a fragment of one flow.",
    whyNow:
      "Rates and demand swings make trapped cash expensive, and the chain spans group entities that could net it.",
    anchors: ["Axles India 400k housings/yr", "IMPAL ~89 br, ~18,000 dealers"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Arm's-length inter-entity terms; no regulated-lending bias; transfer-pricing compliance.",
    image: "/challenges/T4-P.png",
  },
  {
    id: "T4-S",
    table: "T4",
    type: "Secondary",
    domain: "Productivity / talent leverage",
    impact: "4/5",
    title: "Freeing People For Higher Work",
    statement:
      "Skilled people spend too much of their time on repetitive, rules-based tasks across F&A, dealership finance and fund or loan operations, which caps their impact and the group's capacity to grow.",
    challenge:
      "Hours go to checking, matching and keying work a machine could handle, so expert judgement is spent on routine throughput and manual capacity becomes the ceiling on growth. Around this table: an underwriter, a fund-ops analyst and a dealership accountant all lose hours to work a machine could check.",
    whyNow:
      "Talent is scarce and volumes are rising, so manual throughput is a hard ceiling on growth.",
    anchors: ["42,000+ employees", "15 entities", "SBS 400+ professionals"],
    aiFit: "AI-Automation · Build H",
    guardrails: "Maker-checker retained; no autonomous action on regulated transactions.",
    image: "/challenges/T4-S.png",
  },
  {
    id: "T5-P",
    table: "T5",
    type: "Primary",
    domain: "Customer identity / single view",
    impact: "5/5",
    title: "One Group, One Customer (Identity)",
    statement:
      "The same household or business appears as unrelated records across entities, so the group cannot recognise a consented shared customer even when it is plainly the same party.",
    challenge:
      "A dealer buying parts, financing stock and insuring it shows up as three unconnected customers, so the group cannot join a relationship it already has. Around this table: a parts house, a financier and an insurer each hold a different key to the same identity.",
    whyNow:
      "Identity resolution is now technically feasible and the cost of treating one customer as many is rising.",
    anchors: ["SF 600 br", "Royal Sundaram 27.39 lakh policies", "AMC ₹76,008 cr AUM / 3.5M investors"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Consent-first matching; entity-level access controls; regulator data-use limits.",
    image: "/challenges/T5-P.png",
  },
  {
    id: "T5-S",
    table: "T5",
    type: "Secondary",
    domain: "Knowledge access at point of need",
    impact: "4/5",
    title: "Augmenting The Everyday Expert",
    statement:
      "Hard-won know-how is locked in a few experienced heads and scattered documents, and the frontline cannot reach it at the moment a decision is made.",
    challenge:
      "When that knowledge is needed most it cannot be reached, so decisions wait on a phone call, repeat an old mistake, or default to the safest guess. Around this table: a foundry veteran, a senior underwriter and a master technician each hold answers their teams cannot find in time.",
    whyNow:
      "Senior experts are retiring while frontline numbers grow, widening the gap between need and knowledge.",
    anchors: ["42,000+ employees", "36+ factories"],
    aiFit: "Process · Build M",
    guardrails: "Source-cited answers; no fabricated guidance on safety-critical work.",
    image: "/challenges/T5-S.png",
  },
  {
    id: "T6-P",
    table: "T6",
    type: "Primary",
    domain: "Trust / provenance / proof",
    impact: "5/5",
    title: "Trust You Can Demonstrate",
    statement:
      "Trust is carried by reputation, but customers and partners increasingly want it shown in the moment — a genuine part proven against a fake, a claim settled openly, a donation traced to its outcome.",
    challenge:
      "Today that proof is manual, slow or simply unavailable, so trust rests on being believed rather than being shown in the moment. Around this table: a parts maker, an insurer and a charity each rely on being believed rather than being able to demonstrate.",
    whyNow:
      "Counterfeits, claim disputes and donor scrutiny all rise, and demonstrable provenance is becoming an expectation, not a differentiator.",
    anchors: ["Laxmi 200,000+ students", "SMF 230+ beds, 30% free OP / 15% free IP", "Royal Sundaram 27.39 lakh policies"],
    aiFit: "Process · Build M",
    guardrails: "Verifiable records only; no overstated provenance claims; trust-data privacy honoured.",
    image: "/challenges/T6-P.png",
  },
  {
    id: "T6-S",
    table: "T6",
    type: "Secondary",
    domain: "Compliance / risk posture",
    impact: "4/5",
    title: "Consolidated Multi-Regulator Posture",
    statement:
      "Four separately regulated entities each carry their own compliance, cyber and incident-reporting, so the group has no consolidated risk and obligation posture.",
    challenge:
      "Each entity assesses threats, logs incidents and answers its regulator on its own terms, so the group cannot see its total exposure or respond to a shared risk as one. Around this table: a bank-like lender, an insurer, a fund house and a home-finance arm each face their regulator alone.",
    whyNow:
      "Cyber and reporting obligations are intensifying and fragmented posture raises both cost and exposure.",
    anchors: ["Royal Sundaram 27.39 lakh policies", "SF 600 br", "RBI/NHB/SEBI/IRDAI"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Regulator-specific segregation; no shared view that breaches confidentiality rules.",
    image: "/challenges/T6-S.png",
  },
  {
    id: "T7-P",
    table: "T7",
    type: "Primary",
    domain: "Frontline ramp & consistency",
    impact: "4/5",
    title: "Frontline Capability At Scale",
    statement:
      "New and frontline staff ramp slowly and execute inconsistently across a manufacturing and a financial-services culture, and engineering or operating know-how lives in senior people and scattered docs so teams reinvent answers.",
    challenge:
      "Without a shared playbook, capability is rebuilt person by person and answers are reinvented team by team, so ramp-up is slow and execution swings across the two cultures. Around this table: a shop-floor lead, a branch officer and a service desk each onboard and decide differently with no shared playbook.",
    whyNow:
      "Hiring is scaling across two cultures while experienced staff thin out, so inconsistent execution compounds.",
    anchors: ["42,000+ employees", "1,200+ branches", "36+ factories"],
    aiFit: "Process · Build M",
    guardrails: "Cited, approved sources; no autonomous customer-facing advice without review.",
    image: "/challenges/T7-P.png",
  },
  {
    id: "T7-S",
    table: "T7",
    type: "Secondary",
    domain: "Next-best-need / retention",
    impact: "4/5",
    title: "Anticipating The Next Need",
    statement:
      "The group cannot anticipate a customer's next need across the sell-finance-insure-service journey, and interested or existing customers slip away between touchpoints when follow-up depends on manual memory — a test-drive gone cold, a policy not renewed.",
    challenge:
      "Follow-up depends on someone remembering, so warm intent cools between touchpoints and the obvious next step — a renewal, a service, a cross-sell — is quietly missed. Around this table: a dealer, a financier and an insurer each see one moment but not the next.",
    whyNow:
      "Follow-up is manual and leak-prone while customers expect timely, relevant outreach.",
    anchors: ["SF 600 br", "Royal Sundaram 27.39 lakh policies"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Consent-based outreach; honour do-not-contact and cross-sell limits.",
    image: "/challenges/T7-S.png",
  },
  {
    id: "T8-P",
    table: "T8",
    type: "Primary",
    domain: "Shared back-office / process",
    impact: "4/5",
    title: "Group Operational Excellence",
    statement:
      "Back-office functions run independently in every entity, repeating the same effort and delivering uneven service for work that is heavy, repeatable and largely common.",
    challenge:
      "The same heavy, repeatable work is stood up separately in every entity, so effort is duplicated and service levels swing depending on which team happens to run it. Around this table: an F&A team, a dealership finance desk and a fund-ops unit each rebuild the same process.",
    whyNow:
      "Cost pressure and volume growth make duplicated back-office a clear, addressable drag.",
    anchors: ["15 entities", "42,000+ employees", "1,200+ branches"],
    aiFit: "AI-Automation · Build H",
    guardrails: "Entity data segregation; maker-checker; no regulated-process automation without sign-off.",
    image: "/challenges/T8-P.png",
  },
  {
    id: "T8-S",
    table: "T8",
    type: "Secondary",
    domain: "Shared-services platform",
    impact: "4/5",
    title: "Reusable Shared-Services Spine",
    statement:
      "A proven business-process management capability already exists in one entity but is not offered as a reusable spine the rest of the group can plug into.",
    challenge:
      "That engine stays captive to the entity that built it, so the rest of the group re-solves problems it has already cracked instead of plugging into a shared capability. Around this table: a fund administrator, a mortgage-broker servicer and a group F&A team each could draw on the same engine but do not.",
    whyNow:
      "Demand for managed processing is rising and a ready capability is being under-leveraged.",
    anchors: ["SBS 400+ professionals", "SMSF ~5,000 funds/yr", "3,600+ mortgage brokers"],
    aiFit: "Process · Build H",
    guardrails: "Client-data confidentiality; clear inter-entity service terms.",
    image: "/challenges/T8-S.png",
  },
  {
    id: "T9-P",
    table: "T9",
    type: "Primary",
    domain: "Demand sensing / planning",
    impact: "5/5",
    title: "Connected Supply-Demand Signal",
    statement:
      "The same end-demand reaches plants as lagged, separate signals as it passes plant to dealer to lender, so by the time it shows in plant numbers it is too late to respond gently and a ramp drifting or a segment turning is seen late.",
    challenge:
      "Demand is read late and in pieces, so a ramp drifting or a segment turning shows up in plant numbers only after the moment to respond gently has passed. Around this table: a wheel plant, an axle line and a financier each read a different, delayed echo of the same demand.",
    whyNow:
      "Demand and cost swing faster than planning cycles, making lagged signals expensive in stock and capacity.",
    anchors: ["Wheels India +15%", "Axles India 400k housings/yr"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Forecasts advisory, not binding; no anti-competitive demand-sharing across customers.",
    image: "/challenges/T9-P.png",
  },
  {
    id: "T9-S",
    table: "T9",
    type: "Secondary",
    domain: "Supply-chain resilience / risk",
    impact: "4/5",
    title: "Resilience To Common Shocks",
    statement:
      "Safety-critical and aerospace entities each carry supply-chain and resilience planning separately, so the group's exposure to a common shock — a shared supplier, region or input — is unmapped.",
    challenge:
      "Because resilience is planned entity by entity, a shared supplier, region or input can sit behind several businesses at once with no one able to see the concentrated risk. Around this table: an aerospace pivot, an axle maker and a brakes supplier may depend on the same single point without anyone knowing.",
    whyNow:
      "Concentration and geopolitical risk are rising while resilience is managed entity-by-entity.",
    anchors: ["ABI aerospace capex ₹80–100 cr", "Axles India 400k housings/yr"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Supplier-data confidentiality; defence/aerospace export-control limits.",
    image: "/challenges/T9-S.png",
  },
  {
    id: "T10-P",
    table: "T10",
    type: "Primary",
    domain: "Group treasury / cash visibility",
    impact: "5/5",
    title: "Consolidated Group Cash View",
    statement:
      "Cash and free cash sit on 15 balance sheets with no near-current consolidated view, so the group cannot see what is trapped versus idle or move it where it earns most.",
    challenge:
      "Balances are visible only entity by entity and only after the fact, so the group cannot tell what is genuinely trapped from what is merely idle, or move money to where it earns most. Around this table: a manufacturer holding free cash, a deposit-taking financier and a fund house each see only their own till.",
    whyNow:
      "Rate volatility makes idle and trapped cash costly, and a near-real-time group view is now feasible.",
    anchors: ["Turbo Energy ₹986 cr free cash", "Wheels India debt/EBITDA ~3.4×", "SF deposits ₹8,873 cr"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "No commingling of regulated deposits; respect ring-fencing and statutory liquidity rules.",
    image: "/challenges/T10-P.png",
  },
  {
    id: "T10-S",
    table: "T10",
    type: "Secondary",
    domain: "Capital allocation discipline",
    impact: "4/5",
    title: "Consistent Capital Allocation",
    statement:
      "Capital is deployed entity-by-entity against different yardsticks, so the group cannot compare returns or sequence investment on a common basis.",
    challenge:
      "With no common yardstick, each entity makes its own case for capital, so returns cannot be compared like-for-like and investment cannot be sequenced across the group. Around this table: a turbo maker, an aerospace pivot and the investment arm each justify capital their own way.",
    whyNow:
      "Large, lumpy capex decisions are in play and inconsistent hurdles risk misallocation.",
    anchors: ["Turbo Energy ₹986 cr free cash", "ABI capex ₹80–100 cr", "TSF Investments"],
    aiFit: "Analytics-ML · Build M",
    guardrails: "Advisory framework only; board retains allocation authority.",
    image: "/challenges/T10-S.png",
  },
];

/**
 * Text version of a challenge card — the blue title plus the white statement.
 * Deliberately omits the table number, Primary/Secondary and impact metadata.
 */
export function formatChallengeCard(c: Challenge): string {
  return `${c.title}\n\n${c.statement}`;
}

// ---- selected-challenge persistence (shared across pages) ----
const STORAGE_KEY = "tsf.selectedChallengeId";

export function getSelectedChallenge(): Challenge | null {
  try {
    const id = localStorage.getItem(STORAGE_KEY);
    if (!id) return null;
    return challenges.find((c) => c.id === id) ?? null;
  } catch {
    return null;
  }
}

export function setSelectedChallenge(id: string | null): void {
  try {
    if (id) localStorage.setItem(STORAGE_KEY, id);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
