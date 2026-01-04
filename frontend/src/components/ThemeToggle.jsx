import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px",
        borderRadius: "9999px",
        backgroundColor: isDark ? "#262626" : "#e5e5e5",
        color: isDark ? "#fafafa" : "#171717",
        border: `1px solid ${isDark ? "#404040" : "#d4d4d4"}`,
        transition: "all 0.2s ease",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
