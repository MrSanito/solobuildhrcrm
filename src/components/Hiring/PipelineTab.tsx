import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { pipelineColumns, conversionData, timeInStageData, priorityData, topRolesPipeline } from './data';
import { Avatar } from './Shared';
import { PieChart, Pie, Cell, LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

const { Search, Filter, MoreVertical, Download, CheckCircle2, Users, Activity, Star, ChevronRight, X, Sparkles, FileText } = Icons;


function PipelineCandidateDetail({ candidate, onClose }: { candidate: any; onClose: () => void }) {
  const [profileTab, setProfileTab] = useState<"Profile" | "Timeline" | "Feedback" | "Notes">("Profile");
  const matchScore = candidate.score ?? 85;

  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Avatar initials={candidate.avatar} gradient={candidate.avatarColor} size="lg" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-gray-900">{candidate.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] font-semibold text-gray-600">{matchScore}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{candidate.role}</p>
            <p className="text-[10px] text-gray-400">{candidate.date}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-4 h-4 text-gray-400" /></button>
      </div>

      {/* Stage + Action */}
      <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[10px] text-indigo-500 font-medium">Current Stage</p>
            <p className="text-sm font-bold text-indigo-800">Screening</p>
            <p className="text-[10px] text-indigo-400">Since 20 May 2025 (1 day)</p>
          </div>
          <button className="flex items-center gap-1 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 font-medium">
            Move Stage <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* AI Match */}
      <div className="p-3 rounded-xl border border-gray-200 bg-white">
        <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-indigo-500" /> AI Match Summary</p>
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#e5e7eb" strokeWidth="6" />
              <circle cx="32" cy="32" r="26" fill="none" stroke="#22c55e" strokeWidth="6"
                strokeDasharray={`${(matchScore / 100) * 163.4} 163.4`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base font-black text-gray-800">{matchScore}%</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-green-600 mb-1">Excellent Match</p>
            {["Strong in Python, Django, REST APIs", "5.6 Yrs relevant experience", "Good culture and role fit"].map((s) => (
              <div key={s} className="flex items-start gap-1 mb-0.5">
                <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                <span className="text-[10px] text-gray-600">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="border-b border-gray-100 flex gap-3">
        {(["Profile", "Timeline", "Feedback", "Notes"] as const).map((t) => (
          <button key={t} onClick={() => setProfileTab(t)} className={`text-[11px] font-medium pb-1.5 border-b-2 transition ${profileTab === t ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>{t}</button>
        ))}
      </div>

      {profileTab === "Profile" && (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {[
              { label: "Experience", value: "5.6 Years" },
              { label: "Current Role", value: "Senior Backend Developer" },
              { label: "Education", value: "B.Tech in CS" },
              { label: "Location", value: "Bengaluru, India" },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-gray-400">{f.label}</p>
                <p className="font-semibold text-gray-700">{f.value}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[10px] text-gray-400 mb-1">Key Skills</p>
            <div className="flex flex-wrap gap-1">
              {["Python", "Django", "REST APIs", "PostgreSQL", "AWS", "Docker"].map((sk) => (
                <span key={sk} className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium">{sk}</span>
              ))}
            </div>
          </div>
          <div className="p-2.5 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-[10px] font-semibold text-gray-700">Rahul_Sharma_Resume.pdf</p>
                <p className="text-[9px] text-gray-400">Uploaded on 18 May 2025</p>
              </div>
            </div>
            <button className="p-1 rounded-lg hover:bg-gray-100"><Download className="w-3.5 h-3.5 text-gray-500" /></button>
          </div>
        </div>
      )}

      {profileTab === "Timeline" && (
        <div className="flex flex-col gap-2">
          {[
            { event: "Added to Screening", date: "20 May 2025", icon: "🔵" },
            { event: "Resume Parsed", date: "20 May 2025", icon: "📄" },
            { event: "AI Scoring Completed", date: "20 May 2025", icon: "✨" },
            { event: "Moved to Best Match", date: "20 May 2025", icon: "⭐" },
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <div>
                <p className="text-[10px] font-medium text-gray-700">{t.event}</p>
                <p className="text-[9px] text-gray-400">{t.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {profileTab === "Feedback" && (
        <div className="p-3 bg-gray-50 rounded-xl text-[10px] text-gray-500 text-center">No feedback recorded yet.</div>
      )}

      {profileTab === "Notes" && (
        <div className="p-3 bg-gray-50 rounded-xl text-[10px] text-gray-500 text-center">No notes added yet.</div>
      )}

      {/* Bottom CTA */}
      <button className="w-full bg-indigo-600 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2">
        Move to Next Stage <ChevronRight className="w-3.5 h-3.5" />
      </button>
      <button className="w-full border border-red-200 text-red-600 text-xs font-medium py-2 rounded-xl hover:bg-red-50 transition">Reject</button>
    </div>
  );
}


export function PipelineTab() {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  return (
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-800">Hiring Pipeline</h2>
          <p className="text-[11px] text-gray-400">Track candidates as they move through the hiring stages.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative"><Search className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" /><input placeholder="All Roles" className="pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg w-28 focus:outline-none focus:ring-1 focus:ring-indigo-300" /></div>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 bg-white rounded-lg hover:bg-gray-50"><Filter className="w-3 h-3" /> Filters</button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 bg-white rounded-lg hover:bg-gray-50"><MoreVertical className="w-3 h-3" /> Column Settings</button>
          <button className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"><Download className="w-3.5 h-3.5 text-gray-500" /></button>
        </div>
      </div>

      <div className="flex gap-3 flex-1 min-h-0">
        {/* Kanban Board */}
        <div className="flex-1 min-w-0 overflow-x-auto">
          <div className="flex gap-3 h-full min-w-max">
            {pipelineColumns.map((col) => (
              <div key={col.id} className="w-52 shrink-0 flex flex-col gap-2">
                {/* Column Header */}
                <div className={`bg-white rounded-xl border border-gray-200 border-t-4 ${col.color} p-3 shadow-sm`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-800">{col.label}</p>
                      <p className="text-[10px] text-gray-400">{col.count} candidates • {col.pct}</p>
                    </div>
                    <button className="p-0.5 hover:bg-gray-100 rounded"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
                  </div>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2 overflow-y-auto flex-1">
                  {col.candidates.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedCandidate(c)}
                      className={`bg-white rounded-xl border p-3 shadow-sm cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5 ${selectedCandidate?.name === c.name ? "border-indigo-300 bg-indigo-50" : "border-gray-200"}`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Avatar initials={c.avatar} gradient={c.avatarColor} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-gray-800 truncate">{c.name}</p>
                          <p className="text-[10px] text-gray-400 truncate">{c.role}</p>
                        </div>
                        {c.score !== null && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-lg shrink-0 ${c.score >= 90 ? "bg-green-100 text-green-700" : c.score >= 80 ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{c.score}</span>
                        )}
                        {c.score === null && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex gap-0.5">
                          {col.id === "screening" && <><div className="w-3 h-3 rounded-full bg-indigo-300" title="profile" /><div className="w-3 h-3 rounded-full bg-indigo-300" title="email" /><div className="w-3 h-3 rounded-full bg-indigo-300" title="calendar" /></>}
                        </div>
                        <p className="text-[9px] text-gray-400 ml-auto">{c.date}</p>
                      </div>
                    </div>
                  ))}
                  {col.extra > 0 && (
                    <button className="text-[10px] text-indigo-600 font-medium text-center py-1.5 hover:underline">+ {col.extra} more candidates</button>
                  )}
                  {col.id === "hired" && (
                    <button className="text-[10px] text-indigo-600 font-medium text-center py-1.5 hover:underline">View all hired</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Panel */}
        {selectedCandidate ? (
          <div className="w-72 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-4 overflow-y-auto">
            <PipelineCandidateDetail candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
          </div>
        ) : (
          <div className="w-72 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col items-center justify-center text-center">
            <Users className="w-8 h-8 text-indigo-200 mb-2" />
            <p className="text-xs font-medium text-gray-500">Click on a candidate card</p>
            <p className="text-[10px] text-gray-400 mt-1">to see their details here</p>
          </div>
        )}
      </div>

      {/* Drag hint */}
      <div className="flex items-center justify-center gap-2 py-2 bg-white rounded-xl border border-dashed border-gray-200">
        <Activity className="w-3.5 h-3.5 text-gray-400" />
        <p className="text-[11px] text-gray-400">Drag and drop candidates between stages to move them</p>
      </div>

      {/* Pipeline Insights */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h3 className="text-xs font-bold text-gray-800 mb-3">Pipeline Insights</h3>
        <div className="grid grid-cols-4 gap-4">
          {/* Stage Conversion Rate */}
          <div>
            <p className="text-[10px] text-gray-500 mb-1">Overall Conversion Rate</p>
            <p className="text-sm font-bold text-gray-800">18.3%</p>
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={conversionData}>
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={{ r: 2, fill: "#6366f1" }} />
                <Tooltip contentStyle={{ fontSize: 9 }} formatter={(v: any) => [`${v}%`]} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
              {conversionData.map((d) => <span key={d.name}>{d.name}</span>)}
            </div>
          </div>

          {/* Time in Stage */}
          <div>
            <p className="text-[10px] text-gray-500 mb-2">Time in Stage (Avg.)</p>
            {timeInStageData.map((t) => (
              <div key={t.stage} className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-gray-600 w-16 shrink-0">{t.stage}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${(t.days / 10) * 100}%` }} />
                </div>
                <span className="text-[10px] font-semibold text-gray-600 w-10 text-right">{t.days} Days</span>
              </div>
            ))}
          </div>

          {/* Pipeline by Priority */}
          <div>
            <p className="text-[10px] text-gray-500 mb-1">Pipeline by Priority</p>
            <div className="flex items-center gap-3">
              <PieChart width={70} height={70}>
                <Pie data={priorityData} cx={30} cy={30} outerRadius={30} dataKey="value" strokeWidth={1}>
                  {priorityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
              <div className="flex flex-col gap-1">
                {priorityData.map((p) => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                    <span className="text-[10px] text-gray-600">{p.name}</span>
                    <span className="text-[10px] font-semibold text-gray-700 ml-auto">{p.value} ({p.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Roles */}
          <div>
            <p className="text-[10px] text-gray-500 mb-2">Top Roles by Pipeline</p>
            {topRolesPipeline.map((r) => (
              <div key={r.role} className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-gray-600 w-28 shrink-0 truncate">{r.role}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-indigo-400" style={{ width: `${(r.count / r.max) * 100}%` }} />
                </div>
                <span className="text-[10px] font-semibold text-gray-600 w-6 text-right">{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

