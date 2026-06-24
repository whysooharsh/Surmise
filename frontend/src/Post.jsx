import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";
import {backendUrl} from './api';
import {useTheme} from './ThemeContext.jsx';

export default function Post({_id,title,summary,cover,content,createdAt,author}) {
  const {theme} = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <article className="pb-10 mb-10 group transition-all duration-300" style={{ borderBottom: `1px solid ${isDark ? '#262626' : '#f0f0f0'}` }}>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-1 order-2 sm:order-1 space-y-3">
          <Link to={`/post/${_id}`}>
            <h2 className="text-2xl md:text-3xl font-serif-heading font-black tracking-tight leading-tight transition-colors duration-200 hover:text-purple-600 dark:hover:text-purple-400" style={{ color: isDark ? '#fafafa' : '#171717' }}>
              {title}
            </h2>
          </Link>
          <p className="leading-relaxed text-sm md:text-base font-medium opacity-80" style={{ color: isDark ? '#d4d4d4' : '#404040' }}>{summary}</p>
          <div className="flex items-center gap-2.5 text-xs font-semibold" style={{ color: '#737373' }}>
            <span className="opacity-90">by {author?.username || 'anonymous'}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600"></span>
            <time className="font-medium opacity-70">{formatISO9075(new Date(createdAt))}</time>
          </div>
        </div>
        {cover && (
          <div className="w-full sm:w-32 md:w-44 h-44 sm:h-24 md:h-28 flex-shrink-0 order-1 sm:order-2 overflow-hidden rounded-2xl border transition-all duration-300 dark:border-neutral-800 border-neutral-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)] group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.02)]">
            <Link to={`/post/${_id}`}>
              <img 
                src={`${backendUrl}/${cover}`} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.parentElement.style.display = 'none';
                }}
              />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
