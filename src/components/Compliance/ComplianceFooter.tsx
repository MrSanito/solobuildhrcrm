import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { expiringItems, docStatusData, calDays, highRisk, mediumRisk, lowRisk, today, riskBadge } from "./data";

export default function ComplianceFooter() {
  const [calMonth] = useState("May 2025");

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mb-4">
        {/* Expiring Soon */}
        <div className="xl:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Expiring Soon</p>
            <a href="#" className="text-xs text-indigo-600 hover:underline font-medium">View All →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Document / Requirement","Applicable To","Expiry Date","Days Left","Risk Level",""].map(h => (
                    <th key={h} className="text-left pb-2 font-semibold text-slate-400 pr-2 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expiringItems.map((e, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-2 pr-2 font-medium text-slate-700 whitespace-nowrap">{e.doc}</td>
                    <td className="py-2 pr-2 text-slate-400 whitespace-nowrap">{e.app}</td>
                    <td className="py-2 pr-2 text-slate-400 whitespace-nowrap">{e.expiry}</td>
                    <td className="py-2 pr-2">
                      <span className={`font-bold ${e.days <= 10 ? "text-red-600" : e.days <= 20 ? "text-amber-600" : "text-emerald-600"}`}>{e.days}</span>
                    </td>
                    <td className="py-2 pr-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${riskBadge(e.risk)}`}>{e.risk}</span>
                    </td>
                    <td className="py-2">
                      <button className="btn btn-xs btn-ghost text-indigo-500 hover:bg-indigo-50 rounded border border-indigo-100 px-1.5">👁</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a href="#" className="block text-xs text-indigo-600 hover:underline mt-3 font-medium">View All Expiring Items →</a>
        </div>

        {/* Document Compliance Status */}
        <div className="xl:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Document Compliance Status</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <PieChart width={150} height={150}>
                <Pie data={docStatusData} cx={70} cy={70} innerRadius={42} outerRadius={65} dataKey="value" strokeWidth={0}>
                  {docStatusData.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-lg font-bold text-slate-800">1,248</p>
                <p className="text-xs text-slate-400">Total</p>
                <p className="text-xs text-slate-400">Documents</p>
              </div>
            </div>
            <div className="flex-1 min-w-[130px] space-y-2">
              {docStatusData.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-slate-600 flex-1">{s.name}</span>
                  <span className="font-bold text-slate-700">{s.value} ({s.pct}%)</span>
                </div>
              ))}
            </div>
          </div>
          <a href="#" className="block text-center text-xs text-indigo-600 hover:underline mt-4 font-medium">View Document Repository →</a>
        </div>

        {/* Compliance Calendar */}
        <div className="xl:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Compliance Calendar</p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <button className="w-5 h-5 rounded hover:bg-slate-100 flex items-center justify-center">‹</button>
              <span className="font-semibold text-slate-700 whitespace-nowrap">{calMonth}</span>
              <button className="w-5 h-5 rounded hover:bg-slate-100 flex items-center justify-center">›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} className="text-xs text-slate-400 font-semibold py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center">
            {/* padding before 1st (Thursday = index 4) */}
            {[27,28,29,30].map(d => (
              <div key={`prev-${d}`} className="text-xs text-slate-300 py-1.5 rounded">{d}</div>
            ))}
            {calDays.map(d => {
              const isHigh   = highRisk.includes(d);
              const isMed    = mediumRisk.includes(d);
              const isLow    = lowRisk.includes(d);
              const isToday  = d === today;
              return (
                <div key={d} className={`text-xs py-1.5 rounded cursor-pointer relative
                  ${isToday ? "bg-indigo-600 text-white font-bold" :
                    isHigh  ? "text-slate-700" :
                    isMed   ? "text-slate-700" :
                    isLow   ? "text-slate-700" :
                    "text-slate-600"}
                  hover:bg-slate-100 transition-colors`}>
                  {d}
                  {(isHigh || isMed || isLow) && !isToday && (
                    <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full
                      ${isHigh ? "bg-red-500" : isMed ? "bg-amber-500" : "bg-emerald-500"}`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {[{ color: "bg-red-500", label: "High Risk" }, { color: "bg-amber-500", label: "Medium Risk" }, { color: "bg-emerald-500", label: "Low Risk" }].map(l => (
              <div key={l.label} className="flex items-center gap-1 text-xs text-slate-500">
                <span className={`w-2 h-2 rounded-full ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>
          <a href="#" className="block text-xs text-indigo-600 hover:underline mt-2 font-medium text-right">View Full Calendar →</a>
        </div>
      </div>

      {/* ── COMPLIANCE INSIGHT FOOTER ──────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg flex-shrink-0">💡</span>
          <div>
            <p className="text-xs font-semibold text-slate-700">Compliance Insight</p>
            <p className="text-xs text-slate-500">Your compliance score is 6% higher than last month. Great job! Focus on resolving 3 high risk items to maintain this trend.</p>
          </div>
        </div>
        <button className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-lg text-xs flex items-center gap-1.5">
          View Recommendations →
        </button>
      </div>
    </>
  );
}
