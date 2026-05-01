import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Submission {
  _id: string;
  userId: string;
  problemId: string;
  language: string;
  status: 'Pending' | 'Success' | 'RE' | 'TLE' | 'MLE' | 'WA';
  code: string;
  createdAt: string;
}

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
  topic: string;
  description?: string;
  constraints?: string[];
}

interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface ChartDataPoint {
  day: string;
  h: number;
  highlight?: boolean;
}

interface Activity {
  id: string;
  title: string;
  meta: string;
  status: string;
  statusColor: string;
  submission: Submission;
  problem: Problem | null;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [problemsMap, setProblemsMap] = useState<Record<string, Problem>>({});
  const [selectedSubmission, setSelectedSubmission] = useState<Activity | null>(null);
  
  const [stats, setStats] = useState<Stat[]>([
    { id: 'stat-solved',   label: 'Problems Solved', value: '0', icon: 'check_circle',        color: '#0a72ef' },
    { id: 'stat-accuracy', label: 'Accuracy',         value: '0%', icon: 'query_stats',         color: '#de1d8d' },
    { id: 'stat-streak',   label: 'Attempts',         value: '0',  icon: 'analytics',           color: '#ff5b4f' },
  ]);

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const subRes = await axios.get('http://localhost:3001/api/v1/submissions/user/1');
        const subs: Submission[] = subRes.data.data || [];
        setSubmissions(subs);

        
        const probRes = await axios.get('http://localhost:4000/api/v1/problems');
        const probs: Problem[] = probRes.data.data || [];

        
        const pMap: Record<string, Problem> = {};
        probs.forEach(p => { pMap[p._id] = p; });
        setProblemsMap(pMap);

        
        const solvedCount = new Set(subs.filter(s => s.status === 'Success').map(s => s.problemId)).size;
        const totalAttempts = subs.length;
        const accuracy = totalAttempts > 0 ? Math.round((subs.filter(s => s.status === 'Success').length / totalAttempts) * 100) : 0;
        
        setStats([
          { id: 'stat-solved',   label: 'Problems Solved', value: solvedCount.toString(), icon: 'check_circle',        color: '#0a72ef' },
          { id: 'stat-accuracy', label: 'Accuracy',         value: `${accuracy}%`, icon: 'query_stats',         color: '#de1d8d' },
          { id: 'stat-streak',   label: 'Attempts',         value: totalAttempts.toString(), icon: 'analytics',          color: '#ff5b4f' },
        ]);

        
        const recent = subs.slice(-5).reverse().map(s => {
          const p = pMap[s.problemId]; 
          return {
            id: s._id,
            title: p ? p.title : 'Unknown Problem',
            meta: `${p ? p.difficulty : 'Medium'} · ${p ? p.topic : 'General'} · ${s.language.toUpperCase()}`,
            status: s.status,
            statusColor: s.status === 'Success' ? '#0a72ef' : '#ff5b4f',
            submission: s, 
            problem: p || null 
          };
        });
        setRecentActivity(recent);

        
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const last7Days: ChartDataPoint[] = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          const dayName = days[d.getDay()];
          const count = subs.filter(s => {
            const sd = new Date(s.createdAt || Date.now());
            return sd.toDateString() === d.toDateString();
          }).length;

          last7Days.push({
            day: dayName,
            h: Math.min(count * 20, 100),
            highlight: i === 0
          });
        }
        setChartData(last7Days);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl animate-spin text-[#0a72ef]">
            progress_activity
          </span>
          <p className="text-[#808080] font-medium">Fetching analytics cluster...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 md:pb-8 relative">
      <div className="max-w-content mx-auto px-6 py-10">

        {}
        <section className="mb-10 animate-slide-up">
          <h1
            className="font-sans font-semibold text-[#171717] mb-1"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.05em', lineHeight: '1.2' }}
          >
            Welcome back, <span style={{ color: '#0a72ef' }}>Abhinav</span>
          </h1>
          <p className="text-[#666666]" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            Your coderX cluster activity is visualized below.
          </p>
        </section>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            {stats.map(({ id, label, value, icon, color }) => (
              <div
                key={id}
                className="rounded-card p-6 bg-white flex items-center justify-between transition-shadow duration-200 cursor-default group"
                style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)' }}
              >
                <div>
                  <p className="text-mono-label text-[#808080] mb-1">{label}</p>
                  <p className="font-sans font-semibold text-[#171717]" style={{ fontSize: '2rem', letterSpacing: '-0.04em', lineHeight: '1' }}>{value}</p>
                </div>
                <span className="material-symbols-outlined text-3xl transition-transform duration-200 group-hover:scale-110" style={{ color }}>{icon}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-8 rounded-card p-8 bg-[#fafafa] flex flex-col" style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-sans font-semibold text-[#171717]" style={{ fontSize: '1.125rem', letterSpacing: '-0.02em' }}>Activity Velocity</h2>
                <p className="text-[#808080]" style={{ fontSize: '0.8125rem' }}>Submission frequency — last 7 days</p>
              </div>
              <div className="badge-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a72ef]" />
                Submissions
              </div>
            </div>

            <div className="flex-grow flex items-end gap-3 min-h-[160px]">
              {chartData.map(({ day, h, highlight }) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer" onMouseEnter={() => setHoveredBar(day)} onMouseLeave={() => setHoveredBar(null)}>
                  <div className="w-full rounded-subtle transition-all duration-200" style={{ height: `${Math.max(h * 1.6, 4)}px`, background: highlight || hoveredBar === day ? '#0a72ef' : '#ebebeb', opacity: hoveredBar && hoveredBar !== day ? 0.5 : 1 }} />
                  <span className="text-mono-label text-[#808080]" style={{ fontSize: '10px' }}>{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <h2 className="font-sans font-semibold text-[#171717] mb-4 px-1" style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}>Recent Submissions</h2>
            <div className="flex flex-col gap-2">
              {recentActivity.length > 0 ? recentActivity.map((act) => (
                <button
                  key={act.id}
                  className="flex items-center justify-between p-4 rounded-card bg-white text-left w-full transition-shadow duration-200 group"
                  style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}
                  onClick={() => setSelectedSubmission(act)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-standard flex items-center justify-center flex-shrink-0 bg-[#fafafa]" style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.06)' }}>
                      <span className="material-symbols-outlined text-[18px] text-[#666666]">code</span>
                    </div>
                    <div>
                      <p className="font-sans font-medium text-[#171717] group-hover:text-[#0a72ef] transition-colors duration-150" style={{ fontSize: '0.875rem' }}>{act.title}</p>
                      <p className="text-[#808080]" style={{ fontSize: '0.75rem', marginTop: '2px' }}>{act.meta}</p>
                    </div>
                  </div>
                  <span className="text-mono-label px-2 py-0.5 rounded-micro flex-shrink-0" style={{ fontSize: '10px', color: act.statusColor, background: `${act.statusColor}14` }}>{act.status}</span>
                </button>
              )) : (
                <div className="p-10 text-center rounded-card border-2 border-dashed border-[#ebebeb] text-[#808080]">No recent activity found. Start solving!</div>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-sans font-semibold text-[#171717] mb-4 px-1" style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}>Quick Actions</h2>
            <div className="flex flex-col gap-2">
              <button className="btn-primary w-full justify-center py-3" onClick={() => navigate('/problem/69ec6db19f4c8591447ccc67')}>
                <span className="material-symbols-outlined text-[16px]">bolt</span> Practice Latest
              </button>
              <div className="p-6 rounded-card bg-[#fafafa] border border-[#ebebeb]">
                <p className="text-mono-label text-[#808080] mb-2">SYSTEM STATUS</p>
                <div className="flex items-center gap-2 text-[#00FF88] text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                  Cluster Online
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171717]/40 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedSubmission(null)}>
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-image shadow-2xl flex flex-col overflow-hidden animate-slide-up" onClick={e => e.stopPropagation()}>
            {}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#ebebeb]">
              <div>
                <h3 className="font-sans font-semibold text-[#171717] text-xl tracking-tight">
                  {selectedSubmission.title}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[#808080] text-xs uppercase tracking-wider font-medium">{selectedSubmission.problem?.topic || 'Algorithm'}</span>
                  <span className="w-1 h-1 rounded-full bg-[#ebebeb]" />
                  <span className="text-[#808080] text-xs uppercase tracking-wider font-medium">{selectedSubmission.problem?.difficulty || 'Medium'}</span>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-[#fafafa] transition-colors" onClick={() => setSelectedSubmission(null)}>
                <span className="material-symbols-outlined text-[#808080]">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 bg-[#fafafa] flex flex-col gap-6">
              {}
              <div className="bg-white p-6 rounded-card border border-[#ebebeb]">
                <h4 className="text-mono-label text-[#808080] mb-3">PROBLEM CONTEXT</h4>
                <div 
                  className="text-[#4d4d4d] text-sm leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: selectedSubmission.problem?.description || 'No description available for this problem.' }}
                />
              </div>

              {}
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <h4 className="text-mono-label text-[#808080]">COMPLETE SOURCE CODE</h4>
                  <div className="flex gap-2">
                    <span className="text-mono-label px-2 py-0.5 rounded bg-[#171717] text-white text-[10px]">
                      {selectedSubmission.submission.language.toUpperCase()}
                    </span>
                    <span className="text-mono-label px-2 py-0.5 rounded text-[10px]" style={{ color: selectedSubmission.statusColor, background: `${selectedSubmission.statusColor}14` }}>
                      {selectedSubmission.status}
                    </span>
                  </div>
                </div>
                
                <div className="rounded-card overflow-hidden" style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}>
                  <pre className="p-6 font-mono text-xs sm:text-sm bg-[#171717] text-[#fafafa] overflow-x-auto leading-relaxed scrollbar-dark">
                    <code>{selectedSubmission.submission.code}</code>
                  </pre>
                </div>
              </div>
            </div>
            
            {}
            <div className="px-8 py-5 border-t border-[#ebebeb] flex justify-between items-center bg-white">
              <p className="text-[#808080] text-[11px] font-mono">
                SUBMISSION_ID: {selectedSubmission.id}
              </p>
              <div className="flex gap-3">
                <button className="btn-ghost py-2.5 px-6" onClick={() => setSelectedSubmission(null)}>Close</button>
                <button className="btn-primary py-2.5 px-6" onClick={() => navigate(`/problem/${selectedSubmission.submission.problemId}`)}>
                  View Challenge
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
