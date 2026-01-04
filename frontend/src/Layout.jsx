import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-4 min-h-screen transition-colors duration-300">
      <Header />
      <Outlet />
    </main>
  );
}