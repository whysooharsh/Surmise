import { useEffect, useState } from 'react';
import Post from '../Post.jsx';
import { api } from '../api';
import { useTheme } from '../ThemeContext.jsx';

function PostSkeleton({ isDark }) {
  const skeletonBg = isDark ? "#262626" : "#e5e5e5";
  const borderColor = isDark ? "#262626" : "#e5e5e5";
  
  return (
    <article className="pb-8 mb-8 animate-pulse" style={{ borderBottom: `1px solid ${borderColor}` }}>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1 order-2 sm:order-1">
          <div className="h-7 rounded-md w-3/4 mb-3" style={{ backgroundColor: skeletonBg }}></div>
          <div className="space-y-2 mb-4">
            <div className="h-4 rounded-md w-full" style={{ backgroundColor: skeletonBg }}></div>
            <div className="h-4 rounded-md w-5/6" style={{ backgroundColor: skeletonBg }}></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 rounded-md w-24" style={{ backgroundColor: skeletonBg }}></div>
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: isDark ? "#404040" : "#d4d4d4" }}></div>
            <div className="h-4 rounded-md w-32" style={{ backgroundColor: skeletonBg }}></div>
          </div>
        </div>
        <div className="w-full sm:w-32 md:w-40 h-48 sm:h-24 md:h-28 rounded-xl order-1 sm:order-2" style={{ backgroundColor: skeletonBg }}></div>
      </div>
    </article>
  );
}

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {theme} = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    api.get('/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-0">
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} isDark={isDark} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {posts.length > 0 && posts.map(post => (
        <Post {...post} key={post._id} />
      ))}
      {posts.length === 0 && (
        <div className="text-center py-20">
          <p style={{ color: '#737373' }} className="text-lg">No posts yet</p>
          <p style={{ color: '#a3a3a3' }} className="text-sm mt-2">Be the first to share your thoughts</p>
        </div>
      )}
    </div>
  );
}