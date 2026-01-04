import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor.jsx";
import {api} from '../api';
import {useTheme} from "../ThemeContext.jsx";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {theme} = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(response => {
        const postInfo = response.data;
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    try {
      await api.put(`/posts/${id}`, data);
      setRedirect(true);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <div>
      <h1 className="text-2xl font-medium mb-8" style={{ color: isDark ? '#fafafa' : '#171717' }}>Edit Post</h1>
      <form onSubmit={updatePost} className="space-y-6">
        <input 
          type="text"
          placeholder="Title"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          className="w-full px-4 py-3 rounded-lg focus:outline-none text-lg transition-colors"
          style={{
            backgroundColor: isDark ? '#171717' : '#fafafa',
            color: isDark ? '#fafafa' : '#171717',
            border: `1px solid ${isDark ? '#404040' : '#e5e5e5'}`
          }}
        />
        <input 
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
          className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors"
          style={{
            backgroundColor: isDark ? '#171717' : '#fafafa',
            color: isDark ? '#fafafa' : '#171717',
            border: `1px solid ${isDark ? '#404040' : '#e5e5e5'}`
          }}
        />
        <input 
          type="file"
          onChange={ev => setFiles(ev.target.files)}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:cursor-pointer file:transition-colors"
          style={{ color: isDark ? '#a3a3a3' : '#525252' }}
        />
        <Editor onChange={setContent} value={content} />
        <button 
          type="submit"
          className="py-3 px-8 rounded-lg font-medium transition-colors"
          style={{
            backgroundColor: isDark ? '#fafafa' : '#171717',
            color: isDark ? '#171717' : '#fafafa',
            border: `1px solid ${isDark ? '#fafafa' : '#171717'}`
          }}
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
