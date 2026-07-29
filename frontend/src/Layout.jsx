import Header from "./Header.jsx";
import {Outlet, useLocation} from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <main className="min-h-screen w-full transition-colors duration-300 overflow-hidden">
        <Outlet />
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-4 min-h-screen transition-colors duration-300 relative z-10">
      <Header />
      <Outlet />
    </main>
  );
}