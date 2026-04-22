import React from "react"
import { Search, Filter, Download, Star, MoreHorizontal, ChevronDown, ChevronRight, TrendingUp, TrendingDown } from "lucide-react"
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Av, PLLabel, SubTabs } from "./Shared"
import { DIST_DATA, TREND_DATA } from "./data"

export function PerformanceTab({ employees, selectedEmployee, onSelectEmployee, perfSubTab, setPerfSubTab }: any) {
  const subTabs = ["Overview","Team Performance","My Team","Calibration","Goals","Reviews","Analytics"]
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Sub-tabs */}
      <div className="px-4 pt-3">
        <SubTabs tabs={subTabs} active={perfSubTab} onSelect={t => setPerfSubTab(t)} />
      </div>
      {/* Filters */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-100 flex-wrap">
        <div className="relative">
          <select className="appearance-none border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-purple-300 cursor-pointer">
            <option>This Review Cycle</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select className="appearance-none border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-purple-300 cursor-pointer">
            <option>All Departments</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select className="appearance-none border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-purple-300 cursor-pointer">
            <option>All Locations</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
        <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
          <Filter className="w-3.5 h-3.5" /> Filters
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
          Start Review <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
      {/* Charts */}
      <div className="px-4 py-4 grid grid-cols-2 gap-6 border-b border-gray-100">
        {/* Distribution donut */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Performance Distribution</h3>
            <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 text-[10px] flex items-center justify-center font-bold cursor-help">i</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <PieChart width={120} height={120}>
                <Pie data={DIST_DATA.map(d=>({value:d.count}))} cx={55} cy={55} innerRadius={36} outerRadius={55} dataKey="value" strokeWidth={0}>
                  {DIST_DATA.map((d,i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm font-bold text-gray-800">1,248</span>
                <span className="text-[9px] text-gray-400">Employees</span>
              </div>
            </div>
            <div className="space-y-1.5 flex-1">
              {DIST_DATA.map((d,i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{background:d.color}} />
                  <span className="text-[11px] text-gray-600 flex-1 leading-snug">{d.name}</span>
                  <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap">{d.count} ({d.pct})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Trend line */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Performance Trend</h3>
            <div className="relative">
              <select className="appearance-none border border-gray-200 rounded-md pl-2 pr-6 py-1 text-xs text-gray-600 bg-white focus:outline-none cursor-pointer">
                <option>vs Last Cycle</option>
              </select>
              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={108}>
            <LineChart data={TREND_DATA} margin={{top:4,right:4,bottom:0,left:-24}}>
              <XAxis dataKey="m" tick={{fontSize:10,fill:"#9ca3af"}} axisLine={false} tickLine={false} />
              <YAxis domain={[3,5.2]} tick={{fontSize:10,fill:"#9ca3af"}} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{fontSize:11,padding:"4px 8px",borderRadius:"6px",border:"1px solid #e5e7eb"}}
                formatter={(v: any) => [v.toFixed(1),"Avg Score"]}
                labelStyle={{color:"#6b7280"}}
              />
              <Line type="monotone" dataKey="v" stroke="#7c3aed" strokeWidth={2}
                dot={{fill:"#7c3aed",r:3,strokeWidth:0}} activeDot={{r:4}} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <div className="w-4 h-0.5 bg-violet-600 rounded" />
            <span className="text-[11px] text-gray-500">Average Score</span>
          </div>
        </div>
      </div>
      {/* Employee table */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Employee Performance</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-44">
              <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input className="bg-transparent text-xs outline-none w-full placeholder:text-gray-400" placeholder="Search employee..." />
            </div>
            <button className="border border-gray-200 rounded-lg p-1.5 hover:bg-gray-50">
              <MoreHorizontal className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {["Employee","Role","Department","Manager","Performance Score","Trend","Last Review",""].map(h => (
                <th key={h} className="pb-2 text-left text-[11px] font-medium text-gray-500 pr-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp: any) => (
              <tr key={emp.id} onClick={() => onSelectEmployee(emp)}
                className={`border-b border-gray-50 cursor-pointer hover:bg-gray-50/70 transition-colors ${
                  selectedEmployee?.id===emp.id ? "bg-purple-50/40" : ""
                }`}>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-2">
                    <Av name={emp.name} size="sm" />
                    <span className="text-xs font-medium text-gray-800">{emp.name}</span>
                  </div>
                </td>
                <td className="py-2.5 pr-3 text-xs text-gray-500">{emp.role}</td>
                <td className="py-2.5 pr-3 text-xs text-gray-500">{emp.dept}</td>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-1.5">
                    <Av name={emp.manager} size="xs" />
                    <span className="text-xs text-gray-500">{emp.manager}</span>
                  </div>
                </td>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-gray-800">{emp.score.toFixed(1)}</span>
                    <PLLabel l={emp.label} />
                  </div>
                </td>
                <td className="py-2.5 pr-3">
                  {emp.dir==="up"   && <span className="text-green-600 text-xs font-medium flex items-center gap-0.5"><TrendingUp className="w-3 h-3"/>+{emp.trend}</span>}
                  {emp.dir==="down" && <span className="text-red-500 text-xs font-medium flex items-center gap-0.5"><TrendingDown className="w-3 h-3"/>-{emp.trend}</span>}
                  {emp.dir==="none" && <span className="text-gray-300 text-xs">—</span>}
                </td>
                <td className="py-2.5 pr-3 text-xs text-gray-500">{emp.lastReview}</td>
                <td className="py-2.5">
                  <button className="p-1 hover:bg-gray-100 rounded-md">
                    <MoreHorizontal className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">Showing 1 to 7 of 1,248 employees</span>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5,"...",178].map((p,i) => (
              <button key={i} className={`w-7 h-7 text-xs rounded-md flex items-center justify-center ${p===1?"bg-purple-600 text-white":"text-gray-500 hover:bg-gray-100"}`}>{p}</button>
            ))}
            <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100">
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
