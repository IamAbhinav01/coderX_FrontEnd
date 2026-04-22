import { useNavigate } from 'react-router-dom';

/* ─── Complexity metrics ───────────────────────────────────────────── */
const metrics = [
  {
    id:          'metric-time',
    label:       'Time Complexity',
    value:       'O(N)',
    accentColor: '#0a72ef',
    desc:        'Linear time. Your algorithm processes each node exactly once, ensuring optimal scaling for large datasets.',
    workflow:    'DEVELOP',
  },
  {
    id:          'metric-space',
    label:       'Space Complexity',
    value:       'O(H)',
    accentColor: '#de1d8d',
    desc:        'Height of the tree. Memory allocation is bounded by the recursion depth of the call stack.',
    workflow:    'TEST',
  },
  {
    id:          'metric-rank',
    label:       'Performance Rank',
    value:       'Top 1%',
    accentColor: '#ff5b4f',
    desc:        'Beats 99% of all submitted solutions in both time and memory efficiency.',
    workflow:    'SHIP',
  },
];

/* ─── Test case results ────────────────────────────────────────────── */
const testCases = [
  { id: 'tc-1', label: 'Case 1', input: '[3, 9, 20, null, null, 15, 7]', output: '[[3],[9,20],[15,7]]', status: 'PASSED',  color: '#0a72ef' },
  { id: 'tc-2', label: 'Case 2', input: '[1]',                            output: '[[1]]',              status: 'PASSED',  color: '#0a72ef' },
  { id: 'tc-3', label: 'Case 3', input: '[]',                             output: '[]',                 status: 'PASSED',  color: '#0a72ef' },
];

export default function AIFeedbackPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pb-20 md:pb-8">
      <div className="max-w-content mx-auto px-6 py-12">

        {/* ── SUCCESS BANNER ─────────────────────────────────────── */}
        <section className="text-center mb-14 animate-slide-up">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{ boxShadow: '0px 0px 0px 1px rgba(10, 114, 239, 0.20), 0px 0px 0px 4px rgba(10, 114, 239, 0.08)' }}
          >
            <span
              className="material-symbols-outlined text-[2rem] text-[#0a72ef]"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              check_circle
            </span>
          </div>

          <h1
            className="font-sans font-semibold text-[#171717] mb-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.05em', lineHeight: '1.05' }}
          >
            Problem Solved!
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="badge-pill"
              id="xp-badge"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">star</span>
              +120 XP earned
            </span>
            <span
              className="badge-pill"
              style={{ background: '#fff0f0', color: '#ff5b4f' }}
            >
              🔥 12-day streak maintained
            </span>
          </div>

          <p className="text-mono-label text-[#808080]">
            SUBMISSION ID: #CX-88291-ALPHA
          </p>
        </section>

        {/* ── SECTION DIVIDER ────────────────────────────────────── */}
        <div className="h-px bg-[#ebebeb] mb-10" />

        {/* ── COMPLEXITY METRIC CARDS ────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="font-sans font-semibold text-[#171717] mb-6"
            style={{ fontSize: '1.25rem', letterSpacing: '-0.04em' }}
          >
            Performance Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.map(({ id, label, value, accentColor, desc, workflow }) => (
              <div
                key={id}
                id={id}
                className="rounded-image p-6 bg-white transition-shadow duration-200"
                style={{
                  boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04), 0px 0px 0px 1px #fafafa',
                  borderLeft: `3px solid ${accentColor}`,
                }}
              >
                {/* Workflow label (Vercel pipeline style) */}
                <span
                  className="text-mono-label mb-3 block"
                  style={{ color: accentColor }}
                >
                  {workflow}
                </span>

                {/* Metric label */}
                <p className="text-mono-label text-[#808080] mb-1">{label}</p>

                {/* Large value — Vercel metric card style: 48px, weight 600, -2.4px */}
                <div
                  className="font-sans font-semibold text-[#171717] mb-3"
                  style={{ fontSize: '2.5rem', letterSpacing: '-0.05em', lineHeight: '1', fontVariantNumeric: 'tabular-nums' }}
                >
                  {value}
                </div>

                <p className="text-[#4d4d4d]" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEST CASE RESULTS ──────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="font-sans font-semibold text-[#171717] mb-4"
            style={{ fontSize: '1.25rem', letterSpacing: '-0.04em' }}
          >
            Test Cases
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {testCases.map(({ id, label, input, output, status, color }) => (
              <div
                key={id}
                id={id}
                className="rounded-card p-4 bg-[#fafafa]"
                style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-mono-label text-[#808080]">{label}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ color, fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    <span className="text-mono-label" style={{ color, fontSize: '10px' }}>
                      {status}
                    </span>
                  </div>
                </div>
                <div
                  className="rounded-subtle p-3 font-mono"
                  style={{
                    background: '#ffffff',
                    boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.06)',
                    fontSize: '0.75rem',
                  }}
                >
                  <p className="text-[#808080] mb-1">
                    Input: <span className="text-[#171717]">{input}</span>
                  </p>
                  <p className="text-[#808080]">
                    Output: <span className="text-[#0a72ef]">{output}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── AI SUGGESTIONS ─────────────────────────────────────── */}
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Suggestions panel */}
            <div
              id="ai-suggestions-panel"
              className="md:col-span-8 rounded-image p-8 bg-white"
              style={{
                boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04), 0px 0px 0px 1px #fafafa',
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-standard flex items-center justify-center bg-[#171717]"
                >
                  <span className="material-symbols-outlined text-white text-lg" aria-hidden="true">
                    auto_awesome
                  </span>
                </div>
                <h3
                  className="font-sans font-semibold text-[#171717]"
                  style={{ fontSize: '1.125rem', letterSpacing: '-0.03em' }}
                >
                  AI Suggestions
                </h3>
              </div>

              {/* Suggestion 1 */}
              <div className="flex gap-4 mb-5">
                <span
                  className="material-symbols-outlined text-[#0a72ef] flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  lightbulb
                </span>
                <p className="text-[#4d4d4d]" style={{ fontSize: '0.9375rem', lineHeight: '1.7' }}>
                  You could further optimize by using a{' '}
                  <code
                    className="font-mono text-[#0a72ef] bg-[#ebf5ff] px-1.5 py-0.5 rounded-micro"
                    style={{ fontSize: '0.875rem' }}
                  >
                    deque
                  </code>{' '}
                  for BFS to avoid <code className="font-mono text-[#171717]">O(N)</code> pops from the front.
                </p>
              </div>

              {/* Code snippet */}
              <div
                className="rounded-card overflow-hidden"
                style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}
              >
                {/* Code header */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#fafafa]"
                  style={{ borderBottom: '1px solid #ebebeb' }}
                >
                  <span className="material-symbols-outlined text-sm text-[#808080]" aria-hidden="true">code</span>
                  <span className="text-mono-label text-[#808080]">Refactoring Snippet</span>
                </div>
                <pre
                  className="p-4 font-mono text-sm bg-white overflow-x-auto"
                  style={{ fontSize: '0.8125rem', lineHeight: '1.7' }}
                >
                  <code>
                    <span className="text-[#de1d8d]">from</span>
                    {' '}collections{' '}
                    <span className="text-[#de1d8d]">import</span>
                    {' '}deque{'\n'}
                    queue{' '}
                    <span className="text-[#0a72ef]">=</span>
                    {' '}deque([root]){'\n'}
                    <span className="text-[#808080]"># O(1) performance instead of O(N){'\n'}</span>
                    node{' '}
                    <span className="text-[#0a72ef]">=</span>
                    {' '}queue.popleft()
                  </code>
                </pre>
              </div>

              {/* Suggestion 2 */}
              <div className="flex gap-4 mt-5">
                <span
                  className="material-symbols-outlined text-[#de1d8d] flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  tips_and_updates
                </span>
                <p className="text-[#4d4d4d]" style={{ fontSize: '0.9375rem', lineHeight: '1.7' }}>
                  Your solution handles all edge cases correctly. Consider adding a{' '}
                  <code className="font-mono text-[#171717] bg-[#fafafa] px-1.5 rounded-micro" style={{ fontSize: '0.875rem' }}>
                    type hint
                  </code>{' '}
                  for the return type to improve code readability and IDE support.
                </p>
              </div>
            </div>

            {/* Execution path card */}
            <div
              id="execution-path-card"
              className="md:col-span-4 rounded-image overflow-hidden flex flex-col bg-[#fafafa]"
              style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)' }}
            >
              <div className="px-5 py-4" style={{ borderBottom: '1px solid #ebebeb' }}>
                <span className="text-mono-label text-[#808080]">Execution Path</span>
              </div>

              {/* Visual tree */}
              <div className="flex-1 p-6 flex flex-col justify-center" aria-label="Binary tree visualization">
                {/* Simplified tree SVG */}
                <svg viewBox="0 0 200 140" className="w-full max-w-[160px] mx-auto" aria-hidden="true">
                  {/* Lines */}
                  <line x1="100" y1="25" x2="60"  y2="65"  stroke="#0a72ef" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="100" y1="25" x2="140" y2="65"  stroke="#0a72ef" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="60"  y1="65" x2="40"  y2="105" stroke="#de1d8d" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="60"  y1="65" x2="80"  y2="105" stroke="#de1d8d" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="140" y1="65" x2="120" y2="105" stroke="#ff5b4f" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="140" y1="65" x2="160" y2="105" stroke="#ff5b4f" strokeWidth="1.5" strokeOpacity="0.5" />
                  {/* Nodes */}
                  {[
                    { cx: 100, cy: 25,  val: '3',  c: '#0a72ef' },
                    { cx: 60,  cy: 65,  val: '9',  c: '#de1d8d' },
                    { cx: 140, cy: 65,  val: '20', c: '#de1d8d' },
                    { cx: 40,  cy: 105, val: 'ø',  c: '#ff5b4f' },
                    { cx: 80,  cy: 105, val: 'ø',  c: '#ff5b4f' },
                    { cx: 120, cy: 105, val: '15', c: '#ff5b4f' },
                    { cx: 160, cy: 105, val: '7',  c: '#ff5b4f' },
                  ].map(({ cx, cy, val, c }) => (
                    <g key={`${cx},${cy}`}>
                      <circle cx={cx} cy={cy} r="14" fill="white" stroke={c} strokeWidth="1.5" />
                      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill={c} fontFamily="Geist Mono, monospace">
                        {val}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Progress bar */}
                <div className="mt-6">
                  <div
                    className="h-1 rounded-pill bg-[#ebebeb] overflow-hidden"
                    role="progressbar"
                    aria-label="Memory safety check"
                    aria-valuenow={100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="h-full w-full rounded-pill bg-[#0a72ef]" />
                  </div>
                  <p className="text-mono-label text-[#808080] text-center mt-2">
                    Memory Safe: PASS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BUTTONS ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-12">
          <button
            id="feedback-try-another-btn"
            className="btn-primary px-8 py-3 text-base justify-center"
            style={{ background: '#ff5b4f' }}
            onClick={() => navigate('/problem/1')}
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">bolt</span>
            Try Another Problem
          </button>
          <button
            id="feedback-dashboard-btn"
            className="btn-ghost px-8 py-3 text-base justify-center"
            onClick={() => navigate('/dashboard')}
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">dashboard</span>
            Back to Dashboard
          </button>
          <button
            id="feedback-review-btn"
            className="btn-ghost px-8 py-3 text-base justify-center"
            onClick={() => {}}
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">school</span>
            Review Concept
          </button>
        </div>
      </div>
    </div>
  );
}
