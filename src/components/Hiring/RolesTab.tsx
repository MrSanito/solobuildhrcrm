import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import { roles, backendSkills, topSources } from './data';
import { PipelineBadge, UrgencyBadge } from './Shared';

const { Briefcase, Clock, TrendingUp, Edit3, MoreVertical, Search, Filter, ChevronRight, Plus, Download } = Icons;


function BackendDevPanel() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-base font-bold text-gray-900">Backend Developer</h2>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Active</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> Engineering</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 3 – 6 Years</span>
            <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> ₹12 – ₹18 LPA</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50"><Edit3 className="w-3 h-3" /> Edit Role</button>
          <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"><MoreVertical className="w-4 h-4 text-gray-500" /></button>
        </div>
      </div>
      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 leading-relaxed">We are looking for a skilled Backend Developer to design, build and maintain scalable server-side applications and APIs.</div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-2">Capability Matrix</p>
          <div className="flex flex-col gap-2">
            {backendSkills.map((s) => (
              <div key={s.skill}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-gray-700">{s.skill}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${s.importance === "Must Have" ? "bg-red-100 text-red-600" : s.importance === "Should Have" ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500"}`}>{s.importance}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${s.importance === "Must Have" ? "bg-indigo-500" : s.importance === "Should Have" ? "bg-blue-400" : "bg-gray-400"}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-2">Hiring Demand (AI Insight)</p>
          <div className="p-3 bg-red-50 rounded-xl border border-red-100 mb-2">
            <p className="text-[10px] text-red-600 font-medium mb-1">High demand for this role due to:</p>
            {["3 ongoing projects delayed", "Team capacity 100% overloaded", "2 critical skills gaps identified"].map((r) => (
              <div key={r} className="flex items-start gap-1.5 mb-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" /><span className="text-[10px] text-red-700">{r}</span></div>
            ))}
          </div>
          <div className="flex flex-col items-center p-3 bg-white rounded-xl border border-gray-200">
            <div className="relative w-20 h-20 mb-2">
              <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray={`${(87 / 100) * 188} 188`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-lg font-bold text-gray-800">87</span></div>
            </div>
            <span className="text-[10px] text-red-600 font-semibold">Demand Score</span>
            <span className="text-xs font-bold text-red-700">High</span>
          </div>
        </div>
      </div>
      <div className="p-3 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-700">Pipeline Strength</p>
          <span className="text-xs font-bold text-green-600">Strong</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-1"><div className="h-2 rounded-full bg-green-500" style={{ width: "75%" }} /></div>
        <p className="text-[10px] text-gray-500">Sufficient candidate flow</p>
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Total Applicants</span>
          <span className="text-sm font-bold text-gray-800">248</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">Hiring Plan</p>
          {[{ label: "Target Hires", value: 3 }, { label: "Hired So Far", value: 1 }, { label: "In Progress", value: 2 }].map((h) => (
            <div key={h.label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
              <span className="text-[10px] text-gray-500">{h.label}</span>
              <span className="text-xs font-bold text-gray-800">{h.value}</span>
            </div>
          ))}
          <div className="mt-2"><p className="text-[10px] text-gray-400">Target Date</p><p className="text-[11px] font-semibold text-gray-700">30 Jun 2025</p></div>
        </div>
        <div className="p-3 rounded-xl border border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">Top Sources</p>
          <div className="flex justify-center mb-1">
            <PieChart width={80} height={80}>
              <Pie data={topSources} cx={35} cy={35} outerRadius={35} dataKey="value" strokeWidth={1}>
                {topSources.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </div>
          <div className="flex flex-col gap-0.5">
            {topSources.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] text-gray-600 flex-1">{s.name}</span>
                <span className="text-[10px] font-semibold text-gray-700">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export function RolesTab() {
  const [selectedRole, setSelectedRole] = useState<number>(1);
  return (
    <div className="flex gap-4 flex-1 min-h-0">
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">All Open Roles <span className="text-gray-400 font-normal">(28)</span></h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search roles" className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 w-36" />
            </div>
            <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50"><Filter className="w-3 h-3" /> Filters</button>
            <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
          </div>
        </div>
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-[11px] font-medium">
                <th className="text-left px-4 py-2.5">Role</th>
                <th className="text-left px-3 py-2.5">Department</th>
                <th className="text-center px-3 py-2.5">Applicants</th>
                <th className="text-left px-3 py-2.5">Pipeline Strength</th>
                <th className="text-center px-3 py-2.5">Urgency</th>
                <th className="text-center px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id} onClick={() => setSelectedRole(r.id)} className={`border-b border-gray-50 cursor-pointer transition ${selectedRole === r.id ? "bg-indigo-50" : "hover:bg-gray-50"}`}>
                  <td className="px-4 py-2.5"><p className="font-semibold text-gray-800">{r.role}</p><p className="text-[10px] text-gray-400">{r.exp}</p></td>
                  <td className="px-3 py-2.5 text-gray-600">{r.dept}</td>
                  <td className="px-3 py-2.5 text-center font-semibold text-gray-800">{r.applicants}</td>
                  <td className="px-3 py-2.5"><PipelineBadge level={r.pipeline} /></td>
                  <td className="px-3 py-2.5 text-center"><UrgencyBadge level={r.urgency} /></td>
                  <td className="px-3 py-2.5 text-center"><span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{r.status}</span></td>
                  <td className="px-3 py-2.5"><button className="p-1 rounded hover:bg-gray-200"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
            <span>Showing 1 to 10 of 28 roles</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((n) => <button key={n} className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">{n}</button>)}
              <span>...</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-gray-100 flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700"><Plus className="w-3.5 h-3.5" /> Create New Role</button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50"><Download className="w-3.5 h-3.5" /> Export Roles</button>
        </div>
      </div>
      <div className="w-80 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-4 overflow-y-auto">
        <BackendDevPanel />
      </div>
    </div>
  );
}

