import { useState } from "react";
import { Navigate } from "react-router-dom"; 
import { api } from "../api";
import { useTheme } from "../ThemeContext.jsx";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {theme} = useTheme();
  const isDark = theme === 'dark';

  async function register(ev) {
    ev.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/auth/register", { username, password });
      setIsLoading(false);
      setSuccessMessage("Registration successful! Redirecting to login page...");
      setShowSuccessModal(true);
      setTimeout(() => {
        setRedirect(true);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Username already exists! Try something else.");
      setShowErrorModal(true);
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-medium mb-8 text-center" style={{ color: isDark ? '#fafafa' : '#171717' }}>Register</h1>

      <form onSubmit={register} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors disabled:cursor-not-allowed"
          style={{
            backgroundColor: isDark ? '#171717' : '#fafafa',
            color: isDark ? '#fafafa' : '#171717',
            border: `1px solid ${isDark ? '#404040' : '#e5e5e5'}`
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors disabled:cursor-not-allowed"
          style={{
            backgroundColor: isDark ? '#171717' : '#fafafa',
            color: isDark ? '#fafafa' : '#171717',
            border: `1px solid ${isDark ? '#404040' : '#e5e5e5'}`
          }}
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg flex items-center justify-center font-medium transition-colors disabled:cursor-not-allowed"
          style={{
            backgroundColor: isLoading ? '#a3a3a3' : (isDark ? '#fafafa' : '#171717'),
            color: isDark ? '#171717' : '#fafafa',
            border: `1px solid ${isLoading ? '#a3a3a3' : (isDark ? '#fafafa' : '#171717')}`
          }}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 mr-2" style={{ border: '2px solid transparent', borderTopColor: isDark ? '#171717' : '#fafafa' }}></div>
              Creating Account...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
          <div className="rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center" style={{ backgroundColor: isDark ? '#171717' : '#fafafa', border: `1px solid ${isDark ? '#404040' : '#e5e5e5'}` }}>
            <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full" style={{ backgroundColor: isDark ? '#262626' : '#f5f5f5', color: isDark ? '#a3a3a3' : '#525252' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="mt-3 text-base font-semibold" style={{ color: isDark ? '#fafafa' : '#171717' }}>Registration Failed</h2>
            <p className="mt-2 text-sm" style={{ color: isDark ? '#a3a3a3' : '#525252' }}>{errorMessage}</p>
            <button onClick={() => setShowErrorModal(false)} className="mt-4 w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors" style={{ backgroundColor: isDark ? '#fafafa' : '#171717', color: isDark ? '#171717' : '#fafafa', border: `1px solid ${isDark ? '#fafafa' : '#171717'}` }}>Try Again</button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
          <div className="rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center" style={{ backgroundColor: isDark ? '#171717' : '#fafafa', border: `1px solid ${isDark ? '#404040' : '#e5e5e5'}` }}>
            <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full" style={{ backgroundColor: isDark ? 'rgba(34,197,94,0.2)' : '#dcfce7', color: isDark ? '#4ade80' : '#16a34a' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h2 className="mt-3 text-base font-semibold" style={{ color: isDark ? '#fafafa' : '#171717' }}>Registration Successful!</h2>
            <p className="mt-2 text-sm" style={{ color: isDark ? '#a3a3a3' : '#525252' }}>{successMessage}</p>
            <div className="mt-4 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full animate-spin" style={{ border: `4px solid ${isDark ? '#404040' : '#e5e5e5'}`, borderTopColor: isDark ? '#fafafa' : '#171717' }}></div>
              <span className="ml-3 text-sm font-medium" style={{ color: isDark ? '#a3a3a3' : '#525252' }}>Redirecting to login...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
