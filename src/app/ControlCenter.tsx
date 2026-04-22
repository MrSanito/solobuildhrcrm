"use client";

import { useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip, AreaChart, Area,
} from "recharts";
import {
  Shield, AlertTriangle, Zap, XCircle, Database, Users, RefreshCw,
  Clock, CheckCircle2, Activity, ChevronRight, Eye, FileText,
  TrendingUp, TrendingDown, Wifi, BarChart2, Bell, Settings,
  Play, Terminal, Send, HardDrive, Trash2, Server,
  ArrowRight, MoreVertical, Filter, Search, Info, ChevronLeft,
  AlertCircle, Check, X, Circle,
} from "lucide-react";

/* ── helpers ── */
function Avatar({ initials, gradient, size = "sm" }: { initials: string; gradient: string; size?: "sm" | "md" }) {
  const sz = size === "md" ? "w-8 h-8 text-xs" : "w-6 h-6 text-[9px]";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}

function SeverityDot({ level }: { level: string }) {
  const map: Record<string, string> = { Critical: "bg-red-500", High: "bg-orange-400", Medium: "bg-amber-400", Low: "bg-blue-400", Info: "bg-gray-400" };
  return <span className={`inline-block w-2 h-2 rounded-full ${map[level] ?? "bg-gray-300"}`} />;
}

function SeverityBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Critical: "bg-red-100 text-red-700 border border-red-200",
    High: "bg-orange-100 text-orange-700 border border-orange-200",
    Medium: "bg-amber-100 text-amber-700 border border-amber-200",
    Low: "bg-blue-100 text-blue-700 border border-blue-200",
    Info: "bg-gray-100 text-gray-600 border border-gray-200",
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${map[level] ?? "bg-gray-100 text-gray-600"}`}>{level}</span>;
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = { Running: "bg-green-400 animate-pulse", Success: "bg-green-400", Failed: "bg-red-400", Warning: "bg-amber-400", Waiting: "bg-gray-300" };
  return <span className={`inline-block w-2 h-2 rounded-full ${map[status] ?? "bg-gray-300"}`} />;
}

/* ── mock data ── */
const kpis = [
  { label: "System Health Score", value: "93%", change: "▲ 4% vs last 7 days", up: true, icon: Shield, color: "text-green-600", bg: "bg-green-50", spark: [88,90,89,91,93,92,93] },
  { label: "Critical Alerts", value: "7", change: "▲ 2 vs last 7 days", up: false, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", spark: [3,4,5,4,6,5,7] },
  { label: "Active Automations", value: "24", change: "▲ 3 vs last 7 days", up: true, icon: Zap, color: "text-indigo-600", bg: "bg-indigo-50", spark: [20,21,22,21,23,22,24] },
  { label: "Failed Automations", value: "2", change: "▼ 1 vs last 7 days", up: false, icon: XCircle, color: "text-amber-600", bg: "bg-amber-50", spark: [4,3,5,3,4,3,2] },
  { label: "Data Sync Status", value: "All Good", change: "Last sync: 5 mins ago", up: true, icon: Database, color: "text-teal-600", bg: "bg-teal-50", spark: null },
  { label: "Users Online", value: "12", change: "▲ 3 vs last 7 days", up: true, icon: Users, color: "text-blue-600", bg: "bg-blue-50", spark: [8,9,10,11,10,11,12] },
];

const severityData = [
  { name: "Critical", value: 7, pct: "25%", color: "#ef4444" },
  { name: "High", value: 9, pct: "37%", color: "#f97316" },
  { name: "Medium", value: 8, pct: "29%", color: "#f59e0b" },
  { name: "Low", value: 3, pct: "3%", color: "#3b82f6" },
  { name: "Info", value: 1, pct: "1%", color: "#9ca3af" },
];

const healthItems = [
  { label: "Application Status", status: "Operational", detail: "Uptime: 99.92%", icon: Activity, color: "text-green-600" },
  { label: "Database", status: "Operational", detail: "Latency: 35 ms", icon: Database, color: "text-green-600" },
  { label: "Integrations", status: "Operational", detail: "All 18 connected", icon: Wifi, color: "text-green-600" },
  { label: "Data Quality", status: "Good", detail: "Score: 92%", icon: BarChart2, color: "text-green-600" },
  { label: "Security", status: "Good", detail: "No threats detected", icon: Shield, color: "text-green-600" },
];

const criticalAlerts = [
  { alert: "Payroll Anomaly Detected", module: "Finance", severity: "Critical", triggered: "21 Jun 2025, 05:12 PM", impact: "High", status: "Open", action: "Investigate", detail: "Salary overtime cost in Finance team" },
  { alert: "Compliance Violation", module: "Compliance", severity: "High", triggered: "21 Jun 2025, 04:45 PM", impact: "High", status: "Open", action: "View Details", detail: "PF violation for 10 employees" },
  { alert: "Integration Failure", module: "Work", severity: "Critical", triggered: "21 Jun 2025, 04:30 PM", impact: "Medium", status: "Open", action: "Resolve", detail: "Biometric sync system failed" },
  { alert: "Performance Risk", module: "People", severity: "High", triggered: "21 Jun 2025, 03:55 PM", impact: "Medium", status: "Open", action: "Review", detail: "3 employees performance score dropped" },
  { alert: "Document Expiry Soon", module: "Compliance", severity: "Medium", triggered: "21 Jun 2025, 03:20 PM", impact: "Low", status: "Open", action: "View Details", detail: "5 employee documents expiring in 3 days" },
];

const automations = [
  { name: "Offer Letter Generation", trigger: "On Candidate Selection", status: "Running", lastRun: "21 Jun 2025, 05:28 PM", successRate: 96 },
  { name: "Attendance Anomaly Detector", trigger: "Daily at 09:00 AM", status: "Success", lastRun: "21 Jun 2025, 05:00 PM", successRate: 91 },
  { name: "Payroll Processing", trigger: "Monthly - 1st", status: "Success", lastRun: "21 Jun 2025, 04:15 PM", successRate: 100 },
  { name: "Probation Reminder", trigger: "Daily at 10:00 AM", status: "Success", lastRun: "21 Jun 2025, 04:00 PM", successRate: 97 },
  { name: "Document Expiry Alert", trigger: "Daily at 08:00 AM", status: "Success", lastRun: "21 Jun 2025, 08:00 AM", successRate: 94 },
  { name: "Exit Interview Trigger", trigger: "On Resignation", status: "Failed", lastRun: "21 Jun 2025, 01:30 PM", successRate: 80 },
];

/* ── AI Decision Log ── */
const aiDecisions = [
  { entity: "Attrition Risk", name: "Rahul Mehta", prediction: "High Risk", confidence: 87, decided: "21 Jun, 05:21 PM", icon: "🔴", iconBg: "bg-red-50" },
  { entity: "Performance Flag", name: "Anita Desai", prediction: "Needs Correction", confidence: 78, decided: "21 Jun, 01:18 PM", icon: "⭐", iconBg: "bg-amber-50" },
  { entity: "Hiring Recommendation", name: "Software Engineer", prediction: "Strong Match", confidence: 91, decided: "21 Jun, 11:15 AM", icon: "✅", iconBg: "bg-green-50" },
  { entity: "Leave Request", name: "Vikram Rao", prediction: "Ready in 6 Months", confidence: 68, decided: "21 Jun, 10:50 AM", icon: "📅", iconBg: "bg-blue-50" },
  { entity: "Marketing Benchmark", name: "Marketing Manager", prediction: "Market Below", confidence: 65, decided: "21 Jun, 09:30 AM", icon: "💰", iconBg: "bg-purple-50" },
];

const overrides = [
  { type: "System (AI)", employee: "Rahul Mehta", original: "High Attrition Risk", overrideBy: "Anit Verma", reason: "Special project retention plan", at: "21 Jun, 04:45 PM" },
  { type: "System (Rule)", employee: "Anita Desai", original: "PF Amount: ₹2,850", overrideBy: "Priya Sharma", reason: "Correction in salary variation", at: "21 Jun, 02:30 PM" },
  { type: "System (Policy)", employee: "Ravi Singh", original: "Provision Not Eligible", overrideBy: "Anit Verma", reason: "Exception approved by manager", at: "21 Jun, 01:15 PM" },
  { type: "System (AI)", employee: "Software Engineer", original: "Medium Fit", overrideBy: "Priya Sharma", reason: "Manual Review: Background cleared", at: "21 Jun, 02:30 PM" },
  { type: "System (Rule)", employee: "Leave Request", original: "Approval: No", overrideBy: "Priya Sharma", reason: "Emergency Approved", at: "21 Jun, 05:53 PM" },
];

const integrations = [
  { name: "Payroll System", status: "Connected", lastSync: "21 Jun, 05:30 PM", health: "Healthy" },
  { name: "Attendance System", status: "Connected", lastSync: "21 Jun, 05:28 PM", health: "Healthy" },
  { name: "Email Service", status: "Connected", lastSync: "21 Jun, 05:27 PM", health: "Healthy" },
  { name: "Document Storage", status: "Connected", lastSync: "21 Jun, 05:25 PM", health: "Healthy" },
  { name: "Background Verification", status: "Connected", lastSync: "21 Jun, 05:20 PM", health: "Healthy" },
  { name: "Tax Portal (TDS)", status: "Warning", lastSync: "21 Jun, 04:40 PM", health: "Degraded" },
  { name: "PF Portal", status: "Connected", lastSync: "21 Jun, 05:12 PM", health: "Healthy" },
  { name: "ETB Portal", status: "Connected", lastSync: "21 Jun, 05:01 PM", health: "Healthy" },
];

const commLog = [
  { from: "Priya Sharma (HR)", to: "All Employees", channel: "Announcement", subject: "Office Holiday on 20th June", at: "21 Jun, 06:40 PM", gradient: "from-indigo-500 to-purple-600", initials: "PS" },
  { from: "Anit Verma", to: "Rahul Mehta", channel: "Direct Message", subject: "Discussion on project allocation", at: "21 Jun, 04:00 PM", gradient: "from-teal-400 to-cyan-500", initials: "AV" },
  { from: "System", to: "Neha Patel", channel: "Email", subject: "Payslip for May 2025", at: "21 Jun, 01:40 PM", gradient: "from-gray-400 to-gray-500", initials: "SY" },
  { from: "System", to: "All Employees", channel: "Email", subject: "New Attendance Policy Update", at: "21 Jun, 01:05 PM", gradient: "from-gray-400 to-gray-500", initials: "SY" },
  { from: "Priya Sharma (HR)", to: "Vikram Rao", channel: "Direct Message", subject: "Leave request follow up", at: "21 Jun, 09:45 AM", gradient: "from-indigo-500 to-purple-600", initials: "PS" },
];

const notifications = [
  { name: "Payslip for May 2025", sentOn: "21 Jun, 12:30 PM", channel: "App", delivered: true, read: true, status: "Read" },
  { name: "Leave Request Update", sentOn: "21 Jun, 12:40 PM", channel: "App", delivered: true, read: false, status: "Read" },
  { name: "Performance Review Reminder", sentOn: "21 Jun, 12:18 PM", channel: "Email", delivered: true, read: false, status: "Delivered" },
  { name: "Training Session Invite", sentOn: "21 Jun, 12:00 PM", channel: "App", delivered: true, read: false, status: "Read" },
  { name: "Policy Update Notification", sentOn: "21 Jun, 12:00 PM", channel: "Email", delivered: true, read: true, status: "Read" },
];

const activityTimeline = [
  { time: "21 Jun, 05:30 PM", event: "Payroll processing completed for May 2025", type: "Success" },
  { time: "21 Jun, 05:18 PM", event: "Data sync with Attendance System", type: "Success" },
  { time: "21 Jun, 05:02 PM", event: "Override applied for Rahu Mehta (Attrition Risk)", type: "Info" },
  { time: "21 Jun, 04:30 PM", event: "Critical Alert: Payroll anomaly detected", type: "Critical" },
  { time: "21 Jun, 03:15 PM", event: "AI decision: Hiring recommendation generated", type: "Info" },
];

const quickActions = [
  { label: "Trigger Data Sync", icon: RefreshCw, color: "text-indigo-600", bg: "bg-indigo-50 hover:bg-indigo-100" },
  { label: "Run Payroll Simulation", icon: Play, color: "text-green-600", bg: "bg-green-50 hover:bg-green-100" },
  { label: "Reprocess Failed Jobs", icon: Terminal, color: "text-amber-600", bg: "bg-amber-50 hover:bg-amber-100" },
  { label: "Send System Announcement", icon: Send, color: "text-blue-600", bg: "bg-blue-50 hover:bg-blue-100" },
  { label: "Backup Now", icon: HardDrive, color: "text-purple-600", bg: "bg-purple-50 hover:bg-purple-100" },
  { label: "Clear System Cache", icon: Trash2, color: "text-red-600", bg: "bg-red-50 hover:bg-red-100" },
];

/* ── mini sparkline ── */
function Spark({ data, up }: { data: number[]; up: boolean }) {
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 60;
    const y = 14 - ((v - min) / (max - min || 1)) * 12;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="60" height="16" viewBox="0 0 60 16">
      <polyline points={pts} fill="none" stroke={up ? "#22c55e" : "#ef4444"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── main ── */
export default function ControlCenter() {
  const [alertPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h1 className="text-base font-bold text-gray-900">Control Center</h1>
          </div>
          <p className="text-[11px] text-gray-400">System oversight, monitoring, and control hub for the entire HR ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
            <RefreshCw className="w-3.5 h-3.5 text-indigo-500" /> 21 May – 21 Jun 2025
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <Clock className="w-3.5 h-3.5 text-green-500" />
            System Time: <span className="font-semibold">21 Jun 2025, 06:30 PM</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-4">
        {/* ── KPI Row ── */}
        <div className="grid grid-cols-6 gap-3">
          {kpis.map((k, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-medium leading-tight">{k.label}</span>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${k.bg}`}><k.icon className={`w-3.5 h-3.5 ${k.color}`} /></div>
              </div>
              <div className={`text-xl font-black leading-tight ${k.value === "All Good" ? "text-green-600" : "text-gray-900"}`}>{k.value}</div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] ${k.up ? "text-green-600" : "text-red-500"}`}>{k.change}</span>
                {k.spark && <Spark data={k.spark} up={k.up} />}
              </div>
              {k.label === "Users Online" && (
                <button className="text-[10px] text-indigo-600 hover:underline flex items-center gap-0.5 w-fit">View Live Users <ArrowRight className="w-2.5 h-2.5" /></button>
              )}
            </div>
          ))}
        </div>

        {/* ── System Health + Issues by Severity ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Health */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wide">System Health Overview</h3>
            <div className="grid grid-cols-5 gap-2">
              {healthItems.map((h) => (
                <div key={h.label} className="flex flex-col gap-1.5 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <h.icon className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[10px] font-semibold text-gray-700">{h.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-[10px] font-semibold text-green-600">{h.status}</span>
                  </div>
                  <span className="text-[9px] text-gray-400">{h.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Issues by Severity */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wide">Issues by Severity</h3>
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <PieChart width={120} height={120}>
                  <Pie data={severityData} cx={55} cy={55} innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={2}>
                    {severityData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-gray-400">Total</span>
                  <span className="text-xl font-black text-gray-800">28</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {severityData.map((s) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <SeverityDot level={s.name} />
                    <span className="text-xs text-gray-700 flex-1">{s.name}</span>
                    <span className="text-xs font-bold text-gray-800">{s.value}</span>
                    <span className="text-[10px] text-gray-400 w-8 text-right">({s.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: "Pending Approvals", value: "16", action: "View All", icon: CheckCircle2, color: "text-amber-600" },
            { label: "Data Sync Failures", value: "0", action: "View Logs", icon: Database, color: "text-green-600" },
            { label: "Scheduled Jobs", value: "32", action: "View All", icon: Clock, color: "text-indigo-600" },
            { label: "Avg. Response Time", value: "412 ms", badge: "Good", icon: Activity, color: "text-green-600" },
            { label: "System Load", value: "34%", badge: "Normal", icon: Server, color: "text-blue-600" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0"><s.icon className={`w-4 h-4 ${s.color}`} /></div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400">{s.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-800">{s.value}</p>
                  {s.badge && <span className="text-[9px] bg-green-100 text-green-700 px-1.5 rounded-full font-medium">{s.badge}</span>}
                </div>
              </div>
              {s.action && <button className="text-[10px] text-indigo-600 hover:underline whitespace-nowrap shrink-0">{s.action}</button>}
            </div>
          ))}
        </div>

        {/* ── Critical Alerts + Automation Monitor ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Critical Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-gray-800">Critical Alerts</h3>
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">7</span>
              </div>
              <button className="text-[11px] text-indigo-600 hover:underline">View All Alerts</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-50 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                    <th className="text-left px-3 py-2">Alert</th>
                    <th className="text-left px-3 py-2">Module</th>
                    <th className="text-left px-3 py-2">Severity</th>
                    <th className="text-left px-3 py-2">Triggered At</th>
                    <th className="text-left px-3 py-2">Impact</th>
                    <th className="text-left px-3 py-2">Status</th>
                    <th className="text-left px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {criticalAlerts.map((a, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-3 py-2.5">
                        <div className="flex items-start gap-1.5">
                          <AlertTriangle className={`w-3 h-3 mt-0.5 shrink-0 ${a.severity === "Critical" ? "text-red-500" : "text-amber-500"}`} />
                          <div>
                            <p className="font-semibold text-gray-800 text-[11px]">{a.alert}</p>
                            <p className="text-[10px] text-gray-400">{a.detail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-gray-600 text-[11px]">{a.module}</td>
                      <td className="px-3 py-2.5"><SeverityBadge level={a.severity} /></td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-500 whitespace-nowrap">{a.triggered}</td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] font-medium ${a.impact === "High" ? "text-red-600" : a.impact === "Medium" ? "text-amber-600" : "text-gray-500"}`}>{a.impact}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">{a.status}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <button className="text-[10px] text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded-lg hover:bg-indigo-50 font-medium whitespace-nowrap">{a.action}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Showing 1 to 5 of 7 alerts</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded border border-gray-200"><ChevronLeft className="w-3 h-3" /></button>
                {[1,2].map(n=><button key={n} className={`px-2 py-0.5 rounded border text-[10px] ${n===1?"bg-indigo-600 text-white border-indigo-600":"border-gray-200"}`}>{n}</button>)}
                <button className="p-1 rounded border border-gray-200"><ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
          </div>

          {/* Automation Monitor */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800">Automation Monitor</h3>
              <button className="text-[11px] text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-50 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                    <th className="text-left px-3 py-2">Automation</th>
                    <th className="text-left px-3 py-2">Trigger</th>
                    <th className="text-left px-3 py-2">Status</th>
                    <th className="text-left px-3 py-2">Last Run</th>
                    <th className="text-left px-3 py-2">Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {automations.map((a, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-3 py-2.5 font-semibold text-gray-800 text-[11px]">{a.name}</td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-500">{a.trigger}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <StatusDot status={a.status} />
                          <span className={`text-[10px] font-medium ${a.status === "Running" ? "text-green-600" : a.status === "Failed" ? "text-red-600" : "text-green-600"}`}>{a.status}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-500 whitespace-nowrap">{a.lastRun}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-16">
                            <div className={`h-1.5 rounded-full ${a.successRate >= 95 ? "bg-green-500" : a.successRate >= 85 ? "bg-amber-400" : "bg-red-400"}`} style={{width:`${a.successRate}%`}} />
                          </div>
                          <span className="text-[10px] font-semibold text-gray-700">{a.successRate}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-3 py-2 border-t border-gray-100 text-[10px] text-gray-400">Showing 1 to 6 of 24 automations</div>
          </div>
        </div>

        {/* ── Lower Section ── */}

        {/* AI Decision Log + Overrides + System Integrations */}
        <div className="grid grid-cols-3 gap-3">
          {/* AI Decision Log */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-500" />
                <h3 className="text-xs font-bold text-gray-800">AI Decision Log</h3>
              </div>
              <button className="text-[11px] text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-50 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                    <th className="text-left px-3 py-2">Entity</th>
                    <th className="text-left px-3 py-2">Prediction/Decision</th>
                    <th className="text-right px-3 py-2">Confidence</th>
                    <th className="text-left px-3 py-2">Decided At</th>
                  </tr>
                </thead>
                <tbody>
                  {aiDecisions.map((d, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-lg ${d.iconBg} flex items-center justify-center text-xs shrink-0`}>{d.icon}</div>
                          <div>
                            <p className="text-[10px] text-gray-400">{d.entity}</p>
                            <p className="text-[11px] font-semibold text-gray-800">{d.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${d.prediction.includes("Risk") || d.prediction.includes("Correction") ? "bg-red-100 text-red-700" : d.prediction.includes("Match") || d.prediction.includes("Ready") ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{d.prediction}</span>
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <span className="text-[11px] font-bold text-gray-800">{d.confidence}%</span>
                      </td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-400 whitespace-nowrap">{d.decided}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Showing 1 to 5 of 15 decisions</span>
              <div className="flex items-center gap-1">
                {[1,2,3,4].map(n=><button key={n} className={`px-2 py-0.5 rounded border text-[10px] ${n===1?"bg-indigo-600 text-white border-indigo-600":"border-gray-200"}`}>{n}</button>)}
              </div>
            </div>
          </div>

          {/* Overrides */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800">Overrides & Manual Interventions</h3>
              <button className="text-[11px] text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-50 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                    <th className="text-left px-3 py-2">Suggested By</th>
                    <th className="text-left px-3 py-2">Entity</th>
                    <th className="text-left px-3 py-2">Original</th>
                    <th className="text-left px-3 py-2">Override By</th>
                    <th className="text-left px-3 py-2">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {overrides.map((o, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${o.type.includes("AI") ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{o.type}</span>
                      </td>
                      <td className="px-3 py-2.5 text-[11px] font-semibold text-gray-800">{o.employee}</td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-500">{o.original}</td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-600 font-medium">{o.overrideBy}</td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-400">{o.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Showing 1 to 5 of 14 overrides</span>
              <div className="flex items-center gap-1">
                {[1,2,3].map(n=><button key={n} className={`px-2 py-0.5 rounded border text-[10px] ${n===1?"bg-indigo-600 text-white border-indigo-600":"border-gray-200"}`}>{n}</button>)}
              </div>
            </div>
          </div>

          {/* System Integrations */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800">System Integrations</h3>
              <button className="text-[11px] text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="overflow-y-auto flex-1">
              {integrations.map((intg, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-50 hover:bg-gray-50 transition last:border-0">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0"><Server className="w-3.5 h-3.5 text-indigo-500" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-gray-800 truncate">{intg.name}</p>
                    <p className="text-[10px] text-gray-400">{intg.lastSync}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className={`text-[10px] font-semibold ${intg.status === "Connected" ? "text-green-600" : "text-amber-600"}`}>{intg.status}</span>
                    <span className={`text-[10px] px-1.5 rounded-full ${intg.health === "Healthy" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>{intg.health}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-gray-100">
              <button className="text-[11px] text-indigo-600 hover:underline">View All Integrations</button>
            </div>
          </div>
        </div>

        {/* Communication Log + Employee Notifications + Activity Timeline */}
        <div className="grid grid-cols-3 gap-3">
          {/* Communication Log */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800">Communication Log</h3>
              <button className="text-[11px] text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-50 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                    <th className="text-left px-3 py-2">From</th>
                    <th className="text-left px-3 py-2">To</th>
                    <th className="text-left px-3 py-2">Channel</th>
                    <th className="text-left px-3 py-2">Subject / Message</th>
                    <th className="text-left px-3 py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {commLog.map((c, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white text-[8px] font-bold shrink-0`}>{c.initials}</div>
                          <span className="text-[10px] text-gray-700 font-medium whitespace-nowrap">{c.from}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-500">{c.to}</td>
                      <td className="px-3 py-2.5"><span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 rounded-full">{c.channel}</span></td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-600 max-w-[120px] truncate">{c.subject}</td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-400 whitespace-nowrap">{c.at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Showing 1 to 5 of 32 communications</span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(n=><button key={n} className={`px-2 py-0.5 rounded border text-[10px] ${n===1?"bg-indigo-600 text-white border-indigo-600":"border-gray-200"}`}>{n}</button>)}
              </div>
            </div>
          </div>

          {/* Employee Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800">Employee Notifications</h3>
              <button className="text-[11px] text-indigo-600 hover:underline">View All</button>
            </div>
            {/* Summary row */}
            <div className="grid grid-cols-4 gap-2 px-4 py-2.5 border-b border-gray-100">
              {[
                { label: "Sent", value: 248, icon: Send, color: "text-indigo-600", bg: "bg-indigo-50" },
                { label: "Delivered", value: 241, icon: Check, color: "text-green-600", bg: "bg-green-50" },
                { label: "Read", value: 198, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Failed", value: 7, icon: X, color: "text-red-600", bg: "bg-red-50" },
              ].map((s) => (
                <div key={s.label} className={`flex flex-col items-center p-2 rounded-xl ${s.bg}`}>
                  <s.icon className={`w-4 h-4 ${s.color} mb-1`} />
                  <span className={`text-sm font-black ${s.color}`}>{s.value}</span>
                  <span className="text-[9px] text-gray-500">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-50 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                    <th className="text-left px-3 py-2">Notification</th>
                    <th className="text-left px-3 py-2">Sent On</th>
                    <th className="text-left px-3 py-2">Channel</th>
                    <th className="text-center px-3 py-2">Del.</th>
                    <th className="text-center px-3 py-2">Read</th>
                    <th className="text-left px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((n, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-3 py-2 text-[11px] font-medium text-gray-700">{n.name}</td>
                      <td className="px-3 py-2 text-[10px] text-gray-400 whitespace-nowrap">{n.sentOn}</td>
                      <td className="px-3 py-2 text-[10px] text-gray-500">{n.channel}</td>
                      <td className="px-3 py-2 text-center"><Check className={`w-3 h-3 mx-auto ${n.delivered ? "text-green-500" : "text-gray-300"}`} /></td>
                      <td className="px-3 py-2 text-center"><Check className={`w-3 h-3 mx-auto ${n.read ? "text-green-500" : "text-gray-300"}`} /></td>
                      <td className="px-3 py-2"><span className={`text-[10px] font-medium ${n.status === "Read" ? "text-green-600" : "text-blue-600"}`}>{n.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-3 py-2 border-t border-gray-100 text-[10px] text-gray-400">Showing 1 to 5 of 38 notifications</div>
          </div>

          {/* System Activity Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800">System Activity Timeline</h3>
              <button className="text-[11px] text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="flex flex-col flex-1 px-4 py-2">
              {activityTimeline.map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.type === "Success" ? "bg-green-400" : a.type === "Critical" ? "bg-red-400" : "bg-blue-400"}`} />
                  <div className="flex-1">
                    <p className="text-[11px] font-medium text-gray-700">{a.event}</p>
                    <p className="text-[10px] text-gray-400">{a.time}</p>
                  </div>
                  <span className={`text-[10px] font-medium shrink-0 ${a.type === "Success" ? "text-green-600" : a.type === "Critical" ? "text-red-600" : "text-blue-600"}`}>{a.type}</span>
                </div>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-gray-100">
              <button className="text-[11px] text-indigo-600 hover:underline">View Full Timeline</button>
            </div>
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <h3 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wide">Quick Actions</h3>
          <div className="grid grid-cols-6 gap-3">
            {quickActions.map((qa, i) => (
              <button key={i} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 ${qa.bg} transition`}>
                <qa.icon className={`w-4 h-4 ${qa.color}`} />
                <span className="text-[11px] font-medium text-gray-700">{qa.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}