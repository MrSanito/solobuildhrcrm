"use client";

import { useState } from "react";
import { BarChart2, Calendar, RefreshCw, Plus } from "lucide-react";
import { ReportCategory } from "../components/Reports/data";
import ReportsAIBar from "../components/Reports/ReportsAIBar";
import CategoryTabs from "../components/Reports/CategoryTabs";
import ReportsFilters from "../components/Reports/ReportsFilters";
import ReportsKPIs from "../components/Reports/ReportsKPIs";
import ReportsCharts from "../components/Reports/ReportsCharts";
import ReportsListSection from "../components/Reports/ReportsListSection";
import ReportsStatsDonuts from "../components/Reports/ReportsStatsDonuts";
import ScheduledReportsTable from "../components/Reports/ScheduledReportsTable";

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState<ReportCategory>("Workforce");
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <h1 className="text-base font-bold text-gray-900">Reports</h1>
          </div>
          <p className="text-[11px] text-gray-400">Generate insights and analyze HR data with dynamic reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" /> 21 May – 21 Jun 2025
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
            <Plus className="w-3.5 h-3.5" /> Custom Report
          </button>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-4">
        <ReportsAIBar prompt={prompt} setPrompt={setPrompt} />
        <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <ReportsFilters />
        <ReportsKPIs />
        <ReportsCharts />
        <ReportsListSection />
        <ReportsStatsDonuts />
        <ScheduledReportsTable />
      </div>
    </div>
  );
}