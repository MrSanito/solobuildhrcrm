import React from "react"
import { Search, Filter, Columns, Download, Star, MoreHorizontal } from "lucide-react"
import { Av, SBadge, Pagination } from "./Shared"

export function DirectoryTab({ employees, selectedEmployee, onSelectEmployee }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-800">Employee Directory <span className="text-gray-400 font-normal">(1,182)</span></h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-56">
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input className="bg-transparent text-xs outline-none w-full placeholder:text-gray-400" placeholder="Search by name, role, department..." />
          </div>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
            <Columns className="w-3.5 h-3.5" /> Columns
          </button>
          <button className="border border-gray-200 rounded-lg p-1.5 hover:bg-gray-50 transition-colors">
            <Download className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>
      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50/70 border-b border-gray-100">
            {["Employee","Role","Department","Location","Status","Performance","Tenure",""].map(h => (
              <th key={h} className="px-4 py-2.5 text-left text-[11px] font-medium text-gray-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp: any) => (
            <tr key={emp.id} onClick={() => onSelectEmployee(emp)}
              className={`border-b border-gray-50 cursor-pointer hover:bg-gray-50/70 transition-colors ${
                selectedEmployee?.id===emp.id ? "bg-purple-50/40" : ""
              }`}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <Av name={emp.name} size="sm" />
                  <span className="text-sm font-medium text-gray-800">{emp.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-gray-600">{emp.role}</td>
              <td className="px-4 py-3 text-xs text-gray-600">{emp.dept}</td>
              <td className="px-4 py-3 text-xs text-gray-600">{emp.loc}</td>
              <td className="px-4 py-3"><SBadge s={emp.status} /></td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-800">{emp.perf.toFixed(1)}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-gray-600">{emp.tenure} yrs</td>
              <td className="px-4 py-3">
                <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination total="1,182 employees" pages={[1,2,3,4,"...",119]} />
    </div>
  )
}
