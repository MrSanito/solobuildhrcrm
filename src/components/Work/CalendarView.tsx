import React, { useState } from "react";
import {
  ChevronLeft, ChevronRight, ChevronDown, Filter, X, Calendar,
} from "lucide-react";
import { calData, weeks, presentEmployees, allocations, leaveEmployees } from "./data";

export default function CalendarView() {
  const [selected, setSelected] = useState("d21");
  const [calView, setCalView]   = useState("Month");
  const [sideOpen, setSideOpen] = useState(true);
  const today = "d21";

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden p-5 gap-4">
        {/* Nav bar */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
              Today
            </button>
            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 border-r border-gray-200 transition-colors">
                <ChevronLeft size={14} className="text-gray-500" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronRight size={14} className="text-gray-500" />
              </button>
            </div>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
              May 2025 <ChevronDown size={14} className="text-gray-400"/>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {["Month","Week","List"].map(v => (
                <button key={v} onClick={()=>setCalView(v)}
                  className={`px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    calView===v ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}>{v}</button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
              <Filter size={12}/> Filters
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50 flex-shrink-0">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} className="py-2.5 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                {d}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className="flex-1 overflow-auto">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 border-b border-gray-100 last:border-b-0" style={{minHeight:90}}>
                {week.map(({ key, label, ghost }) => {
                  const data = calData[key] || {};
                  const isSelected = key === selected;
                  const isToday    = key === today;
                  return (
                    <div key={key}
                      onClick={() => !ghost && setSelected(key)}
                      className={`p-2 border-r border-gray-100 last:border-r-0 transition-colors ${
                        ghost   ? "bg-gray-50/50 cursor-default" :
                        isSelected ? "bg-indigo-50 ring-2 ring-inset ring-indigo-400 cursor-pointer" :
                        "hover:bg-gray-50 cursor-pointer"
                      }`}
                    >
                      <div className={`text-xs font-semibold mb-1.5 w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                        isToday
                          ? "bg-indigo-600 text-white"
                          : ghost ? "text-gray-300" : "text-gray-700"
                      }`}>{label}</div>

                      <div className="space-y-0.5">
                        {data.present && (
                          <div className="flex items-center gap-1 text-[10px] font-medium text-green-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"/>
                            {data.present} Present
                          </div>
                        )}
                        {data.leaves && (
                          <div className="flex items-center gap-1 text-[10px] font-medium text-amber-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"/>
                            {data.leaves} Leave{data.leaves>1?"s":""}
                          </div>
                        )}
                        {data.allocations && (
                          <div className="flex items-center gap-1 text-[10px] font-medium text-blue-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"/>
                            {data.allocations} Allocation{data.allocations>1?"s":""}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {sideOpen && (
        <div className="w-72 flex-shrink-0 bg-white border-l border-gray-200 flex flex-col overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
            <span className="text-sm font-bold text-gray-800">Wednesday, 21 May 2025</span>
            <button onClick={()=>setSideOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={14}/>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Present */}
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center text-xs">✅</div>
                  <span className="text-[11px] font-bold text-gray-700 tracking-wide uppercase">Present (19)</span>
                </div>
                <button className="text-[10px] font-semibold text-indigo-600 hover:underline">View all</button>
              </div>
              <div className="space-y-2.5">
                {presentEmployees.map((p,i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{backgroundColor:p.bg}}>
                      {p.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-gray-800 truncate">{p.name}</div>
                      <div className="text-[9px] text-gray-400 truncate">{p.role}</div>
                    </div>
                    <div className="text-[9px] text-gray-500 whitespace-nowrap">{p.time}</div>
                  </div>
                ))}
                <button className="text-[10px] font-semibold text-indigo-600 hover:underline">+14 more</button>
              </div>
            </section>

            {/* Allocation */}
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-xs">📊</div>
                  <span className="text-[11px] font-bold text-gray-700 tracking-wide uppercase">Allocation (6)</span>
                </div>
                <button className="text-[10px] font-semibold text-indigo-600 hover:underline">View all</button>
              </div>
              <div className="space-y-2">
                {allocations.map((a,i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                      style={{backgroundColor:a.bg}}>
                      {a.name.split(" ").map(w=>w[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-gray-800 truncate">{a.name}</div>
                      <div className="text-[9px] text-gray-400 truncate">{a.project}</div>
                    </div>
                    <span className={`text-[10px] font-bold whitespace-nowrap ${a.pct>100?"text-red-500":"text-gray-700"}`}>
                      {a.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Leaves */}
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-amber-100 rounded flex items-center justify-center text-xs">🏖️</div>
                  <span className="text-[11px] font-bold text-gray-700 tracking-wide uppercase">Leaves (2)</span>
                </div>
                <button className="text-[10px] font-semibold text-indigo-600 hover:underline">View all</button>
              </div>
              <div className="space-y-2.5">
                {leaveEmployees.map((l,i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{backgroundColor:l.bg}}>
                      {l.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-gray-800 truncate">{l.name}</div>
                      <div className="text-[9px] text-gray-400">{l.type} · {l.sub}</div>
                    </div>
                    <span className="bg-amber-100 text-amber-700 text-[9px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                      {l.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="p-3 border-t border-gray-100 flex-shrink-0">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-indigo-200 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-50 transition-colors">
              <Calendar size={13}/> View Full Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
