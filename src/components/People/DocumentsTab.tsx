import React from "react"
import { Search, Filter, Download, MoreHorizontal } from "lucide-react"
import { Av, SBadge, CatBadge, Pagination } from "./Shared"

export function DocumentsTab({ documents, selectedDocument, onSelectDocument, docSubTab, setDocSubTab }: any) {
  const subTabs = [
    { id:"all",        label:"All Documents",  count:4256 },
    { id:"personal",   label:"Personal",       count:1236 },
    { id:"employment", label:"Employment",     count:1456 },
    { id:"compliance", label:"Compliance",     count:892  },
    { id:"training",   label:"Training",       count:672  },
  ]

  const docIcon = (d: any) => {
    if (d.ftype==="JPG") return <span className="text-base">🖼️</span>
    const bg = d.cat==="Compliance" ? "bg-orange-50" : d.cat==="Employment" ? "bg-blue-50" : d.cat==="Education" ? "bg-yellow-50" : "bg-red-50"
    return <div className={`w-7 h-7 ${bg} rounded flex items-center justify-center text-xs`}>📄</div>
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-800">Documents <span className="text-gray-400 font-normal">(4,256)</span></h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-48">
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input className="bg-transparent text-xs outline-none w-full placeholder:text-gray-400" placeholder="Search documents..." />
          </div>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <button className="border border-gray-200 rounded-lg p-1.5 hover:bg-gray-50">
            <MoreHorizontal className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>
      {/* Sub-tabs */}
      <div className="px-4">
        <div className="flex border-b border-gray-100">
          {subTabs.map(t => (
            <button key={t.id} onClick={() => setDocSubTab(t.id)}
              className={`px-3.5 py-2.5 text-xs font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                docSubTab===t.id ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              {t.label}{t.id!=="all" && <span className="text-gray-400 ml-0.5">({t.count.toLocaleString()})</span>}
            </button>
          ))}
        </div>
      </div>
      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50/70 border-b border-gray-100">
            <th className="px-4 py-2.5 w-8"><input type="checkbox" className="rounded" /></th>
            {["Document Name","Category","Employee","Uploaded On","Expiry Date","Status","Actions"].map(h => (
              <th key={h} className="px-2 py-2.5 text-left text-[11px] font-medium text-gray-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {documents.map((doc: any) => (
            <tr key={doc.id} onClick={() => onSelectDocument(doc)}
              className={`border-b border-gray-50 cursor-pointer hover:bg-gray-50/70 transition-colors ${
                selectedDocument?.id===doc.id ? "bg-purple-50/40" : ""
              }`}>
              <td className="px-4 py-3"><input type="checkbox" className="rounded" onClick={e=>e.stopPropagation()} /></td>
              <td className="px-2 py-3">
                <div className="flex items-center gap-2">
                  {docIcon(doc)}
                  <div>
                    <div className="text-xs font-medium text-gray-800">{doc.name}</div>
                    <div className="text-[10px] text-gray-400">{doc.ftype} · {doc.size}</div>
                  </div>
                </div>
              </td>
              <td className="px-2 py-3"><CatBadge c={doc.cat} /></td>
              <td className="px-2 py-3">
                <div className="flex items-center gap-1.5">
                  <Av name={doc.emp} size="xs" />
                  <div>
                    <div className="text-[11px] font-medium text-gray-700">{doc.emp}</div>
                    <div className="text-[10px] text-gray-400">{doc.empId}</div>
                  </div>
                </div>
              </td>
              <td className="px-2 py-3">
                <div className="text-[11px] text-gray-700">{doc.uploaded}</div>
                <div className="text-[10px] text-gray-400">by {doc.by}</div>
              </td>
              <td className="px-2 py-3">
                {doc.expiry!=="—" ? (
                  <div>
                    <div className={`text-[11px] font-medium ${
                      doc.status==="Expired" ? "text-red-600" :
                      doc.status==="Expiring Soon" ? "text-orange-600" : "text-gray-700"
                    }`}>{doc.expiry}</div>
                    <div className={`text-[10px] ${
                      doc.status==="Expired" ? "text-red-400" :
                      doc.status==="Expiring Soon" ? "text-orange-400" : "text-gray-400"
                    }`}>{doc.expiryIn}</div>
                  </div>
                ) : <span className="text-gray-300 text-xs">—</span>}
              </td>
              <td className="px-2 py-3"><SBadge s={doc.status} /></td>
              <td className="px-2 py-3">
                <div className="flex items-center gap-0.5">
                  <button className="p-1 hover:bg-gray-100 rounded-md transition-colors" onClick={e=>e.stopPropagation()}>
                    <Download className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-md transition-colors" onClick={e=>e.stopPropagation()}>
                    <MoreHorizontal className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination total="4,256 documents" pages={[1,2,3,4,"...",426]} />
    </div>
  )
}
