import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface TestCaseResult {
  id: string;
  label: string;
  input: string;
  output: string;
  expected: string;
  status: string;
  color: string;
}

export default function AIFeedbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState<any>(null);
  const [testCases, setTestCases] = useState<TestCaseResult[]>([]);

  useEffect(() => {
    if (location.state?.submissionResult) {
      const data = location.state.submissionResult;
      setResults(data);
      
      const rawResults = Array.isArray(data.response) ? data.response : [];
      
      if (rawResults.length > 0) {
        const mapped = rawResults.map((res: any, i: number) => ({
          id: `tc-${i + 1}`,
          label: `Case ${i + 1}`,
          input: res.input || 'N/A',
          output: res.actualOutput || res.output || 'N/A',
          expected: res.expectedOutput || res.expected || 'N/A',
          status: res.status === 'SUCCESS' ? 'PASSED' : res.status || 'FAILED',
          color: res.status === 'SUCCESS' ? '#0a72ef' : '#ff5b4f'
        }));
        setTestCases(mapped);
      }
    }
  }, [location.state]);

  if (!results) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4 text-center max-w-md px-6">
          <span className="material-symbols-outlined text-5xl text-[#808080]">analytics</span>
          <h2 className="text-xl font-semibold text-[#171717]">No submission data found</h2>
          <button onClick={() => navigate('/dashboard')} className="btn-primary py-2 px-6">Go to Dashboard</button>
        </div>
      </div>
    );
  }

  const allPassed = testCases.length > 0 && testCases.every(tc => tc.status === 'PASSED');

  return (
    <div className="bg-white min-h-screen pb-20 md:pb-8">
      <div className="max-w-content mx-auto px-6 py-12">

        <section className="text-center mb-14 animate-slide-up">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{ 
                boxShadow: allPassed 
                    ? '0px 0px 0px 1px rgba(10, 114, 239, 0.20), 0px 0px 0px 4px rgba(10, 114, 239, 0.08)'
                    : '0px 0px 0px 1px rgba(255, 91, 79, 0.20), 0px 0px 0px 4px rgba(255, 91, 79, 0.08)'
            }}
          >
            <span
              className="material-symbols-outlined text-[2rem]"
              style={{ 
                  color: allPassed ? '#0a72ef' : '#ff5b4f',
                  fontVariationSettings: "'FILL' 1" 
              }}
            >
              {allPassed ? 'check_circle' : 'cancel'}
            </span>
          </div>

          <h1
            className="font-sans font-semibold text-[#171717] mb-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.05em', lineHeight: '1.05' }}
          >
            {allPassed ? 'Problem Solved!' : 'Evaluation Results'}
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="badge-pill">
              <span className="material-symbols-outlined text-sm">star</span>
              {allPassed ? '+120 XP earned' : 'Review the errors below'}
            </span>
          </div>

          <p className="text-mono-label text-[#808080]">
            SUBMISSION ID: #{results.submissionId?.slice(-8).toUpperCase() || 'CX-BETA'}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-sans font-semibold text-[#171717] mb-6 text-xl tracking-tight">Detailed Test Case Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testCases.map(({ id, label, input, output, expected, status, color }) => (
              <div
                key={id}
                className="rounded-card p-5 bg-[#fafafa] border border-[#ebebeb] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-mono-label text-[#808080]">{label}</span>
                  <span className="text-mono-label px-2 py-0.5 rounded-micro" style={{ color, background: `${color}14`, fontSize: '10px' }}>
                    {status}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="bg-white p-3 rounded border border-[#ebebeb] font-mono text-[11px]">
                        <p className="text-[#808080] mb-1">Input:</p>
                        <code className="text-[#171717] break-all">{input}</code>
                    </div>
                    <div className="bg-white p-3 rounded border border-[#ebebeb] font-mono text-[11px]">
                        <p className="text-[#808080] mb-1">Expected:</p>
                        <code className="text-[#0a72ef] break-all">{expected}</code>
                    </div>
                    <div className="bg-white p-3 rounded border border-[#ebebeb] font-mono text-[11px]">
                        <p className="text-[#808080] mb-1">Your Output:</p>
                        <code className={status === 'PASSED' ? 'text-[#0a72ef]' : 'text-[#ff5b4f]'} style={{ whiteSpace: 'pre-wrap' }}>{output}</code>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-12">
          <button
            className="btn-primary px-8 py-3 text-base"
            style={{ background: '#ff5b4f' }}
            onClick={() => navigate('/problem/69ec6db19f4c8591447ccc67')}
          >
            Try Another Problem
          </button>
          <button
            className="btn-ghost px-8 py-3 text-base"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
