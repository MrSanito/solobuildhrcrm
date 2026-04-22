import React from "react";
import { requirements, violations, statusBadge, riskBadge, impactDot } from "./data";

export default function TablesSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
      {/* Compliance Requirements */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Compliance Requirements</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                {["Requirement","Category","Applicable To","Status","Due Date","Risk Level","Owner"].map(h => (
                  <th key={h} className="text-left pb-2 font-semibold text-slate-400 pr-2 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requirements.map((r, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-2 pr-2 text-slate-700 font-medium whitespace-nowrap">{r.name}</td>
                  <td className="py-2 pr-2 whitespace-nowrap">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-xs">{r.cat}</span>
                  </td>
                  <td className="py-2 pr-2 text-slate-400 whitespace-nowrap">{r.applicableTo}</td>
                  <td className="py-2 pr-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(r.status)}`}>{r.status}</span>
                  </td>
                  <td className="py-2 pr-2 text-slate-400 whitespace-nowrap">{r.due}</td>
                  <td className="py-2 pr-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${riskBadge(r.risk)}`}>{r.risk}</span>
                  </td>
                  <td className="py-2 pr-2">
                    <div className="flex -space-x-1">
                      {[0,1,2].map(j => (
                        <span key={j} className="w-5 h-5 rounded-full bg-indigo-200 border-2 border-white text-indigo-700 text-xs flex items-center justify-center font-bold">F</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="#" className="block text-xs text-indigo-600 hover:underline mt-3 font-medium">View All Requirements →</a>
      </div>

      {/* Violations & Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Violations &amp; Actions</p>
          <a href="#" className="text-xs text-indigo-600 hover:underline font-medium">View All Violations →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                {["Issue","Impact","Due Date","Status",""].map(h => (
                  <th key={h} className="text-left pb-2 font-semibold text-slate-400 pr-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {violations.map((v, i) => {
                const [title, sub] = v.issue.split("\n");
                return (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 pr-3 max-w-[200px]">
                      <p className="font-medium text-slate-700 truncate">{title}</p>
                      <p className="text-slate-400 truncate">{sub}</p>
                    </td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${impactDot(v.impact)}`} />
                        <span className={`font-semibold ${v.impact === "High" ? "text-red-600" : v.impact === "Medium" ? "text-amber-600" : "text-sky-600"}`}>{v.impact}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 text-slate-400 whitespace-nowrap">{v.due}</td>
                    <td className="py-2.5 pr-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-xs">{v.status}</span>
                    </td>
                    <td className="py-2.5">
                      <button className="btn btn-xs btn-ghost text-indigo-500 hover:bg-indigo-50 border border-indigo-100 rounded-lg text-xs px-2">→</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
