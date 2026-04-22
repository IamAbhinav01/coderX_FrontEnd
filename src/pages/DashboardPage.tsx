import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

/* ─── Stat cards ───────────────────────────────────────────────────── */
const stats = [
  { id: 'stat-solved',   label: 'Problems Solved', value: '142', icon: 'check_circle',        color: '#0a72ef' },
  { id: 'stat-accuracy', label: 'Accuracy',         value: '84%', icon: 'query_stats',         color: '#de1d8d' },
  { id: 'stat-streak',   label: 'Current Streak',   value: '12d', icon: 'local_fire_department',color: '#ff5b4f' },
];

/* ─── Bar chart data ───────────────────────────────────────────────── */
const chartData = [
  { day: 'MON', h: 40 },
  { day: 'TUE', h: 60 },
  { day: 'WED', h: 85, highlight: true },
  { day: 'THU', h: 50 },
  { day: 'FRI', h: 30 },
  { day: 'SAT', h: 95, highlight: true },
  { day: 'SUN', h: 45 },
];

/* ─── Recent activity ──────────────────────────────────────────────── */
const recentActivity = [
  { id: 'act-1', title: 'Optimizing Sub-Graph Isomorphism',      meta: 'Hard · Graph Theory · 2h ago',     status: 'SOLVED',    statusColor: '#0a72ef' },
  { id: 'act-2', title: 'Concurrent Hash Map Implementation',    meta: 'Medium · Systems · 1 day ago',     status: 'ATTEMPTED', statusColor: '#de1d8d' },
  { id: 'act-3', title: 'LRU Cache Design Patterns',             meta: 'Medium · Data Structures · 2d ago', status: 'SOLVED',   statusColor: '#0a72ef' },
  { id: 'act-4', title: 'Binary Search Tree Serialization',      meta: 'Easy · Trees · 3d ago',            status: 'SOLVED',    statusColor: '#0a72ef' },
];

/* ─── Recommended topics ───────────────────────────────────────────── */
const recommendations = [
  { id: 'rec-1', topic: 'Dynamic Programming', problems: 24, color: '#0a72ef' },
  { id: 'rec-2', topic: 'System Design',        problems: 12, color: '#de1d8d' },
  { id: 'rec-3', topic: 'Graph Algorithms',     problems: 18, color: '#ff5b4f' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  return (
    <div className="bg-white min-h-screen pb-20 md:pb-8">
      <div className="max-w-content mx-auto px-6 py-10">

        {/* ── WELCOME HEADER ─────────────────────────────────────── */}
        <section className="mb-10 animate-slide-up">
          <h1
            className="font-sans font-semibold text-[#171717] mb-1"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.05em', lineHeight: '1.2' }}
          >
            Welcome back, <span style={{ color: '#0a72ef' }}>Alex</span>
          </h1>
          <p className="text-[#666666]" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            Your architectural progress is evolving at{' '}
            <span className="font-semibold text-[#171717]">1.2×</span> speed this week.
          </p>
        </section>

        {/* ── STATS + CHART ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">

          {/* Stat cards */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            {stats.map(({ id, label, value, icon, color }) => (
              <div
                key={id}
                id={id}
                className="rounded-card p-6 bg-white flex items-center justify-between transition-shadow duration-200 cursor-default group"
                style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04), 0px 0px 0px 1px #fafafa' }}
              >
                <div>
                  <p
                    className="text-mono-label text-[#808080] mb-1"
                  >
                    {label}
                  </p>
                  <p
                    className="font-sans font-semibold text-[#171717]"
                    style={{ fontSize: '2rem', letterSpacing: '-0.04em', lineHeight: '1' }}
                  >
                    {value}
                  </p>
                </div>
                <span
                  className="material-symbols-outlined text-3xl transition-transform duration-200 group-hover:scale-110"
                  style={{ color }}
                  aria-hidden="true"
                >
                  {icon}
                </span>
              </div>
            ))}
          </div>

          {/* Activity bar chart */}
          <div
            id="dashboard-chart"
            className="lg:col-span-8 rounded-card p-8 bg-[#fafafa] flex flex-col"
            style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  className="font-sans font-semibold text-[#171717]"
                  style={{ fontSize: '1.125rem', letterSpacing: '-0.02em' }}
                >
                  Activity Velocity
                </h2>
                <p className="text-[#808080]" style={{ fontSize: '0.8125rem' }}>
                  Submission frequency — last 7 days
                </p>
              </div>
              <div className="badge-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a72ef]" aria-hidden="true" />
                Submissions
              </div>
            </div>

            {/* Bars */}
            <div className="flex-grow flex items-end gap-3 min-h-[160px]">
              {chartData.map(({ day, h, highlight }) => (
                <div
                  key={day}
                  className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                  onMouseEnter={() => setHoveredBar(day)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div
                    className="w-full rounded-subtle transition-all duration-200"
                    style={{
                      height: `${h * 1.6}px`,
                      background:
                        highlight || hoveredBar === day ? '#0a72ef' : '#ebebeb',
                      opacity: hoveredBar && hoveredBar !== day ? 0.5 : 1,
                    }}
                  />
                  <span
                    className="text-mono-label text-[#808080]"
                    style={{ fontSize: '10px' }}
                  >
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RECENT ACTIVITY + RECOMMENDATIONS ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Recent Activity */}
          <div className="lg:col-span-2" id="dashboard-recent-activity">
            <h2
              className="font-sans font-semibold text-[#171717] mb-4 px-1"
              style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}
            >
              Recent Activity
            </h2>
            <div className="flex flex-col gap-2">
              {recentActivity.map(({ id, title, meta, status, statusColor }) => (
                <button
                  key={id}
                  id={id}
                  className="flex items-center justify-between p-4 rounded-card bg-white text-left w-full transition-shadow duration-200 group"
                  style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}
                  onClick={() => navigate('/problem/1')}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-standard flex items-center justify-center flex-shrink-0 bg-[#fafafa]"
                      style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.06)' }}
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#666666]" aria-hidden="true">
                        code
                      </span>
                    </div>
                    <div>
                      <p
                        className="font-sans font-medium text-[#171717] group-hover:text-[#0a72ef] transition-colors duration-150"
                        style={{ fontSize: '0.875rem' }}
                      >
                        {title}
                      </p>
                      <p className="text-[#808080]" style={{ fontSize: '0.75rem', marginTop: '2px' }}>
                        {meta}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-mono-label px-2 py-0.5 rounded-micro flex-shrink-0"
                    style={{
                      fontSize: '10px',
                      color: statusColor,
                      background: `${statusColor}14`,
                    }}
                  >
                    {status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended topics */}
          <div id="dashboard-recommendations">
            <h2
              className="font-sans font-semibold text-[#171717] mb-4 px-1"
              style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}
            >
              Continue Learning
            </h2>
            <div className="flex flex-col gap-2">
              {recommendations.map(({ id, topic, problems, color }) => (
                <button
                  key={id}
                  id={id}
                  className="flex items-center justify-between p-4 rounded-card bg-white text-left w-full transition-shadow duration-200 group"
                  style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}
                  onClick={() => navigate('/problem/1')}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-10 rounded-pill flex-shrink-0"
                      style={{ background: color }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-[#171717]" style={{ fontSize: '0.875rem' }}>
                        {topic}
                      </p>
                      <p className="text-[#808080]" style={{ fontSize: '0.75rem' }}>
                        {problems} problems
                      </p>
                    </div>
                  </div>
                  <span
                    className="material-symbols-outlined text-[18px] text-[#808080] group-hover:text-[#171717] transition-colors duration-150"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </button>
              ))}

              {/* Generate new problem CTA */}
              <button
                id="dashboard-generate-new-btn"
                className="btn-primary w-full justify-center mt-2 py-3"
                onClick={() => navigate('/problem/1')}
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">bolt</span>
                Generate New Problem
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FLOATING ACTION BUTTON (Mobile) ────────────────────── */}
      <button
        id="dashboard-fab"
        className="fixed bottom-20 right-5 md:hidden w-14 h-14 rounded-full flex items-center justify-center bg-[#171717] text-white shadow-lg transition-transform duration-150 active:scale-95 hover:scale-105 z-40"
        onClick={() => navigate('/problem/1')}
        aria-label="Generate a new problem"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
          add
        </span>
      </button>
    </div>
  );
}
