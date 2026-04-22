import React from "react";
import { Sparkles } from "lucide-react";

interface ReportsAIBarProps {
  prompt: string;
  setPrompt: (v: string) => void;
}

export default function ReportsAIBar({ prompt, setPrompt }: ReportsAIBarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex items-center gap-3">
      <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
      <input
        className="flex-1 text-xs text-gray-600 bg-transparent outline-none placeholder-gray-400"
        placeholder='What would you like to analyze today? Examples: "Attrition last quarter, Monthly hiring trend, Department wise salary cost"'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 whitespace-nowrap">
        <Sparkles className="w-3 h-3" /> Generate Report
      </button>
    </div>
  );
}
