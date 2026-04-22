import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/',            icon: 'home',         label: 'Home'      },
  { to: '/dashboard',   icon: 'dashboard',    label: 'Dashboard' },
  { to: '/problem/1',   icon: 'code',         label: 'Practice'  },
  { to: '/feedback',    icon: 'auto_awesome', label: 'Feedback'  },
];

export default function MobileBottomNav() {
  return (
    <nav
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 bg-white"
      style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px -2px 8px rgba(0,0,0,0.04)' }}
      aria-label="Mobile bottom navigation"
    >
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-standard transition-colors ${
              isActive
                ? 'text-[#171717]'
                : 'text-[#808080] hover:text-[#171717]'
            }`
          }
          aria-label={label}
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" : undefined }}
              >
                {icon}
              </span>
              <span
                className="text-[10px] font-medium"
                style={{ letterSpacing: '0.04em' }}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
