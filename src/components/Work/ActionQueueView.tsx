import React, { useState } from "react";
import {
  ChevronDown, ChevronUp, Filter, RefreshCw,
  MoreVertical, CheckCircle, Bot, TrendingUp,
  Info,
} from "lucide-react";
import { priorities, todayItems } from "./data";

const autoItems = [
  { dot:"bg-red-400",    label:"Auto-approve leave",            sub:"(Low Impact) · 5 pending requests" },
  { dot:"bg-green-400",  label:"Auto-correct attendance",       sub:"(Rule Match) · 4 anomalies detected" },
  { dot:"bg-blue-400",   label:"Auto-assign replacement",       sub:"3 leave requests" },
];

const insights = [
  { icon:"📅", title:"High leave on 23 May",       sub:"8 leaves already approved",         action:"Plan Coverage",  aC:"text-indigo-600 border-indigo-200 hover:bg-indigo-50" },
  { icon:"👥", title:"Team Overload Detected",      sub:"3 teams have > 90% utilization",    action:"View Teams",     aC:"text-indigo-600 border-indigo-200 hover:bg-indigo-50" },
  { icon:"📋", title:"Interview Pipeline Slow",     sub:"5 feedbacks pending > 3 days",      action:"Take Action",    aC:"text-indigo-600 border-indigo-200 hover:bg-indigo-50" },
];

const quickActions = [
  { icon:<CheckCircle size={22} className="text-indigo-600"/>, label:"Approve Leave" },
  { icon:<CheckCircle size={22} className="text-indigo-600"/>, label:"Add Employee"  }, // Replaced UserPlus with CheckCircle for simplicity in this extraction, will fix if needed
  { icon:<CheckCircle size={22} className="text-indigo-600"/>, label:"Request Report"}, // Replaced FileText
  { icon:<CheckCircle size={22} className="text-indigo-600"/>, label:"Log Note"      }, // Replaced StickyNote
];

export default function ActionQueueView() {
  const [qTab, setQTab]           = useState("All (28)");
  const [todayOpen, setTodayOpen] = useState(true);
  const [weekOpen, setWeekOpen]   = useState(true);
  const [overOpen, setOverOpen]   = useState(false);
  const qTabs = ["All (28)","My Actions (24)","Automated (4)"];

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* Main */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 min-w-0">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900 tracking-tight">ACTION QUEUE (28)</h2>
              <Info size={14} className="text-gray-400 cursor-help"/>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Items that need your attention</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Queue sub-tabs */}
            <div className="flex border-b-2 border-transparent">
              {qTabs.map(t => (
                <button key={t} onClick={()=>setQTab(t)}
                  className={`px-4 py-1.5 text-xs font-semibold transition-colors border-b-2 -mb-px ${
                    qTab===t
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}>{t}</button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
                Sort by: Priority <ChevronDown size={11}/>
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
                <Filter size={11}/> Filters <ChevronDown size={11}/>
              </button>
            </div>
          </div>
        </div>

        {/* Priority cards */}
        <div className="grid grid-cols-5 gap-3">
          {priorities.map(p => (
            <div key={p.label} className={`${p.bg} border ${p.border} rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{p.icon}</span>
                <span className={`text-2xl font-bold ${p.color}`}>{p.count}</span>
              </div>
              <div className={`text-xs font-bold ${p.color}`}>{p.label}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">{p.sub}</div>
              {p.extra && (
                <button className="text-[10px] text-violet-600 font-semibold mt-1 hover:underline flex items-center gap-0.5">
                  Review Automation →
                </button>
              )}
            </div>
          ))}
        </div>

        {/* TODAY */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <button onClick={()=>setTodayOpen(!todayOpen)}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-gray-900">TODAY (6)</span>
              <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">3 Overdue</span>
            </div>
            {todayOpen ? <ChevronUp size={15} className="text-gray-400"/> : <ChevronDown size={15} className="text-gray-400"/>}
          </button>

          {todayOpen && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {["Action","Type","Who","Why / Trigger","Impact","Due","Status","Actions"].map(h => (
                        <th key={h} className="px-4 py-2.5 text-left text-[10px] text-gray-400 font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {todayItems.map((item, i) => (
                      <tr key={i}
                        className={`border-b border-gray-50 last:border-b-0 transition-colors ${
                          item.overdue ? "bg-red-50/40 hover:bg-red-50/60" : "hover:bg-gray-50"
                        }`}>
                        {/* Action */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm flex-shrink-0">{item.icon}</span>
                            <div>
                              <div className={`text-xs font-semibold whitespace-nowrap ${item.overdue?"text-red-700":"text-gray-800"}`}>
                                {item.title}
                              </div>
                              <div className="text-[10px] text-gray-400 mt-0.5">{item.sub}</div>
                            </div>
                          </div>
                        </td>
                        {/* Type */}
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${item.typeC}`}>
                            {item.type}
                          </span>
                        </td>
                        {/* Who */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                              style={{backgroundColor:item.avatarBg}}>
                              {item.initials}
                            </div>
                            <div>
                              <div className="text-[11px] font-semibold text-gray-800 whitespace-nowrap">{item.who}</div>
                              <div className="text-[9px] text-gray-400">{item.emp}</div>
                            </div>
                          </div>
                        </td>
                        {/* Why */}
                        <td className="px-4 py-3 max-w-[160px]">
                          <div className="text-[10px] text-gray-500 leading-relaxed">{item.why}</div>
                        </td>
                        {/* Impact */}
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${item.impC}`}>
                            {item.impact}
                          </span>
                        </td>
                        {/* Due */}
                        <td className="px-4 py-3">
                          <span className={`text-[10px] whitespace-nowrap ${item.dueC}`}>{item.due}</span>
                        </td>
                        {/* Status */}
                        <td className="px-4 py-3">
                          <span className="bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                            Pending
                          </span>
                        </td>
                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-green-400 hover:text-green-500 hover:bg-green-50 transition-colors">
                              <CheckCircle size={13}/>
                            </button>
                            <button className="w-5 h-5 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors">
                              <MoreVertical size={13}/>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-2.5 border-t border-gray-50">
                <button className="text-[11px] text-indigo-600 font-semibold hover:underline">View all 6 items</button>
              </div>
            </>
          )}
        </div>

        {/* THIS WEEK */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <button onClick={()=>setWeekOpen(!weekOpen)}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
            <span className="text-sm font-bold text-gray-900">THIS WEEK (10)</span>
            {weekOpen ? <ChevronUp size={15} className="text-gray-400"/> : <ChevronDown size={15} className="text-gray-400"/>}
          </button>
          {weekOpen && (
            <div className="px-5 pb-4 grid grid-cols-4 gap-3 border-t border-gray-100">
              {[
                { icon:"📦", label:"Approvals",   count:4,  bg:"bg-blue-50",   tc:"text-blue-700",   bc:"border-blue-200"   },
                { icon:"📝", label:"Corrections", count:3,  bg:"bg-orange-50", tc:"text-orange-700", bc:"border-orange-200" },
                { icon:"⚡", label:"Decisions",   count:2,  bg:"bg-amber-50",  tc:"text-amber-700",  bc:"border-amber-200"  },
                { icon:"🔔", label:"Follow-ups",  count:1,  bg:"bg-green-50",  tc:"text-green-700",  bc:"border-green-200"  },
              ].map(w => (
                <div key={w.label} className={`${w.bg} border ${w.bc} rounded-xl p-3 flex items-center justify-between mt-3`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{w.icon}</span>
                    <span className={`text-xs font-semibold ${w.tc}`}>{w.label}</span>
                  </div>
                  <span className={`text-lg font-bold ${w.tc}`}>{w.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* OVERDUE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <button onClick={()=>setOverOpen(!overOpen)}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">OVERDUE (12)</span>
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
            </div>
            {overOpen ? <ChevronUp size={15} className="text-gray-400"/> : <ChevronDown size={15} className="text-gray-400"/>}
          </button>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 pb-2 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"/>
              <span className="font-medium text-gray-500">System Status</span>
              <span>All systems operational</span>
            </div>
            <span>Last Sync: 10:15 AM, 21 May 2025</span>
            <span>Timezone: IST</span>
          </div>
          <button className="flex items-center gap-1 text-indigo-600 font-semibold hover:underline transition-colors">
            <RefreshCw size={11}/> Refresh
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-72 flex-shrink-0 bg-white border-l border-gray-200 flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Automation Center */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bot size={14} className="text-indigo-500"/>
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Automation Center</span>
              </div>
              <button className="text-[10px] font-semibold text-indigo-600 hover:underline">View all</button>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3.5 mb-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-gray-800 leading-snug">
                    12 actions can be auto-resolved
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Save 3h 45m of manual work</div>
                </div>
                <button className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                  Review All
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {autoItems.map((a,i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${a.dot}`}/>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-gray-700">{a.label}</div>
                      <div className="text-[9px] text-gray-400 leading-relaxed">{a.sub}</div>
                    </div>
                  </div>
                  <button className="text-[10px] font-semibold text-indigo-600 hover:underline flex-shrink-0 border border-indigo-200 px-2 py-0.5 rounded-md hover:bg-indigo-50 transition-colors">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Insights */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={13} className="text-indigo-500"/>
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Insights for You</span>
            </div>
            <div className="space-y-2">
              {insights.map((ins,i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                  <span className="text-base flex-shrink-0">{ins.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-gray-700">{ins.title}</div>
                    <div className="text-[9px] text-gray-400 mt-0.5">{ins.sub}</div>
                  </div>
                  <button className={`text-[9px] font-semibold border rounded-md px-2 py-1 whitespace-nowrap flex-shrink-0 transition-colors ${ins.aC}`}>
                    {ins.action}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <div className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Quick Actions</div>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((qa,i) => (
                <button key={i}
                  className="flex flex-col items-center gap-2 p-3 bg-gray-50 border border-gray-100 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-colors group">
                  <div className="group-hover:scale-110 transition-transform">{qa.icon}</div>
                  <span className="text-[10px] font-semibold text-gray-600 group-hover:text-indigo-700 text-center leading-tight transition-colors">
                    {qa.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
