import React from "react";
import { ArrowRight, UserPlus, Briefcase, CheckCircle2, Wallet, Sparkles } from "lucide-react";
import { criticalAlerts, upcomingEvents } from "./data";

export default function DashboardSidebar() {
  return (
    <aside className="w-full xl:w-72 shrink-0 p-4 flex flex-col gap-6 border-l border-gray-200 bg-white min-h-screen">
      
      {/* Critical Alerts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Critical Alerts</h3>
          <button className="text-xs text-indigo-600 hover:underline font-medium">View all</button>
        </div>
        <div className="flex flex-col gap-2">
          {criticalAlerts.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-slate-50 transition cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.bg}`}>
                <a.icon className={`w-4 h-4 ${a.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{a.label}</p>
                <p className="text-[10px] text-gray-400 line-clamp-1">{a.sub}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-sm font-bold ${a.color} w-6 text-right`}>{a.count}</span>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-indigo-500 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: UserPlus, label: "Add Employee", color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100" },
            { icon: Briefcase, label: "Post Job", color: "text-amber-600 bg-amber-50 hover:bg-amber-100" },
            { icon: CheckCircle2, label: "Approve Leave", color: "text-green-600 bg-green-50 hover:bg-green-100" },
            { icon: Wallet, label: "Run Payroll", color: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
          ].map((action, i) => (
            <button
              key={i}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all hover:scale-105 gap-2 border border-transparent ${action.color}`}
            >
              <action.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Upcoming Events</h3>
          <button className="text-xs text-indigo-600 hover:underline font-medium">Calendar</button>
        </div>
        <div className="flex flex-col gap-3">
          {upcomingEvents.map((ev, i) => (
            <div key={i} className="flex items-start gap-3 group cursor-pointer">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12 ${ev.color}`}>
                <ev.icon size={14} />
              </div>
              <div className="min-w-0 border-b border-gray-50 pb-2 flex-1">
                <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">{ev.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-gray-400 font-medium">{ev.time}</span>
                  {ev.urgent && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/20 p-1 rounded-lg backdrop-blur-sm">
                <Sparkles size={14} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">AI Insights</span>
            </div>
            <p className="text-xs font-medium leading-relaxed mb-3 text-indigo-100">
              "Cost per hire is down by 12.5% this quarter, but average time-to-hire is increasing."
            </p>
            <button className="w-full py-1.5 bg-white text-indigo-600 rounded-lg text-[10px] font-bold hover:bg-indigo-50 transition-colors shadow-sm">
              Explore Analytics
            </button>
          </div>
        </div>
      </div>

    </aside>
  );
}
