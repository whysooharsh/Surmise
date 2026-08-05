import Editor from "../../Editor.jsx";
import { createRipple } from "../../utils/ripple";

export default function PostForm({
  title,
  setTitle,
  summary,
  setSummary,
  content,
  setContent,
  setFiles,
  onSubmit,
  submitText,
  isDark,
  pageTitle
}) {
  return (
    <div className="animate-fade-slide-in" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      <h1 className="text-3xl md:text-4xl font-serif-heading font-black mb-8 leading-tight tracking-tight" style={{ color: isDark ? '#fafafa' : '#171717' }}>
        {pageTitle}
      </h1>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold tracking-wider uppercase opacity-70">
            Post Title
          </label>
          <input 
            type="text"
            placeholder="Give your story a clear title"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            className={`w-full px-4 py-3 text-base focus:outline-none ${
              isDark ? 'glass-input-dark text-white' : 'glass-input-light text-neutral-900'
            }`}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-extrabold tracking-wider uppercase opacity-70">
            Post Summary
          </label>
          <input 
            type="text"
            placeholder="A short introduction to capture readers' attention"
            value={summary}
            onChange={ev => setSummary(ev.target.value)}
            className={`w-full px-4 py-3 text-sm focus:outline-none ${
              isDark ? 'glass-input-dark text-white' : 'glass-input-light text-neutral-900'
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-extrabold tracking-wider uppercase opacity-70 block">
            Cover Image
          </label>
          <input 
            type="file"
            onChange={ev => setFiles(ev.target.files)}
            className={`block w-full text-xs file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border file:text-xs file:font-bold file:cursor-pointer file:transition-all ${
              isDark 
                ? 'text-neutral-400 file:border-neutral-800 file:bg-neutral-900 file:text-white hover:file:bg-neutral-800' 
                : 'text-neutral-600 file:border-neutral-200 file:bg-neutral-50 file:text-neutral-800 hover:file:bg-neutral-100'
            }`}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-extrabold tracking-wider uppercase opacity-70 block mb-1">
            Post Content
          </label>
          <Editor value={content} onChange={setContent} />
        </div>

        <button 
          type="submit"
          onClick={createRipple}
          style={{ color: isDark ? '#171717' : '#ffffff' }}
          className={`ripple-button py-3.5 px-10 font-bold text-sm shadow-md ${
            isDark 
              ? 'bg-white hover:bg-neutral-100' 
              : 'bg-neutral-950 hover:bg-neutral-800'
          }`}
        >
          {submitText}
        </button>
      </form>
    </div>
  );
}
