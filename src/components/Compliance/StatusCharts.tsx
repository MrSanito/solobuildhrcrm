import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { statusData, trendData } from "./data";

export default function StatusCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
      {/* Compliance Status Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Compliance Status Overview</p>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="relative">
            <PieChart width={180} height={180}>
              <Pie data={statusData} cx={85} cy={85} innerRadius={55} outerRadius={80} dataKey="value" strokeWidth={0}>
                {statusData.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-slate-800">126</p>
              <p className="text-xs text-slate-400">Total</p>
              <p className="text-xs text-slate-400">Requirements</p>
            </div>
          </div>
          <div className="flex-1 min-w-[180px] space-y-3">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-sm text-slate-600 flex-1">{s.name}</span>
                <span className="font-bold text-slate-800 text-sm">{s.value} ({s.pct}%)</span>
              </div>
            ))}
            <div className="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
              <span className="text-emerald-600">✓</span>
              <p className="text-xs text-emerald-700 font-medium">Good job! Your compliance score is excellent.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Score Trend */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Compliance Score Trend</p>
          <button className="btn btn-xs btn-outline border-slate-200 text-slate-500 rounded-lg text-xs">Last 6 Months ▾</button>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
            <defs>
              <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12, border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v}%`, "Score"]} />
            <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={2.5}
              dot={{ r: 4, fill: "#22c55e", strokeWidth: 0 }}
              label={{ position: "top", fontSize: 10, fill: "#16a34a", fontWeight: 600 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
