import React from "react"
import { TrendingUp, ChevronRight, X } from "lucide-react"
import { Av, SBadge, PanelTabs } from "./Shared"

export function PerformancePanel({ employee, onClose, activeTab, setActiveTab }: any) {
  const panelTabs = ["Overview","Goals","Feedback","History","Documents"]
  const breakdown = [
    { label:"Quality of Work", val:4.7 },
    { label:"Productivity",    val:4.6 },
    { label:"Collaboration",   val:4.5 },
    { label:"Initiative",      val:4.6 },
    { label:"Problem Solving", val:4.8 },
  ]
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 flex items-start justify-between border-b border-gray-100">
        <div className="flex items-start gap-3">
          <Av name={employee.name} size="lg" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-gray-900">{employee.name}</h3>
              <SBadge s="Exceptional" />
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{employee.role} · {employee.dept}</div>
            <div className="text-xs text-gray-400">Employee ID: EMP1256</div>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="px-4 pt-1">
        <PanelTabs tabs={panelTabs} active={activeTab} onSelect={setActiveTab} />
      </div>
      {activeTab==="Overview" && (
        <div className="p-4 space-y-4 overflow-y-auto" style={{maxHeight:"calc(100vh - 280px)"}}>
          <div className="flex gap-4">
            {/* Score */}
            <div>
              <div className="text-xs font-semibold text-gray-700 mb-1">Performance Score</div>
              <div className="flex items-end gap-1">
                <span className="text-[28px] font-bold text-gray-900 leading-none">{employee.score.toFixed(1)}</span>
                <span className="text-xs text-gray-400 mb-0.5">/ 5</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-[11px] text-green-600 font-medium">+{employee.trend||0.4} vs last cycle</span>
              </div>
              <div className="text-[11px] text-green-600 font-medium mt-0.5">● Top 8% in {employee.dept}</div>
            </div>
            {/* Breakdown */}
            <div className="flex-1">
              <div className="text-xs font-semibold text-gray-700 mb-2">Score Breakdown</div>
              <div className="space-y-1.5">
                {breakdown.map(b => (
                  <div key={b.label} className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-500 w-28 flex-shrink-0">{b.label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{width:`${(b.val/5)*100}%`}} />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700 w-5">{b.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Summary */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-1.5">Summary</div>
            <p className="text-xs text-gray-600 leading-relaxed">Rahul consistently delivers high-quality work and takes ownership of critical projects. He is proactive, collaborative and a strong mentor to junior team members.</p>
          </div>
          {/* Strengths */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-2">Strengths</div>
            <div className="flex flex-wrap gap-1.5">
              {["Problem Solving","Code Quality","Ownership","Mentoring"].map(s => (
                <span key={s} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>
          {/* Dev Areas */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-2">Development Areas</div>
            <div className="flex flex-wrap gap-1.5">
              {["Delegation","Presentation Skills"].map(s => (
                <span key={s} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>
          {/* Review info */}
          <div className="grid grid-cols-3 gap-3 py-3 border-t border-gray-100">
            {[
              ["Last Review",  "20 May 2025"],
              ["Next Review",  "20 Aug 2025"],
              ["Review Type",  "Mid Year"],
            ].map(([k,v]) => (
              <div key={k}>
                <div className="text-[10px] text-gray-400 font-medium">{k}</div>
                <div className="text-xs font-semibold text-gray-700 mt-0.5">{v}</div>
              </div>
            ))}
          </div>
          {/* CTA */}
          <div className="flex gap-2">
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 text-xs font-semibold transition-colors">
              Provide Feedback
            </button>
            <button className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              View Full Review <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
      {activeTab!=="Overview" && (
        <div className="p-10 flex flex-col items-center justify-center text-gray-400 gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">📊</div>
          <span className="text-sm">{activeTab} coming soon</span>
        </div>
      )}
    </div>
  )
}
