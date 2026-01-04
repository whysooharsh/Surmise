import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  return (
    <div className="w-full">
      <div className="border border-[#e5e5e5] dark:border-[#404040] rounded-lg overflow-hidden shadow-sm">
        <ReactQuill
          value={value}
          onChange={onChange}
          theme="snow"
          modules={modules}
          formats={formats}
          className="bg-white dark:bg-[#1a1a1a]"
          style={{
            minHeight: "300px",
          }}
          placeholder="Write your blog post here..."
        />
      </div>
      <style jsx global>{`
        .ql-editor {
          min-height: 300px !important;
          font-size: 16px;
          line-height: 1.6;
          padding: 20px;
        }
        
        .ql-toolbar {
          border-bottom: 1px solid #e5e7eb !important;
          background-color: #f9fafb;
          padding: 12px;
        }
        
        .ql-toolbar .ql-formats {
          margin-right: 15px;
        }
        
        .ql-toolbar button {
          border-radius: 4px;
          margin: 2px;
        }
        
        .ql-toolbar button:hover {
          background-color: #e5e7eb;
        }
        
        .ql-toolbar button.ql-active {
          background-color: #3b82f6;
          color: white;
        }
        
        .ql-container {
          border: none !important;
          font-family: inherit;
        }
        
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: italic;
        }
        
        .ql-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        
        .ql-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        
        .ql-editor h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 1em 0;
        }
        
        .ql-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 16px;
          margin: 16px 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .ql-editor code {
          background-color: #f3f4f6;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        
        .ql-editor pre {
          background-color: #f3f4f6;
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
        }
        
        .ql-editor img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem auto;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}