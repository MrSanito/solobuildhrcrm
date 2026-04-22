import React from "react";
import { ArrowRight } from "lucide-react";
import { recentActivity } from "./data";

interface Props {
  activeTab: string;
  setActiveTab: (t: string) => void;
}

export default function DashboardActivity({ activeTab, setActiveTab }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Recent Activity</h3>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {["All", "Hiring", "People", "Work", "Finance", "Compliance"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`text-[10px] sm:text-xs px-2.5 py-1 rounded-md transition whitespace-nowrap ${
                activeTab === t ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="text-xs text-indigo-600 flex items-center gap-1 hover:underline">
          View all <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {recentActivity.map((a, i) => (
          <div
            key={i}
            className="flex flex-col gap-1.5 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:bg-white transition cursor-pointer group"
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${a.color}`}>
              <a.icon className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-gray-800 leading-tight truncate">
              {a.title}
            </p>
            <p className="text-[10px] text-gray-500 line-clamp-1">{a.sub}</p>
            <p className="text-[10px] text-gray-400 mt-auto">{a.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
