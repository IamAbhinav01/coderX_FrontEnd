import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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

const metrics = [
  { value: '12k+', label: 'Active developers', id: 'metric-devs' },
  { value: '94%', label: 'Interview pass rate', id: 'metric-pass' },
  { value: '10x', label: 'Faster skill growth', id: 'metric-growth' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a description for the problem you want to generate.');
      return;
    }

    try {
      setIsGenerating(true);
      
      const response = await axios.post('http://localhost:8000/api/v1/generate/inputs', {
        user_prompt: prompt
      });

      const { problem } = response.data;
      if (problem && problem._id) {
        
        navigate(`/problem/${problem._id}`);
      } else {
        throw new Error('No problem ID returned from AI service');
      }
    } catch (err) {
      console.error('Generation failed:', err);
      alert('Failed to generate problem. Please check if AI Service is running.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {}
      <section className="max-w-content mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 badge-pill mb-10 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0a72ef] animate-pulse-dot" />
          <span className="text-[#0a72ef] text-xs font-semibold tracking-wider uppercase">AI Generation Online</span>
        </div>

        <h1
          className="font-sans font-semibold text-[#171717] mb-6 animate-slide-up"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: '1.02', letterSpacing: '-0.05em' }}
        >
          coder<span className="kinetic-x">X</span> — <br className="hidden sm:block" />
          Generate Coding Challenges <br /> Instantly
        </h1>

        <p className="max-w-[600px] mx-auto text-[#4d4d4d] mb-10 text-lg sm:text-xl leading-relaxed">
          Elevate your technical skills with AI-engineered coding interview questions tailored exactly to your seniority and target role.
        </p>

        {}
        <div id="hero-prompt-bar" className="w-full max-w-2xl mx-auto mb-8 bg-white rounded-card overflow-hidden" style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.05)' }}>
          <div className="flex flex-col sm:flex-row">
            <div className="relative flex-1 flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-[#808080]">auto_awesome</span>
              <input
                id="hero-prompt-input"
                type="text"
                className="w-full bg-transparent pl-12 pr-4 py-5 text-[#171717] placeholder:text-[#808080] focus:outline-none"
                placeholder="Generate medium-level graph problems for FAANG interviews…"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>
            <button
              id="hero-generate-btn"
              className="btn-primary rounded-none sm:rounded-r-card px-8 py-5 justify-center whitespace-nowrap disabled:opacity-70"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              <span className="material-symbols-outlined text-[18px]">{isGenerating ? 'progress_activity' : 'bolt'}</span>
              {isGenerating ? 'Generating...' : 'Generate Problem'}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-ghost" onClick={() => navigate('/dashboard')}>
            Explore History
          </button>
          <div className="flex items-center gap-3 px-5 border-l border-[#ebebeb]">
            <div className="flex -space-x-2">
              {['#0a72ef', '#de1d8d', '#ff5b4f'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ background: c }} />
              ))}
            </div>
            <span className="text-[#4d4d4d] text-sm font-medium">Join <strong className="text-[#171717]">12k+</strong> developers</span>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {}
      <section className="max-w-content mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map(({ label, color, title, desc }, i) => (
            <div key={label} className="flex flex-col items-start">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 font-mono font-bold text-white text-sm" style={{ background: color }}>
                0{i + 1}
              </div>
              <span className="text-mono-label mb-2" style={{ color }}>{label}</span>
              <h3 className="font-sans font-semibold text-[#171717] mb-3 text-xl">{title}</h3>
              <p className="text-[#4d4d4d] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {}
      <footer className="bg-[#fafafa] border-t border-[#ebebeb]">
        <div className="max-w-content mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5b4f]">terminal</span>
            <span className="font-sans font-semibold text-[#171717]">coder<span className="kinetic-x">X</span></span>
          </div>
          <div className="text-mono-label text-[#808080]">© 2026 Abhinav Sunil</div>
        </div>
      </footer>
    </div>
  );
}
