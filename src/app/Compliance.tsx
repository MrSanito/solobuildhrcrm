"use client";
import React from "react";
import StatCards from "../components/Compliance/StatCards";
import StatusCharts from "../components/Compliance/StatusCharts";
import CategoryBreakdown from "../components/Compliance/CategoryBreakdown";
import TablesSection from "../components/Compliance/TablesSection";
import ComplianceFooter from "../components/Compliance/ComplianceFooter";

export default function Compliance() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Compliance</h1>
          <p className="text-xs text-slate-400 mt-0.5">Monitor compliance obligations, policies and statutory requirements.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-outline border-slate-300 text-slate-600 rounded-lg text-xs">📅 21 May – 21 Jun 2025 ▾</button>
          <button className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-lg text-xs">↓ Export Report</button>
        </div>
      </div>

      <StatCards />
      <StatusCharts />
      <CategoryBreakdown />
      <TablesSection />
      <ComplianceFooter />

    </div>
  );
}