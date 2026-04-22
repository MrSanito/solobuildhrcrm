"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Sparkles,
  CalendarDays,
} from "lucide-react";

import DashboardKPICards from "../components/Dashboard/DashboardKPICards";
import DashboardCharts from "../components/Dashboard/DashboardCharts";
import PerformanceCostCharts from "../components/Dashboard/PerformanceCostCharts";
import DashboardActivity from "../components/Dashboard/DashboardActivity";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col xl:flex-row animate-in fade-in duration-500">
      
      {/* ── Main Content Area ── */}
      <div className="flex-1 min-w-0">
        
        {/* ── Top Nav ── */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-wrap items-center justify-between sticky top-0 z-50 shadow-sm gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Good morning, Priya! 👋
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Here's what's happening in your organization today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition shadow-sm">
              <Sparkles className="w-4 h-4" />
              AI Assistant
            </button>
            <button className="relative p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                12
              </span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm">
              <CalendarDays className="w-4 h-4 text-indigo-500" />
              21 May 2025
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Search/AI Prompt Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-indigo-600 font-bold">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">What's on your mind today?</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Ask about hiring, payroll increases, underperformers, or approval statuses.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                "Hire for open roles",
                "Review attendance anomalies",
                "Who are underperforming?",
                "Approve pending leaves",
                "Why is cost increasing?",
              ].map((chip) => (
                <button
                  key={chip}
                  className="text-xs px-4 py-2 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <DashboardKPICards />
          <DashboardCharts />
          <PerformanceCostCharts />
          <DashboardActivity activeTab={activeTab} setActiveTab={setActiveTab} />
        </main>
      </div>

      {/* ── Right Sidebar ── */}
      <DashboardSidebar />

    </div>
  );
}