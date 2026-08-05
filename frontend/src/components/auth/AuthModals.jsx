import { createRipple } from "../../utils/ripple";

export function SuccessModal({ title = "Success!", message, redirectText, isDark }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
      <div className={`w-full max-w-sm p-6 text-center rounded-2xl animate-fade-slide-in ${isDark ? 'glass-panel-dark' : 'glass-panel-light'}`}>
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full shadow-inner animate-bounce" style={{ backgroundColor: isDark ? "rgba(34,197,94,0.15)" : "#dcfce7", color: isDark ? "#4ade80" : "#16a34a" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-bold tracking-tight">{title}</h2>
        <p className="mt-2 text-sm opacity-70 leading-relaxed">{message}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          <div className="w-7 h-7 rounded-full animate-spin" style={{ border: `3.5px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`, borderTopColor: isDark ? "#fafafa" : "#171717" }}></div>
          <span className="text-xs font-semibold opacity-60 mt-1">{redirectText}</span>
        </div>
      </div>
    </div>
  );
}

export function ErrorModal({ title = "Failed", message, onClose, isDark }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
      <div className={`w-full max-w-sm p-6 text-center rounded-2xl animate-fade-slide-in ${isDark ? 'glass-panel-dark' : 'glass-panel-light'}`}>
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full shadow-inner" style={{ backgroundColor: isDark ? "rgba(239,68,68,0.15)" : "#fee2e2", color: isDark ? "#f87171" : "#dc2626" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 animate-pulse">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-bold tracking-tight">{title}</h2>
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
