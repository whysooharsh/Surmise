import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import { api } from "../api";
import { useTheme } from "../ThemeContext.jsx";
import AuthFormLayout from "../components/auth/AuthFormLayout.jsx";
import { SuccessModal, ErrorModal } from "../components/auth/AuthModals.jsx";
import { createRipple } from "../utils/ripple";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  async function login(ev) {
    ev.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both username and password.");
      setShowErrorModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { username, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      setUserInfo(response.data);
      setIsLoading(false);
      setSuccessMessage("Successfully logged in! Taking you to the dashboard...");
      setShowSuccessModal(true);
      
      setTimeout(() => {
        setRedirect(true);
      }, 1200);
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      setErrorMessage("Incorrect credentials. Please verify your username and password.");
      setShowErrorModal(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <AuthFormLayout isDark={isDark}>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
          Sign In
        </h1>
        <p className="text-sm opacity-60 font-medium">Welcome back! Please sign in to write and browse.</p>
      </div>

      <form onSubmit={login} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold tracking-wider uppercase opacity-75">
            Username
          </label>
          <input
            type="text"
            placeholder="Type your username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            disabled={isLoading}
            className={`w-full px-4 py-3 text-sm focus:outline-none ${
              isDark ? 'glass-input-dark text-white' : 'glass-input-light text-neutral-900'
            }`}
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-extrabold tracking-wider uppercase opacity-75">
              Password
            </label>
            <a href="#" className="text-xs font-semibold hover:underline opacity-60">Forgot?</a>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm font-medium opacity-70">
        Don't have an account?{" "}
        <Link to="/register" onClick={createRipple} className="font-extrabold hover:underline text-purple-600 dark:text-purple-400">
          Create one here
        </Link>
      </p>

      {showErrorModal && (
        <ErrorModal title="SignIn Failed" message={errorMessage} onClose={() => setShowErrorModal(false)} isDark={isDark} />
      )}
      {showSuccessModal && (
        <SuccessModal title="SignIn Successful!" message={successMessage} redirectText="Redirecting in a moment..." isDark={isDark} />
      )}
    </AuthFormLayout>
  );
}
