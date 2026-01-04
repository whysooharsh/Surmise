import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";
import {backendUrl} from './api';
import {useTheme} from './ThemeContext.jsx';

export default function Post({_id,title,summary,cover,content,createdAt,author}) {
  const {theme} = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <article className="pb-8 mb-8 group" style={{ borderBottom: `1px solid ${isDark ? '#262626' : '#e5e5e5'}` }}>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1 order-2 sm:order-1">
          <Link to={`/post/${_id}`}>
            <h2 className="text-xl md:text-2xl font-semibold mb-3 leading-tight transition-colors duration-200" style={{ color: isDark ? '#fafafa' : '#171717' }}>
              {title}
            </h2>
          </Link>
          <p className="mb-4 leading-relaxed" style={{ color: isDark ? '#a3a3a3' : '#525252' }}>{summary}</p>
          <div className="flex items-center gap-3 text-sm" style={{ color: '#737373' }}>
            <span className="font-medium">by {author.username}</span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#737373' }}></span>
            <time className="font-light">{formatISO9075(new Date(createdAt))}</time>
          </div>
        </div>
        {cover && (
          <div className="w-full sm:w-32 md:w-40 h-48 sm:h-24 md:h-28 flex-shrink-0 order-1 sm:order-2">
            <Link to={`/post/${_id}`}>
              <img 
                src={`${backendUrl}/${cover}`} 
                alt={title}
                className="w-full h-full object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-200"
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
