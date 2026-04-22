import React from "react";
import { Filter, Calendar, ChevronRight } from "lucide-react";

export default function ReportsFilters() {
  const filters = [
    { label: "Date Range", value: "21 May – 21 Jun 2025", icon: Calendar },
    { label: "Department", value: "All" },
    { label: "Location", value: "All" },
    { label: "Job Res", value: "All" },
    { label: "Employment Type", value: "All" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex items-center gap-3 flex-wrap">
      {filters.map((f, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <label className="text-[10px] text-gray-400 font-medium">{f.label}</label>
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 bg-white min-w-[100px] cursor-pointer hover:bg-gray-50">
            {f.icon && <f.icon className="w-3 h-3 text-indigo-400 shrink-0" />}
            <span>{f.value}</span>
            <ChevronRight className="w-3 h-3 text-gray-400 rotate-90 ml-auto" />
          </div>
        </div>
      ))}
      <div className="ml-auto mt-3">
        <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
          <Filter className="w-3 h-3" /> Apply Filters
        </button>
      </div>
    </div>
  );
}
