"use client"
import React, { useState } from "react"
import { Users, Star, RefreshCw, FolderOpen, Zap, Send, Bot, Bell, Calendar, ChevronDown } from "lucide-react"

import { EMPLOYEES, PERF_EMPLOYEES, DOCUMENTS } from "@/components/People/data"
import { StatsRow } from "@/components/People/Shared"
import { DirectoryTab } from "@/components/People/DirectoryTab"
import { PerformanceTab } from "@/components/People/PerformanceTab"
import { LifecycleTab } from "@/components/People/LifecycleTab"
import { DocumentsTab } from "@/components/People/DocumentsTab"
import { DirectoryPanel } from "@/components/People/DirectoryPanel"
import { PerformancePanel } from "@/components/People/PerformancePanel"
import { DocumentPanel } from "@/components/People/DocumentPanel"

export default function HRPortal() {
  const [activeTab, setActiveTab]   = useState("directory")
  const [selEmp,    setSelEmp]      = useState(EMPLOYEES[0])
  const [selPerf,   setSelPerf]     = useState(PERF_EMPLOYEES[0])
  const [selDoc,    setSelDoc]      = useState(DOCUMENTS[0])
  const [panelOpen, setPanelOpen]   = useState(true)
  const [empTab,    setEmpTab]      = useState("Overview")
  const [perfPanTab,setPerfPanTab]  = useState("Overview")
  const [docPanTab, setDocPanTab]   = useState("Overview")
  const [perfSub,   setPerfSub]     = useState("Overview")
  const [docSub,    setDocSub]      = useState("all")

  const handleMain = (tab: string) => { setActiveTab(tab); setPanelOpen(true) }

  const mainTabs = [
    { id:"directory",   label:"Directory",   icon:<Users className="w-3.5 h-3.5" /> },
    { id:"performance", label:"Performance", icon:<Star className="w-3.5 h-3.5" /> },
    { id:"lifecycle",   label:"Lifecycle",   icon:<RefreshCw className="w-3.5 h-3.5" /> },
    { id:"documents",   label:"Documents",   icon:<FolderOpen className="w-3.5 h-3.5" /> },
  ]

  const subtitles: Record<string, string> = {
    directory:   "Manage people, performance and lifecycle across the organization.",
    performance: "Manage people, performance and development.",
    lifecycle:   "Manage employee lifecycle events and transitions.",
    documents:   "Manage employee documents and ensure compliance across the organization.",
  }

  return (
    <div className="min-h-screen bg-slate-100/80" style={{fontFamily:"'DM Sans','Inter',sans-serif"}}>
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Title */}
          <div className="flex-shrink-0 min-w-[160px]">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">People</h1>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-snug max-w-[200px]">
              {subtitles[activeTab]}
            </p>
          </div>
          {/* AI Search bar */}
          <div className="flex-1 max-w-lg">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 gap-2">
              <Zap className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-700">What's on your mind today?</div>
                <div className="text-[10px] text-gray-400 truncate">
                  {activeTab==="directory"   && 'Examples: "Show top performers", "Who is on probation?", "Team availability"'}
                  {activeTab==="performance" && 'Examples: "Show top performers", "Who is at risk?", "Show team performance"'}
                  {activeTab==="lifecycle"   && 'Examples: "Recent promotions", "Upcoming exits", "Probation ending soon"'}
                  {activeTab==="documents"   && 'Examples: "Show expiring documents", "Documents expiring this month"'}
                </div>
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-1.5 flex-shrink-0 transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {/* Right actions */}
          <div className="flex items-center gap-3 ml-auto flex-shrink-0">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
              <Bot className="w-4 h-4 text-purple-500" />
              AI Assistant
            </button>
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold">7</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 cursor-pointer px-3 py-1.5 rounded-lg transition-colors">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium text-gray-700">21 May – 21 Jun 2025</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 space-y-4">
        {/* Stats */}
        <StatsRow activeTab={activeTab} />

        {/* Main tab nav */}
        <div className="flex border-b-2 border-gray-200 -mb-1">
          {mainTabs.map(t => (
            <button key={t.id} onClick={() => handleMain(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-0.5 transition-colors ${
                activeTab===t.id
                  ? "border-purple-600 text-purple-700 bg-white rounded-t-lg"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}>
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Content + right panel */}
        <div className="flex gap-4 items-start">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {activeTab==="directory"   && (
              <DirectoryTab
                employees={EMPLOYEES}
                selectedEmployee={selEmp}
                onSelectEmployee={(e: any) => { setSelEmp(e); setPanelOpen(true); setEmpTab("Overview") }}
              />
            )}
            {activeTab==="performance" && (
              <PerformanceTab
                employees={PERF_EMPLOYEES}
                selectedEmployee={selPerf}
                onSelectEmployee={(e: any) => { setSelPerf(e); setPanelOpen(true); setPerfPanTab("Overview") }}
                perfSubTab={perfSub}
                setPerfSubTab={setPerfSub}
              />
            )}
            {activeTab==="lifecycle"   && <LifecycleTab />}
            {activeTab==="documents"   && (
              <DocumentsTab
                documents={DOCUMENTS}
                selectedDocument={selDoc}
                onSelectDocument={(d: any) => { setSelDoc(d); setPanelOpen(true); setDocPanTab("Overview") }}
                docSubTab={docSub}
                setDocSubTab={setDocSub}
              />
            )}
          </div>

          {/* Right panel */}
          {panelOpen && activeTab!=="lifecycle" && (
            <div className="w-[340px] flex-shrink-0">
              {activeTab==="directory"   && <DirectoryPanel   employee={selEmp}  onClose={()=>setPanelOpen(false)} activeTab={empTab}    setActiveTab={setEmpTab}    />}
              {activeTab==="performance" && <PerformancePanel employee={selPerf} onClose={()=>setPanelOpen(false)} activeTab={perfPanTab} setActiveTab={setPerfPanTab} />}
              {activeTab==="documents"   && <DocumentPanel    doc={selDoc}       onClose={()=>setPanelOpen(false)} activeTab={docPanTab}  setActiveTab={setDocPanTab} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}