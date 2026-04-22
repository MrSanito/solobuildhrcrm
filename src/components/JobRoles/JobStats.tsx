import React from "react";
import { stats, Sparkline } from "./data";

export default function JobStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {stats.map(s=>(
        <div key={s.label} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="text-xs text-gray-500 truncate mb-1">{s.label}</div>
          <div className="text-xl font-bold text-gray-800">{s.value}</div>
          <div className={`text-[11px] mt-0.5 ${s.subColor}`}>{s.sub}</div>
          <Sparkline color={s.sparkColor}/>
        </div>
      ))}
    </div>
  );
}
