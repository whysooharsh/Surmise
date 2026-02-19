import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useTheme} from "./ThemeContext.jsx";

export default function Editor({ value, onChange }) {
  const {theme} = useTheme();
  const isDark = theme === 'dark';

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
      <div className="border border-[#e5e5e5] dark:border-[#404040] rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: isDark ? '#171717' : '#fafafa' }}>
        <ReactQuill
          value={value}
          onChange={onChange}
          theme="snow"
          modules={modules}
          formats={formats}
          style={{
            minHeight: "300px",
            backgroundColor: isDark ? "#171717" : "#fafafa",
            color: isDark ? "#fafafa" : "#171717",
          }}
          placeholder="Write your blog post here..."
        />
      </div>
      <style>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #e5e5e5 !important;
          background-color: #f5f5f5;
          padding: 12px;
        }

        html.dark .ql-toolbar.ql-snow {
          border-bottom-color: #404040 !important;
          background-color: #262626;
        }

        .ql-toolbar .ql-formats {
          margin-right: 15px;
        }

        .ql-toolbar button {
          border-radius: 4px;
          margin: 2px;
        }

        .ql-toolbar button:hover {
          background-color: #e5e5e5;
        }

        html.dark .ql-toolbar button:hover {
          background-color: #404040;
        }

        .ql-toolbar button.ql-active {
          background-color: #3b82f6;
          color: white;
        }

        .ql-toolbar .ql-stroke {
          stroke: #525252;
        }

        .ql-toolbar .ql-fill {
          fill: #525252;
        }

        .ql-toolbar .ql-picker-label {
          color: #525252;
        }

        html.dark .ql-toolbar .ql-stroke {
          stroke: #a3a3a3;
        }

        html.dark .ql-toolbar .ql-fill {
          fill: #a3a3a3;
        }

        html.dark .ql-toolbar .ql-picker-label {
          color: #a3a3a3;
        }

        html.dark .ql-toolbar .ql-picker-options {
          background-color: #262626;
          border-color: #404040;
        }

        .ql-container.ql-snow {
          border: none !important;
          font-family: inherit;
          background-color: #fafafa !important;
          color: #171717 !important;
        }

        html.dark .ql-container.ql-snow {
          background-color: #171717 !important;
          color: #fafafa !important;
        }

        .ql-snow .ql-editor {
          min-height: 300px !important;
          font-size: 16px;
          line-height: 1.6;
          padding: 20px;
          color: #171717 !important;
          background-color: #fafafa !important;
        }

        html.dark .ql-snow .ql-editor {
          color: #fafafa !important;
          background-color: #171717 !important;
        }

        .ql-snow .ql-editor.ql-blank::before {
          color: #737373 !important;
          font-style: italic;
        }

        html.dark .ql-snow .ql-editor.ql-blank::before {
          color: #737373 !important;
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
          border-left: 4px solid #e5e5e5;
          padding-left: 16px;
          margin: 16px 0;
          font-style: italic;
          color: #737373;
        }

        html.dark .ql-editor blockquote {
          border-left-color: #404040;
          color: #a3a3a3;
        }

        .ql-editor code {
          background-color: #f5f5f5;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }

        html.dark .ql-editor code {
          background-color: #262626;
        }

        .ql-editor pre {
          background-color: #f5f5f5;
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
        }

        html.dark .ql-editor pre {
          background-color: #262626;
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