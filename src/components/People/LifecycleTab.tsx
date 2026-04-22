import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { ChevronDown, Filter, X, Download, Mail, Phone } from "lucide-react";

/* ─── Lifecycle Trend ─── */
const trendData = [
  { month: "Jan", active: 800, onboarding: 30, exits: 10 },
  { month: "Feb", active: 870, onboarding: 35, exits: 12 },
  { month: "Mar", active: 930, onboarding: 40, exits: 14 },
  { month: "Apr", active: 990, onboarding: 45, exits: 15 },
  { month: "May", active: 1060, onboarding: 50, exits: 18 },
  { month: "Jun", active: 1103, onboarding: 37, exits: 24 },
];

/* ─── Overview donut ─── */
const overviewData = [
  { name: "Attract",  value: 128,  pct: "10%",   color: "#818cf8" },
  { name: "Hire",     value: 18,   pct: "1%",    color: "#34d399" },
  { name: "Onboard",  value: 37,   pct: "3%",    color: "#fbbf24" },
  { name: "Engage",   value: 1105, pct: "88%",   color: "#60a5fa" },
  { name: "Develop",  value: 642,  pct: "51%",   color: "#c084fc" },
  { name: "Retain",   value: 1029, pct: "82%",   color: "#2dd4bf" },
  { name: "Exit",     value: 24,   pct: "1.9%",  color: "#f87171" },
];

/* ─── Pipeline stages ─── */
const stages = [
  { n: 1, label: "Attract",  emoji: "🎯", count: 128,  sub: "Candidates",       conv: "Conversion: 12%"        },
  { n: 2, label: "Hire",     emoji: "✅", count: 18,   sub: "New Hires",        conv: "Conversion: 65%"        },
  { n: 3, label: "Onboard",  emoji: "🚀", count: 37,   sub: "In Onboarding",    conv: "Conversion: 90%"        },
  { n: 4, label: "Engage",   emoji: "💬", count: 1105, sub: "Active Employees", conv: "Conversion: 95%"        },
  { n: 5, label: "Develop",  emoji: "📈", count: 642,  sub: "In Development",   conv: "Conversion: 88%"        },
  { n: 6, label: "Retain",   emoji: "🏆", count: 1029, sub: "Retained",         conv: "Retention Rate: 92%"    },
  { n: 7, label: "Exit",     emoji: "🚪", count: 24,   sub: "Exits (YTD)",      conv: "Exit Rate: 1.9%"        },
];

/* ─── Dept table ─── */
const deptData = [
  { dept: "Engineering",     emp: 312, attract: 48, hire: 8, onboard: 15, engage: 450, develop: 280, retain: 470, exit: 10, conv: 68 },
  { dept: "Product",         emp: 198, attract: 22, hire: 3, onboard: 7,  engage: 175, develop: 150, retain: 165, exit: 3,  conv: 65 },
  { dept: "Design",          emp: 76,  attract: 8,  hire: 1, onboard: 3,  engage: 68,  develop: 45,  retain: 66,  exit: 1,  conv: 58 },
  { dept: "Sales & Marketing",emp:142, attract: 18, hire: 4, onboard: 5,  engage: 130, develop: 70,  retain: 160, exit: 4,  conv: 55 },
  { dept: "Finance",         emp: 82,  attract: 6,  hire: 1, onboard: 2,  engage: 78,  develop: 40,  retain: 75,  exit: 0,  conv: 64 },
];

/* ─── Journey steps ─── */
const journeySteps = [
  { label: "Attract",                icon: "🎯", color: "#818cf8", detail: "Sourced by Ananya Singh",             date: "15 Apr 2024" },
  { label: "Hire",                   icon: "✅", color: "#34d399", detail: "Joined as Backend Developer",          date: "07 May 2024" },
  { label: "Onboard",                icon: "🚀", color: "#fbbf24", detail: "Completed onboarding",                 date: "20 May 2024" },
  { label: "Engage",                 icon: "💬", color: "#60a5fa", detail: "Regular employee",                     date: "21 May 2024 – Present" },
  { label: "Develop",                icon: "📈", color: "#c084fc", detail: "Completed 3 trainings\nLast: 10 May 2025", date: "" },
  { label: "Retain",                 icon: "🏆", color: "#2dd4bf", detail: "High performer\nRetention Risk: Low",  date: "" },
  { label: "Exit (Future Prediction)",icon:"🚪", color: "#94a3b8", detail: "Not predicted to exit in next 90 days\nRisk Score: 5%", date: "" },
];

function ConvBar({ pct }: { pct: number }) {
  const color = pct >= 65 ? "#22c55e" : pct >= 55 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] text-gray-500 w-6 text-right">{pct}%</span>
    </div>
  );
}

export function LifecycleTab() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [panelTab, setPanelTab] = useState("Lifecycle Journey");
  const panelTabs = ["Lifecycle Journey", "Timeline", "Documents", "Notes"];

  return (
    <div className="flex gap-4 w-full min-h-0">
      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 space-y-4">

        {/* ── Employee Lifecycle Pipeline ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-gray-800">Employee Lifecycle Pipeline</span>
              <span className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 text-[9px] flex items-center justify-center cursor-help">?</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 bg-white shadow-sm">
                This Month <ChevronDown size={11} />
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 bg-white shadow-sm">
                <Filter size={11} /> Filters
              </button>
            </div>
          </div>

          {/* Stage boxes */}
          <div className="grid grid-cols-7 gap-1.5">
            {stages.map((s, i) => (
              <div key={s.label} className="relative">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-center hover:border-blue-200 hover:bg-blue-50/30 transition-colors cursor-pointer">
                  <div className="text-[9px] text-gray-400 font-semibold mb-1.5 whitespace-nowrap">
                    {s.n}. {s.label}
                  </div>
                  <div className="text-xl mb-0.5">{s.emoji}</div>
                  <div className="text-base font-bold text-gray-800 leading-tight">{s.count.toLocaleString()}</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">{s.sub}</div>
                  <div className="text-[8px] text-blue-500 mt-1 font-medium leading-tight">{s.conv}</div>
                </div>
                {i < stages.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-10 text-gray-300 text-xs px-0.5">›</div>
                )}
              </div>
            ))}
          </div>

          {/* Conversion bar */}
          <div className="mt-3 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden flex">
                {overviewData.map((d, i) => (
                  <div key={i} className="h-full first:rounded-l-full last:rounded-r-full"
                    style={{ width: `${i === 3 ? 35 : i === 4 ? 20 : i === 5 ? 28 : i === 0 ? 6 : i === 1 ? 1 : i === 2 ? 2 : 8}%`, backgroundColor: d.color }} />
                ))}
              </div>
              <span className="text-[10px] text-gray-500 whitespace-nowrap">
                Overall Lifecycle Conversion Rate:{" "}
                <span className="font-semibold text-gray-700">61%</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Charts row ── */}
        <div className="grid grid-cols-2 gap-4">
          {/* Lifecycle Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-sm font-semibold text-gray-800">Lifecycle Overview</span>
              <span className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 text-[9px] flex items-center justify-center cursor-help">?</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0" style={{ width: 130, height: 130 }}>
                <ResponsiveContainer width={130} height={130}>
                  <PieChart>
                    <Pie
                      data={overviewData}
                      cx="50%" cy="50%"
                      innerRadius={40} outerRadius={60}
                      startAngle={90} endAngle={-270}
                      dataKey="value" strokeWidth={2} stroke="#fff"
                    >
                      {overviewData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-base font-bold text-gray-800">1,248</span>
                  <span className="text-[9px] text-gray-500">Employees</span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {overviewData.map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-[11px] text-gray-600">{d.name}</span>
                    </div>
                    <span className="text-[11px] text-gray-700 font-medium">
                      {d.value.toLocaleString()} ({d.pct})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lifecycle Trend */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-800">Lifecycle Trend</span>
              <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2 py-1 hover:bg-gray-50 bg-white shadow-sm">
                vs Last Month <ChevronDown size={11} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={145}>
              <LineChart data={trendData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 10, borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  wrapperStyle={{ zIndex: 1000 }}
                  allowEscapeViewBox={{ x: true, y: true }}
                />
                <Line type="monotone" dataKey="active"     stroke="#60a5fa" strokeWidth={2} dot={{ r: 3, fill: "#60a5fa" }} name="Active Employees" />
                <Line type="monotone" dataKey="onboarding" stroke="#34d399" strokeWidth={2} dot={{ r: 3, fill: "#34d399" }} name="New Hires" />
                <Line type="monotone" dataKey="exits"      stroke="#f87171" strokeWidth={2} dot={{ r: 3, fill: "#f87171" }} name="Exits" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-1.5">
              {[
                { label: "Active Employees", color: "#60a5fa" },
                { label: "New Hires",        color: "#34d399" },
                { label: "Exits",            color: "#f87171" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <span className="w-5 h-0.5 rounded-full inline-block" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Lifecycle by Department ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-sm font-semibold text-gray-800">Lifecycle by Department</span>
            <span className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 text-[9px] flex items-center justify-center cursor-help">?</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Department", "Employees",
                    "🎯 Attract", "✅ Hire", "🚀 Onboard",
                    "💬 Engage", "📈 Develop", "🏆 Retain", "🚪 Exit",
                    "Conversion Rate",
                  ].map(h => (
                    <th key={h} className="pb-2 text-left text-[10px] text-gray-400 font-semibold pr-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deptData.map((d, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="py-2.5 pr-3 text-[11px] font-semibold text-gray-700 whitespace-nowrap">{d.dept}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-gray-600">{d.emp}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-gray-600">{d.attract}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-gray-600">{d.hire}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-gray-600">{d.onboard}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-gray-600">{d.engage}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-gray-600">{d.develop}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-gray-600">{d.retain}</td>
                    <td className="py-2.5 pr-3 text-[11px] text-gray-600">{d.exit}</td>
                    <td className="py-2.5 w-28"><ConvBar pct={d.conv} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">Showing 1 to 5 of 8 departments</span>
            <div className="flex items-center gap-1">
              {["←", 1, 2, "→"].map((p, i) => (
                <button key={i}
                  className={`w-6 h-6 text-[10px] rounded flex items-center justify-center transition-colors ${
                    p === 1 ? "bg-blue-600 text-white font-bold" : "text-gray-400 border border-gray-200 hover:bg-gray-100"
                  }`}
                >{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      {panelOpen && (
        <div className="w-64 flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden self-start sticky top-0">
          {/* Profile */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  RS
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm leading-tight">Rahul Sharma</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">Backend Developer · Engineering</div>
                  <div className="text-[9px] text-gray-400">Employee ID: EMP1256</div>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="bg-green-100 text-green-700 text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-green-500 inline-block" /> Active
                </span>
                <button onClick={() => setPanelOpen(false)} className="text-gray-300 hover:text-gray-500 transition-colors ml-0.5">
                  <X size={13} />
                </button>
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[9px] text-gray-500">
                <Mail size={9} /> rahul.sharma@techull.com
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-gray-500">
                <Phone size={9} /> +91 99753 43210
              </div>
            </div>
          </div>

          {/* Panel tabs */}
          <div className="flex border-b border-gray-100 overflow-x-auto flex-shrink-0">
            {panelTabs.map(t => (
              <button key={t} onClick={() => setPanelTab(t)}
                className={`px-2 py-2 text-[9px] font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  panelTab === t
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >{t}</button>
            ))}
          </div>

          {/* Journey */}
          <div className="overflow-y-auto p-4 space-y-0 max-h-80">
            {journeySteps.map((step, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs"
                    style={{ borderColor: step.color, backgroundColor: `${step.color}18` }}
                  >{step.icon}</div>
                  {i < journeySteps.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-3 my-0.5" style={{ backgroundColor: `${step.color}30` }} />
                  )}
                </div>
                <div className="pb-3 min-w-0">
                  <div className="text-[11px] font-bold text-gray-700 leading-tight">{step.label}</div>
                  <div className="text-[9px] text-gray-500 mt-0.5 whitespace-pre-line leading-relaxed">{step.detail}</div>
                  {step.date && <div className="text-[9px] text-gray-400 mt-0.5">{step.date}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Lifecycle Summary */}
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <div className="text-[10px] font-bold text-gray-700 mb-2">Lifecycle Summary</div>
            <div className="grid grid-cols-3 gap-1 text-[9px] mb-3">
              <div>
                <div className="text-gray-400 leading-tight">Total Tenure</div>
                <div className="font-semibold text-gray-700 mt-0.5">1.1 Years</div>
              </div>
              <div>
                <div className="text-gray-400 leading-tight">Current Stage</div>
                <div className="font-semibold text-blue-600 mt-0.5">Engage</div>
              </div>
              <div>
                <div className="text-gray-400 leading-tight">Next Milestone</div>
                <div className="font-semibold text-gray-700 mt-0.5 leading-tight">Leadership Program</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-semibold py-2 rounded-lg transition-colors">
                View Full Profile
              </button>
              <button className="flex-1 border border-blue-500 text-blue-600 hover:bg-blue-50 text-[9px] font-semibold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors">
                <Download size={9} /> Download Journey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
