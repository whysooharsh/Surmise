import { useState } from "react";
import { Link, Navigate } from "react-router-dom"; 
import { api } from "../api";
import { useTheme } from "../ThemeContext.jsx";
import ThemeToggle from "../components/themeToggle.jsx";
import loginHero from "../assets/login_hero.png";

function createRipple(event) {
  const button = event.currentTarget;
  const existingRipples = button.getElementsByClassName("ripple-span");
  for (let r of Array.from(existingRipples)) {
    r.remove();
  }

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add("ripple-span");

  button.appendChild(circle);
}

function SuccessModal({ message, redirectText, isDark }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
      <div className={`w-full max-w-sm p-6 text-center rounded-2xl animate-fade-slide-in ${isDark ? 'glass-panel-dark' : 'glass-panel-light'}`}>
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full shadow-inner animate-bounce" style={{ backgroundColor: isDark ? "rgba(34,197,94,0.15)" : "#dcfce7", color: isDark ? "#4ade80" : "#16a34a" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-bold tracking-tight">Account Created!</h2>
        <p className="mt-2 text-sm opacity-70 leading-relaxed">{message}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          <div className="w-7 h-7 rounded-full animate-spin" style={{ border: `3.5px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`, borderTopColor: isDark ? "#fafafa" : "#171717" }}></div>
          <span className="text-xs font-semibold opacity-60 mt-1">{redirectText}</span>
        </div>
      </div>
    </div>
  );
}

function ErrorModal({ message, onClose, isDark }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
      <div className={`w-full max-w-sm p-6 text-center rounded-2xl animate-fade-slide-in ${isDark ? 'glass-panel-dark' : 'glass-panel-light'}`}>
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full shadow-inner" style={{ backgroundColor: isDark ? "rgba(239,68,68,0.15)" : "#fee2e2", color: isDark ? "#f87171" : "#dc2626" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 animate-pulse">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-bold tracking-tight">Registration Failed</h2>
        <p className="mt-2 text-sm opacity-70 leading-relaxed">{message}</p>
        <button 
          onClick={(e) => { createRipple(e); setTimeout(onClose, 250); }} 
          className={`ripple-button mt-6 w-full py-3 text-sm font-semibold rounded-xl transition-all shadow-md ${
            isDark 
              ? 'bg-white text-neutral-950 hover:bg-neutral-100' 
              : 'bg-neutral-950 text-white hover:bg-neutral-800'
          }`}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  async function register(ev) {
    ev.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please fill in both fields to create your account.");
      setShowErrorModal(true);
      return;
    }
    if (password.length < 4) {
      setErrorMessage("Password is too short. Please use at least 4 characters.");
      setShowErrorModal(true);
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/register", { username, password });
      setIsLoading(false);
      setSuccessMessage("Your account was successfully registered! Let's get you signed in...");
      setShowSuccessModal(true);
      
      setTimeout(() => {
        setRedirect(true);
      }, 1200);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("This username is already taken. Please try another one.");
      setShowErrorModal(true);
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

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
          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
              Register
            </h1>
            <p className="text-sm opacity-60 font-medium">Create a free account to start writing and sharing stories.</p>
          </div>

          <form onSubmit={register} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold tracking-wider uppercase opacity-75">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                disabled={isLoading}
                className={`w-full px-4 py-3 text-sm focus:outline-none ${
                  isDark ? 'glass-input-dark text-white' : 'glass-input-light text-neutral-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-extrabold tracking-wider uppercase opacity-75">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 4 characters"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 text-sm pr-10 focus:outline-none ${
                    isDark ? 'glass-input-dark text-white' : 'glass-input-light text-neutral-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.815 7.815L21 21m-3.95-3.95-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              onClick={createRipple}
              disabled={isLoading}
              style={{ color: isDark ? '#171717' : '#ffffff' }}
              className={`ripple-button w-full py-3.5 flex items-center justify-center font-bold text-sm shadow-lg mt-6 ${
                isLoading 
                  ? 'bg-neutral-500 text-neutral-200 cursor-not-allowed' 
                  : (isDark 
                      ? 'bg-white hover:bg-neutral-100' 
                      : 'bg-neutral-950 hover:bg-neutral-800')
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 mr-2" style={{ border: '2px solid transparent', borderTopColor: isDark ? '#171717' : '#fafafa' }}></div>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium opacity-70">
            Already have an account?{" "}
            <Link to="/login" onClick={createRipple} className="font-extrabold hover:underline text-purple-600 dark:text-purple-400">
              Sign in here
            </Link>
          </p>
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

      {showErrorModal && (
        <ErrorModal message={errorMessage} onClose={() => setShowErrorModal(false)} isDark={isDark} />
      )}
      {showSuccessModal && (
        <SuccessModal message={successMessage} redirectText="Redirecting to Login..." isDark={isDark} />
      )}
    </div>
  );
}
