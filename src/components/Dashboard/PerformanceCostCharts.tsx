import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { performanceData, costOutputData } from "./data";

export default function PerformanceCostCharts() {
  const performanceStats = [
    { label: "High Performers", value: "248", pct: "(19.9%)", color: "text-green-600", bg: "bg-green-50" },
    { label: "On Track", value: "842", pct: "(67.6%)", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Needs Improvement", value: "136", pct: "(10.9%)", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "At Risk", value: "22", pct: "(1.8%)", color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
      {/* Performance Snapshot */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Performance Snapshot</h3>
          <button className="text-xs text-indigo-600 hover:underline">View all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {performanceStats.map((s) => (
            <div key={s.label} className={`${s.bg} rounded-lg p-2 transition-transform hover:scale-105`}>
              <div className={`text-[10px] font-medium ${s.color}`}>{s.label}</div>
              <div className={`text-base font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-gray-500">{s.pct}</div>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={130}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            <Line type="monotone" dataKey="high" stroke="#22c55e" strokeWidth={2} dot={false} name="High Performers" />
            <Line type="monotone" dataKey="track" stroke="#3b82f6" strokeWidth={2} dot={false} name="On Track" />
            <Line type="monotone" dataKey="needs" stroke="#f59e0b" strokeWidth={2} dot={false} name="Needs Improvement" />
            <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} dot={false} name="At Risk" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cost vs Output */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Cost vs Output <span className="text-gray-400 font-normal">(This Month)</span>
            </h3>
          </div>
          <button className="text-xs text-indigo-600 hover:underline">View report</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-[10px] text-gray-500">Total Cost</p>
            <p className="text-lg font-bold text-gray-800">₹2.48 Cr</p>
            <p className="text-[10px] text-red-500 flex items-center gap-1 font-bold">
              <TrendingUp className="w-3 h-3" /> 8.6% vs last month
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500">Output Index</p>
            <p className="text-lg font-bold text-gray-800">1.18</p>
            <p className="text-[10px] text-green-500 flex items-center gap-1 font-bold">
              <TrendingUp className="w-3 h-3" /> 6.3% vs last month
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={130}>
          <LineChart data={costOutputData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            <Line type="monotone" dataKey="cost" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} name="Total Cost (₹ Cr)" />
            <Line type="monotone" dataKey="output" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} name="Output Index" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
