import React from "react";
import { categories } from "./data";

export default function CategoryBreakdown() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-4">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Compliance by Category</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-4">
        {categories.map((c) => (
          <div key={c.name} className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-base">
                {c.name === "Statutory Compliance" ? "🏛" :
                 c.name === "Tax Compliance"       ? "📑" :
                 c.name === "Employment Laws"      ? "⚖" :
                 c.name === "Policies & Procedures"? "📌" :
                 c.name === "Contracts & Agreements"?"🤝" :
                 c.name === "Data Protection"      ? "🔒" : "⋯"}
              </span>
              <p className="text-xs text-slate-600 leading-tight font-medium">{c.name}</p>
            </div>
            <p className="text-sm font-bold text-slate-800">{c.done}/{c.total}</p>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${c.pct >= 95 ? "bg-emerald-500" : c.pct >= 85 ? "bg-sky-500" : "bg-amber-500"}`}
                style={{ width: `${c.pct}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">{c.pct}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
