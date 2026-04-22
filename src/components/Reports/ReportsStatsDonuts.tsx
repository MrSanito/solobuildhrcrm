import React from "react";
import {
  PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { reportCategoriesData, generationTrend, formatData, reportStats } from "./data";

export default function ReportsStatsDonuts() {
  return (
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
                <span className="text-[10px] text-gray-400 text-right">({d.pct})</span>
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
          {reportStats.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}><s.icon className={`w-3.5 h-3.5 ${s.color}`} /></div>
              <div>
                <p className="text-[10px] text-gray-400">{s.label}</p>
                <p className="text-xs font-bold text-gray-800 leading-tight">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
