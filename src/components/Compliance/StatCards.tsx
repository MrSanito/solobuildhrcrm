import React from "react";
import { statCards } from "./data";

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7 gap-3 mb-4">
      {statCards.map((s) => (
        <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{s.icon}</span>
            <p className="text-xs text-slate-400 leading-tight">{s.label}</p>
          </div>
          <p className={`font-bold ${s.valCls}`}>{s.val}</p>
          <p className="text-xs text-slate-400">{s.sub}</p>
          <a href="#" className="text-xs text-indigo-600 hover:underline mt-auto">View details →</a>
        </div>
      ))}
    </div>
  );
}
