"use client";
import React from "react";
import { Download } from "lucide-react";
import KPIGrid from "../components/Finance/KPIGrid";
import FinanceCharts from "../components/Finance/FinanceCharts";
import PaymentsAndBudget from "../components/Finance/PaymentsAndBudget";

export default function Finance() {
  return (
    <div className="min-h-full bg-slate-50/50 p-6 space-y-6 animate-in fade-in duration-500">
      
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Finance Management</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor company spending, payroll, and budget allocations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            {["Overview", "Payroll", "Invoices", "Reports"].map((tab) => (
              <button 
                key={tab}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  tab === "Overview" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <KPIGrid />
      <FinanceCharts />
      <PaymentsAndBudget />

    </div>
  );
}
