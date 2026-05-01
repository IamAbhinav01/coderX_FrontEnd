import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/problem/69ec6db19f4c8591447ccc67', label: 'Practice' },
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-white"
      style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}
    >
      <div className="max-w-content mx-auto px-6 h-14 flex items-center justify-between gap-8">
        {}
        <NavLink
          to="/"
          className="flex items-center gap-2 flex-shrink-0"
          aria-label="coderX home"
        >
          <span className="material-symbols-outlined text-[#ff5b4f] text-xl">terminal</span>
          <span
            className="font-sans font-semibold text-[1.125rem] text-[#171717] leading-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            coder<span className="kinetic-x">X</span>
          </span>
        </NavLink>

        {}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-standard text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-[#171717] font-semibold bg-[#fafafa]'
                    : 'text-[#666666] hover:text-[#171717] hover:bg-[#fafafa]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {}
        <div className="flex items-center gap-3">
          {}
          <button
            id="navbar-generate-btn"
            className="btn-primary hidden sm:inline-flex"
            onClick={async () => {
              try {
                const btn = document.getElementById('navbar-generate-btn');
                if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span> Generating...';
                
                const response = await axios.post('http://localhost:8000/api/v1/generate/inputs', {
                  user_prompt: "Generate a random medium-level DSA problem"
                });
                const { problem } = response.data;
                navigate(`/problem/${problem._id}`);
              } catch (err) {
                console.error(err);
                alert('Generation failed. Ensure AI Service is running on port 8000.');
              } finally {
                const btn = document.getElementById('navbar-generate-btn');
                if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">bolt</span> Generate';
              }
            }}
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Generate
          </button>

          {}
          <button
            id="navbar-mobile-menu-btn"
            className="md:hidden p-2 rounded-standard text-[#666666] hover:text-[#171717] hover:bg-[#fafafa] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-outlined text-xl">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-[#ebebeb] bg-white px-6 py-4 flex flex-col gap-2 animate-slide-up"
          id="navbar-mobile-dropdown"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `py-2 px-3 rounded-standard text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#171717] font-semibold bg-[#fafafa]'
                    : 'text-[#666666] hover:text-[#171717] hover:bg-[#fafafa]'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <button
            className="btn-primary mt-2 justify-center"
            onClick={() => { navigate('/problem/69ec6db19f4c8591447ccc67'); setMobileOpen(false); }}
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Generate Problem
          </button>
        </div>
      )}
    </header>
  );
}
