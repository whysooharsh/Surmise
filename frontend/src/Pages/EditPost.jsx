import { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import PostForm from "../components/posts/PostForm.jsx";
import { api } from '../api';
import { useTheme } from "../ThemeContext.jsx";
import { UserContext } from "../UserContext.jsx";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { userInfo, loading } = useContext(UserContext);

  useEffect(() => {
    if (!id) return;
    api.get(`/posts/${id}`)
      .then(response => {
        const postInfo = response.data;
        setTitle(postInfo.title || '');
        setContent(postInfo.content || '');
        setSummary(postInfo.summary || '');
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  if (!loading && !userInfo) {
    return <Navigate to="/login" />;
  }

  async function updatePost(ev) {
    ev.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) {
      alert("Please enter a title, summary, and post content.");
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files[0]);
    }
    
    try {
      await api.put(`/posts/${id}`, data);
      setRedirect(true);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
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
      onSubmit={updatePost}
      submitText="Update Post"
      isDark={isDark}
      pageTitle="Edit post"
    />
  );
}
