import { useNavigate } from 'react-router-dom';

/* ─── Feature Cards are rendered inline below ──────────────────────── */

/* ─── Workflow steps ───────────────────────────────────────────────── */
const steps = [
  {
    label: 'GENERATE',
    color: '#0a72ef',
    title: 'Describe your target',
    desc: 'Specify your seniority level, role, and topic. Our AI scopes the perfect challenge.',
  },
  {
    label: 'TEST',
    color: '#de1d8d',
    title: 'Write and run code',
    desc: 'Full in-browser code editor with real-time test case execution and instant output.',
  },
  {
    label: 'SUBMIT',
    color: '#ff5b4f',
    title: 'Get AI insights',
    desc: 'Receive deep architectural analysis, complexity breakdown, and refactoring suggestions.',
  },
];

/* ─── Metric cards ─────────────────────────────────────────────────── */
const metrics = [
  { value: '12k+', label: 'Active developers', id: 'metric-devs' },
  { value: '94%', label: 'Interview pass rate', id: 'metric-pass' },
  { value: '10x', label: 'Faster skill growth', id: 'metric-growth' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <section className="max-w-content mx-auto px-6 pt-20 pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 badge-pill mb-10 animate-fade-in">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#0a72ef] animate-pulse-dot"
            aria-hidden="true"
          />
          v2.0 — Powered by DeepCode AI
        </div>

        {/* Hero headline */}
        <h1
          className="font-sans font-semibold text-[#171717] mb-6 animate-slide-up"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: '1.02',
            letterSpacing: '-0.05em',
          }}
        >
          coder<span className="kinetic-x">X</span>
          {' '}—{' '}
          <br className="hidden sm:block" />
          Generate Coding Challenges
          <br />
          Instantly
        </h1>

        {/* Subtitle */}
        <p
          className="max-w-[600px] mx-auto text-[#4d4d4d] mb-10"
          style={{ fontSize: '1.25rem', lineHeight: '1.80', letterSpacing: '0' }}
        >
          Elevate your technical skills with AI-engineered coding interview
          questions tailored exactly to your seniority and target role.
        </p>

        {/* Prompt bar */}
        <div
          id="hero-prompt-bar"
          className="w-full max-w-2xl mx-auto mb-8"
          style={{
            boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)',
            borderRadius: '8px',
          }}
        >
          <div className="flex flex-col sm:flex-row overflow-hidden rounded-card">
            <div className="relative flex-1 flex items-center bg-white">
              <span className="material-symbols-outlined absolute left-4 text-[#808080] text-xl" aria-hidden="true">
                auto_awesome
              </span>
              <input
                id="hero-prompt-input"
                type="text"
                className="w-full bg-transparent pl-12 pr-4 py-4 text-[#171717] placeholder:text-[#808080] focus:outline-none text-sm sm:text-base"
                placeholder="Generate medium-level graph problems for FAANG interviews…"
                aria-label="Describe the coding challenge you want"
              />
            </div>
            <button
              id="hero-generate-btn"
              className="btn-primary rounded-none sm:rounded-r-card px-6 py-4 justify-center whitespace-nowrap text-sm"
              onClick={() => navigate('/problem/1')}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">bolt</span>
              Generate Problem
            </button>
          </div>
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-start-btn"
            className="btn-ghost"
            onClick={() => navigate('/dashboard')}
          >
            Start Practicing
          </button>

          {/* Social proof */}
          <div
            className="flex items-center gap-3 px-5"
            style={{ borderLeft: '1px solid #ebebeb' }}
          >
            <div className="flex -space-x-2">
              {['A', 'B', 'C'].map((l, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                  style={{
                    background: ['#0a72ef', '#de1d8d', '#ff5b4f'][i],
                    boxShadow: '0 0 0 2px #ffffff',
                  }}
                  aria-hidden="true"
                >
                  {l}
                </div>
              ))}
            </div>
            <span
              className="text-[#4d4d4d] font-medium"
              style={{ fontSize: '0.875rem' }}
            >
              Join <strong className="text-[#171717]">12k+</strong> developers
            </span>
          </div>
        </div>
      </section>

      {/* ── SECTION DIVIDER ────────────────────────────────────────── */}
      <div className="section-divider" />

      {/* ── METRICS SECTION ────────────────────────────────────────── */}
      <section className="max-w-content mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {metrics.map(({ value, label, id }) => (
            <div
              key={id}
              id={id}
              className="text-center py-8 px-6 rounded-card transition-shadow duration-200"
              style={{
                boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04), 0px 0px 0px 1px #fafafa',
              }}
            >
              <div
                className="font-sans font-semibold text-[#171717] mb-2"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.05em', lineHeight: '1' }}
              >
                {value}
              </div>
              <div className="text-[#4d4d4d]" style={{ fontSize: '0.875rem', fontWeight: '400' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION DIVIDER ────────────────────────────────────────── */}
      <div className="section-divider" />

      {/* ── WORKFLOW SECTION ───────────────────────────────────────── */}
      <section className="max-w-content mx-auto px-6 py-20">
        <div className="mb-14 text-center">
          <h2
            className="font-sans font-semibold text-[#171717] mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.05em', lineHeight: '1.2' }}
          >
            From prompt to submission
          </h2>
          <p className="text-[#4d4d4d] max-w-md mx-auto" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            A three-stage pipeline that mirrors real engineering workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-8 left-[calc(33%+2rem)] right-[calc(33%+2rem)] h-px"
            style={{ background: 'linear-gradient(90deg, #0a72ef, #de1d8d, #ff5b4f)' }}
            aria-hidden="true"
          />

          {steps.map(({ label, color, title, desc }, i) => (
            <div
              key={label}
              className="relative flex flex-col md:items-center md:text-center px-6 py-8"
            >
              {/* Step number dot */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5 font-mono font-semibold text-white text-sm relative z-10"
                style={{ background: color, letterSpacing: '0' }}
                id={`step-${i + 1}-dot`}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Mono label */}
              <span
                className="text-mono-label mb-2"
                style={{ color }}
              >
                {label}
              </span>

              {/* Title */}
              <h3
                className="font-sans font-semibold text-[#171717] mb-2"
                style={{ fontSize: '1.25rem', letterSpacing: '-0.03em', lineHeight: '1.3' }}
              >
                {title}
              </h3>

              {/* Description */}
              <p className="text-[#4d4d4d]" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION DIVIDER ────────────────────────────────────────── */}
      <div className="section-divider" />

      {/* ── FEATURES BENTO GRID ────────────────────────────────────── */}
      <section className="max-w-content mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <h2
            className="font-sans font-semibold text-[#171717] mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.05em', lineHeight: '1.2' }}
          >
            Engineering intelligence,<br />built in.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
          {/* Large card */}
          <div
            id="feature-ai-problems"
            className="md:col-span-2 md:row-span-2 rounded-image p-8 flex flex-col justify-between overflow-hidden relative group bg-[#fafafa] transition-shadow duration-200"
            style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)' }}
          >
            <div className="z-10 relative">
              <span className="badge-pill mb-5 inline-flex" style={{ color: '#0068d6' }}>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">neurology</span>
                Generate
              </span>
              <h3
                className="font-sans font-semibold text-[#171717] mb-3"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', letterSpacing: '-0.04em', lineHeight: '1.2' }}
              >
                AI-Generated<br />Coding Problems
              </h3>
              <p className="text-[#4d4d4d] max-w-xs" style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}>
                Our neural engine creates unique, never-before-seen challenges that prevent rote
                memorization and test true logical capability.
              </p>
            </div>

            {/* Decorative code block */}
            <div
              className="absolute bottom-6 right-6 rounded-card p-4 font-mono text-xs text-[#4d4d4d] bg-white max-w-[200px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}
              aria-hidden="true"
            >
              <div className="text-[#de1d8d]">// AI Output</div>
              <div className="text-[#0a72ef]">problem.generate(</div>
              <div className="pl-2 text-[#666]">"medium", "graph"</div>
              <div className="text-[#0a72ef]">)</div>
            </div>
          </div>

          {/* Small card — difficulty */}
          <div
            id="feature-difficulty"
            className="rounded-image p-7 flex flex-col justify-between bg-white group transition-shadow duration-200"
            style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)' }}
          >
            <div>
              <span className="badge-pill mb-4 inline-flex" style={{ color: '#de1d8d', background: '#fdf0f8' }}>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">signal_cellular_alt</span>
                Test
              </span>
              <h3
                className="font-sans font-semibold text-[#171717] mb-2"
                style={{ fontSize: '1.25rem', letterSpacing: '-0.04em' }}
              >
                Custom Difficulty
              </h3>
              <p className="text-[#4d4d4d]" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                From LeetCode Easy to competitive programming nightmares—calibrated to your level.
              </p>
            </div>
            {/* Mini difficulty visual */}
            <div className="flex items-end gap-1.5 mt-4" aria-hidden="true">
              {[30, 55, 75, 90, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-micro transition-all duration-300 group-hover:opacity-100"
                  style={{
                    height: `${h * 0.35}px`,
                    background: i < 2 ? '#0a72ef' : i < 4 ? '#de1d8d' : '#ff5b4f',
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Small card — languages */}
          <div
            id="feature-languages"
            className="rounded-image p-7 flex flex-col justify-between bg-white transition-shadow duration-200"
            style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)' }}
          >
            <div>
              <span className="badge-pill mb-4 inline-flex" style={{ color: '#ff5b4f', background: '#fff3f2' }}>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">terminal</span>
                Submit
              </span>
              <h3
                className="font-sans font-semibold text-[#171717] mb-2"
                style={{ fontSize: '1.25rem', letterSpacing: '-0.04em' }}
              >
                Multi-Language
              </h3>
              <p className="text-[#4d4d4d]" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                Python, Java, C++, TypeScript, Rust, and Go supported natively.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3" aria-hidden="true">
              {['PY', 'JS', 'C++', 'RS', 'GO', 'JV'].map((lang) => (
                <span
                  key={lang}
                  className="text-mono-label bg-[#fafafa] px-2 py-0.5 rounded-micro text-[#666666]"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Full-width card — feedback */}
          <div
            id="feature-feedback"
            className="md:col-span-3 rounded-image p-7 flex flex-col md:flex-row items-start md:items-center gap-8 bg-white transition-shadow duration-200"
            style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)' }}
          >
            <div className="flex-1">
              <h3
                className="font-sans font-semibold text-[#171717] mb-2"
                style={{ fontSize: '1.5rem', letterSpacing: '-0.04em' }}
              >
                Instant feedback & explanations
              </h3>
              <p className="text-[#4d4d4d]" style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}>
                Not just "Correct" or "Incorrect." Get deep architectural analysis and complexity
                breakdown of your solutions in real-time.
              </p>
            </div>
            <div
              className="flex-1 w-full font-mono text-sm rounded-card p-4 bg-[#fafafa]"
              style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}
              aria-label="AI feedback example"
            >
              <div className="flex gap-1.5 mb-3" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-[#ff5b4f] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[#de1d8d] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[#0a72ef] opacity-60" />
              </div>
              <div className="text-[#de1d8d] mb-0.5">// Analysis Complete</div>
              <div className="text-[#4d4d4d]">Efficiency: <span className="text-[#0a72ef]">O(log n)</span></div>
              <div className="text-[#4d4d4d]">Memory: <span className="text-[#0a72ef]">O(H)</span></div>
              <div className="text-[#808080] mt-1">💡 Consider edge case for empty arrays.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION DIVIDER ────────────────────────────────────────── */}
      <div className="section-divider" />

      {/* ── CTA SECTION ────────────────────────────────────────────── */}
      <section className="max-w-content mx-auto px-6 py-24 text-center">
        <div
          className="max-w-2xl mx-auto rounded-image py-16 px-8"
          style={{
            boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04), 0px 0px 0px 1px #fafafa',
            background: '#fafafa',
          }}
        >
          <h2
            className="font-sans font-semibold text-[#171717] mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.05em', lineHeight: '1.2' }}
          >
            Stop Memorizing.
            <br />
            Start Engineering.
          </h2>
          <p className="text-[#4d4d4d] mb-8 max-w-md mx-auto" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Join the next generation of engineers who use AI to sharpen their problem-solving edge.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              id="cta-get-started-btn"
              className="btn-primary px-8 py-3 text-base"
              onClick={() => navigate('/dashboard')}
            >
              Get Started Free
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
            </button>
            <button
              id="cta-generate-btn"
              className="btn-ghost px-8 py-3 text-base"
              onClick={() => navigate('/problem/1')}
            >
              Try a Problem
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer
        className="bg-[#fafafa]"
        style={{ borderTop: '1px solid #171717' }}
      >
        <div className="max-w-content mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5b4f] text-lg" aria-hidden="true">terminal</span>
            <span
              className="font-sans font-semibold text-[#171717]"
              style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}
            >
              coder<span className="kinetic-x">X</span>
            </span>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <div className="flex gap-6 text-[#666666]" style={{ fontSize: '0.875rem' }}>
              {['Privacy', 'Terms', 'API', 'GitHub'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:text-[#171717] transition-colors duration-150"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>

          {/* Copyright */}
          <div className="text-mono-label text-[#808080]">
            © 2026 CODERX LABS
          </div>
        </div>
      </footer>
    </div>
  );
}
