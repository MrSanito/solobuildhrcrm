import React from "react"
import { Mail, Phone, Calendar, ChevronDown, X } from "lucide-react"
import { PieChart, Pie, Cell } from "recharts"
import { Av, SBadge, PanelTabs } from "./Shared"

export function DirectoryPanel({ employee, onClose, activeTab, setActiveTab }: any) {
  const panelTabs = ["Overview","Job","Performance","Compensation","More"]
  const skills = [
    { name:"Python",        pct:90, label:"Expert"       },
    { name:"Django",        pct:88, label:"Expert"       },
    { name:"REST APIs",     pct:72, label:"Advanced"     },
    { name:"AWS",           pct:65, label:"Advanced"     },
    { name:"System Design", pct:45, label:"Intermediate" },
  ]
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-start justify-between border-b border-gray-100">
        <div className="flex items-start gap-3">
          <Av name={employee.name} size="xl" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-gray-900">{employee.name}</h3>
              <SBadge s={employee.status} />
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{employee.role}</div>
            <div className="text-xs text-gray-400">{employee.dept||"Engineering"} · {employee.emp}</div>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      {/* Contact */}
      <div className="px-4 py-2 flex flex-wrap items-center gap-3 border-b border-gray-100 bg-gray-50/40">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Mail className="w-3 h-3 text-gray-400" />
          <span className="truncate max-w-[130px]">{employee.email||"rahul.sharma@techsol.com"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Phone className="w-3 h-3 text-gray-400" />
          {employee.phone||"+91 98765 43210"}
        </div>
      </div>
      {/* Tabs */}
      <div className="px-4 pt-1">
        <PanelTabs tabs={panelTabs} active={activeTab} onSelect={setActiveTab} />
      </div>
      {/* Overview */}
      {activeTab==="Overview" && (
        <div className="p-4 space-y-4 overflow-y-auto" style={{maxHeight:"calc(100vh - 320px)"}}>
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {[
              ["Date of Joining",  employee.joined||"01 Jan 2020"],
              ["Experience",       (employee.tenure||5.6)+" Years"],
              ["Reporting Manager",employee.manager||"Vikram Rao"],
              ["Department",       employee.dept||"Engineering"],
              ["Work Location",    employee.workLoc||"Bengaluru, India"],
              ["Business Unit",    employee.bizUnit||"Product Development"],
              ["Employment Type",  employee.empType||"Full Time"],
              ["Pay Grade",        employee.payGrade||"P3"],
            ].map(([k,v]) => (
              <div key={k}>
                <div className="text-[10px] text-gray-400 font-medium">{k}</div>
                <div className="text-xs font-semibold text-gray-700 mt-0.5">{v}</div>
              </div>
            ))}
          </div>
          {/* Performance Snapshot */}
          <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700">Performance Snapshot</span>
              <div className="relative">
                <select className="appearance-none border border-gray-200 rounded pl-2 pr-5 py-0.5 text-[10px] text-gray-600 bg-white focus:outline-none cursor-pointer">
                  <option>This Year</option>
                </select>
                <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-[72px] h-[72px] flex-shrink-0">
                <PieChart width={72} height={72}>
                  <Pie data={[{v:employee.perf||4.6},{v:5-(employee.perf||4.6)}]} cx={31} cy={31} innerRadius={22} outerRadius={34} dataKey="v" startAngle={90} endAngle={-270} strokeWidth={0}>
                    <Cell fill="#16a34a" />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-sm font-bold text-gray-800">{employee.perf||4.6}</span>
                  <span className="text-[8px] text-gray-400">/5</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-green-600">Above Expectations</div>
                <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">You are performing<br/>exceptionally well.</div>
                <button className="mt-1.5 text-[11px] text-purple-600 font-semibold hover:underline">View Performance</button>
              </div>
            </div>
          </div>
          {/* Skills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700">Skills</span>
              <button className="text-[11px] text-purple-600 font-medium hover:underline">View all</button>
            </div>
            <div className="space-y-2">
              {skills.map(s => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-600 w-20 flex-shrink-0">{s.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-violet-600 h-1.5 rounded-full transition-all" style={{width:`${s.pct}%`}} />
                  </div>
                  <span className="text-[10px] text-gray-400 w-20 text-right">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Team + Upcoming */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-gray-700 mb-1.5">Team</div>
              <div className="text-[11px] font-medium text-gray-700">Backend Team</div>
              <div className="text-[10px] text-gray-400 mb-2">6 Members</div>
              <div className="flex items-center gap-1">
                {["Vikram Rao","Pooja Singh","Harshit Singh","Arjun Mehta"].map((n,i) => (
                  <Av key={i} name={n} size="xs" />
                ))}
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[9px] text-gray-500 font-bold">+2</div>
              </div>
              <button className="mt-2 text-[11px] text-purple-600 font-medium hover:underline">View Team</button>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-700 mb-1.5">Upcoming</div>
              <div className="space-y-2">
                {[
                  { title:"1:1 with Vikram Rao", date:"24 May 2025, 11:00 AM" },
                  { title:"Performance Review",  date:"15 Jun 2025, 10:00 AM" },
                ].map(ev => (
                  <div key={ev.title} className="flex items-start gap-1.5">
                    <Calendar className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[11px] font-medium text-gray-700 leading-tight">{ev.title}</div>
                      <div className="text-[10px] text-gray-400">{ev.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-2 text-[11px] text-purple-600 font-medium hover:underline">View Calendar</button>
            </div>
          </div>
        </div>
      )}
      {activeTab!=="Overview" && (
        <div className="p-10 flex flex-col items-center justify-center text-gray-400 gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">📋</div>
          <span className="text-sm">{activeTab} coming soon</span>
        </div>
      )}
    </div>
  )
}
