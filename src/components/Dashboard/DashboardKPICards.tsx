import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { kpiCards, Sparkline } from "./data";

export default function DashboardKPICards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-5">
      {kpiCards.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-500 font-medium leading-tight">
              {kpi.label}
            </span>
          </div>
          <div className="text-lg font-bold text-gray-900 leading-tight">
            {kpi.value}
          </div>
          <div
            className={`text-[10px] mt-0.5 flex items-center gap-1 ${kpi.up ? "text-green-600" : "text-red-500"}`}
          >
            {kpi.up ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {kpi.change}
          </div>
          <div className="mt-2">
            <Sparkline data={kpi.spark} color={kpi.sparkColor} />
          </div>
        </div>
      ))}
    </div>
  );
}
