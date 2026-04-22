"use client";
import React, { useState } from "react";
import {
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Search, Bell, Filter, X, Calendar, RefreshCw,
  MoreVertical, CheckCircle, Bot, TrendingUp, Users,
  FileText, StickyNote, UserPlus, AlertTriangle, Info,
} from "lucide-react";

/* ══════════════════════════════════════
   SHARED TYPES
══════════════════════════════════════ */
type ViewTab = "Calendar" | "Action Queue";

/* ══════════════════════════════════════
   CALENDAR DATA
══════════════════════════════════════ */
interface DayData { present?: number; leaves?: number; allocations?: number; }

const calData: Record<string, DayData> = {
  w27:{ present:12 }, w28:{ present:18 }, w29:{ present:17, leaves:1 }, w30:{ present:19 }, d1:{ present:20 },
  d4:{ allocations:4 }, d5:{ present:16, leaves:1, allocations:7 }, d6:{ present:18, allocations:2 },
  d7:{ present:19, leaves:2, allocations:6 }, d8:{ present:17 }, d9:{ present:20, allocations:3 },
  d11:{}, d12:{ present:18, leaves:3 }, d13:{ present:18, allocations:5 }, d14:{ present:20, allocations:6 },
  d15:{ present:19 }, d16:{ present:18, leaves:1 },
  d18:{}, d19:{ present:17, allocations:4 }, d20:{ present:18, leaves:2 },
  d21:{ present:19, allocations:6, leaves:2 },
  d22:{ present:20, allocations:7 }, d23:{ present:19 },
  d25:{ present:18, allocations:5 }, d26:{ present:17 }, e28:{ present:18, leaves:1 },
  e29:{ present:19 }, e30:{ present:20, allocations:6 },
};

const weeks: { key: string; label: string; ghost?: boolean }[][] = [
  [
    { key:"w27", label:"27", ghost:true }, { key:"w28", label:"28", ghost:true },
    { key:"w29", label:"29", ghost:true }, { key:"w30", label:"30", ghost:true },
    { key:"d1",  label:"1"  }, { key:"d2",  label:"2"  }, { key:"d3",  label:"3"  },
  ],
  [
    { key:"d4",  label:"4"  }, { key:"d5",  label:"5"  }, { key:"d6",  label:"6"  },
    { key:"d7",  label:"7"  }, { key:"d8",  label:"8"  }, { key:"d9",  label:"9"  }, { key:"d10", label:"10" },
  ],
  [
    { key:"d11", label:"11" }, { key:"d12", label:"12" }, { key:"d13", label:"13" },
    { key:"d14", label:"14" }, { key:"d15", label:"15" }, { key:"d16", label:"16" }, { key:"d17", label:"17" },
  ],
  [
    { key:"d18", label:"18" }, { key:"d19", label:"19" }, { key:"d20", label:"20" },
    { key:"d21", label:"21" }, { key:"d22", label:"22" }, { key:"d23", label:"23" }, { key:"d24", label:"24" },
  ],
  [
    { key:"d25", label:"25" }, { key:"d26", label:"26" }, { key:"d27", label:"27" },
    { key:"e28", label:"28", ghost:true }, { key:"e29", label:"29", ghost:true },
    { key:"e30", label:"30", ghost:true }, { key:"e31", label:"31", ghost:true },
  ],
];

const presentEmployees = [
  { name:"Rahul Sharma",  role:"Backend Developer",   time:"In: 09:01 AM", initials:"RS", bg:"#6366f1" },
  { name:"Sneha Iyer",    role:"UI/UX Designer",       time:"In: 09:05 AM", initials:"SI", bg:"#ec4899" },
  { name:"Vikram Rao",    role:"DevOps Engineer",      time:"In: 09:10 AM", initials:"VR", bg:"#14b8a6" },
  { name:"Neha Patel",    role:"Product Manager",      time:"In: 09:15 AM", initials:"NP", bg:"#8b5cf6" },
  { name:"Arjun Mehta",   role:"Data Analyst",         time:"In: 09:22 AM", initials:"AM", bg:"#f59e0b" },
];

const allocations = [
  { name:"Rahul Sharma",  project:"HRMS Implementation",      role:"Backend Developer",   pct:100, bg:"#6366f1" },
  { name:"Sneha Iyer",    project:"Mobile App Redesign",       role:"UI/UX Designer",      pct:80,  bg:"#ec4899" },
  { name:"Vikram Rao",    project:"Visual Migration",          role:"DevOps Engineer",     pct:110, bg:"#f59e0b" },
  { name:"Neha Patel",    project:"Product Launch",            role:"Product Manager",     pct:70,  bg:"#22c55e" },
  { name:"Arjun Mehta",   project:"Data Analytics Platform",   role:"Data Analyst",        pct:60,  bg:"#3b82f6" },
  { name:"Pooja Singh",   project:"QA Automation",             role:"QA Engineer",         pct:50,  bg:"#a855f7" },
];

const leaveEmployees = [
  { name:"Ananya Singh",  role:"",              type:"Casual Leave", sub:"Full Day",      initials:"AS", bg:"#22c55e", status:"Pending" },
  { name:"Harshit Singh", role:"QA Engineer",   type:"Sick Leave",   sub:"Half Day (PM)", initials:"HS", bg:"#f97316", status:"Pending" },
];

/* ══════════════════════════════════════
   ACTION QUEUE DATA
══════════════════════════════════════ */
const priorities = [
  { label:"Critical",      count:6,  sub:"Requires immediate action", color:"text-red-500",    bg:"bg-red-50",     icon:"🔴", border:"border-red-200",    extra:false },
  { label:"High Priority", count:10, sub:"Action needed this week",   color:"text-orange-500", bg:"bg-orange-50",  icon:"🟠", border:"border-orange-200", extra:false },
  { label:"Medium Priority",count:8, sub:"Important but not urgent",  color:"text-blue-500",   bg:"bg-blue-50",    icon:"🔵", border:"border-blue-200",   extra:false },
  { label:"Low Priority",  count:4,  sub:"For awareness",             color:"text-green-500",  bg:"bg-green-50",   icon:"🟢", border:"border-green-200",  extra:false },
  { label:"Automatable",   count:12, sub:"Can be auto-resolved",      color:"text-violet-500", bg:"bg-violet-50",  icon:"🤖", border:"border-violet-200", extra:true  },
];

const todayItems = [
  {
    icon:"🔴", title:"Approve Leave Request",    sub:"Casual Leave - 2 Days",
    type:"Approval",   typeC:"bg-green-100 text-green-700",
    who:"Ananya Singh",    emp:"EMP1487", initials:"AS", avatarBg:"#22c55e",
    why:"Leave request submitted 19 May 2025",
    impact:"High",   impC:"bg-red-100 text-red-600",
    due:"Today 10:00 AM", dueC:"text-red-500 font-semibold",
    overdue:false,
  },
  {
    icon:"🟠", title:"Attendance Anomaly",       sub:"Late entry without reason",
    type:"Correction", typeC:"bg-orange-100 text-orange-700",
    who:"Vikram Rao",      emp:"EMP1298", initials:"VR", avatarBg:"#14b8a6",
    why:"Late by 2h 15m · 3rd time this week",
    impact:"High",   impC:"bg-red-100 text-red-600",
    due:"Today 11:30 AM", dueC:"text-red-500 font-semibold",
    overdue:false,
  },
  {
    icon:"🟡", title:"Interview Feedback Pending",sub:"Product Manager Candidate",
    type:"Follow-up",  typeC:"bg-blue-100 text-blue-700",
    who:"Riya Sharma",     emp:"CAND7821", initials:"RY", avatarBg:"#f59e0b",
    why:"Feedback pending since 19 May",
    impact:"Medium", impC:"bg-yellow-100 text-yellow-700",
    due:"Today 03:00 PM", dueC:"text-red-500 font-semibold",
    overdue:false,
  },
  {
    icon:"🟡", title:"Expense Approval",         sub:"Travel Expense - Mumbai",
    type:"Approval",   typeC:"bg-green-100 text-green-700",
    who:"Arjun Mehta",     emp:"EMP1503", initials:"AM", avatarBg:"#3b82f6",
    why:"Expense submitted 18 May 2025",
    impact:"Medium", impC:"bg-yellow-100 text-yellow-700",
    due:"Today 05:00 PM", dueC:"text-red-500 font-semibold",
    overdue:false,
  },
  {
    icon:"🔵", title:"Document Verification",    sub:"PAN Card Expiring Soon",
    type:"Follow-up",  typeC:"bg-blue-100 text-blue-700",
    who:"Neha Patel",      emp:"EMP1503", initials:"NP", avatarBg:"#8b5cf6",
    why:"PAN expiring in 15 days (31 May 2025)",
    impact:"Low",    impC:"bg-green-100 text-green-700",
    due:"Today EOD",      dueC:"text-gray-600",
    overdue:false,
  },
  {
    icon:"🔴", title:"Payroll Discrepancy",      sub:"Overtime mismatch detected",
    type:"Correction", typeC:"bg-orange-100 text-orange-700",
    who:"Rahul Sharma",    emp:"EMP1256", initials:"RS", avatarBg:"#6366f1",
    why:"Overtime hours mismatch Apr 2025",
    impact:"High",   impC:"bg-red-100 text-red-600",
    due:"Overdue · Since 19 May", dueC:"text-red-600 font-bold",
    overdue:true,
  },
];

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
  { icon:<UserPlus    size={22} className="text-indigo-600"/>, label:"Add Employee"  },
  { icon:<FileText    size={22} className="text-indigo-600"/>, label:"Request Report"},
  { icon:<StickyNote  size={22} className="text-indigo-600"/>, label:"Log Note"      },
];

/* ══════════════════════════════════════
   CALENDAR VIEW
══════════════════════════════════════ */
function CalendarView() {
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

/* ══════════════════════════════════════
   ACTION QUEUE VIEW
══════════════════════════════════════ */
function ActionQueueView() {
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

/* ══════════════════════════════════════
   WORK PAGE (default export)
══════════════════════════════════════ */
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