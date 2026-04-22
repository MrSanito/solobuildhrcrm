import React from "react"
import { Maximize2, Download, Share2, Upload, Trash2, X } from "lucide-react"
import { SBadge, PanelTabs } from "./Shared"

export function DocumentPanel({ doc, onClose, activeTab, setActiveTab }: any) {
  const panelTabs = ["Overview","Activity","Approvals","Versions"]
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 flex items-start justify-between border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-xl">📄</div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-gray-900">{doc.name}</h3>
              <SBadge s={doc.status} />
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Personal Document</div>
            <div className="text-xs text-gray-400">{doc.emp} ({doc.empId})</div>
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
        <div className="p-4 space-y-4 overflow-y-auto" style={{maxHeight:"calc(100vh - 260px)"}}>
          {/* Details */}
          <div className="space-y-2.5">
            {[
              ["Document Name", doc.name],
              ["Category",      doc.cat],
              ["Document Type", doc.docType||doc.cat],
              ["Uploaded By",   doc.emp],
              ["Uploaded On",   doc.uploaded+" 10:30 AM"],
              ["Expiry Date",   doc.expiry!=="—" ? `${doc.expiry} (${doc.expiryIn})` : "—"],
              ["File Size",     doc.size],
              ["Document ID",   doc.docId||("DOC"+String(doc.id).padStart(6,"0"))],
            ].map(([k,v]) => (
              <div key={k} className="flex items-start justify-between gap-2">
                <span className="text-[11px] text-gray-400 font-medium flex-shrink-0">{k}</span>
                <span className="text-[11px] font-semibold text-gray-700 text-right">{v}</span>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-400 font-medium">Status</span>
              <SBadge s={doc.status} />
            </div>
          </div>
          {/* Preview */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-2">Preview</div>
            <div className="flex gap-3">
              <div className="w-[88px] h-[108px] bg-gradient-to-b from-blue-900 to-blue-800 rounded-xl flex flex-col items-center justify-center gap-1 flex-shrink-0 shadow-md">
                <div className="text-yellow-300 text-[10px] font-bold tracking-wider">PASSPORT</div>
                <div className="text-blue-200 text-[7px] tracking-widest">REPUBLIC OF INDIA</div>
                <div className="text-2xl mt-0.5">🦁</div>
                <div className="text-blue-300 text-[7px] mt-0.5">भारत गणराज्य</div>
              </div>
              <div className="flex-1 space-y-2">
                {[
                  { label:"View Fullscreen", icon:<Maximize2 className="w-3 h-3" /> },
                  { label:"Download",        icon:<Download className="w-3 h-3" /> },
                  { label:"Share",           icon:<Share2 className="w-3 h-3" /> },
                ].map(btn => (
                  <button key={btn.label} className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    {btn.label} {btn.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs font-semibold text-gray-700 mb-2">Actions</div>
            <div className="flex gap-2">
              <button className="flex-1 border border-purple-200 text-purple-600 hover:bg-purple-50 rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <Upload className="w-3 h-3" /> Upload New Version
              </button>
              <button className="flex-1 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <Trash2 className="w-3 h-3" /> Delete Document
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab!=="Overview" && (
        <div className="p-10 flex flex-col items-center justify-center text-gray-400 gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">🗂️</div>
          <span className="text-sm">{activeTab} coming soon</span>
        </div>
      )}
    </div>
  )
}
