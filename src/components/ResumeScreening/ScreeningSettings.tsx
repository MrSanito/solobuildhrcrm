import React from "react";

export default function ScreeningSettings() {
  const settings = [
    { label:"AI Model",                      value:"SB Auto AI v2.1" },
    { label:"Minimum AI Score for Best Match",value:"70" },
    { label:"Potential Candidate Range",      value:"50 – 69" },
    { label:"Must Have Skills Weightage",     value:"60%" },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-sm">Screening Settings</h3>
        <span className="bg-green-100 text-green-700 text-[10px] font-medium px-2 py-0.5 rounded-full">Active</span>
      </div>
      <div className="space-y-2 text-xs">
        {settings.map((s,i)=>(
          <div key={i} className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-500">{s.label}</span>
            <span className="font-medium text-gray-700">{s.value}</span>
          </div>
        ))}
      </div>
      <button className="mt-3 text-xs text-blue-600 font-medium hover:underline">Manage Settings</button>
    </div>
  );
}
