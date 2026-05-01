import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

interface CodeSnippet {
  language: string;
  startSnippet: string;
  midSnippet: string;
  endSnippet: string;
}

interface Example {
  id: string;
  input: string;
  output: string;
  explanation: string;
}

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  difficultyColor: string;
  topic: string;
  description: string;
  examples: Example[];
  constraints: string[];
  codeSnippets: CodeSnippet[];
}

const difficultyColors: Record<string, string> = {
  easy: '#00FF88',
  medium: '#de1d8d',
  hard: '#ff5b4f',
};

const langOptions = ['Python', 'CPP', 'Java'];

export default function ProblemSolvingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [lang, setLang] = useState('Python');
  
  const [startSnippet, setStartSnippet] = useState('');
  const [midCode, setMidCode] = useState('');
  const [endSnippet, setEndSnippet] = useState('');

  const [activePanel, setActivePanel] = useState<'console' | 'testcases'>(
    'console'
  );
  const activePanelRef = useRef(activePanel);
  useEffect(() => {
    activePanelRef.current = activePanel;
  }, [activePanel]);

  const [isRunning, setIsRunning] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    
    socket.on('connect', () => {
      socket.emit('setUserId', '1');
    });

    socket.on('foo', (data: any) => {
      setIsRunning(false);
      
      let result = data;
      let testCaseResults = null;

      if (data && data.response) {
          if (Array.isArray(data.response.results)) {
              testCaseResults = data.response.results;
          } else if (Array.isArray(data.response)) {
              testCaseResults = data.response;
          }
      } else if (typeof data === 'object') {
          const keys = Object.keys(data);
          if (keys.length > 0 && data[keys[0]].response) {
              const inner = data[keys[0]];
              if (Array.isArray(inner.response.results)) {
                  testCaseResults = inner.response.results;
                  result = inner;
              } else if (Array.isArray(inner.response)) {
                  testCaseResults = inner.response;
                  result = inner;
              }
          }
      }

      if (testCaseResults && Array.isArray(testCaseResults)) {
          if (activePanelRef.current === 'console') {
              const miniResults = testCaseResults.slice(0, 2).map((res: any, i: number) => 
                `Test Case ${i+1}: ${res.status} | Output: ${res.actualOutput || res.output || 'No output'}`
              );
              setConsoleOutput(miniResults);
          } else {
              navigate('/feedback', { state: { submissionResult: { ...result, response: testCaseResults } } });
          }
      } else {
          if (activePanelRef.current === 'console') {
              setConsoleOutput(['Error: Received malformed data from judge engine.']);
          }
      }
    });

    const fetchProblem = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/v1/problems/${id}`);
        const data = response.data.data;
        if (!data) throw new Error('Problem not found');

        const mappedProblem: Problem = {
          id: data._id,
          title: data.title || 'Untitled Problem',
          difficulty: data.difficulty ? data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1).toLowerCase() : 'Easy',
          difficultyColor: difficultyColors[(data.difficulty || 'easy').toLowerCase()] || '#de1d8d',
          topic: data.topic || 'General',
          description: data.description || 'No description provided.',
          examples: (data.testCases || []).slice(0, 2).map((tc: any, i: number) => ({
            id: `ex-${i + 1}`,
            input: tc.input || '',
            output: tc.output || '',
            explanation: '',
          })),
          constraints: data.constraints || [],
          codeSnippets: (data.codeSnippets || []).map((stub: any) => ({
            language: stub.language.toLowerCase() === 'cpp' ? 'CPP' : stub.language.charAt(0).toUpperCase() + stub.language.slice(1).toLowerCase(),
            startSnippet: stub.startSnippet || '',
            midSnippet: stub.midSnippet || '    # Write your logic here\n    pass',
            endSnippet: stub.endSnippet || '',
          })),
        };

        setProblem(mappedProblem);
        
        const defaultSnippet = mappedProblem.codeSnippets.find(s => s.language === 'Python') || mappedProblem.codeSnippets[0];
        
        if (defaultSnippet) {
          setLang(defaultSnippet.language);
          setStartSnippet(defaultSnippet.startSnippet);
          setMidCode(defaultSnippet.midSnippet);
          setEndSnippet(defaultSnippet.endSnippet);
        }
      } catch (err) {
        setError('Failed to load problem.');
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
    return () => { socket.disconnect(); };
  }, [id, navigate]);

  const handleLangChange = (newLang: string) => {
    if (!problem) return;
    const snippet = problem.codeSnippets.find(s => s.language === newLang);
    if (snippet) {
      setLang(newLang);
      setStartSnippet(snippet.startSnippet);
      setMidCode(snippet.midSnippet);
      setEndSnippet(snippet.endSnippet);
    }
    setShowLangMenu(false);
  };

  const handleRun = async () => {
    if (!id || !problem) return;
    try {
      setIsRunning(true);
      setActivePanel('console');
      setConsoleOutput(['Executing...']);
      await axios.post('http://localhost:3001/api/v1/submissions', {
        code: midCode, 
        language: lang.toLowerCase() === 'cpp' ? 'cpp' : lang.toLowerCase(),
        userId: '1',
        problemId: id,
      });
    } catch (e) {
      setConsoleOutput(['Execution failed.']);
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!id || !problem) return;
    try {
      setIsRunning(true);
      setActivePanel('testcases');
      await axios.post('http://localhost:3001/api/v1/submissions', {
        code: midCode,
        language: lang.toLowerCase() === 'cpp' ? 'cpp' : lang.toLowerCase(),
        userId: '1',
        problemId: id,
      });
    } catch (e) {
      setIsRunning(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-white"><span className="material-symbols-outlined text-4xl animate-spin text-[#0a72ef]">progress_activity</span></div>;
  if (error || !problem) return <div className="h-screen flex items-center justify-center bg-white"><h2 className="text-xl font-semibold text-[#171717]">{error}</h2></div>;

  return (
    <div className="bg-white h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-white flex-shrink-0" style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}>
        <div className="flex items-center gap-3">
          <div className="h-5 w-px bg-[#ebebeb]" />
          <div>
            <h1 className="font-sans font-semibold text-[#171717]" style={{ fontSize: '0.875rem' }}>{problem.title}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-mono-label px-1.5 py-0.5 rounded" style={{ fontSize: '10px', color: problem.difficultyColor, background: `${problem.difficultyColor}18` }}>{problem.difficulty}</span>
              <span className="text-[#808080] text-[11px]">{problem.topic}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button className="flex items-center gap-1.5 btn-ghost py-1.5 px-3" onClick={() => setShowLangMenu(!showLangMenu)}>
            <span className="material-symbols-outlined text-sm">code</span>
            <span style={{ fontSize: '0.8125rem' }}>{lang}</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
          {showLangMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-card py-1 z-10 min-w-[130px]" style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 4px 8px rgba(0,0,0,0.08)' }}>
              {langOptions.map(l => (
                <button key={l} className={`w-full text-left px-3 py-2 text-sm ${l === lang ? 'text-[#171717] font-semibold bg-[#fafafa]' : 'text-[#4d4d4d] hover:bg-[#fafafa]'}`} onClick={() => handleLangChange(l)}>{l}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <section className="w-[45%] flex-shrink-0 flex flex-col bg-white overflow-y-auto border-r border-[#ebebeb]">
          <div className="flex items-center gap-4 px-6 py-2 border-b border-[#ebebeb]">
            <button className="py-2 text-xs font-medium text-[#171717] border-b-2 border-[#171717]">Description</button>
          </div>
          <div className="px-6 py-6 flex flex-col gap-6">
            <div className="text-[#4d4d4d] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: problem.description }} />
            <div className="flex flex-col gap-4">
              {problem.examples.map(ex => (
                <div key={ex.id} className="rounded-card bg-[#fafafa] p-4 border border-[#ebebeb]">
                  <p className="text-mono-label text-[#808080] mb-2">{ex.id.replace('ex-', 'Case ')}</p>
                  <code className="text-[#171717] block mb-1 font-mono text-xs">Input: {ex.input}</code>
                  <code className="text-[#0a72ef] block font-mono text-xs">Output: {ex.output}</code>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex-1 flex flex-col min-w-0 bg-[#fafafa]">
          <div className="flex-1 flex flex-col overflow-hidden p-2">
            <div className="flex-shrink-0 opacity-60 pointer-events-none select-none">
              <Editor 
                height={`${Math.max(startSnippet.split('\n').length * 20, 40)}px`}
                language={lang.toLowerCase() === 'cpp' ? 'cpp' : lang.toLowerCase()} 
                value={startSnippet} 
                options={{ fontSize: 13, minimap: { enabled: false }, readOnly: true, lineNumbers: 'on', scrollbar: { vertical: 'hidden' }, lineDecorationsWidth: 0, folding: false }} 
              />
            </div>

            <div className="flex-1 border-y border-[#ebebeb] bg-white" style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)' }}>
              <Editor 
                height="100%" 
                language={lang.toLowerCase() === 'cpp' ? 'cpp' : lang.toLowerCase()} 
                value={midCode} 
                onChange={v => setMidCode(v || '')} 
                options={{ fontSize: 14, minimap: { enabled: false }, lineNumbers: 'on', scrollBeyondLastLine: false, padding: { top: 10 } }} 
              />
            </div>

            <div className="flex-shrink-0 opacity-60 pointer-events-none select-none">
              <Editor 
                height={`${Math.max(endSnippet.split('\n').length * 20, 40)}px`}
                language={lang.toLowerCase() === 'cpp' ? 'cpp' : lang.toLowerCase()} 
                value={endSnippet} 
                options={{ fontSize: 13, minimap: { enabled: false }, readOnly: true, lineNumbers: 'on', scrollbar: { vertical: 'hidden' }, lineDecorationsWidth: 0, folding: false }} 
              />
            </div>
          </div>

          <div className="flex-shrink-0 bg-white border-t border-[#ebebeb]" style={{ height: '180px' }}>
            <div className="flex items-center px-4 h-10 gap-4 bg-[#fafafa] border-b border-[#ebebeb]">
              {(['console', 'testcases'] as const).map(panel => (
                <button key={panel} className={`h-full px-2 text-xs font-medium ${activePanel === panel ? 'text-[#171717] border-b-2 border-[#171717]' : 'text-[#808080]'}`} onClick={() => setActivePanel(panel)}>{panel.toUpperCase()}</button>
              ))}
              {isRunning && <span className="ml-auto text-mono-label animate-pulse text-[#de1d8d] text-[10px]">Processing…</span>}
            </div>
            <div className="p-4 font-mono overflow-y-auto text-xs" style={{ height: 'calc(180px - 2.5rem)' }}>
              {activePanel === 'console' ? (
                <div className="text-[#808080]">
                  {consoleOutput.length > 0 ? consoleOutput.map((line, i) => <p key={i}>{'>'} {line}</p>) : <p>{'>'} Ready. Press "Run Code".</p>}
                </div>
              ) : (
                <div className="text-[#808080]">{'>'} Waiting for full submission...</div>
              )}
            </div>
          </div>
        </section>
      </div>

      <footer className="flex items-center justify-between px-6 h-14 bg-white border-t border-[#ebebeb]">
        <div className="text-[#808080] text-xs font-mono">0 ms | 0 MB</div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost py-2 px-5" onClick={handleRun} disabled={isRunning}>Run Code</button>
          <button className="btn-primary py-2 px-6 bg-[#ff5b4f]" onClick={handleSubmit} disabled={isRunning}>Submit Solution</button>
        </div>
      </footer>
    </div>
  );
}
