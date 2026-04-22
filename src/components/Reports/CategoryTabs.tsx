import React from "react";
import { categoryTabs, ReportCategory } from "./data";

interface CategoryTabsProps {
  activeCategory: ReportCategory;
  setActiveCategory: (c: ReportCategory) => void;
}

export default function CategoryTabs({ activeCategory, setActiveCategory }: CategoryTabsProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {categoryTabs.map((c) => (
        <button
          key={c.name}
          onClick={() => setActiveCategory(c.name)}
          className={`p-3 rounded-xl border text-left transition ${activeCategory === c.name ? "border-indigo-300 bg-indigo-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{c.icon}</span>
            <span className={`text-xs font-bold ${activeCategory === c.name ? "text-indigo-700" : "text-gray-800"}`}>{c.name}</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-tight">{c.desc}</p>
        </button>
      ))}
    </div>
  );
}
