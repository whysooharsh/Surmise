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
    api.post('/auth/logout').then(() => {
      localStorage.removeItem('token');
      setUserInfo(null);
    }).catch(() => {
      localStorage.removeItem('token');
      setUserInfo(null);
    });
  }

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center py-8 mb-12" style={{ borderBottom: `1px solid ${isDark ? '#262626' : '#e5e5e5'}` }}>
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold transition-colors" style={{ color: isDark ? '#fafafa' : '#171717' }}>
          Surmise
        </Link>
       
      </div>
      <nav className="flex items-center gap-6">
        {loading ? (
          <div className="w-24 h-9 rounded-md animate-pulse" style={{ backgroundColor: isDark ? '#262626' : '#e5e5e5' }}></div>
        ) : (
          <>
            {username && (
              <>
                <ThemeToggle/>
                <Link 
                  to="/create" 
                  className="font-medium transition-colors duration-200"
                  style={{ color: isDark ? '#a3a3a3' : '#525252' }}
                >
                  Write
                </Link>
                <button 
                  onClick={logout} 
                  className="font-medium transition-colors duration-200"
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
                  className="font-medium transition-colors duration-200"
                  style={{ color: isDark ? '#a3a3a3' : '#525252' }}
                >
                  Sign in
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-md font-medium transition-colors duration-200"
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
      </nav>
    </header>
  );
}
