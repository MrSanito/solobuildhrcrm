"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Bell,
  Send,
  ChevronDown,
  Users,
  Briefcase,
  UserPlus,
  DollarSign,
  Clock,
  Star,
  AlertTriangle,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  CalendarDays,
  Zap,
  BarChart3,
  CheckCircle2,
  UserCheck,
  Activity,
  Wallet,
  X,
} from "lucide-react";

/* ─── Mock Data ─────────────────────────────────────────── */
const performanceData = [
  { month: "Dec", high: 220, track: 800, needs: 130, risk: 25 },
  { month: "Jan", high: 230, track: 820, needs: 132, risk: 22 },
  { month: "Feb", high: 235, track: 835, needs: 134, risk: 21 },
  { month: "Mar", high: 240, track: 840, needs: 135, risk: 22 },
  { month: "Apr", high: 245, track: 841, needs: 136, risk: 22 },
  { month: "May", high: 248, track: 842, needs: 136, risk: 22 },
];

const costOutputData = [
  { month: "Dec", cost: 1.9, output: 1.05 },
  { month: "Jan", cost: 2.05, output: 1.08 },
  { month: "Feb", cost: 2.1, output: 1.1 },
  { month: "Mar", cost: 2.2, output: 1.12 },
  { month: "Apr", cost: 2.35, output: 1.15 },
  { month: "May", cost: 2.48, output: 1.18 },
];

const attendanceData = [
  { name: "Present", value: 1153, color: "#22c55e" },
  { name: "Absent", value: 62, color: "#ef4444" },
  { name: "Half Day", value: 33, color: "#f59e0b" },
];

const kpiCards = [
  {
    label: "Total Employees",
    value: "1,248",
    change: "+18 vs last month",
    up: true,
    icon: Users,
    color: "indigo",
    sparkColor: "#6366f1",
    spark: [40, 45, 50, 48, 55, 60, 58, 65],
  },
  {
    label: "Open Roles",
    value: "28",
    change: "▼ 4 vs last month",
    up: false,
    icon: Briefcase,
    color: "emerald",
    sparkColor: "#10b981",
    spark: [32, 30, 28, 31, 29, 28, 27, 28],
  },
  {
    label: "New Hires (This Month)",
    value: "18",
    change: "+5 vs last month",
    up: true,
    icon: UserPlus,
    color: "blue",
    sparkColor: "#3b82f6",
    spark: [10, 12, 11, 14, 13, 15, 16, 18],
  },
  {
    label: "Payroll (This Month)",
    value: "₹2.48 Cr",
    change: "▲ 8.6% vs last month",
    up: true,
    icon: Wallet,
    color: "amber",
    sparkColor: "#f59e0b",
    spark: [2.0, 2.1, 2.15, 2.2, 2.3, 2.35, 2.42, 2.48],
  },
  {
    label: "Attendance Rate",
    value: "92.6%",
    change: "▼ 1.8% vs last month",
    up: false,
    icon: UserCheck,
    color: "teal",
    sparkColor: "#14b8a6",
    spark: [94, 93.5, 93, 93.2, 92.8, 92.5, 92.7, 92.6],
  },
  {
    label: "Avg Performance Score",
    value: "3.74 / 5",
    change: "▲ 0.21 vs last month",
    up: true,
    icon: Star,
    color: "violet",
    sparkColor: "#8b5cf6",
    spark: [3.4, 3.45, 3.5, 3.55, 3.6, 3.65, 3.7, 3.74],
  },
];

const criticalAlerts = [
  {
    icon: CheckCircle2,
    label: "Pending Approvals",
    sub: "Leave, Offers, Expenses",
    count: 5,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Activity,
    label: "Attendance Anomalies",
    sub: "Requires attention",
    count: 12,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    label: "High Payroll Variations",
    sub: "vs last month",
    count: 3,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: FileText,
    label: "Documents Expiring Soon",
    sub: "Action required",
    count: 7,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

const recentActivity = [
  {
    icon: FileText,
    color: "bg-indigo-100 text-indigo-600",
    title: "Rahul Sharma",
    sub: "Moved to Interview Stage",
    time: "20 May 2025, 10:30 AM",
  },
  {
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
    title: "Leave Request",
    sub: "Approved for Sneha Iyer",
    time: "20 May 2025, 09:15 AM",
  },
  {
    icon: Wallet,
    color: "bg-amber-100 text-amber-600",
    title: "Payroll Processed",
    sub: "May 2025 payroll completed",
    time: "19 May 2025, 06:45 PM",
  },
  {
    icon: AlertTriangle,
    color: "bg-red-100 text-red-600",
    title: "Document Expiring",
    sub: "3 documents expire in 7 days",
    time: "19 May 2025, 03:20 PM",
  },
  {
    icon: UserPlus,
    color: "bg-teal-100 text-teal-600",
    title: "New Hire Onboarded",
    sub: "Aman Verma joined today",
    time: "19 May 2025, 11:00 AM",
  },
];

const upcomingEvents = [
  {
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    title: "Interview – Rahul Verma",
    time: "Today, 11:00 AM",
    urgent: true,
  },
  {
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
    title: "Policy Review Meeting",
    time: "Tomorrow, 3:00 PM",
    urgent: false,
  },
  {
    icon: Star,
    color: "bg-amber-100 text-amber-600",
    title: "Performance Review Cycle",
    time: "26 May – 02 Jun 2025",
    urgent: false,
  },
  {
    icon: Wallet,
    color: "bg-green-100 text-green-600",
    title: "Payroll Processing",
    time: "31 May 2025",
    urgent: false,
  },
];

const funnelStages = [
  { stage: "Applied", candidates: 1248, conversion: "100%", width: "100%" },
  { stage: "Screening", candidates: 312, conversion: "25.0%", width: "78%" },
  { stage: "Interview", candidates: 156, conversion: "12.5%", width: "58%" },
  { stage: "Offer", candidates: 32, conversion: "2.6%", width: "38%" },
  { stage: "Hired", candidates: 18, conversion: "1.4%", width: "22%" },
];

const funnelColors = ["#4f46e5", "#6366f1", "#3b82f6", "#22c55e", "#f59e0b"];

/* ─── Tiny Sparkline ────────────────────────────────────── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
      />
    </svg>
  );
}

/* ─── Main Dashboard ────────────────────────────────────── */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Top Nav ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Good morning, Priya! 👋
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Here's what's happening in your organization today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
            <Sparkles className="w-4 h-4" />
            AI Assistant
          </button>
          <button className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              12
            </span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
            <CalendarDays className="w-4 h-4 text-indigo-500" />
            21 May 2025
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* ── Main Content ── */}
        <main className="flex-1 p-6 min-w-0">
          {/* Search Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-medium text-gray-700">
                What's on your mind today?
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Examples: Hire backend engineer, Why is payroll high?, Show low
              performers, Approve pending leaves
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
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
            {kpiCards.map((kpi) => (
              <div
                key={kpi.label}
                className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-500 font-medium leading-tight">
                    {kpi.label}
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900 leading-tight">
                  {kpi.value}
                </div>
                <div
                  className={`text-[10px] mt-0.5 flex items-center gap-1 ${kpi.up ? "text-green-600" : "text-red-500"}`}
                >
                  {kpi.up ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {kpi.change}
                </div>
                <div className="mt-2">
                  <Sparkline data={kpi.spark} color={kpi.sparkColor} />
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row 1: Hiring Pipeline + Attendance */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Hiring Pipeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">
                  Hiring Pipeline Overview
                </h3>
                <button className="text-xs text-indigo-600 flex items-center gap-1 hover:underline">
                  View Hiring <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="flex gap-4">
                {/* Funnel viz */}
                <div className="flex flex-col gap-1.5 flex-1">
                  {funnelStages.map((s, i) => (
                    <div key={s.stage} className="flex items-center gap-2">
                      <div
                        className="h-7 rounded-sm flex items-center justify-center"
                        style={{
                          width: s.width,
                          backgroundColor: funnelColors[i],
                          minWidth: 24,
                        }}
                      />
                    </div>
                  ))}
                </div>
                {/* Table */}
                <div className="flex-1">
                  <div className="grid grid-cols-3 text-[10px] text-gray-400 font-medium mb-1">
                    <span>Stage</span>
                    <span className="text-center">Candidates</span>
                    <span className="text-right">Conversion</span>
                  </div>
                  {funnelStages.map((s) => (
                    <div
                      key={s.stage}
                      className="grid grid-cols-3 text-[11px] text-gray-700 py-1 border-b border-gray-50 last:border-0"
                    >
                      <span className="font-medium">{s.stage}</span>
                      <span className="text-center">{s.candidates}</span>
                      <span className="text-right text-gray-500">
                        {s.conversion}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Overall Conversion Rate
                </span>
                <span className="text-sm font-bold text-indigo-600">
                  1.44%
                </span>
              </div>
            </div>

            {/* Attendance Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">
                  Attendance Overview
                </h3>
                <button className="text-xs text-indigo-600 flex items-center gap-1 hover:underline">
                  View Attendance <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <PieChart width={140} height={140}>
                    <Pie
                      data={attendanceData}
                      cx={65}
                      cy={65}
                      innerRadius={44}
                      outerRadius={64}
                      dataKey="value"
                      strokeWidth={2}
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-lg font-bold text-gray-800">
                      92.6%
                    </span>
                    <span className="text-[10px] text-gray-500 text-center leading-tight">
                      Attendance<br />Rate
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {attendanceData.map((d) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="text-xs text-gray-700 font-medium w-14">
                        {d.name}
                      </span>
                      <span className="text-xs font-bold text-gray-800">
                        {d.value.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        ({((d.value / 1248) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-medium text-red-700">
                    23 Anomalies Detected
                  </span>
                </div>
                <button className="text-xs text-red-600 flex items-center gap-1 hover:underline">
                  View Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Charts Row 2: Performance + Cost vs Output */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Performance Snapshot */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">
                  Performance Snapshot
                </h3>
                <button className="text-xs text-indigo-600 hover:underline">
                  View all
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  {
                    label: "High Performers",
                    value: "248",
                    pct: "(19.9%)",
                    color: "text-green-600",
                    bg: "bg-green-50",
                  },
                  {
                    label: "On Track",
                    value: "842",
                    pct: "(67.6%)",
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    label: "Needs Improvement",
                    value: "136",
                    pct: "(10.9%)",
                    color: "text-amber-600",
                    bg: "bg-amber-50",
                  },
                  {
                    label: "At Risk",
                    value: "22",
                    pct: "(1.8%)",
                    color: "text-red-600",
                    bg: "bg-red-50",
                  },
                ].map((s) => (
                  <div key={s.label} className={`${s.bg} rounded-lg p-2`}>
                    <div className={`text-[10px] font-medium ${s.color}`}>
                      {s.label}
                    </div>
                    <div className={`text-base font-bold ${s.color}`}>
                      {s.value}
                    </div>
                    <div className="text-[10px] text-gray-500">{s.pct}</div>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={130}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Line
                    type="monotone"
                    dataKey="high"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                    name="High Performers"
                  />
                  <Line
                    type="monotone"
                    dataKey="track"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    name="On Track"
                  />
                  <Line
                    type="monotone"
                    dataKey="needs"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                    name="Needs Improvement"
                  />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                    name="At Risk"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Cost vs Output */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Cost vs Output{" "}
                    <span className="text-gray-400 font-normal">
                      (This Month)
                    </span>
                  </h3>
                </div>
                <button className="text-xs text-indigo-600 hover:underline">
                  View report
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-[10px] text-gray-500">Total Cost</p>
                  <p className="text-lg font-bold text-gray-800">₹2.48 Cr</p>
                  <p className="text-[10px] text-red-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> 8.6% vs last month
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Output Index</p>
                  <p className="text-lg font-bold text-gray-800">1.18</p>
                  <p className="text-[10px] text-green-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> 6.3% vs last month
                  </p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={130}>
                <LineChart data={costOutputData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Total Cost (₹ Cr)"
                  />
                  <Line
                    type="monotone"
                    dataKey="output"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Output Index"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming + AI Insights row (mobile only, desktop in sidebar) */}
          <div className="grid grid-cols-2 gap-4 mb-4 xl:hidden">
            <UpcomingPanel />
            <AIInsightsPanel />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Recent Activity
              </h3>
              <div className="flex gap-1">
                {["All", "Hiring", "People", "Work", "Finance", "Compliance"].map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`text-xs px-2.5 py-1 rounded-md transition ${
                        activeTab === t
                          ? "bg-indigo-600 text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {t}
                    </button>
                  )
                )}
              </div>
              <button className="text-xs text-indigo-600 flex items-center gap-1 hover:underline ml-2">
                View all activity <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {recentActivity.map((a, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1.5 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-indigo-200 transition"
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${a.color}`}
                  >
                    <a.icon className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-gray-800 leading-tight">
                    {a.title}
                  </p>
                  <p className="text-[10px] text-gray-500">{a.sub}</p>
                  <p className="text-[10px] text-gray-400 mt-auto">{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* ── Right Sidebar ── */}
        <aside className="w-72 shrink-0 p-4 flex flex-col gap-4 border-l border-gray-200 bg-white min-h-screen">
          {/* Critical Alerts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Critical Alerts
              </h3>
              <button className="text-xs text-indigo-600 hover:underline">
                View all
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {criticalAlerts.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 transition cursor-pointer group"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.bg}`}
                  >
                    <a.icon className={`w-4 h-4 ${a.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {a.label}
                    </p>
                    <p className="text-[10px] text-gray-400">{a.sub}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-sm font-bold ${a.color} w-6 text-right`}
                    >
                      {a.count}
                    </span>
                    <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-indigo-500 transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  icon: UserPlus,
                  label: "Add Employee",
                  color:
                    "text-indigo-600 bg-indigo-50 hover:bg-indigo-100",
                },
                {
                  icon: Briefcase,
                  label: "Post Job",
                  color: "text-amber-600 bg-amber-50 hover:bg-amber-100",
                },
                {
                  icon: CheckCircle2,
                  label: "Approve Leave",
                  color: "text-green-600 bg-green-50 hover:bg-green-100",
                },
                {
                  icon: Wallet,
                  label: "Run Payroll",
                  color: "text-blue-600 bg-blue-50 hover:bg-blue-100",
                },
                {
                  icon: Star,
                  label: "Performance Review",
                  color: "text-violet-600 bg-violet-50 hover:bg-violet-100",
                },
                {
                  icon: BarChart3,
                  label: "Generate Report",
                  color: "text-teal-600 bg-teal-50 hover:bg-teal-100",
                },
              ].map((qa) => (
                <button
                  key={qa.label}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 transition ${qa.color}`}
                >
                  <qa.icon className="w-5 h-5" />
                  <span className="text-[11px] font-medium text-center leading-tight">
                    {qa.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Upcoming */}
          <div className="hidden xl:block">
            <UpcomingPanel />
          </div>

          <hr className="border-gray-100 hidden xl:block" />

          {/* AI Insights */}
          <div className="hidden xl:block">
            <AIInsightsPanel />
          </div>
        </aside>
      </div>
    </div>
  );
}

function UpcomingPanel() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Upcoming</h3>
        <button className="text-xs text-indigo-600 hover:underline">
          View calendar
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {upcomingEvents.map((e, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-100 hover:border-indigo-100 transition"
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${e.color}`}
            >
              <e.icon className="w-3.5 h-3.5" />
            </div>
            <div>
              <p
                className={`text-xs font-semibold leading-tight ${e.urgent ? "text-indigo-700" : "text-gray-800"}`}
              >
                {e.title}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIInsightsPanel() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">AI Insights</h3>
        <button className="text-xs text-indigo-600 hover:underline">
          View all
        </button>
      </div>
      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-indigo-500 font-medium uppercase tracking-wide">
              High hiring demand for
            </p>
            <p className="text-sm font-bold text-indigo-900">
              Backend Developer
            </p>
            <p className="text-[10px] text-indigo-600 mt-1">
              Recommended to hire 5+
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}