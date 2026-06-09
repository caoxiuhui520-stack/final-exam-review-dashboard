import {
  BarChart3, BookOpen, CalendarDays, ClipboardCheck, Headphones,
  Home, Library, ListChecks, Menu, Settings, X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  { to: "/", label: "今日冲刺", icon: Home },
  { to: "/library", label: "自由题库", icon: Library },
  { to: "/practice/listening", label: "听力精练", icon: Headphones },
  { to: "/mock", label: "模拟考试", icon: ClipboardCheck },
  { to: "/mistakes", label: "错题本", icon: ListChecks },
  { to: "/progress", label: "复习进度", icon: BarChart3 },
];

export function AppShell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">期末<span>冲刺台</span></div>
        <nav aria-label="主导航">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>
              <Icon aria-hidden size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-settings"><Settings size={19} /> 学习设置</div>
      </aside>
      {open ? <button className="nav-scrim" aria-label="关闭导航" onClick={() => setOpen(false)} /> : null}
      <div className="app-body">
        <header className="topbar">
          <button className="mobile-menu" aria-label={open ? "关闭菜单" : "打开菜单"} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
          <div className="topbar-spacer" />
          <span><CalendarDays size={17} /> 2026.06.25</span>
          <span><BookOpen size={17} /> 复习范围已整理</span>
        </header>
        <Outlet />
      </div>
      <nav className="bottom-nav" aria-label="手机导航">
        {navigation.slice(0, 4).map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"}>
            <Icon size={18} /><span>{label.replace("冲刺", "")}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

