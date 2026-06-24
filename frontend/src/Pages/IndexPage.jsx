import { useEffect, useState } from 'react';
import Post from '../Post.jsx';
import { api } from '../api';
import { useTheme } from '../ThemeContext.jsx';

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

function PostSkeleton({ isDark }) {
  const skeletonBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "#262626" : "#f0f0f0";
  
  return (
    <article className="pb-10 mb-10 animate-pulse" style={{ borderBottom: `1px solid ${borderColor}` }}>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-1 order-2 sm:order-1 space-y-3">
          <div className="h-8 rounded-lg w-3/4" style={{ backgroundColor: skeletonBg }}></div>
          <div className="space-y-2">
            <div className="h-4 rounded-md w-full" style={{ backgroundColor: skeletonBg }}></div>
            <div className="h-4 rounded-md w-5/6" style={{ backgroundColor: skeletonBg }}></div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-3 rounded-md w-20" style={{ backgroundColor: skeletonBg }}></div>
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: isDark ? "#404040" : "#d4d4d4" }}></div>
            <div className="h-3 rounded-md w-28" style={{ backgroundColor: skeletonBg }}></div>
          </div>
        </div>
        <div className="w-full sm:w-32 md:w-44 h-44 sm:h-24 md:h-28 rounded-2xl order-1 sm:order-2" style={{ backgroundColor: skeletonBg }}></div>
      </div>
    </article>
  );
}

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {theme} = useTheme();
  const isDark = theme === 'dark';
  const postsPerPage = 4;

  useEffect(() => {
    setLoading(true);
    api.get(`/posts?page=${page}&limit=${postsPerPage}`)
      .then(response => {
        if (response.data && Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
          setTotalPages(response.data.pages || 1);
        } else if (Array.isArray(response.data)) {
          setPosts(response.data);
          setTotalPages(1);
        } else {
          console.warn('API returned unexpected response structure:', response.data);
          setPosts([]);
          setTotalPages(1);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setPosts([]);
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return (
      <div className="space-y-0">
        {[...Array(postsPerPage)].map((_, i) => (
          <PostSkeleton key={i} isDark={isDark} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-0 animate-fade-slide-in" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} key={post._id} />
      ))}
      
      {posts.length === 0 && (
        <div className="text-center py-20">
          <p style={{ color: '#737373' }} className="text-lg">No posts yet</p>
          <p style={{ color: '#a3a3a3' }} className="text-sm mt-2">Be the first to share your thoughts</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-8 mt-4 border-t dark:border-neutral-800 border-neutral-100">
          <button
            onClick={(e) => { createRipple(e); setPage(p => Math.max(1, p - 1)); }}
            disabled={page === 1}
            className={`ripple-button px-4 py-2 text-xs font-bold border transition-all ${
              page === 1
                ? 'opacity-40 cursor-not-allowed border-transparent'
                : (isDark 
                    ? 'border-neutral-800 hover:bg-white/5 text-neutral-300' 
                    : 'border-neutral-200 hover:bg-neutral-100 text-neutral-700')
            }`}
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === page;
              return (
                <button
                  key={pageNumber}
                  onClick={(e) => { createRipple(e); setPage(pageNumber); }}
                  className={`ripple-button w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? (isDark 
                          ? 'bg-white text-neutral-950 scale-105' 
                          : 'bg-neutral-950 text-white scale-105')
                      : (isDark
                          ? 'border border-transparent text-neutral-400 hover:bg-white/5 hover:text-white'
                          : 'border border-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900')
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={(e) => { createRipple(e); setPage(p => Math.min(totalPages, p + 1)); }}
            disabled={page === totalPages}
            className={`ripple-button px-4 py-2 text-xs font-bold border transition-all ${
              page === totalPages
                ? 'opacity-40 cursor-not-allowed border-transparent'
                : (isDark 
                    ? 'border-neutral-800 hover:bg-white/5 text-neutral-300' 
                    : 'border-neutral-200 hover:bg-neutral-100 text-neutral-700')
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}