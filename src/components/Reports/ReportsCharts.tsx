import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import { headcountTrend, attritionTrend, deptData, genderData } from "./data";

const COLORS_DEPT = deptData.map(d => d.color);

export default function ReportsCharts() {
  return (
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
            <Tooltip contentStyle={{ fontSize: 10 }} wrapperStyle={{ zIndex: 1000 }} allowEscapeViewBox={{ x: true, y: true }} />
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
            <Tooltip contentStyle={{ fontSize: 10 }} formatter={(v: any) => [`${v}%`]} wrapperStyle={{ zIndex: 1000 }} allowEscapeViewBox={{ x: true, y: true }} />
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
  );
}
