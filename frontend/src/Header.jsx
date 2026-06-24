import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext.jsx";
import {api} from "./api";
import ThemeToggle from "./components/themeToggle.jsx";
import {useTheme} from "./ThemeContext.jsx";

export default function Header() {
  const {setUserInfo, userInfo, loading, setLoading} = useContext(UserContext);
  const {theme} = useTheme();
  const isDark = theme === 'dark';

  function clearSession() {
    localStorage.removeItem('token');
    setUserInfo(null);
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      api.get('/auth/profile').then(response => {
        setUserInfo(response.data);
        setLoading(false);
      }).catch(error => {
        console.log('Profile fetch failed:', error.response?.status || error.message);
        setUserInfo(null);
        setLoading(false);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [setUserInfo, setLoading]);

  function logout() {
    api.post('/auth/logout').finally(() => {
      clearSession();
    });
  }

  const username = userInfo?.username;

  return (
    <header 
      className={`flex justify-between items-center px-6 py-4 rounded-full border transition-all duration-300 mt-4 mb-16 shadow-[0_8px_30px_rgba(0,0,0,0.02)] ${
        isDark ? 'glass-panel-dark border-neutral-800' : 'glass-panel-light border-neutral-200/50'
      }`}
    >
      <div className="flex items-center">
        <Link 
          to="/" 
          className="text-2xl font-serif-heading italic font-black tracking-tight transition-colors hover:opacity-80"
          style={{ color: isDark ? '#fafafa' : '#171717' }}
        >
          surmise
        </Link>
      </div>
      <nav className="flex items-center gap-5 sm:gap-6 text-sm font-semibold">
        {loading ? (
          <div className="w-24 h-8 rounded-full animate-pulse" style={{ backgroundColor: isDark ? '#262626' : '#e5e5e5' }}></div>
        ) : (
          <>
            {username && (
              <>
                <Link 
                  to="/create" 
                  className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
                  style={{ color: isDark ? '#a3a3a3' : '#525252' }}
                >
                  Write
                </Link>
                <button 
                  onClick={logout} 
                  className="transition-colors hover:text-purple-600 dark:hover:text-purple-400 font-semibold"
                  style={{ color: isDark ? '#a3a3a3' : '#525252' }}
                >
                  Sign out
                </button>
              </>
            )}
            {!username && (
              <>
                <Link 
                  to="/login" 
                  className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
                  style={{ color: isDark ? '#a3a3a3' : '#525252' }}
                >
                  Sign in
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    backgroundColor: isDark ? '#fafafa' : '#171717',
                    color: isDark ? '#171717' : '#fafafa',
                    border: `1px solid ${isDark ? '#fafafa' : '#171717'}`
                  }}
                >
                  Register
                </Link> 
              </>
            )}
          </>
        )}
        <div className="border-l pl-4 dark:border-neutral-800 border-neutral-200 flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
