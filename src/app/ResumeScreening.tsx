"use client";
import React, { useState } from "react";
import { Filter, Download } from "lucide-react";
import { candidates } from "../components/ResumeScreening/data";
import ScreeningStats from "../components/ResumeScreening/ScreeningStats";
import CandidateTable from "../components/ResumeScreening/CandidateTable";
import CandidateDetailPanel from "../components/ResumeScreening/CandidateDetailPanel";
import AIScreeningWorkflow from "../components/ResumeScreening/AIScreeningWorkflow";
import ScreeningSettings from "../components/ResumeScreening/ScreeningSettings";

export default function ResumeScreening() {
  const [selected, setSelected] = useState(candidates[0]);
  const [detailTab, setDetailTab] = useState("AI Summary");
  const [filterTab, setFilterTab] = useState("All Resumes");

  return (
    <div className="p-6 space-y-5 min-h-full bg-gray-50 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Resume Screening</h1>
          <p className="text-sm text-gray-500 mt-0.5 max-w-xl">
            AI-Powered screening to identify the best candidates. We not only filter, but also identify high-potential candidates who could be a great fit.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter size={14}/> Screening Settings
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Download size={14}/> Upload Resumes
          </button>
        </div>
      </div>

      <ScreeningStats />

      {/* Table + Detail */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-7">
          <CandidateTable 
            selected={selected} 
            setSelected={setSelected} 
            filterTab={filterTab} 
            setFilterTab={setFilterTab} 
          />
        </div>
        <div className="xl:col-span-5">
          <CandidateDetailPanel 
            selected={selected} 
            detailTab={detailTab} 
            setDetailTab={setDetailTab} 
          />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8">
          <AIScreeningWorkflow />
        </div>
        <div className="xl:col-span-4">
          <ScreeningSettings />
        </div>
      </div>
    </div>
  );
}