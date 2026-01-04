import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor.jsx";
import {api} from '../api';
import {useTheme} from "../ThemeContext.jsx";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {theme} = useTheme();
  const isDark = theme === 'dark';
  
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    try {
      await api.post('/posts', data);
      setRedirect(true);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  
  return (
    <div>
      <h1 className="text-2xl font-medium mb-8" style={{ color: isDark ? '#fafafa' : '#171717' }}>Write a new post</h1>
      <form onSubmit={createNewPost} className="space-y-6">
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
        <Editor value={content} onChange={setContent} />
        <button 
          type="submit"
          className="py-3 px-8 rounded-lg font-medium transition-colors"
          style={{
            backgroundColor: isDark ? '#fafafa' : '#171717',
            color: isDark ? '#171717' : '#fafafa',
            border: `1px solid ${isDark ? '#fafafa' : '#171717'}`
          }}
        >
          Publish
        </button>
      </form>
    </div>
  );
}
