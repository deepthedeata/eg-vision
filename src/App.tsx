import React from "react";
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import efgLogo from "./assets/efg-logo.png";

/** ---------- Utilities ---------- */
function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

type NavId = "home" | "solutions" | "platform" | "case-studies" | "research" | "resources" | "about" | "contact";

const NAV: { label: string; id: NavId }[] = [
  { label: "Home", id: "home" },
  { label: "Solutions", id: "solutions" },
  { label: "Platform", id: "platform" },
  { label: "Case Studies", id: "case-studies" },
  { label: "Research", id: "research" },
  { label: "Resources", id: "resources" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

/** ---------- Content (edit this later freely) ---------- */
const HERO = {
  eyebrow: "Applied Vision AI · Bengaluru",
  titleA: "Manufacturing-grade",
  titleB: "Vision AI",
  subtitle:
    "We are a research-first team building machine vision systems through pilots, measurements, and scalable engineering — not hype. We study real factory constraints (lighting, dust, vibration, changeovers) and ship only what survives them.",
  cta1: "Explore solutions",
  cta2: "View case studies",
};

type FlowStep = {
  id: string;
  badge: string;
  title: string;
  promise: string;
  bullets: string[];
  kpis: { label: string; value: string }[];
  visual: {
    title: string;
    lines: { k: string; v: string; hint?: string }[];
  };
};

const FLOW: FlowStep[] = [
  {
    id: "step-1",
    badge: "01",
    title: "Capture & Calibration",
    promise: "Reliable data begins with repeatable optics, lighting, and calibration.",
    bullets: [
      "Lighting recipes + camera placement guidance",
      "Capture SOP (angle, distance, exposure, diffusion)",
      "Calibration and periodic validation checks",
    ],
    kpis: [
      { label: "Repeatability", value: "SOP-driven" },
      { label: "Data quality", value: "Audited" },
      { label: "Variance", value: "Reduced" },
    ],
    visual: {
      title: "Capture checklist",
      lines: [
        { k: "Lighting", v: "diffused / ring / backlight", hint: "depends on surface" },
        { k: "Exposure", v: "locked + validated" },
        { k: "Metadata", v: "shift / SKU / batch / time" },
      ],
    },
  },
  {
    id: "step-2",
    badge: "02",
    title: "Modeling & Benchmarking",
    promise: "Accuracy means nothing without latency and failure-mode reporting.",
    bullets: [
      "Benchmark accuracy by defect type (confusion + examples)",
      "Latency profiling stage-by-stage (capture→decision)",
      "False reject vs missed defect trade-off reporting",
    ],
    kpis: [
      { label: "mAP/F1", value: "Per defect" },
      { label: "Latency", value: "Budgeted" },
      { label: "Failure modes", value: "Logged" },
    ],
    visual: {
      title: "Latency budget (example)",
      lines: [
        { k: "Capture", v: "6 ms" },
        { k: "Preprocess", v: "8 ms" },
        { k: "Inference", v: "22 ms", hint: "edge optimized" },
        { k: "Postprocess", v: "10 ms" },
        { k: "Decision/IO", v: "7 ms" },
      ],
    },
  },
  {
    id: "step-3",
    badge: "03",
    title: "Pilot on Real Line",
    promise: "We validate on your production constraints before scaling.",
    bullets: [
      "Pilot plan with measurable KPIs and acceptance criteria",
      "Operator review workflow and evidence capture",
      "A/B tests for lighting, thresholds, and model versions",
    ],
    kpis: [
      { label: "ROI", value: "Validated" },
      { label: "Uptime impact", value: "Measured" },
      { label: "Operator time", value: "Reduced" },
    ],
    visual: {
      title: "Pilot KPIs",
      lines: [
        { k: "False rejects", v: "tracked" },
        { k: "Missed defects", v: "tracked" },
        { k: "Review time", v: "measured" },
        { k: "Drift", v: "logged" },
      ],
    },
  },
  {
    id: "step-4",
    badge: "04",
    title: "Deploy & Monitor",
    promise: "Production is a living system — monitoring keeps it honest.",
    bullets: [
      "Edge deployment profiles (Jetson/IPC) + fallback logic",
      "Drift monitoring + feedback loop for re-training",
      "Audit-ready traceability (images + metadata + decisions)",
    ],
    kpis: [
      { label: "Edge-ready", value: "Yes" },
      { label: "Monitoring", value: "Always-on" },
      { label: "Traceability", value: "Exportable" },
    ],
    visual: {
      title: "Production signals",
      lines: [
        { k: "Drift score", v: "alert thresholds" },
        { k: "Throughput", v: "FPS / line speed" },
        { k: "Quality trend", v: "SPC-style charts" },
      ],
    },
  },
];

type CaseStudy = {
  id: string;
  industry: string;
  title: string;
  status: string;
  short: string;
  outcomes: { k: string; v: string }[];
  results: string[];
  gallery: { label: string; caption: string }[];
};

const CASES: CaseStudy[] = [
  {
    id: "case-1",
    industry: "Food & Agri Processing",
    title: "Inline grading pilot (quality consistency study)",
    status: "Pilot completed · scaling evaluation",
    short:
      "Measured impact of vision-assisted grading on consistency, rework, and operator time. Built a repeatable capture SOP and evidence workflow.",
    outcomes: [
      { k: "KPI design", v: "Defined" },
      { k: "Repeatability", v: "Improved" },
      { k: "Operator review", v: "Streamlined" },
      { k: "Traceability", v: "Enabled" },
    ],
    results: [
      "Accuracy reported by defect category with borderline examples",
      "Latency profiled capture→decision and optimized on edge profile",
      "False rejects vs misses analyzed with recommended thresholds",
    ],
    gallery: [
      { label: "Inference overlay", caption: "Placeholder: annotated detections/segments on line frames." },
      { label: "Defect samples", caption: "Placeholder: grid of defect crops + class labels." },
      { label: "Dashboard snapshot", caption: "Placeholder: trends, drift, alerts, and batch summaries." },
    ],
  },
  {
    id: "case-2",
    industry: "Automotive Components",
    title: "Surface defect study (lighting + robustness)",
    status: "Study ongoing · dataset expansion",
    short:
      "Controlled study comparing manual inspection vs AI under different lighting angles and line speeds. Focused on robustness and failure modes.",
    outcomes: [
      { k: "Lighting recipes", v: "Tested" },
      { k: "Failure modes", v: "Cataloged" },
      { k: "Edge profile", v: "Validated" },
      { k: "SOP", v: "Drafted" },
    ],
    results: [
      "Trade-offs documented: lighting vs recall vs false alarms",
      "Hard cases collected: glare, texture, oil stains, micro-scratches",
      "Recommendation: illumination + camera placement + confidence policy",
    ],
    gallery: [
      { label: "Before/after lighting", caption: "Placeholder: show how illumination changes defect visibility." },
      { label: "Confusion examples", caption: "Placeholder: borderline and misclassified cases." },
      { label: "Line-speed test", caption: "Placeholder: FPS and latency breakdown under speed changes." },
    ],
  },
  {
    id: "case-3",
    industry: "Pharma Packaging",
    title: "Packaging verification POC (audit-ready evidence)",
    status: "POC completed · next phase scoped",
    short:
      "Validated presence/position/print checks with traceability for QA review. Focus: evidence capture and explainable rejection reasons.",
    outcomes: [
      { k: "Traceability", v: "Audit-ready" },
      { k: "Review workflow", v: "Designed" },
      { k: "Integration", v: "Scoped" },
      { k: "FP analysis", v: "Completed" },
    ],
    results: [
      "Evidence capture pipeline designed (images + metadata + decisions)",
      "False positives analyzed by artifact type and lighting conditions",
      "Integration plan drafted for existing QA workflow",
    ],
    gallery: [
      { label: "Label/print checks", caption: "Placeholder: OCR/verification examples and mismatch highlighting." },
      { label: "Batch report", caption: "Placeholder: exportable report view with samples." },
      { label: "Reject reason UI", caption: "Placeholder: explainable reason cards for QA reviewers." },
    ],
  },
];

const PLATFORM = [
  { group: "Edge", items: ["Jetson / Industrial IPC", "Low-latency inference", "Camera SDK integrations"] },
  { group: "Model", items: ["ONNX / TensorRT", "Segmentation + detection", "Calibration + evaluation"] },
  { group: "Data", items: ["Traceability store", "Batch metadata", "Exportable reports"] },
  { group: "Monitoring", items: ["Drift logs", "Threshold policies", "Alerting hooks"] },
  { group: "Integration", items: ["PLC/MES hooks", "Kafka/MQTT events", "Role-based access"] },
];

/** ---------- Components ---------- */

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-120px" }}
    transition={{ duration: 0.7, delay }}
  >
    {children}
  </motion.div>
);

const SectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  sub?: string;
  right?: React.ReactNode;
}> = ({ eyebrow, title, sub, right }) => (
  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-yellow-200">{eyebrow}</div>
      <div className="mt-2 text-xl font-semibold text-white md:text-2xl">{title}</div>
      {sub ? <div className="mt-2 max-w-2xl text-sm text-blue-100">{sub}</div> : null}
    </div>
    {right ? <div className="md:pb-1">{right}</div> : null}
  </div>
);

/** Sticky scrollytelling step detection */
function useActiveStep(stepIds: string[]) {
  const [active, setActive] = React.useState(stepIds[0] ?? "");
  React.useEffect(() => {
    const els = stepIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stepIds.join("|")]);

  return active;
}

const GlassCard: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div
    className={cn(
      "rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.30)]",
      className
    )}
  >
    {children}
  </div>
);

const App: React.FC = () => {
  const reduced = usePrefersReducedMotion();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState<NavId>("home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  const heroParallax = useTransform(progress, [0, 0.25], [0, -70]);

  const stepIds = FLOW.map((s) => s.id);
  const activeStepId = useActiveStep(stepIds);
  const activeStepIndex = Math.max(0, stepIds.indexOf(activeStepId));

  const [openCase, setOpenCase] = React.useState<CaseStudy | null>(null);
  const [caseTab, setCaseTab] = React.useState<"overview" | "results" | "gallery">("overview");

  const scrollTo = (id: NavId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // active nav highlight via observer
  React.useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveNav(visible.target.id as NavId);
      },
      { threshold: [0.15, 0.35, 0.5] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // esc close modal
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCase(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#040812] text-slate-50">
      {/* Top progress */}
      <div className="fixed left-0 top-0 z-[80] h-[2px] w-full bg-white/5">
        <motion.div className="h-full bg-yellow-300" style={{ width: progressWidth }} />
      </div>

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.22)_0,transparent_55%),radial-gradient(circle_at_85%_20%,rgba(250,204,21,0.18)_0,transparent_55%),radial-gradient(circle_at_50%_85%,rgba(59,130,246,0.18)_0,transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040812]" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050a16]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={efgLogo} alt="EFG" className="h-9 w-auto rounded-lg shadow-sm" />
            <div className="leading-tight">
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                <span className="text-white">EFG · Eye For Good</span>
                <span className="hidden rounded-full border border-yellow-300/40 bg-yellow-300/10 px-2 py-0.5 text-[10px] tracking-[0.18em] text-yellow-100 md:inline-flex">
                  {HERO.eyebrow}
                </span>
              </div>
              <div className="text-[11px] text-blue-100">Research-driven vision systems for real manufacturing lines</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-[12px] md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 transition",
                  activeNav === n.id ? "bg-white text-[#050a16]" : "text-blue-100 hover:bg-white/10"
                )}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden rounded-full bg-yellow-300 px-4 py-2 text-xs font-semibold text-[#050a16] shadow-lg shadow-yellow-300/20 hover:bg-yellow-200 md:inline-flex"
            >
              Discuss a pilot
            </button>

            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[12px] text-blue-100 md:hidden"
            >
              Menu
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="border-t border-white/10 bg-[#050a16]/95 backdrop-blur-xl md:hidden"
            >
              <div className="mx-auto max-w-7xl px-4 py-3">
                <div className="grid gap-2">
                  {NAV.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        setMobileOpen(false);
                        scrollTo(n.id);
                      }}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-blue-50 hover:border-yellow-300/40"
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-28">
        {/* HERO */}
        <section id="home" className="pt-10 md:pt-14 scroll-mt-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center">
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/35 bg-yellow-300/10 px-3 py-1 text-[11px] text-yellow-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-300" />
                  <span>Measurement-first · Pilot-first · Production-minded</span>
                </div>
              </FadeUp>

              <FadeUp delay={0.06}>
                <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                  {HERO.titleA}{" "}
                  <span className="bg-gradient-to-r from-yellow-200 via-white to-sky-200 bg-clip-text text-transparent">
                    {HERO.titleB}
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.12}>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-blue-100 md:text-[15px]">
                  {HERO.subtitle}
                </p>
              </FadeUp>

              <FadeUp delay={0.18}>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("solutions")}
                    className="rounded-2xl bg-yellow-300 px-5 py-2.5 text-xs font-semibold text-[#050a16] shadow-lg shadow-yellow-300/20 hover:bg-yellow-200 md:text-sm"
                  >
                    {HERO.cta1}
                  </button>
                  <button
                    onClick={() => scrollTo("case-studies")}
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-blue-50 hover:border-yellow-300/40 md:text-sm"
                  >
                    {HERO.cta2}
                  </button>
                  <div className="text-[11px] text-blue-200 md:text-xs">Edge-first · Operator UX · Secure deployments</div>
                </div>
              </FadeUp>

              <FadeUp delay={0.24}>
                <div className="mt-8 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
                  {[
                    { k: "Pilot-first", v: "ROI before rollout", n: "We validate on your line, then scale." },
                    { k: "Edge-ready", v: "Low-latency inference", n: "Built for shop floor constraints." },
                    { k: "Evidence-based", v: "Benchmarks & drift logs", n: "Every claim is measurable." },
                    { k: "Operator adoption", v: "Human-friendly UX", n: "Designed for shift teams." },
                  ].map((m) => (
                    <div key={m.k} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <div className="text-[11px] text-blue-200">{m.k}</div>
                      <div className="mt-1 text-sm font-semibold text-white">{m.v}</div>
                      <div className="mt-1 text-[11px] text-blue-100">{m.n}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Hero visual: looks more product-like */}
            <motion.div style={{ y: heroParallax }} className="relative">
              <GlassCard className="overflow-hidden p-3">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#071027] via-[#050a16] to-[#0b1b3a] p-4">
                  <div className="flex items-center justify-between text-[11px] text-blue-100">
                    <span>Vision Console · Preview</span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-300" />
                      <span>Live</span>
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between text-[10px] text-blue-100">
                        <span>Inference snapshots</span>
                        <span className="text-blue-200">detections / segmentation</span>
                      </div>

                      {/* Fake inference frames (placeholder rectangles) */}
                      <div className="mt-3 grid gap-2 md:grid-cols-2">
                        {["Frame A", "Frame B"].map((t, i) => (
                          <motion.div
                            key={t}
                            whileHover={reduced ? {} : { y: -4 }}
                            className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-3"
                          >
                            <div className="text-[10px] text-blue-200">{t}</div>
                            <div className="mt-2 aspect-[16/9] rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent" />
                            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                              <div className="absolute left-3 top-10 h-10 w-16 rounded-md border border-yellow-300/60 bg-yellow-300/10" />
                              <div className="absolute right-6 bottom-6 h-12 w-12 rounded-md border border-sky-300/60 bg-sky-300/10" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-yellow-300/25 bg-yellow-300/10 p-3 text-[11px] text-yellow-100">
                      <span className="font-semibold text-yellow-200">Principle:</span> Proof first. Scale only after
                      measured results.
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* SOLUTIONS - PROFESSIONAL SCROLL FLOW */}
        <section id="solutions" className="mt-16 scroll-mt-24">
          <FadeUp>
            <SectionHeader
              eyebrow="Solutions"
              title="A step-by-step flow that matches how factories actually adopt AI"
              sub="Instead of listing features, we show the process: capture → benchmark → pilot → deploy. Each step reveals details on scroll and responds to hover."
            />
          </FadeUp>

          <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
            {/* Sticky left stepper */}
            <div className="md:sticky md:top-24 md:self-start">
              <GlassCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-blue-200">Flow</div>
                  <div className="text-[11px] text-blue-200">{String(activeStepIndex + 1).padStart(2, "0")}/04</div>
                </div>

                <div className="mt-4 space-y-2">
                  {FLOW.map((s, idx) => {
                    const active = idx === activeStepIndex;
                    return (
                      <button
                        key={s.id}
                        onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                        className={cn(
                          "group w-full rounded-2xl border px-4 py-3 text-left transition",
                          active
                            ? "border-yellow-300/45 bg-yellow-300/10"
                            : "border-white/10 bg-white/5 hover:border-yellow-300/25"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-xl border text-[11px] font-semibold",
                              active ? "border-yellow-300/60 bg-yellow-300/15 text-yellow-100" : "border-white/10 bg-black/20 text-blue-100"
                            )}
                          >
                            {s.badge}
                          </span>
                          <div>
                            <div className="text-sm font-semibold text-white">{s.title}</div>
                            <div className="mt-0.5 text-[11px] text-blue-100">{s.promise}</div>
                          </div>
                        </div>

                        {/* small progress bar */}
                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full bg-yellow-300"
                            initial={{ width: 0 }}
                            animate={{ width: active ? "100%" : "25%" }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-[12px] text-blue-100">
                  This section is designed to feel like a product narrative — not a college landing page.
                </div>
              </GlassCard>
            </div>

            {/* Right scrollytelling content */}
            <div className="space-y-6">
              {FLOW.map((s, idx) => (
                <FlowStepBlock key={s.id} step={s} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* PLATFORM */}
        <section id="platform" className="mt-16 scroll-mt-24">
          <FadeUp>
            <SectionHeader
              eyebrow="Platform"
              title="Modular stack you can deploy edge-first"
              sub="We build production systems: optimized inference, traceability, monitoring, and integrations — designed for real operators."
            />
          </FadeUp>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {PLATFORM.map((p, i) => (
              <FadeUp key={p.group} delay={i * 0.04}>
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">{p.group}</div>
                    <div className="h-10 w-10 rounded-2xl border border-white/10 bg-gradient-to-br from-yellow-300/15 to-sky-300/10" />
                  </div>
                  <ul className="mt-3 space-y-1 text-[13px] text-blue-100">
                    {p.items.map((x) => (
                      <li key={x}>• {x}</li>
                    ))}
                  </ul>
                </GlassCard>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* CASE STUDIES - CLICK TO OPEN MODAL */}
        <section id="case-studies" className="mt-16 scroll-mt-24">
          <FadeUp>
            <SectionHeader
              eyebrow="Case studies"
              title="Short cards → open to full story with results, images, and inference views"
              sub="Professional sites don’t dump long text. They show a clean grid, then open a detailed view when clicked."
            />
          </FadeUp>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {CASES.map((c, i) => (
              <FadeUp key={c.id} delay={i * 0.04}>
                <motion.button
                  whileHover={reduced ? {} : { y: -6 }}
                  onClick={() => {
                    setOpenCase(c);
                    setCaseTab("overview");
                  }}
                  className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 text-left shadow-[0_20px_80px_rgba(0,0,0,0.25)] transition hover:border-yellow-300/35"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.22em] text-blue-200">{c.industry}</div>
                      <div className="mt-2 text-sm font-semibold text-white">{c.title}</div>
                      <div className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-blue-100">{c.short}</div>
                    </div>
                    <div className="shrink-0 rounded-full border border-yellow-300/25 bg-yellow-300/10 px-2.5 py-1 text-[10px] font-semibold text-yellow-100">
                      {c.status}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {c.outcomes.slice(0, 4).map((o) => (
                      <div key={o.k} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                        <div className="text-[10px] text-blue-200">{o.k}</div>
                        <div className="text-[12px] font-semibold text-white">{o.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-yellow-200">
                    Open case study
                    <span className="transition group-hover:translate-x-1">→</span>
                  </div>

                  {/* subtle glow */}
                  <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-yellow-300/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
                </motion.button>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="mt-16 scroll-mt-24">
          <FadeUp>
            <SectionHeader
              eyebrow="Research"
              title="What we measure and publish internally during pilots"
              sub="This is where your credibility comes from: illumination studies, robustness analysis, latency profiling, drift logs, and operator workflow learnings."
            />
          </FadeUp>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { t: "Illumination & optics studies", d: "Lighting recipes that improve defect visibility + repeatability." },
              { t: "Latency profiling", d: "Stage-by-stage timing to meet real-time line constraints." },
              { t: "Robustness to dust/vibration", d: "Shift changes, dust, vibration, SKU changeover impact." },
            ].map((x, i) => (
              <FadeUp key={x.t} delay={i * 0.04}>
                <GlassCard className="p-5">
                  <div className="text-sm font-semibold text-white">{x.t}</div>
                  <div className="mt-2 text-[13px] text-blue-100">{x.d}</div>
                  <div className="mt-4 h-[2px] w-16 bg-yellow-300/70" />
                  <div className="mt-3 text-[11px] text-blue-200">Output: benchmark + report + recommendations</div>
                </GlassCard>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* RESOURCES */}
        <section id="resources" className="mt-16 scroll-mt-24">
          <FadeUp>
            <SectionHeader
              eyebrow="Resources"
              title="Guides, templates, and technical notes"
              sub="We can convert these into a blog/resources section later. For now they act as a credibility layer."
            />
          </FadeUp>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { t: "Factory-ready vision checklist", tag: "Guide", time: "8 min" },
              { t: "Latency: capture → decision measurement", tag: "Tech note", time: "6 min" },
              { t: "Dataset + labeling SOP template", tag: "Template", time: "10 min" },
              { t: "Evaluation beyond a single accuracy number", tag: "Explainer", time: "7 min" },
            ].map((r, i) => (
              <FadeUp key={r.t} delay={i * 0.03}>
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-white">{r.t}</div>
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-blue-100">
                      {r.tag}
                    </span>
                  </div>
                  <div className="mt-2 text-[12px] text-blue-200">{r.time} read</div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-blue-200">Coming soon</span>
                    <button className="rounded-xl border border-yellow-300/25 bg-yellow-300/10 px-3 py-2 text-[12px] font-semibold text-yellow-100 hover:border-yellow-300/45">
                      Request
                    </button>
                  </div>
                </GlassCard>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-16 scroll-mt-24">
          <FadeUp>
            <SectionHeader
              eyebrow="About"
              title="A small team with a manufacturing mindset"
              sub="We build at the intersection of AI, optics, and production engineering. We prioritize repeatability, monitoring, and operator adoption."
            />
          </FadeUp>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { k: "Where", v: "Bengaluru, India" },
              { k: "Focus", v: "Vision AI in production" },
              { k: "Mode", v: "Research → Pilot → Scale" },
            ].map((x, i) => (
              <FadeUp key={x.k} delay={i * 0.04}>
                <GlassCard className="p-5">
                  <div className="text-[11px] text-blue-200">{x.k}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{x.v}</div>
                </GlassCard>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-16 scroll-mt-24">
          <FadeUp>
            <SectionHeader
              eyebrow="Contact"
              title="Want a pilot plan that fits your line?"
              sub="Tell us your product, speed, inspection process, and what 'better' means. We'll respond with a measurement-first approach."
            />
          </FadeUp>

          <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-start">
            <GlassCard className="p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-blue-200">Typical requests</div>
              <ul className="mt-3 space-y-2 text-[13px] text-blue-100">
                <li>• “Validate defect detection on one line.”</li>
                <li>• “We have drift / lighting issues — can you study it?”</li>
                <li>• “We need traceability + QA review workflows.”</li>
                <li>• “We need low latency on edge hardware.”</li>
              </ul>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-[12px] text-blue-100">
                Email: <span className="font-semibold text-yellow-200">hello@eyeforgood.ai</span>
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-yellow-300/25 shadow-[0_0_90px_rgba(250,204,21,0.10)]">
              <form className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Full name" placeholder="Your name" />
                  <Field label="Work email" placeholder="you@company.com" />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Company" placeholder="Plant / organization" />
                  <Field label="Location" placeholder="City, Country" />
                </div>
                <div>
                  <label className="text-[11px] text-blue-100">What do you want to validate?</label>
                  <select className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white outline-none focus:border-yellow-300/45">
                    <option>Choose one</option>
                    <option>Pilot on a single line</option>
                    <option>Lighting/optics study</option>
                    <option>Latency optimization on edge</option>
                    <option>Traceability + QA review workflow</option>
                    <option>Multi-line rollout planning</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-blue-100">Line details</label>
                  <textarea
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white outline-none placeholder:text-blue-300 focus:border-yellow-300/45"
                    placeholder="Line speed, product, lighting, current inspection method, defects, target KPI."
                  />
                </div>
                <button
                  type="button"
                  className="mt-2 w-full rounded-2xl bg-yellow-300 px-4 py-2.5 text-[12px] font-semibold text-[#050a16] shadow-lg shadow-yellow-300/20 hover:bg-yellow-200"
                >
                  Submit
                </button>
                <p className="text-[10px] text-blue-200">We only use your info to respond. No spam.</p>
              </form>
            </GlassCard>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050a16]/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-[12px] text-blue-100 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-white">Eye For Good Technologies (EFG)</div>
            <div>Bengaluru · India</div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} EFG</span>
            <span className="hidden h-1 w-1 rounded-full bg-blue-400 md:inline-block" />
            <span>Research-driven · Pilot-first · Production-minded</span>
          </div>
        </div>
      </footer>

      {/* CASE STUDY MODAL */}
      <AnimatePresence>
        {openCase && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 p-2 md:items-center md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenCase(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#050a16] shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
            >
              {/* Modal header */}
              <div className="flex flex-col gap-3 border-b border-white/10 bg-white/5 p-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-blue-200">{openCase.industry}</div>
                  <div className="mt-1 text-xl font-semibold text-white">{openCase.title}</div>
                  <div className="mt-2 text-[13px] text-blue-100">{openCase.short}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3 py-1 text-[11px] font-semibold text-yellow-100">
                    {openCase.status}
                  </span>
                  <button
                    onClick={() => setOpenCase(null)}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-blue-100 hover:border-yellow-300/35"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-white/10 bg-black/20 px-5 py-3">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "results", label: "Results" },
                  { id: "gallery", label: "Gallery" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCaseTab(t.id as any)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[12px] font-semibold transition",
                      caseTab === t.id
                        ? "border-yellow-300/45 bg-yellow-300/10 text-yellow-100"
                        : "border-white/10 bg-white/5 text-blue-100 hover:border-yellow-300/25"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Body */}
              <div className="max-h-[70vh] overflow-auto p-5">
                <AnimatePresence mode="wait">
                  {caseTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="grid gap-4 md:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]"
                    >
                      <GlassCard className="p-5">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-blue-200">Outcomes</div>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          {openCase.outcomes.map((o) => (
                            <div key={o.k} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                              <div className="text-[10px] text-blue-200">{o.k}</div>
                              <div className="mt-1 text-sm font-semibold text-white">{o.v}</div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-[12px] text-blue-100">
                          Add real numbers later (latency, recall, false reject rate). The layout is built for it.
                        </div>
                      </GlassCard>

                      <GlassCard className="p-5 border-yellow-300/25">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-yellow-200">Inference preview</div>
                        <div className="mt-3 grid gap-3">
                          <div className="aspect-[16/9] rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent" />
                          <div className="grid grid-cols-3 gap-2">
                            {["Defect A", "Defect B", "Defect C"].map((x) => (
                              <div key={x} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                                <div className="text-[10px] text-blue-200">{x}</div>
                                <div className="text-[12px] font-semibold text-white">crop</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  )}

                  {caseTab === "results" && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="grid gap-4 md:grid-cols-2"
                    >
                      <GlassCard className="p-5">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-blue-200">What we measured</div>
                        <ul className="mt-3 space-y-2 text-[13px] text-blue-100">
                          {openCase.results.map((r) => (
                            <li key={r}>• {r}</li>
                          ))}
                        </ul>
                      </GlassCard>

                      <GlassCard className="p-5 border-yellow-300/25">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-yellow-200">Metrics panel</div>
                        <div className="mt-3 grid gap-3">
                          {[
                            { k: "Latency (capture→decision)", v: "— ms" },
                            { k: "Missed defects", v: "— %" },
                            { k: "False rejects", v: "— %" },
                            { k: "Review time", v: "— sec / item" },
                          ].map((m) => (
                            <div key={m.k} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                              <span className="text-[12px] text-blue-100">{m.k}</span>
                              <span className="text-[12px] font-semibold text-white">{m.v}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-[11px] text-blue-200">
                          Replace placeholders with your pilot numbers later.
                        </div>
                      </GlassCard>
                    </motion.div>
                  )}

                  {caseTab === "gallery" && (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="grid gap-4 md:grid-cols-3"
                    >
                      {openCase.gallery.map((g) => (
                        <GlassCard key={g.label} className="p-4">
                          <div className="text-sm font-semibold text-white">{g.label}</div>
                          <div className="mt-2 aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent" />
                          <div className="mt-2 text-[12px] text-blue-100">{g.caption}</div>
                        </GlassCard>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

/** ---------- Flow Step Block (right content) ---------- */
const FlowStepBlock: React.FC<{ step: FlowStep; index: number }> = ({ step, index }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-35% 0px -50% 0px", amount: 0.25 });

  return (
    <div id={step.id} ref={ref} className="scroll-mt-28">
      <motion.div
        initial={{ opacity: 0.6, y: 14 }}
        animate={{ opacity: inView ? 1 : 0.7, y: inView ? 0 : 10 }}
        transition={{ duration: 0.35 }}
        className={cn(
          "group rounded-3xl border bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.25)]",
          inView ? "border-yellow-300/30" : "border-white/10"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-yellow-300/35 bg-yellow-300/10 text-[12px] font-semibold text-yellow-100">
              {step.badge}
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{step.title}</div>
              <div className="mt-1 text-[13px] text-blue-100">{step.promise}</div>
            </div>
          </div>

          <div className="hidden h-12 w-12 rounded-2xl border border-white/10 bg-gradient-to-br from-yellow-300/15 to-sky-300/10 md:block" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)]">
          {/* Text */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-blue-200">What happens here</div>
            <ul className="mt-3 space-y-2 text-[13px] text-blue-100">
              {step.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {step.kpis.map((k) => (
                <div key={k.label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <div className="text-[10px] text-blue-200">{k.label}</div>
                  <div className="text-[12px] font-semibold text-white">{k.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual panel */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.22em] text-yellow-200">{step.visual.title}</div>
              <div className="text-[11px] text-yellow-100">step {step.badge}</div>
            </div>

            <div className="mt-3 space-y-2">
              {step.visual.lines.map((l) => (
                <div key={l.k} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  <div className="text-[12px] text-blue-100">{l.k}</div>
                  <div className="text-right">
                    <div className="text-[12px] font-semibold text-white">{l.v}</div>
                    {l.hint ? <div className="text-[10px] text-blue-200">{l.hint}</div> : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-[11px] text-blue-200">Hover panels + scrollytelling for professional feel.</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/** ---------- Small Field ---------- */
const Field: React.FC<{ label: string; placeholder: string }> = ({ label, placeholder }) => (
  <div>
    <label className="text-[11px] text-blue-100">{label}</label>
    <input
      className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white outline-none placeholder:text-blue-300 focus:border-yellow-300/45"
      placeholder={placeholder}
    />
  </div>
);
