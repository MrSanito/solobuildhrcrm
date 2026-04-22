"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter,
  CartesianGrid, Legend, ReferenceLine,
} from "recharts";
import {
  Download, Filter, MoreVertical, Plus, ChevronRight,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2,
  Clock, IndianRupee, Activity, Zap, Settings, FileText,
  Users, CreditCard, BarChart2, Calendar,
} from "lucide-react";

/* ─── helpers ──────────────────────────────────────────── */
function Avatar({ initials, gradient }: { initials: string; gradient: string }) {
  return (
    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-[9px] font-bold shrink-0`}>
      {initials}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Processed: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Flagged: "bg-red-100 text-red-700 border-red-200",
    Approved: "bg-green-100 text-green-700 border-green-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${map[status] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {status}
    </span>
  );
}

/* ─── mock data ─────────────────────────────────────────── */
const payrollData = [
  { name: "Rahul Sharma", baseSalary: "₹1,20,000", additions: "₹10,000", deductions: "₹15,000", finalPay: "₹1,15,000", status: "Processed", avatar: "RS", gradient: "from-indigo-500 to-purple-600" },
  { name: "Sneha Iyer", baseSalary: "₹95,000", additions: "₹8,200", deductions: "₹11,100", finalPay: "₹91,100", status: "Processed", avatar: "SI", gradient: "from-pink-400 to-rose-500" },
  { name: "Vikram Rao", baseSalary: "₹1,10,000", additions: "₹12,000", deductions: "₹13,200", finalPay: "₹1,08,800", status: "Flagged", avatar: "VR", gradient: "from-blue-500 to-indigo-600" },
  { name: "Neha Patel", baseSalary: "₹90,000", additions: "₹5,000", deductions: "₹10,800", finalPay: "₹84,200", status: "Processed", avatar: "NP", gradient: "from-rose-400 to-pink-500" },
  { name: "Arjun Mehta", baseSalary: "₹1,25,000", additions: "₹10,000", deductions: "₹12,600", finalPay: "₹1,07,400", status: "Pending", avatar: "AM", gradient: "from-violet-400 to-purple-500" },
];

const expensesData = [
  { name: "Rahul Sharma", category: "Travel", amount: "₹12,450", date: "20 May 2025", status: "Approved", avatar: "RS", gradient: "from-indigo-500 to-purple-600" },
  { name: "Sneha Iyer", category: "Meals", amount: "₹2,380", date: "20 May 2025", status: "Pending", avatar: "SI", gradient: "from-pink-400 to-rose-500" },
  { name: "Vikram Rao", category: "Travel", amount: "₹18,900", date: "19 May 2025", status: "Pending", avatar: "VR", gradient: "from-blue-500 to-indigo-600" },
  { name: "Neha Patel", category: "Office Supplies", amount: "₹1,650", date: "19 May 2025", status: "Rejected", avatar: "NP", gradient: "from-rose-400 to-pink-500" },
  { name: "Arjun Mehta", category: "Client Meeting", amount: "₹3,100", date: "18 May 2025", status: "Approved", avatar: "AM", gradient: "from-violet-400 to-purple-500" },
];

const teamEfficiency = [
  { rank: 1, team: "Product", score: 92.4, color: "bg-green-500" },
  { rank: 2, team: "Engineering", score: 88.7, color: "bg-green-400" },
  { rank: 3, team: "Marketing", score: 76.3, color: "bg-amber-400" },
  { rank: 4, team: "Sales", score: 65.1, color: "bg-orange-400" },
  { rank: 5, team: "Support", score: 52.8, color: "bg-red-400" },
];

const scatterData = [
  { x: 20, y: 75, z: 80, name: "Engineering", color: "#6366f1" },
  { x: 35, y: 60, z: 65, name: "Sales", color: "#f59e0b" },
  { x: 55, y: 82, z: 90, name: "Product", color: "#22c55e" },
  { x: 70, y: 45, z: 50, name: "Support", color: "#ef4444" },
  { x: 80, y: 70, z: 75, name: "Operations", color: "#3b82f6" },
  { x: 45, y: 88, z: 92, name: "R&D", color: "#8b5cf6" },
  { x: 25, y: 40, z: 42, name: "Admin", color: "#94a3b8" },
  { x: 90, y: 55, z: 58, name: "Marketing", color: "#f97316" },
];

/* budget vs actual */
const budgetActual = [
  { category: "Salaries", budget: 1250000, actual: 1150000, variance: -8.1 },
  { category: "Benefits", budget: 112000, actual: 118500, variance: 5.6 },
  { category: "Recruitment", budget: 45000, actual: 56000, variance: 22.1 },
  { category: "Training", budget: 40000, actual: 38500, variance: -3.9 },
  { category: "Travel", budget: 28000, actual: 24000, variance: -14.7 },
  { category: "Operations", budget: 55000, actual: 50420, variance: -8.4 },
  { category: "Others", budget: 25000, actual: 22620, variance: -9.2 },
];

/* cash flow */
const cashFlowData = [
  { date: "1 May", inflow: 2200000, outflow: 1900000, balance: 820000 },
  { date: "5 May", inflow: 2350000, outflow: 2050000, balance: 950000 },
  { date: "10 May", inflow: 2600000, outflow: 2150000, balance: 870000 },
  { date: "15 May", inflow: 2750000, outflow: 2300000, balance: 800000 },
  { date: "20 May", inflow: 2854000, outflow: 2380000, balance: 875000 },
  { date: "25 May", inflow: 2854000, outflow: 2450000, balance: 750000 },
  { date: "31 May", inflow: 2854000, outflow: 2466500, balance: 875000 },
];

/* expense breakdown */
const expenseBreakdown = [
  { name: "Salaries", value: 625000, pct: "71.3%", color: "#6366f1" },
  { name: "Benefits", value: 112000, pct: "12.8%", color: "#22c55e" },
  { name: "Recruitment", value: 56000, pct: "6.4%", color: "#f59e0b" },
  { name: "Training", value: 38500, pct: "4.4%", color: "#3b82f6" },
  { name: "Travel", value: 24000, pct: "2.7%", color: "#ec4899" },
  { name: "Others", value: 21040, pct: "2.4%", color: "#94a3b8" },
];

/* top expense claims */
const topClaims = [
  { name: "Vikram Rao", category: "Travel", amount: "₹18,900", submittedOn: "19 May 2025", daysPending: 5, avatar: "VR", gradient: "from-blue-500 to-indigo-600" },
  { name: "Neha Patel", category: "Client Meeting", amount: "₹8,450", submittedOn: "18 May 2025", daysPending: 6, avatar: "NP", gradient: "from-rose-400 to-pink-500" },
  { name: "Arjun Mehta", category: "Travel", amount: "₹7,120", submittedOn: "17 May 2025", daysPending: 7, avatar: "AM", gradient: "from-violet-400 to-purple-500" },
  { name: "Sneha Iyer", category: "Meals", amount: "₹5,680", submittedOn: "20 May 2025", daysPending: 4, avatar: "SI", gradient: "from-pink-400 to-rose-500" },
  { name: "Rahul Sharma", category: "Office Supplies", amount: "₹4,320", submittedOn: "19 May 2025", daysPending: 5, avatar: "RS", gradient: "from-indigo-500 to-purple-600" },
];

/* quick actions */
const quickActions = [
  { label: "Process Payroll", sub: "Run payroll for this cycle", icon: IndianRupee, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Approve Expense Claims", sub: "18 claims pending approval", icon: CheckCircle2, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Add Expense", sub: "Record a new expense", icon: Plus, color: "text-green-600", bg: "bg-green-50" },
  { label: "Download Financial Reports", sub: "P&L, Budget, Cash Flow and more", icon: Download, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Configure Budget", sub: "Set or update budget allocations", icon: Settings, color: "text-purple-600", bg: "bg-purple-50" },
];

/* financial insights */
const insights = [
  { type: "good", title: "Good News!", desc: "Payroll cost is 8.3% under budget this month.", action: "View Details", icon: "✅", border: "border-green-200 bg-green-50", titleColor: "text-green-700" },
  { type: "warn", title: "Attention", desc: "Recruitment expenses are 22.1% over budget.", action: "View Details", icon: "⚠️", border: "border-amber-200 bg-amber-50", titleColor: "text-amber-700" },
  { type: "error", title: "High Expense Claim Delay", desc: "12 claims are pending for more than 5 days.", action: "Review Claims", icon: "🔴", border: "border-red-200 bg-red-50", titleColor: "text-red-700" },
  { type: "info", title: "Cost Efficiency", desc: "Cost per employee decreased by 6.2% vs last month.", action: "View Analysis", icon: "💡", border: "border-blue-200 bg-blue-50", titleColor: "text-blue-700" },
];

/* ── custom tooltip ── */
const CustomBudgetTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-lg text-[10px]">
        <p className="font-bold text-gray-700 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>{p.name}: ₹{(p.value / 100000).toFixed(1)}L</p>
        ))}
      </div>
    );
  }
  return null;
};

/* ─── Finance Page ──────────────────────────────────────── */
export default function FinancePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-indigo-600" />
            <h1 className="text-lg font-bold text-gray-900">Finance</h1>
          </div>
          <p className="text-[11px] text-gray-400">Manage payroll, expenses and cost efficiency in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" /> 21 May – 21 Jun 2025
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50">
            <Download className="w-3.5 h-3.5" /> Download Summary
          </button>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-4">
        {/* ── Top 3 KPI panels ── */}
        <div className="grid grid-cols-3 gap-4">
          {/* PAYROLL */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center"><IndianRupee className="w-3.5 h-3.5 text-indigo-600" /></div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Payroll</span>
              <span className="text-[10px] text-gray-400">(This Cycle)</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-2">
                <p className="text-[10px] text-gray-400 mb-0.5">Total Payroll</p>
                <p className="text-xl font-black text-gray-900">₹1,24,58,760</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-[11px] text-green-600 font-semibold">+4.38%</span>
                  <span className="text-[10px] text-gray-400">vs Last Cycle</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Errors Detected</p>
                <p className="text-2xl font-black text-red-500">12</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Pending Approvals</p>
                <p className="text-2xl font-black text-amber-500">7</p>
              </div>
            </div>
          </div>

          {/* EXPENSES */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center"><CreditCard className="w-3.5 h-3.5 text-amber-600" /></div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Expenses</span>
              <span className="text-[10px] text-gray-400">(This Month)</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-2">
                <p className="text-[10px] text-gray-400 mb-0.5">Total Expenses</p>
                <p className="text-xl font-black text-gray-900">₹8,76,540</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <TrendingUp className="w-3 h-3 text-red-500" />
                  <span className="text-[11px] text-red-500 font-semibold">+6.21%</span>
                  <span className="text-[10px] text-gray-400">vs Last Month</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Pending Claims</p>
                <p className="text-2xl font-black text-amber-500">18</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Rejected Claims</p>
                <p className="text-2xl font-black text-red-500">5</p>
              </div>
            </div>
          </div>

          {/* COST VS OUTPUT */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-green-50 flex items-center justify-center"><BarChart2 className="w-3.5 h-3.5 text-green-600" /></div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Cost vs Output</span>
              <span className="text-[10px] text-gray-400">(This Month)</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-2">
                <p className="text-[10px] text-gray-400 mb-0.5">Total Workforce Cost</p>
                <p className="text-xl font-black text-gray-900">₹1,24,58,760</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Output Index</p>
                <p className="text-2xl font-black text-gray-900">82.4</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Cost per Output Unit</p>
                <p className="text-base font-black text-gray-900">₹151.12</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-[11px] text-green-600 font-semibold">+8.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Overview panels row ── */}
        <div className="grid grid-cols-3 gap-4">
          {/* PAYROLL OVERVIEW */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Payroll Overview</h3>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded hover:bg-gray-100"><Filter className="w-3.5 h-3.5 text-gray-400" /></button>
                <button className="p-1 rounded hover:bg-gray-100"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
              </div>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                    <th className="text-left px-3 py-2">Employee</th>
                    <th className="text-right px-2 py-2">Base Salary</th>
                    <th className="text-right px-2 py-2">Additions</th>
                    <th className="text-right px-2 py-2">Deductions</th>
                    <th className="text-right px-2 py-2">Final Pay</th>
                    <th className="text-left px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollData.map((p, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <Avatar initials={p.avatar} gradient={p.gradient} />
                          <span className="text-[11px] font-semibold text-gray-800 whitespace-nowrap">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-2 py-2.5 text-right text-[10px] text-gray-600">{p.baseSalary}</td>
                      <td className="px-2 py-2.5 text-right text-[10px] text-green-600">{p.additions}</td>
                      <td className="px-2 py-2.5 text-right text-[10px] text-red-500">{p.deductions}</td>
                      <td className="px-2 py-2.5 text-right text-[11px] font-bold text-gray-800">{p.finalPay}</td>
                      <td className="px-3 py-2.5"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="border-t-2 border-gray-200 bg-gray-50">
                    <td className="px-3 py-2 text-[11px] font-bold text-gray-700">TOTAL</td>
                    <td className="px-2 py-2 text-right text-[10px] font-bold text-gray-700">₹10,58,740</td>
                    <td className="px-2 py-2 text-right text-[10px] font-bold text-green-600">₹1,12,000</td>
                    <td className="px-2 py-2 text-right text-[10px] font-bold text-red-500">₹1,06,150</td>
                    <td className="px-2 py-2 text-right text-[11px] font-black text-gray-900">₹12,64,660</td>
                    <td className="px-3 py-2" />
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
              <button className="flex items-center gap-1.5 text-xs text-indigo-600 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-medium">
                Process Payroll
              </button>
              <button className="text-[11px] text-indigo-600 hover:underline">View Payroll Summary</button>
            </div>
          </div>

          {/* EXPENSES OVERVIEW */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Expenses Overview</h3>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded hover:bg-gray-100"><Filter className="w-3.5 h-3.5 text-gray-400" /></button>
                <button className="p-1 rounded hover:bg-gray-100"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
              </div>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                    <th className="text-left px-3 py-2">Employee</th>
                    <th className="text-left px-3 py-2">Category</th>
                    <th className="text-right px-2 py-2">Amount</th>
                    <th className="text-left px-3 py-2">Date</th>
                    <th className="text-left px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expensesData.map((e, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <Avatar initials={e.avatar} gradient={e.gradient} />
                          <span className="text-[11px] font-semibold text-gray-800 whitespace-nowrap">{e.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-600">{e.category}</td>
                      <td className="px-2 py-2.5 text-right text-[11px] font-bold text-gray-800">{e.amount}</td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-400 whitespace-nowrap">{e.date}</td>
                      <td className="px-3 py-2.5"><StatusBadge status={e.status} /></td>
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="border-t-2 border-gray-200 bg-gray-50">
                    <td className="px-3 py-2 text-[11px] font-bold text-gray-700">TOTAL</td>
                    <td colSpan={2} className="px-2 py-2 text-right text-[11px] font-black text-gray-900">₹8,76,540</td>
                    <td colSpan={2} className="px-3 py-2" />
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
              <button className="flex items-center gap-1.5 text-xs text-indigo-600 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-medium">
                <Plus className="w-3 h-3" /> Add Expense
              </button>
              <button className="text-[11px] text-indigo-600 hover:underline">View All Expenses</button>
            </div>
          </div>

          {/* COST VS OUTPUT ANALYSIS */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Cost vs Output Analysis</h3>
              </div>
              <select className="text-[10px] border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 focus:outline-none">
                <option>By Team</option>
              </select>
            </div>
            <div className="flex flex-1 p-3 gap-3">
              {/* Scatter plot */}
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 mb-1 text-center">Cost vs Output Matrix</p>
                <div className="relative h-40 border border-gray-100 rounded-lg bg-gray-50/50 overflow-hidden">
                  {/* Quadrant labels */}
                  <div className="absolute top-1 left-1 text-[8px] text-blue-600 bg-blue-50 px-1 py-0.5 rounded leading-tight font-medium">Low Cost<br />High Output</div>
                  <div className="absolute top-1 right-1 text-[8px] text-purple-600 bg-purple-50 px-1 py-0.5 rounded leading-tight font-medium text-right">High Cost<br />High Output</div>
                  <div className="absolute bottom-1 left-1 text-[8px] text-green-600 bg-green-50 px-1 py-0.5 rounded leading-tight font-medium">Low Cost<br />Low Output</div>
                  <div className="absolute bottom-1 right-1 text-[8px] text-red-500 bg-red-50 px-1 py-0.5 rounded leading-tight font-medium text-right">High Cost<br />Low Output</div>
                  {/* Divider lines */}
                  <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-gray-200" /></div>
                  <div className="absolute inset-0 flex justify-center"><div className="w-px h-full bg-gray-200" /></div>
                  {/* Axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[8px] text-gray-400">
                    <span>Low</span><span>Cost</span><span>High</span>
                  </div>
                  {/* Dots */}
                  {scatterData.map((d, i) => (
                    <div key={i} className="absolute w-2.5 h-2.5 rounded-full opacity-80 hover:opacity-100 transition cursor-pointer"
                      style={{ left: `${d.x}%`, top: `${100 - d.y}%`, backgroundColor: d.color, transform: "translate(-50%,-50%)" }}
                      title={d.name} />
                  ))}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] text-gray-400" style={{left: -12}}>Output</div>
                </div>
              </div>
              {/* Team table */}
              <div className="w-32 shrink-0">
                <p className="text-[10px] text-gray-400 mb-2">Top Efficiency (By Team)</p>
                <div className="space-y-1 mb-1">
                  <div className="grid grid-cols-3 text-[9px] text-gray-400 font-medium px-1">
                    <span></span><span>Team</span><span className="text-right">Score</span>
                  </div>
                </div>
                {teamEfficiency.map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5 py-1 border-b border-gray-50 last:border-0">
                    <span className="text-[9px] text-gray-400 w-3">{t.rank}</span>
                    <span className="text-[10px] text-gray-700 flex-1 font-medium">{t.team}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-8 bg-gray-100 rounded-full h-1"><div className={`h-1 rounded-full ${t.color}`} style={{width:`${t.score}%`}} /></div>
                      <span className="text-[9px] font-bold text-gray-700">{t.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 py-2.5 border-t border-gray-100 flex justify-end">
              <button className="text-[11px] text-indigo-600 hover:underline">View Detailed Analysis</button>
            </div>
          </div>
        </div>

        {/* ── Budget vs Actual + Cash Flow ── */}
        <div className="grid grid-cols-2 gap-4">
          {/* BUDGET VS ACTUAL */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Budget vs Actual</h3>
                <span className="text-[10px] text-gray-400">(This Month)</span>
              </div>
            </div>
            {/* Summary row */}
            <div className="grid grid-cols-4 gap-3 mb-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400">Total Budget</p>
                <p className="text-sm font-black text-gray-900">₹1,35,00,000</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Total Actual</p>
                <p className="text-sm font-black text-gray-900">₹1,18,76,540</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Variance</p>
                <p className="text-sm font-black text-green-600">₹16,23,460</p>
                <p className="text-[10px] text-green-600">(-12.02%)</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Budget Utilization</p>
                <p className="text-sm font-black text-indigo-600">87.98%</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={budgetActual} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/100000).toFixed(0)}L`} />
                <Tooltip content={<CustomBudgetTooltip />} wrapperStyle={{ zIndex: 1000 }} allowEscapeViewBox={{ x: true, y: true }} />
                <Bar dataKey="budget" name="Budget" fill="#e0e7ff" radius={[2,2,0,0]} />
                <Bar dataKey="actual" name="Actual" fill="#6366f1" radius={[2,2,0,0]} />
                {/* Variance labels */}
              </BarChart>
            </ResponsiveContainer>
            {/* Variance % annotations */}
            <div className="flex justify-between px-1 mt-1">
              {budgetActual.map((b) => (
                <span key={b.category} className={`text-[9px] font-bold ${b.variance < 0 ? "text-green-600" : "text-red-500"}`}>{b.variance > 0 ? "+" : ""}{b.variance}%</span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-indigo-200" /><span className="text-[10px] text-gray-500">Budget</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-indigo-600" /><span className="text-[10px] text-gray-500">Actual</span></div>
              <button className="ml-auto text-[11px] text-indigo-600 hover:underline">View Full Budget Report</button>
            </div>
          </div>

          {/* CASH FLOW */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Cash Flow</h3>
                <span className="text-[10px] text-gray-400">(This Month)</span>
              </div>
            </div>
            {/* Summary row */}
            <div className="grid grid-cols-4 gap-3 mb-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400">Opening Balance</p>
                <p className="text-sm font-black text-gray-900">₹79,75,000</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Total Inflow</p>
                <p className="text-sm font-black text-green-600">₹2,85,40,000</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Total Outflow</p>
                <p className="text-sm font-black text-red-500">₹2,46,65,000</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Closing Balance</p>
                <p className="text-sm font-black text-gray-900">₹87,50,000</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/100000).toFixed(0)}L`} />
                <Tooltip contentStyle={{ fontSize: 10 }} formatter={(v: any) => [`₹${(v/100000).toFixed(1)}L`]} wrapperStyle={{ zIndex: 1000 }} allowEscapeViewBox={{ x: true, y: true }} />
                <Line type="monotone" dataKey="inflow" name="Inflow" stroke="#22c55e" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="outflow" name="Outflow" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="balance" name="Balance" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 2" dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-green-500" /><span className="text-[10px] text-gray-500">Inflow</span></div>
              <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-red-500" /><span className="text-[10px] text-gray-500">Outflow</span></div>
              <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-indigo-500 border-dashed" style={{borderTop:"2px dashed #6366f1", background:"none"}} /><span className="text-[10px] text-gray-500">Balance</span></div>
              <button className="ml-auto text-[11px] text-indigo-600 hover:underline">View Cash Flow Statement</button>
            </div>
          </div>
        </div>

        {/* ── Expense Breakdown + Top Claims + Quick Actions ── */}
        <div className="grid grid-cols-3 gap-4">
          {/* EXPENSE BREAKDOWN */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Expense Breakdown</h3>
                <span className="text-[10px] text-gray-400">(This Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Donut */}
              <div className="relative shrink-0">
                <PieChart width={110} height={110}>
                  <Pie data={expenseBreakdown} cx={50} cy={50} innerRadius={30} outerRadius={52} dataKey="value" strokeWidth={1.5}>
                    {expenseBreakdown.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[9px] text-gray-400">Total</span>
                  <span className="text-[11px] font-black text-gray-800 leading-tight">₹8,76,540</span>
                </div>
              </div>
              {/* List */}
              <div className="flex flex-col gap-1.5 flex-1">
                {expenseBreakdown.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[10px] text-gray-700 flex-1">{d.name}</span>
                    <span className="text-[10px] font-bold text-gray-800">₹{d.value.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-400 w-10 text-right">{d.pct}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="mt-3 text-[11px] text-indigo-600 hover:underline">View Detailed Breakdown</button>
          </div>

          {/* TOP EXPENSE CLAIMS PENDING */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Top Expense Claims Pending</h3>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                    <th className="text-left px-3 py-2">Employee</th>
                    <th className="text-left px-3 py-2">Category</th>
                    <th className="text-right px-2 py-2">Amount</th>
                    <th className="text-left px-3 py-2">Submitted On</th>
                    <th className="text-center px-3 py-2">Days Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {topClaims.map((c, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <Avatar initials={c.avatar} gradient={c.gradient} />
                          <span className="text-[11px] font-semibold text-gray-800 whitespace-nowrap">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-600">{c.category}</td>
                      <td className="px-2 py-2.5 text-right text-[11px] font-bold text-gray-800">{c.amount}</td>
                      <td className="px-3 py-2.5 text-[10px] text-gray-400 whitespace-nowrap">{c.submittedOn}</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.daysPending >= 7 ? "bg-red-100 text-red-700" : c.daysPending >= 5 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                          {c.daysPending}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 border-t border-gray-100">
              <button className="text-[11px] text-indigo-600 hover:underline">View All Expense Claims</button>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">Quick Actions</h3>
            {quickActions.map((qa, i) => (
              <button key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition text-left group">
                <div className={`w-8 h-8 rounded-lg ${qa.bg} flex items-center justify-center shrink-0`}>
                  <qa.icon className={`w-4 h-4 ${qa.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-800">{qa.label}</p>
                  <p className="text-[10px] text-gray-400 truncate">{qa.sub}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Financial Insights & Alerts ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Financial Insights &amp; Alerts</h3>
          <div className="grid grid-cols-4 gap-3">
            {insights.map((ins, i) => (
              <div key={i} className={`rounded-xl border p-3 ${ins.border}`}>
                <div className="flex items-start gap-2 mb-1.5">
                  <span className="text-base">{ins.icon}</span>
                  <p className={`text-[11px] font-bold ${ins.titleColor}`}>{ins.title}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mb-2">{ins.desc}</p>
                <button className={`text-[10px] font-semibold ${ins.titleColor} hover:underline`}>{ins.action}</button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer note ── */}
        <div className="flex items-center gap-3 text-[10px] text-gray-400 pb-2">
          <span>All amounts are in INR (₹)</span>
          <span>•</span>
          <span>Data as of 21 May 2025, 05:30 PM</span>
          <span>•</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Auto-refreshed</span>
        </div>
      </div>
    </div>
  );
}