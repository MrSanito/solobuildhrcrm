import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { kpiData } from "./data";

export default function ReportsKPIs() {
  return (
    <div className="grid grid-cols-6 gap-3">
      {kpiData.map((k, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-medium leading-tight">{k.label}</span>
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${k.bg}`}><k.icon className={`w-3.5 h-3.5 ${k.color}`} /></div>
          </div>
          <div className="text-base font-black text-gray-900 leading-tight">{k.value}</div>
          <div className={`text-[10px] flex items-center gap-1 ${k.up ? "text-green-600" : "text-red-500"}`}>
            {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {k.change}
          </div>
        </div>
      ))}
    </div>
  );
}
