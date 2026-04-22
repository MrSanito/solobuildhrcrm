import React from "react";

export default function ScreeningStats() {
  const stats = [
    { label:"Total Resumes",        value:"248", sub:"↑ 18% from last 7 days",   subC:"text-green-500",  iconBg:"bg-blue-50",   icon:"📄" },
    { label:"Best Match",           value:"92",  sub:"37.10% of total",           subC:"text-gray-400",   iconBg:"bg-green-50",  icon:"✅" },
    { label:"Potential Candidates", value:"78",  sub:"31.45% of total",           subC:"text-gray-400",   iconBg:"bg-amber-50",  icon:"📋" },
    { label:"Not a Fit",            value:"78",  sub:"31.45% of total",           subC:"text-gray-400",   iconBg:"bg-red-50",    icon:"❌" },
    { label:"Shortlisted",          value:"24",  sub:"9.68% of total",            subC:"text-gray-400",   iconBg:"bg-purple-50", icon:"⭐" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map(c=>(
        <div key={c.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className={`${c.iconBg} rounded-xl p-3 text-xl flex-shrink-0`}>{c.icon}</div>
          <div>
            <div className="text-xs text-gray-500">{c.label}</div>
            <div className="text-2xl font-bold text-gray-800">{c.value}</div>
            <div className={`text-xs ${c.subC}`}>{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
