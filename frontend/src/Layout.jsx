import Header from "./Header.jsx";
import {Outlet, useLocation} from "react-router-dom";

function FlowerSway({ className, from = "-10deg", to = "5deg", delay = "0s", duration = "7s", children }) {
  return (
    <div 
      className={`fixed pointer-events-none z-0 flower-sway hidden xl:block opacity-[0.35] dark:opacity-[0.2] ${className}`}
      style={{
        '--flower-from': from,
        '--flower-to': to,
        'animationDelay': delay,
        'animationDuration': duration,
      }}
    >
      {children}
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <main className="min-h-screen w-full transition-colors duration-300 overflow-hidden">
        <Outlet />
      </main>
    );
  }

  return (
    <>
      {/* Decorative Swaying Flowers in Left & Right Margins */}
      <FlowerSway className="left-[4%] top-[14%]" from="-12deg" to="6deg" delay="0.2s" duration="7.2s">
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
          <path d="M30 120 C 30 80, 25 40, 30 10" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 90 C 20 85, 15 75, 18 70 C 20 68, 25 75, 30 90" fill="#4ade80" />
          <path d="M30 70 C 40 65, 45 55, 42 50 C 40 48, 35 55, 30 70" fill="#4ade80" />
          <circle cx="30" cy="15" r="8" fill="#c084fc" />
          <circle cx="26" cy="30" r="7" fill="#c084fc" />
          <circle cx="34" cy="30" r="7" fill="#c084fc" />
          <circle cx="28" cy="45" r="6" fill="#a78bfa" />
          <circle cx="32" cy="45" r="6" fill="#a78bfa" />
        </svg>
      </FlowerSway>

      <FlowerSway className="right-[4%] top-[16%]" from="8deg" to="-7deg" delay="0.8s" duration="7.8s">
        <svg width="70" height="130" viewBox="0 0 70 130" fill="none">
          <path d="M35 130 C 35 90, 40 50, 35 25" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
          <path d="M37 80 C 47 75, 50 65, 45 60 C 42 58, 38 65, 37 80" fill="#4ade80" />
          <g transform="translate(35, 25)">
            <circle cx="0" cy="0" r="6" fill="#fbbf24" />
            {[...Array(8)].map((_, i) => (
              <ellipse 
                key={i} 
                cx="0" 
                cy="-14" 
                rx="5" 
                ry="10" 
                fill="#f472b6" 
                transform={`rotate(${i * 45})`} 
              />
            ))}
          </g>
        </svg>
      </FlowerSway>

      <FlowerSway className="left-[5%] bottom-[16%]" from="-14deg" to="3deg" delay="1.4s" duration="8.2s">
        <svg width="60" height="110" viewBox="0 0 60 110" fill="none">
          <path d="M30 110 C 30 80, 25 50, 30 20" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" />
          <g transform="translate(30, 20)">
            <circle cx="0" cy="0" r="5" fill="#fbbf24" />
            {[...Array(10)].map((_, i) => (
              <ellipse 
                key={i} 
                cx="0" 
                cy="-12" 
                rx="4" 
                ry="8" 
                fill="#e2e8f0" 
                stroke="#cbd5e1"
                strokeWidth="0.5"
                transform={`rotate(${i * 36})`} 
              />
            ))}
          </g>
        </svg>
      </FlowerSway>

      <FlowerSway className="right-[5%] bottom-[14%]" from="10deg" to="-5deg" delay="0.5s" duration="7.5s">
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
          <path d="M30 120 C 30 80, 35 40, 30 15" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" />
          <g transform="translate(30, 15)">
            <circle cx="0" cy="0" r="5" fill="#f59e0b" />
            {[...Array(8)].map((_, i) => (
              <ellipse 
                key={i} 
                cx="0" 
                cy="-12" 
                rx="4" 
                ry="9" 
                fill="#fcd34d" 
                transform={`rotate(${i * 45})`} 
              />
            ))}
          </g>
        </svg>
      </FlowerSway>

      <main className="max-w-3xl mx-auto px-6 py-4 min-h-screen transition-colors duration-300 relative z-10">
        <Header />
        <Outlet />
      </main>
    </>
  );
}