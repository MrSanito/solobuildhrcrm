import React from "react";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { kpis } from "./data";

export default function KPIGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl bg-${kpi.color}-50 flex items-center justify-center text-${kpi.color}-600 group-hover:scale-110 transition-transform`}>
              <kpi.icon size={20} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-rose-600' : 'text-slate-400'}`}>
              {kpi.trend === 'up' ? <ArrowUpRight size={14}/> : kpi.trend === 'down' ? <ArrowDownRight size={14}/> : <Activity size={14}/>}
              {kpi.sub}
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
          <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">{kpi.label}</p>
        </div>
      ))}
    </div>
  );
}
