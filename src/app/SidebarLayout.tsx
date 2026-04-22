"use client";

import React, { useState } from "react";
import {
  LayoutDashboard, UserPlus, UserCheck, Users, Clock,
  Grid3x3, TrendingUp, Umbrella, Wallet, Receipt,
  FileText, Shield, MessageSquare, Bot, Bell, BarChart2,
  Brain, ClipboardList, Settings, Sliders, ChevronRight,
  Search, ChevronDown
} from "lucide-react";

interface SidebarLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "hiring", label: "Hiring", icon: UserPlus },
  { id: "people", label: "People", icon: Users },
  { id: "work", label: "Work", icon: Grid3x3 },
  { id: "finance", label: "Finance", icon: Wallet },
  { id: "reports", label: "Reports", icon: BarChart2 },
  { id: "compliance", label: "Compliance", icon: Shield },
  { id: "control-center", label: "Control Center", icon: Sliders },
  { id: "system", label: "System", icon: Settings },
];

const hrQuickSection = [
  { id: "add-job-role", label: "Add Job Role", icon: ClipboardList },
  { id: "post-job", label: "Post Job", icon: FileText },
  { id: "import-resumes", label: "Import Resumes", icon: FileText },
  { id: "advance-search", label: "Advance Search", icon: Search },
  { id: "talent-pool", label: "Talent Pool", icon: Users },
];

export default function SidebarLayout({ children, currentPage, onNavigate }: SidebarLayoutProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isParentActive = (item: any) => {
    return item.id === currentPage;
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Sidebar */}
      <aside
        className="flex-shrink-0 flex flex-col overflow-y-auto"
        style={{ width: 200, backgroundColor: "#0d1b2e" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users size={14} className="text-white" />
          </div>
          <span className="text-white font-bold text-sm tracking-wide">HR PORTAL</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isParentActive(item);

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    onNavigate(item.id);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition-all"
                  style={{
                    color: isActive ? "#ffffff" : "#94a3b8",
                    backgroundColor: isActive ? "#2563eb" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  <Icon size={15} className="flex-shrink-0" />
                  <span className="flex-1 text-left truncate text-[13px]">{item.label}</span>
                </button>
              </div>
            );
          })}

          <div className="mt-6 mb-2 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            HR Quick
          </div>
          
          {hrQuickSection.map((item) => {
            const Icon = item.icon;
            const isActive = isParentActive(item);

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    onNavigate(item.id);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition-all"
                  style={{
                    color: isActive ? "#ffffff" : "#94a3b8",
                    backgroundColor: isActive ? "#2563eb" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  <Icon size={15} className="flex-shrink-0" />
                  <span className="flex-1 text-left truncate text-[13px]">{item.label}</span>
                </button>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center gap-4 flex-shrink-0">
          <div className="flex-1">
            <div className="relative max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees, docs, tickets..."
                className="w-full h-9 pl-9 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <button className="relative p-2.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
              <Bell size={19} />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                12
              </span>
            </button>
            <button className="relative p-2.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
              <MessageSquare size={19} />
              <span className="absolute top-1 right-1 bg-green-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                5
              </span>
            </button>
            <div className="ml-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                A
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-gray-800">Admin User</div>
                <div className="text-[11px] text-gray-500">Super Admin</div>
              </div>
              <ChevronDown size={13} className="text-gray-400" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
