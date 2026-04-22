"use client";

import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
  AreaChart, Area,
} from "recharts";
import {
  Sparkles, Filter, RefreshCw, Plus, Download, Eye, MoreVertical,
  ChevronRight, ChevronLeft, Users, TrendingUp, TrendingDown,
  FileText, Calendar, Star, Clock, BarChart2, Play, Edit3,
  IndianRupee, AlertCircle, CheckCircle2, Search,
} from "lucide-react";

/* ── Types ── */
type ReportCategory = "Workforce" | "Hiring" | "Attendance" | "Performance" | "Finance";

/* ── Mock Data ── */
const headcountTrend = [
  { date: "21 May", value: 1156 },
  { date: "28 May", value: 1172 },
  { date: "4 Jun", value: 1168 },
  { date: "11 Jun", value: 1196 },
  { date: "18 Jun", value: 1248 },
];

const attritionTrend = [
  { date: "21 May", rate: 10.5 },
  { date: "28 May", rate: 10.1 },
  { date: "4 Jun", rate: 9.8 },
  { date: "11 Jun", rate: 9.6 },
  { date: "18 Jun", rate: 9.3 },
  { date: "21 Jun", rate: 9.0 },
];

const deptData = [
  { name: "Engineering", value: 432, pct: "34.6%", color: "#6366f1" },
  { name: "Sales", value: 268, pct: "21.5%", color: "#f59e0b" },
  { name: "Operations", value: 214, pct: "17.1%", color: "#22c55e" },
  { name: "HR", value: 119, pct: "9.5%", color: "#3b82f6" },
  { name: "Finance", value: 84, pct: "6.7%", color: "#ec4899" },
  { name: "Others", value: 131, pct: "10.8%", color: "#94a3b8" },
];

const genderData = [
  { name: "Male", value: 762, pct: "62.2%", color: "#6366f1" },
  { name: "Female", value: 382, pct: "30.6%", color: "#ec4899" },
  { name: "Other", value: 104, pct: "8%", color: "#94a3b8" },
];

const reportsList = [
  { name: "Employee Summary Report", category: "Workforce", categoryColor: "bg-indigo-100 text-indigo-700", desc: "Overall employee summary and demographics", lastGenerated: "20 Jun 2025, 06:15 PM", by: "Priya Sharma", format: "PDF" },
  { name: "Attrition Analysis Report", category: "Workforce", categoryColor: "bg-indigo-100 text-indigo-700", desc: "Attrition rate and trend analysis", lastGenerated: "20 Jun 2025, 05:40 PM", by: "Anit Verma", format: "XLSX" },
  { name: "Hiring Funnel Report", category: "Hiring", categoryColor: "bg-green-100 text-green-700", desc: "Hiring pipeline and conversion analysis", lastGenerated: "20 Jun 2025, 04:20 PM", by: "Priya Sharma", format: "PDF" },
  { name: "Attendance Summary Report", category: "Attendance", categoryColor: "bg-orange-100 text-orange-700", desc: "Attendance %, leaves and overtime summary", lastGenerated: "19 Jun 2025, 03:10 PM", by: "System", format: "XLSX" },
  { name: "Performance Summary Report", category: "Performance", categoryColor: "bg-blue-100 text-blue-700", desc: "Performance ratings and distribution", lastGenerated: "18 Jun 2025, 06:33 PM", by: "Anit Verma", format: "PDF" },
  { name: "Payroll Summary Report", category: "Finance", categoryColor: "bg-amber-100 text-amber-700", desc: "Payroll summary and variance analysis", lastGenerated: "18 Jun 2025, 05:05 PM", by: "System", format: "XLSX" },
  { name: "Cost vs Output Report", category: "Finance", categoryColor: "bg-amber-100 text-amber-700", desc: "Cost efficiency and output analysis", lastGenerated: "17 Jun 2025, 04:50 PM", by: "Priya Sharma", format: "PDF" },
  { name: "Compliance Status Report", category: "Compliance", categoryColor: "bg-red-100 text-red-700", desc: "Compliance status and violation summary", lastGenerated: "17 Jun 2025, 04:00 PM", by: "Anit Verma", format: "PDF" },
];

const recentlyViewed = [
  { name: "Employee Summary Report", at: "20 Jun 2025, 06:15 PM", by: "Priya Sharma", icon: "👥" },
  { name: "Attrition Analysis Report", at: "20 Jun 2025, 05:40 PM", by: "Anit Verma", icon: "📉" },
  { name: "Payroll Summary Report", at: "18 Jun 2025, 05:05 PM", by: "System", icon: "💰" },
  { name: "Compliance Status Report", at: "17 Jun 2025, 04:00 PM", by: "Anit Verma", icon: "🛡️" },
];

const savedTemplates = [
  { name: "Monthly Headcount", tags: "Workforce" },
  { name: "Department Scorecard", tags: "Performance, Attendance" },
  { name: "Compliance Overview Template", tags: "Compliance" },
  { name: "Hiring, Workforce", tags: "Hiring, Workforce" },
];

const reportCategoriesData = [
  { name: "Workforce", value: 8, pct: "33%", color: "#6366f1" },
  { name: "Hiring", value: 3, pct: "13%", color: "#22c55e" },
  { name: "Attendance", value: 3, pct: "13%", color: "#f97316" },
  { name: "Performance", value: 3, pct: "13%", color: "#3b82f6" },
  { name: "Finance", value: 3, pct: "13%", color: "#f59e0b" },
  { name: "Compliance", value: 2, pct: "8%", color: "#ef4444" },
  { name: "Others", value: 2, pct: "8%", color: "#94a3b8" },
];

const generationTrend = [
  { month: "Jan 25", count: 12 },
  { month: "Feb 25", count: 18 },
  { month: "Mar 25", count: 21 },
  { month: "Apr 25", count: 19 },
  { month: "May 25", count: 34 },
];

const formatData = [
  { name: "PDF", value: 60, color: "#ef4444" },
  { name: "XLSX", value: 33, color: "#22c55e" },
  { name: "CSV", value: 7, color: "#6366f1" },
];

const scheduledReports = [
  { name: "Monthly Management Dashboard", schedule: "Monthly (1st of every month)", nextRun: "01 Jul 2025, 09:00 AM", recipients: 5, format: "PDF", status: "Active" },
  { name: "Attendance Summary Report", schedule: "Weekly (Every Monday)", nextRun: "23 Jun 2025, 09:00 AM", recipients: 3, format: "XLSX", status: "Active" },
  { name: "Payroll Summary Report", schedule: "Monthly (Last day of month)", nextRun: "30 Jun 2025, 06:00 PM", recipients: 4, format: "XLSX", status: "Active" },
  { name: "Compliance Status Report", schedule: "Monthly (1st of every month)", nextRun: "01 Jul 2025, 10:00 AM", recipients: 6, format: "PDF", status: "Active" },
];

const categoryTabs: { name: ReportCategory; icon: string; desc: string }[] = [
  { name: "Workforce", icon: "👥", desc: "Headcount, attrition, demographics" },
  { name: "Hiring", icon: "🎯", desc: "Hiring trend, source, time to hire" },
  { name: "Attendance", icon: "📅", desc: "Attendance %, leaves, overtime" },
  { name: "Performance", icon: "⭐", desc: "Ratings, distribution, trends" },
  { name: "Finance", icon: "💰", desc: "Payroll, expenses, cost analysis" },
];

/* ── helpers ── */
const COLORS_DEPT = deptData.map(d => d.color);

function FormatBadge({ format }: { format: string }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit ${format === "PDF" ? "bg-red-100 text-red-600" : format === "XLSX" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
      <FileText className="w-2.5 h-2.5" /> {format}
    </span>
  );
}

/* ── main ── */
export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState<ReportCategory>("Workforce");
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <h1 className="text-base font-bold text-gray-900">Reports</h1>
          </div>
          <p className="text-[11px] text-gray-400">Generate insights and analyze HR data with dynamic reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" /> 21 May – 21 Jun 2025
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
            <Plus className="w-3.5 h-3.5" /> Custom Report
          </button>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-4">
        {/* ── AI Prompt Bar ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <input
            className="flex-1 text-xs text-gray-600 bg-transparent outline-none placeholder-gray-400"
            placeholder='What would you like to analyze today? Examples: "Attrition last quarter, Monthly hiring trend, Department wise salary cost"'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 whitespace-nowrap">
            <Sparkles className="w-3 h-3" /> Generate Report
          </button>
        </div>

        {/* ── Category Tabs ── */}
        <div className="grid grid-cols-5 gap-3">
          {categoryTabs.map((c) => (
            <button
              key={c.name}
              onClick={() => setActiveCategory(c.name)}
              className={`p-3 rounded-xl border text-left transition ${activeCategory === c.name ? "border-indigo-300 bg-indigo-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{c.icon}</span>
                <span className={`text-xs font-bold ${activeCategory === c.name ? "text-indigo-700" : "text-gray-800"}`}>{c.name}</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">{c.desc}</p>
            </button>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex items-center gap-3 flex-wrap">
          {[
            { label: "Date Range", value: "21 May – 21 Jun 2025", icon: Calendar },
            { label: "Department", value: "All" },
            { label: "Location", value: "All" },
            { label: "Job Res", value: "All" },
            { label: "Employment Type", value: "All" },
          ].map((f, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <label className="text-[10px] text-gray-400 font-medium">{f.label}</label>
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 bg-white min-w-[100px] cursor-pointer hover:bg-gray-50">
                {f.icon && <f.icon className="w-3 h-3 text-indigo-400 shrink-0" />}
                <span>{f.value}</span>
                <ChevronRight className="w-3 h-3 text-gray-400 rotate-90 ml-auto" />
              </div>
            </div>
          ))}
          <div className="ml-auto mt-3">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
              <Filter className="w-3 h-3" /> Apply Filters
            </button>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-6 gap-3">
          {[
            { label: "Total Employees", value: "1,248", change: "▲ 2.4% vs last period", up: true, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "New Hires", value: "48", change: "▲ 12.5% vs last period", up: true, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
            { label: "Attrition Rate", value: "9.3%", change: "▼ 1.2% vs last period", up: false, icon: TrendingDown, color: "text-red-600", bg: "bg-red-50" },
            { label: "Avg. Tenure", value: "3.6 Yrs", change: "▲ 0.3 yrs vs last period", up: true, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Total Payroll (INR)", value: "₹1,24,58,760", change: "▲ 4.38% vs last period", up: false, icon: IndianRupee, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Cost per Employee", value: "₹99,962", change: "▲ 3.21% vs last period", up: false, icon: BarChart2, color: "text-teal-600", bg: "bg-teal-50" },
          ].map((k, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-medium leading-tight">{k.label}</span>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${k.bg}`}><k.icon className={`w-3.5 h-3.5 ${k.color}`} /></div>
              </div>
              <div className="text-base font-black text-gray-900 leading-tight">{k.value}</div>
              <div className={`text-[10px] flex items-center gap-1 ${k.up ? "text-green-600" : "text-red-500"}`}>
                {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {k.change}
              </div>
            </div>
          ))}
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-4 gap-3">
          {/* Headcount Trend */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-xs font-bold text-gray-800">Headcount Trend</p>
                <p className="text-[10px] text-gray-400">Total Employees</p>
              </div>
              <button className="text-[11px] text-indigo-600 hover:underline">View Details</button>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={headcountTrend}>
                <defs>
                  <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                <YAxis domain={[1100, 1300]} tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="url(#hcGrad)" dot={{ r: 2, fill: "#6366f1" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Attrition Trend */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-xs font-bold text-gray-800">Attrition Trend (%)</p>
                <p className="text-[10px] text-gray-400">Attrition Rate</p>
              </div>
              <button className="text-[11px] text-indigo-600 hover:underline">View Details</button>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={attritionTrend}>
                <XAxis dataKey="date" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                <YAxis domain={[8, 12]} tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 10 }} formatter={(v: any) => [`${v}%`]} />
                <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2} dot={{ r: 2, fill: "#22c55e" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Department Wise Headcount */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold text-gray-800">Department Wise Headcount</p>
              <button className="text-[11px] text-indigo-600 hover:underline">View Details</button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <PieChart width={90} height={90}>
                  <Pie data={deptData} cx={40} cy={40} innerRadius={26} outerRadius={42} dataKey="value" strokeWidth={1}>
                    {deptData.map((_, i) => <Cell key={i} fill={COLORS_DEPT[i]} />)}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-gray-400">Total</span>
                  <span className="text-sm font-black text-gray-800">1,248</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                {deptData.slice(0, 4).map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[9px] text-gray-600 flex-1 truncate">{d.name}</span>
                    <span className="text-[9px] font-semibold text-gray-700">{d.value}</span>
                    <span className="text-[9px] text-gray-400">({d.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gender Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold text-gray-800">Gender Breakdown</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <PieChart width={90} height={90}>
                  <Pie data={genderData} cx={40} cy={40} innerRadius={26} outerRadius={42} dataKey="value" strokeWidth={1}>
                    {genderData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-black text-gray-800">1,248</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {genderData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[9px] text-gray-600 flex-1">{d.name}</span>
                    <span className="text-[9px] font-bold text-gray-700">{d.value}</span>
                    <span className="text-[9px] text-gray-400">({d.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Reports List + Recently Viewed ── */}
        <div className="grid grid-cols-3 gap-3">
          {/* Reports List */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800">Reports List</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
                  <input placeholder="Search reports..." className="pl-6 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg w-36 focus:outline-none" />
                </div>
                <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
              </div>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                    <th className="text-left px-3 py-2">Report Name</th>
                    <th className="text-left px-3 py-2">Category</th>
                    <th className="text-left px-3 py-2">Description</th>
                    <th className="text-left px-3 py-2">Last Generated</th>
                    <th className="text-left px-3 py-2">Generated By</th>
                    <th className="text-left px-3 py-2">Format</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsList.map((r, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer">
                      <td className="px-3 py-2.5 font-semibold text-gray-800 text-[11px] whitespace-nowrap">{r.name}</td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.categoryColor}`}>{r.category}</span>
                      </td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-500 max-w-[140px] truncate">{r.desc}</td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-500 whitespace-nowrap">{r.lastGenerated}</td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-600 font-medium">{r.by}</td>
                      <td className="px-3 py-2.5"><FormatBadge format={r.format} /></td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <button className="p-1 rounded hover:bg-gray-200"><Eye className="w-3.5 h-3.5 text-gray-400" /></button>
                          <button className="p-1 rounded hover:bg-gray-200"><Download className="w-3.5 h-3.5 text-gray-400" /></button>
                          <button className="p-1 rounded hover:bg-gray-200"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Showing 1 to 8 of 24 reports</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded border border-gray-200"><ChevronLeft className="w-3 h-3" /></button>
                {[1,2,3].map(n=><button key={n} className={`px-2 py-0.5 rounded border text-[10px] ${n===1?"bg-indigo-600 text-white border-indigo-600":"border-gray-200"}`}>{n}</button>)}
                <button className="p-1 rounded border border-gray-200"><ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
          </div>

          {/* Recently Viewed + Saved Templates */}
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-800">Recently Viewed Reports</h3>
                <button className="text-[11px] text-indigo-600 hover:underline">View All</button>
              </div>
              <div className="flex flex-col divide-y divide-gray-50">
                {recentlyViewed.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition cursor-pointer">
                    <span className="text-lg">{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-gray-800 truncate">{r.name}</p>
                      <p className="text-[10px] text-gray-400">{r.at} • {r.by}</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-800">Saved Templates</h3>
                <button className="text-[11px] text-indigo-600 hover:underline">View All</button>
              </div>
              <div className="flex flex-col divide-y divide-gray-50">
                {savedTemplates.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition cursor-pointer">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-gray-800 truncate">{t.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{t.tags}</p>
                    </div>
                    <MoreVertical className="w-3 h-3 text-gray-300 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Report Categories + Generation Trend + Format + Stats ── */}
        <div className="grid grid-cols-4 gap-3">
          {/* Report Categories Donut */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-800 mb-3">Report Categories</p>
            <div className="flex flex-col items-center">
              <div className="relative">
                <PieChart width={110} height={110}>
                  <Pie data={reportCategoriesData} cx={50} cy={50} innerRadius={30} outerRadius={52} dataKey="value" strokeWidth={1.5}>
                    {reportCategoriesData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[9px] text-gray-400">Total</span>
                  <span className="text-base font-black text-gray-800">24</span>
                  <span className="text-[9px] text-gray-400">Reports</span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 mt-2">
                {reportCategoriesData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[10px] text-gray-600 flex-1">{d.name}</span>
                    <span className="text-[10px] font-bold text-gray-700">{d.value}</span>
                    <span className="text-[10px] text-gray-400">({d.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generation Trend */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-800">Report Generation Trend</p>
              <select className="text-[10px] border border-gray-200 rounded px-1.5 py-0.5 bg-white text-gray-600 focus:outline-none">
                <option>Monthly</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={generationTrend}>
                <defs>
                  <linearGradient id="genGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} fill="url(#genGrad)" dot={{ r: 3, fill: "#6366f1" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Format Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-800 mb-3">Report Format</p>
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <PieChart width={90} height={90}>
                  <Pie data={formatData} cx={40} cy={40} innerRadius={25} outerRadius={42} dataKey="value" strokeWidth={1.5}>
                    {formatData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-black text-gray-800">24</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {formatData.map((d, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] text-gray-600">{d.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-700">{d.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1">
                      <div className="h-1 rounded-full" style={{ width: `${d.value}%`, backgroundColor: d.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Stats */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-800 mb-3">Report Stats</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Reports this month", value: "34", icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50" },
                { label: "% of total reports", value: "18%", icon: BarChart2, color: "text-green-600", bg: "bg-green-50" },
                { label: "Reports generated on", value: "→ last month", icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Unique auto-generated reports", value: "32", icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}><s.icon className={`w-3.5 h-3.5 ${s.color}`} /></div>
                  <div>
                    <p className="text-[10px] text-gray-400">{s.label}</p>
                    <p className="text-xs font-bold text-gray-800">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scheduled Reports ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-800">Scheduled Reports</h3>
            <button className="flex items-center gap-1.5 text-[11px] text-indigo-600 hover:underline">
              <Plus className="w-3 h-3" /> Add Schedule
            </button>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                <th className="text-left px-4 py-2.5">Report Name</th>
                <th className="text-left px-3 py-2.5">Schedule</th>
                <th className="text-left px-3 py-2.5">Next Run</th>
                <th className="text-left px-3 py-2.5">Recipients</th>
                <th className="text-left px-3 py-2.5">Format</th>
                <th className="text-left px-3 py-2.5">Status</th>
                <th className="text-left px-3 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduledReports.map((r, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition last:border-0">
                  <td className="px-4 py-2.5 font-semibold text-gray-800 text-[11px]">{r.name}</td>
                  <td className="px-3 py-2.5 text-[10px] text-gray-500">{r.schedule}</td>
                  <td className="px-3 py-2.5 text-[10px] text-gray-600 whitespace-nowrap">{r.nextRun}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] text-gray-600">{r.recipients} Recipients</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5"><FormatBadge format={r.format} /></td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">{r.status}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded hover:bg-gray-200"><Play className="w-3 h-3 text-green-500" /></button>
                      <button className="p-1 rounded hover:bg-gray-200"><Edit3 className="w-3 h-3 text-gray-400" /></button>
                      <button className="p-1 rounded hover:bg-gray-200"><MoreVertical className="w-3 h-3 text-gray-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── missing lucide import shim ── */
function Zap(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}