"use client";

import React, { useState } from "react";
import {
  Bell, Send, ChevronDown, Sparkles, CalendarDays, Briefcase, Filter, Activity, CheckCircle2, TrendingUp, TrendingDown
} from "lucide-react";
import { kpiCards, TabName } from "../components/Hiring/data";
import { RolesTab } from "../components/Hiring/RolesTab";
import { ScreeningTab } from "../components/Hiring/ScreeningTab";
import { PipelineTab } from "../components/Hiring/PipelineTab";
import { InterviewsTab } from "../components/Hiring/InterviewsTab";
import { OffersTab } from "../components/Hiring/OffersTab";

export default function HiringPage() {
  const [activeTab, setActiveTab] = useState<TabName>("Roles");

  const tabs: { name: TabName; icon: React.ElementType }[] = [
    { name: "Roles", icon: Briefcase },
    { name: "Screening", icon: Filter },
    { name: "Pipeline", icon: Activity },
    { name: "Interviews", icon: CalendarDays },
    { name: "Offers", icon: CheckCircle2 },
    { name: "Intelligence", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* ── Top Nav ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <h1 className="text-base font-bold text-gray-900">Hiring</h1>
          </div>
          <p className="text-[11px] text-gray-400">Find, attract and hire the best talent.</p>
        </div>
        <div className="flex-1 max-w-md mx-6">
          <div className="bg-gray-100 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs text-gray-400 truncate">What's on your mind today? Examples: "Hire backend engineer"…</span>
            <button className="ml-auto bg-indigo-600 text-white p-1.5 rounded-lg hover:bg-indigo-700"><Send className="w-3 h-3" /></button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700"><Sparkles className="w-3.5 h-3.5" /> AI Assistant</button>
          <button className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            <Bell className="w-4 h-4 text-gray-600" />
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">6</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
            <CalendarDays className="w-3.5 h-3.5 text-indigo-500" />
            21 May – 21 Jun 2025
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col p-4 gap-4">
        {/* ── KPI Row (only for Roles & Screening & Pipeline) ── */}
        {(activeTab === "Roles" || activeTab === "Screening" || activeTab === "Pipeline") && (
          <div className="grid grid-cols-6 gap-3">
            {kpiCards.map((k, i) => (
              <div key={i} className={`bg-white rounded-xl border p-3 shadow-sm flex flex-col gap-1 ${k.badge === "High" ? "border-red-200" : "border-gray-200"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-medium leading-tight">{k.label}</span>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${k.bg}`}><k.icon className={`w-3.5 h-3.5 ${k.color}`} /></div>
                </div>
                <div className={`text-base font-bold leading-tight ${k.badge === "High" ? "text-red-600" : "text-gray-900"}`}>{k.value}</div>
                <div className={`text-[10px] flex items-center gap-1 ${k.up ? "text-green-600" : "text-red-500"}`}>
                  {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {k.change}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 border-b border-gray-200">
          {tabs.map((tab) => (
            <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition -mb-px ${activeTab === tab.name ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              <tab.icon className="w-3.5 h-3.5" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="flex-1 min-h-0">
          {activeTab === "Roles" && <RolesTab />}
          {activeTab === "Screening" && <ScreeningTab />}
          {activeTab === "Pipeline" && <PipelineTab />}
          {activeTab === "Interviews" && <InterviewsTab />}
          {activeTab === "Offers" && <OffersTab />}
          {activeTab === "Intelligence" && (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-indigo-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-500">Intelligence view coming soon</p>
                <p className="text-xs text-gray-400 mt-1">Switch to Roles, Screening, Pipeline, Interviews or Offers to see data</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}