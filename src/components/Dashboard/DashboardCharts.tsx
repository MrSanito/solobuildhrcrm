import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { funnelStages, funnelColors, attendanceData } from "./data";

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
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
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            {funnelStages.map((s, i) => (
              <div key={s.stage} className="flex items-center gap-2">
                <div
                  className="h-7 rounded-sm flex items-center justify-center transition-all hover:opacity-80 cursor-pointer"
                  style={{
                    width: s.width,
                    backgroundColor: funnelColors[i],
                    minWidth: 24,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex-1 min-w-[200px]">
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
        <div className="flex items-center gap-6 overflow-hidden">
          <div className="relative shrink-0">
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
          <div className="flex flex-col gap-3 min-w-0 flex-1">
            {attendanceData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 truncate">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: d.color }}
                />
                <span className="text-xs text-gray-700 font-medium w-14 shrink-0">
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
  );
}
