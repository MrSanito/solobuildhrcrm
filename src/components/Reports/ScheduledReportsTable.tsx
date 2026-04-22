import React from "react";
import { Plus, Users, Play, Edit3, MoreVertical, FileText } from "lucide-react";
import { scheduledReports } from "./data";

function FormatBadge({ format }: { format: string }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit ${format === "PDF" ? "bg-red-100 text-red-600" : format === "XLSX" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
      <FileText className="w-2.5 h-2.5" /> {format}
    </span>
  );
}

export default function ScheduledReportsTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-800">Scheduled Reports</h3>
        <button className="flex items-center gap-1.5 text-[11px] text-indigo-600 hover:underline">
          <Plus className="w-3 h-3" /> Add Schedule
        </button>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium bg-gray-50/50">
            <th className="text-left px-4 py-2.5">Report Name</th>
            <th className="text-left px-3 py-2.5">Schedule</th>
            <th className="text-left px-3 py-2.5">Next Run</th>
            <th className="text-left px-3 py-2.5">Recipients</th>
            <th className="text-left px-3 py-2.5 text-center">Format</th>
            <th className="text-left px-3 py-2.5 text-center">Status</th>
            <th className="text-left px-3 py-2.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scheduledReports.map((r, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition last:border-0">
              <td className="px-4 py-2.5 font-semibold text-gray-800 text-[11px]">{r.name}</td>
              <td className="px-3 py-2.5 text-[10px] text-gray-500">{r.schedule}</td>
              <td className="px-3 py-2.5 text-[10px] text-gray-600 whitespace-nowrap">{r.nextRun}</td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] text-gray-600">{r.recipients} Recipients</span>
                </div>
              </td>
              <td className="px-3 py-2.5 flex justify-center"><FormatBadge format={r.format} /></td>
              <td className="px-3 py-2.5">
                <div className="flex justify-center">
                   <span className="text-[10px] bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">{r.status}</span>
                </div>
              </td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-1 justify-end">
                  <button className="p-1 rounded hover:bg-gray-200"><Play className="w-3 h-3 text-green-500" /></button>
                  <button className="p-1 rounded hover:bg-gray-200"><Edit3 className="w-3 h-3 text-gray-400" /></button>
                  <button className="p-1 rounded hover:bg-gray-200"><MoreVertical className="w-3 h-3 text-gray-400" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
