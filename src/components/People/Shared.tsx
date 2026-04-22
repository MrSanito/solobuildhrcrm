import React from "react"
import { ChevronRight } from "lucide-react"

export const AV_COLORS = [
  ["bg-violet-100","text-violet-700"], ["bg-blue-100","text-blue-700"],
  ["bg-emerald-100","text-emerald-700"], ["bg-amber-100","text-amber-700"],
  ["bg-rose-100","text-rose-700"], ["bg-cyan-100","text-cyan-700"],
]
export const AV_SIZES = { xs:"w-6 h-6 text-[9px]", sm:"w-8 h-8 text-xs", md:"w-9 h-9 text-xs", lg:"w-10 h-10 text-sm", xl:"w-12 h-12 text-sm" }

export function Av({ name, size="sm" }: { name: string, size?: keyof typeof AV_SIZES }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0,2)
  const [bg, txt] = AV_COLORS[name.charCodeAt(0) % AV_COLORS.length]
  return (
    <div className={`${AV_SIZES[size]||AV_SIZES.sm} ${bg} ${txt} rounded-full flex items-center justify-center font-bold flex-shrink-0`}>
      {initials}
    </div>
  )
}

export function SBadge({ s }: { s: string }) {
  const m: Record<string, string> = {
    Active:          "bg-green-50 text-green-700 border border-green-200",
    Probation:       "bg-orange-50 text-orange-700 border border-orange-200",
    Valid:           "bg-green-50 text-green-700 border border-green-200",
    "Expiring Soon": "bg-orange-50 text-orange-700 border border-orange-200",
    Expired:         "bg-red-50 text-red-700 border border-red-200",
    Exceptional:     "bg-green-50 text-green-700 border border-green-200",
  }
  return <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${m[s]||"bg-gray-100 text-gray-600"}`}>{s}</span>
}

export function PLLabel({ l }: { l: string }) {
  const m: Record<string, string> = {
    Exceptional:         "text-green-700 bg-green-50",
    Exceeds:             "text-green-600 bg-green-50",
    Meets:               "text-blue-600 bg-blue-50",
    "Needs Improvement": "text-orange-600 bg-orange-50",
    "At Risk":           "text-red-600 bg-red-50",
  }
  return <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${m[l]||"text-gray-600"}`}>{l}</span>
}

export function CatBadge({ c }: { c: string }) {
  const m: Record<string, string> = {
    Personal:   "bg-blue-50 text-blue-700",
    Employment: "bg-purple-50 text-purple-700",
    Education:  "bg-yellow-50 text-yellow-700",
    Training:   "bg-teal-50 text-teal-700",
    Compliance: "bg-orange-50 text-orange-700",
  }
  return <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${m[c]||"bg-gray-100 text-gray-600"}`}>{c}</span>
}

export function SubTabs({ tabs, active, onSelect }: { tabs: string[], active: string, onSelect: (t: string) => void }) {
  return (
    <div className="flex border-b border-gray-100">
      {tabs.map(t => (
        <button key={t} onClick={() => onSelect(t)}
          className={`px-3.5 py-2.5 text-xs font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
            active===t ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}>
          {t}
        </button>
      ))}
    </div>
  )
}

export function PanelTabs({ tabs, active, onSelect }: { tabs: string[], active: string, onSelect: (t: string) => void }) {
  return (
    <div className="flex border-b border-gray-100">
      {tabs.map(t => (
        <button key={t} onClick={() => onSelect(t)}
          className={`px-3 py-2 text-xs font-medium border-b-2 -mb-px transition-colors ${
            active===t ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}>
          {t}
        </button>
      ))}
    </div>
  )
}

export function Pagination({ total, pages }: { total: string, pages: (number | string)[] }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
      <span className="text-xs text-gray-400">Showing 1 to 10 of {total}</span>
      <div className="flex items-center gap-1">
        {pages.map((p,i) => (
          <button key={i} className={`w-7 h-7 text-xs rounded-md flex items-center justify-center transition-colors ${
            p===1 ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-gray-100"
          }`}>{p}</button>
        ))}
        <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100">
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export function StatsRow({ activeTab }: { activeTab: string }) {
  const dirStats = [
    { icon:"👥", label:"Total Employees",       val:"1,248", suffix:"",       delta:"+18 vs last month", up:true  },
    { icon:"✅", label:"Active Employees",       val:"1,182", suffix:"",       delta:"+15 vs last month", up:true  },
    { icon:"⏳", label:"On Probation",            val:"68",    suffix:"",       delta:"+5 vs last month",  up:true  },
    { icon:"🆕", label:"New Joins (This Month)",  val:"18",    suffix:"",       delta:"+6 vs last month",  up:true  },
    { icon:"📊", label:"Avg Performance Score",  val:"4.1",   suffix:" /5",    delta:"+0.2 vs last month",up:true  },
    { icon:"⏱️", label:"Avg Tenure",             val:"2.8",   suffix:" Years", delta:"+0.3 vs last month",up:true  },
  ]
  const perfStats = [
    { icon:"📊", label:"Avg Performance Score",  val:"4.1",  suffix:" /5",    delta:"+0.3 vs last cycle",  up:true  },
    { icon:"⭐", label:"Top Performers",          val:"128",  suffix:" (12%)", delta:"+8 vs last cycle",    up:true  },
    { icon:"⚠️", label:"Needs Improvement",       val:"96",   suffix:" (9%)",  delta:"-3 vs last cycle",    up:false },
    { icon:"🔴", label:"At Risk",                 val:"24",   suffix:" (2%)",  delta:"-2 vs last cycle",    up:false },
    { icon:"✅", label:"Reviews Completed",       val:"82%",  suffix:"",       delta:"+6% vs last cycle",   up:true  },
    { icon:"📋", label:"Pending Reviews",         val:"126",  suffix:"",       delta:"-18 vs last cycle",   up:false },
  ]
  const docStats = [
    { icon:"📄", label:"Total Documents",         val:"4,256", suffix:"",    delta:"+145 vs last month", up:true  },
    { icon:"⏳", label:"Expiring Soon (30 Days)",  val:"128",   suffix:"",    delta:"+12 vs last month",  up:true  },
    { icon:"❌", label:"Expired Documents",        val:"23",    suffix:"",    delta:"-5 vs last month",   up:false },
    { icon:"🛡️", label:"Compliance Rate",          val:"92%",   suffix:"",    delta:"+4% vs last month",  up:true  },
    { icon:"⏸️", label:"Pending Approvals",        val:"34",    suffix:"",    delta:"+6 vs last month",   up:true  },
    { icon:"📁", label:"Documents per Employee",  val:"3.4",   suffix:"",    delta:"+0.3 vs last month", up:true  },
  ]
  const stats = activeTab==="performance" ? perfStats : activeTab==="documents" ? docStats : dirStats
  return (
    <div className="grid grid-cols-6 gap-3">
      {stats.map((s,i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 px-4 py-3.5 flex items-start gap-2.5">
          <span className="text-xl leading-none mt-0.5">{s.icon}</span>
          <div className="min-w-0">
            <div className="text-[11px] text-gray-500 font-medium leading-snug">{s.label}</div>
            <div className="text-[22px] font-bold text-gray-900 leading-tight mt-0.5">
              {s.val}<span className="text-xs font-normal text-gray-400">{s.suffix}</span>
            </div>
            <div className={`flex items-center gap-0.5 mt-0.5 text-[11px] font-medium ${s.up ? "text-green-600" : "text-red-500"}`}>
              <span>{s.up ? "▲" : "▼"}</span>
              <span className="truncate">{s.delta}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
