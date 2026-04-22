"use client";
import React from "react";
import {
  Search, Bell, Calendar, Bot
} from "lucide-react";
import CalendarView from "../components/Work/CalendarView";
import ActionQueueView from "../components/Work/ActionQueueView";

export default function Work() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      {/* ── Page header ── */}
      <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
        <div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-indigo-600"/>
            <h1 className="text-base font-bold text-gray-900">Work</h1>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">HR Calendar – Attendance, Allocation &amp; Leaves at a glance.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input
              placeholder="Search employees, departments..."
              className="pl-8 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all placeholder-gray-400"
            />
          </div>

          {/* AI Assistant */}
          <button className="flex items-center gap-2 px-3 py-2 border border-indigo-200 text-indigo-600 bg-indigo-50 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition-colors">
            <Bot size={14}/> AI Assistant
          </button>

          {/* Bell */}
          <button className="relative p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={16} className="text-gray-600"/>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">7</span>
          </button>

          {/* Date range */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-medium">
            <Calendar size={12} className="text-gray-400"/>
            21 May – 21 Jun 2025
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pb-10">
        {/* Calendar Section */}
        <div className="min-h-[600px] flex flex-col border-b border-gray-200 bg-white">
          <CalendarView />
        </div>
        
        {/* Action Queue Section */}
        <div className="min-h-[600px] flex flex-col">
          <ActionQueueView />
        </div>
      </div>
    </div>
  );
}