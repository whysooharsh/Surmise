import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import PostForm from "../components/posts/PostForm.jsx";
import { api } from '../api';
import { useTheme } from "../ThemeContext.jsx";
import { UserContext } from "../UserContext.jsx";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { userInfo, loading } = useContext(UserContext);

  if (!loading && !userInfo) {
    return <Navigate to="/login" />;
  }
  
  async function createNewPost(ev) {
    ev.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) {
      alert("Please enter a title, summary, and post content.");
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files?.[0]) {
      data.set('file', files[0]);
    }
    
    try {
      await api.post('/posts', data);
      setRedirect(true);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }
  
  return (
    <PostForm
      title={title}
      setTitle={setTitle}
      summary={summary}
      setSummary={setSummary}
      content={content}
      setContent={setContent}
      setFiles={setFiles}
      onSubmit={createNewPost}
      submitText="Publish"
      isDark={isDark}
      pageTitle="Write a new post"
    />
  );
}
