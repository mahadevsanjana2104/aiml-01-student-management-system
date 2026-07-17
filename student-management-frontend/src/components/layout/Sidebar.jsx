import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  CalendarCheck,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <h1 className="logo">CampusFlow</h1>

        <p className="logo-subtitle">
          Smart Student Portal
        </p>
      </div>

      <nav className="menu">
        <NavLink to="/dashboard" className="menu-item">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/students" className="menu-item">
          <GraduationCap size={20} />
          <span>Students</span>
        </NavLink>

        <NavLink to="/teachers" className="menu-item">
          <Users size={20} />
          <span>Teachers</span>
        </NavLink>

        <NavLink to="/courses" className="menu-item">
          <BookOpen size={20} />
          <span>Courses</span>
        </NavLink>

        <NavLink to="/attendance" className="menu-item">
          <CalendarCheck size={20} />
          <span>Attendance</span>
        </NavLink>

        <NavLink to="/marks" className="menu-item">
          <BarChart3 size={20} />
          <span>Marks</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="menu-item">
          <Settings size={20} />
          <span>Settings</span>
        </div>

        <NavLink to="/" className="menu-item logout">
          <LogOut size={20} />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
}