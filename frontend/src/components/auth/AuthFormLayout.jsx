import { Link } from "react-router-dom";
import ThemeToggle from "../themeToggle.jsx";
import loginHero from "../../assets/login_hero.png";
import { createRipple } from "../../utils/ripple";

export default function AuthFormLayout({ children, isDark }) {
  return (
    <div className={`min-h-screen w-full flex flex-col md:flex-row relative overflow-hidden select-none ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <Link 
          to="/" 
          onClick={createRipple}
          className={`ripple-button flex items-center gap-2 text-xs font-bold tracking-wide uppercase px-4 py-2.5 rounded-full border transition-all ${
            isDark 
              ? 'glass-panel-dark border-neutral-800 text-neutral-300 hover:text-white' 
              : 'glass-panel-light border-neutral-200 text-neutral-700 hover:text-neutral-950'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Home
        </Link>
      </div>
      
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center px-6 py-20 md:px-12 lg:px-14 xl:px-16 relative overflow-hidden min-h-screen">
        <div className="w-full max-w-sm mx-auto relative z-10 animate-fade-slide-in">
          {children}
        </div>
      </div>

      <div className={`hidden md:flex md:w-[55%] lg:w-[60%] relative overflow-hidden items-center justify-center px-12 ${
        isDark ? 'bg-neutral-900 border-l border-neutral-800' : 'bg-neutral-50 border-l border-neutral-100'
      }`}>
        <div className={`w-full max-w-md rounded-3xl p-4 relative z-10 shadow-xl animate-fade-slide-in ${
          isDark ? 'glass-panel-dark border-white/10' : 'glass-panel-light border-neutral-200'
        }`}>
          <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm relative">
            <img 
              src={loginHero} 
              alt="Ghibli landscape" 
              className="w-full h-full object-cover animate-float-gentle"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
