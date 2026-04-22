import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { screeningBuckets, candidates } from './data';
import { Avatar } from './Shared';

const { Search, Filter, ChevronDown, MapPin, X, Sparkles } = Icons;


function CandidateDetailPanel({ onClose }: { onClose: () => void }) {
  const matchBars = [
    { label: "Skills Match", pct: 94, color: "bg-green-500" },
    { label: "Experience Match", pct: 92, color: "bg-green-500" },
    { label: "Role Fitment", pct: 88, color: "bg-green-500" },
    { label: "Culture Fit", pct: 80, color: "bg-amber-500" },
  ];
  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Avatar initials="RS" gradient="from-indigo-500 to-purple-600" size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900">Rahul Sharma</h3>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Best Match</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Backend Developer</p>
            <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> Bengaluru, India</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-4 h-4 text-gray-400" /></button>
      </div>
      <div className="flex flex-col gap-1.5">
        {[
          { label: "Move to Pipeline", color: "bg-indigo-600 text-white hover:bg-indigo-700" },
          { label: "Move to Qualified", color: "bg-blue-600 text-white hover:bg-blue-700" },
          { label: "Move to Potential", color: "bg-amber-500 text-white hover:bg-amber-600" },
          { label: "Reject Candidate", color: "bg-red-100 text-red-700 hover:bg-red-200" },
          { label: "Add to Talent Pool", color: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
        ].map((action) => (
          <button key={action.label} className={`text-xs font-medium px-3 py-2 rounded-lg transition text-left ${action.color}`}>{action.label}</button>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-green-50 border border-indigo-100">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-indigo-600 flex flex-col items-center justify-center shrink-0">
            <span className="text-xl font-black text-white leading-none">92</span>
            <span className="text-[9px] text-indigo-200 leading-none">AI Score</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-indigo-700 mb-2">Excellent Match</p>
            {matchBars.map((b) => (
              <div key={b.label} className="mb-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] text-gray-600">{b.label}</span>
                  <span className="text-[9px] font-semibold text-gray-700">{b.pct}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1"><div className={`h-1 rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3 rounded-xl border border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-indigo-500" /> AI Summary</p>
        <p className="text-[10px] text-gray-600 leading-relaxed">Strong match for the Backend Developer role. Excellent in core backend technologies with relevant experience in similar roles.</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <p className="text-[9px] font-bold text-green-600 mb-1">✓ Strengths</p>
            {["Expert in Python, Django, REST APIs", "Good experience with PostgreSQL", "Microservices experience", "Problem solving skills"].map((s) => (
              <p key={s} className="text-[9px] text-gray-600 mb-0.5 flex items-start gap-1"><span className="text-green-500 shrink-0">•</span> {s}</p>
            ))}
          </div>
          <div>
            <p className="text-[9px] font-bold text-red-500 mb-1">⚠ Gaps</p>
            {["AWS experience is limited", "Docker knowledge basic", "System design intermediate"].map((g) => (
              <p key={g} className="text-[9px] text-gray-600 mb-0.5 flex items-start gap-1"><span className="text-red-400 shrink-0">•</span> {g}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3 bg-indigo-600 rounded-xl text-white">
        <p className="text-[10px] font-medium opacity-80 mb-0.5">Recommended Action</p>
        <p className="text-xs font-bold">Move to Pipeline</p>
        <button className="mt-2 w-full bg-white text-indigo-700 text-xs font-semibold py-1.5 rounded-lg hover:bg-indigo-50">Move to Pipeline →</button>
      </div>
    </div>
  );
}


export function ScreeningTab() {
  const [selectedCandidate, setSelectedCandidate] = useState<number>(0);
  const [activeBucket, setActiveBucket] = useState("Best Match");
  return (
    <div className="flex gap-3 flex-1 min-h-0">
      <div className="w-44 shrink-0 flex flex-col gap-2">
        <div>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-2 px-1">Screening Buckets</p>
          {screeningBuckets.map((b) => (
            <button key={b.label} onClick={() => setActiveBucket(b.label)} className={`w-full text-left p-2.5 rounded-xl border mb-1.5 transition ${activeBucket === b.label ? `${b.bg} ${b.border} shadow-sm` : "bg-white border-gray-200 hover:border-gray-300"}`}>
              <div className="flex items-center gap-2 mb-1"><b.icon className={`w-3.5 h-3.5 ${b.color}`} /><span className={`text-xs font-semibold ${b.color}`}>{b.count}</span></div>
              <p className="text-[10px] font-medium text-gray-700 leading-tight">{b.label}</p>
              <p className="text-[9px] text-gray-400">{b.pct}</p>
            </button>
          ))}
        </div>
        <div className="mt-2">
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-2 px-1">Filters</p>
          {[{ label: "Role", value: "All roles" }, { label: "Experience", value: "All" }, { label: "Skills", value: "All Skills" }, { label: "Source", value: "All Sources" }].map((f) => (
            <div key={f.label} className="mb-2">
              <label className="text-[10px] text-gray-500 font-medium">{f.label}</label>
              <select className="w-full mt-0.5 text-[10px] border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none bg-white"><option>{f.value}</option></select>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-amber-500">★ Best Match</span>
            <span className="text-xs text-gray-500 ml-2">(92)</span>
            <p className="text-[10px] text-gray-400 mt-0.5">Top matching candidates based on role requirements</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative"><Search className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" /><input placeholder="Search candidates" className="pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg w-36 focus:outline-none focus:ring-1 focus:ring-indigo-300" /></div>
            <button className="flex items-center gap-1 text-xs px-2 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50"><Filter className="w-3 h-3" /> Filters</button>
          </div>
        </div>
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium">
                <th className="text-left px-3 py-2">Candidate</th>
                <th className="text-left px-3 py-2">Role</th>
                <th className="text-center px-3 py-2">AI Score ↑</th>
                <th className="text-center px-3 py-2">Skills Match</th>
                <th className="text-left px-3 py-2">Experience</th>
                <th className="text-left px-3 py-2">Source</th>
                <th className="text-left px-3 py-2">Added On</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, i) => (
                <tr key={i} onClick={() => setSelectedCandidate(i)} className={`border-b border-gray-50 cursor-pointer transition ${selectedCandidate === i ? "bg-indigo-50" : "hover:bg-gray-50"}`}>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Avatar initials={c.avatar} gradient="from-indigo-500 to-purple-600" size="sm" />
                      <div><p className="font-semibold text-gray-800 text-[11px]">{c.name}</p><span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${c.tagColor}`}>{c.tag}</span></div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-gray-600">{c.role}</td>
                  <td className="px-3 py-2.5 text-center"><span className={`font-bold text-sm ${c.aiScore >= 90 ? "text-green-600" : c.aiScore >= 85 ? "text-blue-600" : "text-amber-600"}`}>{c.aiScore}</span></td>
                  <td className="px-3 py-2.5 text-center">
                    {c.skills === 0 ? <span className="text-gray-400 text-[10px]">N/A</span> : (
                      <div><div className="w-14 mx-auto bg-gray-200 rounded-full h-1.5 mb-0.5"><div className="h-1.5 rounded-full bg-green-500" style={{ width: `${c.skills}%` }} /></div><span className="text-[9px] text-gray-500">{c.skills}%</span></div>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-gray-600">{c.exp}</td>
                  <td className="px-3 py-2.5 text-gray-500">{c.source}</td>
                  <td className="px-3 py-2.5 text-gray-400 text-[10px]">{c.added}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-3 py-2 text-[10px] text-gray-400 border-t border-gray-100">Showing 1 to 8 of 92 candidates</div>
        </div>
        <div className="p-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">0 selected</span>
          <div className="flex gap-2">
            {["Move to Pipeline", "Move to Qualified", "Move to Potential", "Reject"].map((action) => (
              <button key={action} className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition ${action === "Reject" ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"}`}>{action}</button>
            ))}
            <button className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1">More Actions <ChevronDown className="w-3 h-3" /></button>
          </div>
        </div>
      </div>
      <div className="w-64 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-3 overflow-y-auto">
        <CandidateDetailPanel onClose={() => {}} />
      </div>
    </div>
  );
}

