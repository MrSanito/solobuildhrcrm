import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { interviewKpis, interviews } from './data';
import { Avatar, StatusBadge } from './Shared';

const { TrendingUp, TrendingDown, ChevronLeft, Calendar, ChevronRight, Filter, Plus, MoreVertical, Star, Video, X, FileText, Mail, Phone } = Icons;


function InterviewDetailPanel({ interview, onClose }: { interview: any; onClose: () => void }) {
  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar initials={interview.avatar} gradient={interview.avatarColor} size="lg" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900">{interview.name}</h3>
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] font-semibold text-gray-600">{interview.score}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">{interview.role}</p>
            <p className="text-[10px] text-gray-400">Applied on 19 May 2025 • ID: {interview.id}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-4 h-4 text-gray-400" /></button>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1 text-[10px] text-indigo-600 border border-indigo-200 rounded-lg py-1.5 hover:bg-indigo-50"><FileText className="w-3 h-3" /> Resume</button>
        <button className="flex-1 flex items-center justify-center gap-1 text-[10px] text-gray-600 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50">
          {/* <Linkedin className="w-3 h-3" />  */}
          LinkedIn</button>
        <button className="flex-1 flex items-center justify-center gap-1 text-[10px] text-gray-600 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50"><Mail className="w-3 h-3" /> Email</button>
        <button className="flex-1 flex items-center justify-center gap-1 text-[10px] text-gray-600 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50"><Phone className="w-3 h-3" /> Call</button>
      </div>

      {/* Interview Time */}
      <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50 flex items-start justify-between">
        <div>
          <p className="text-[10px] text-indigo-500 font-medium">Today, {interview.time} ({interview.duration})</p>
          <p className="text-sm font-bold text-indigo-800">{interview.type}</p>
          <p className="text-[10px] text-indigo-500">{interview.mode} Interview</p>
        </div>
        <button className="flex items-center gap-1 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 font-medium whitespace-nowrap">
          <Video className="w-3 h-3" /> Join Meeting
        </button>
      </div>

      {/* Panel */}
      <div className="p-3 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-700">Interview Panel</p>
          <button className="text-[10px] text-indigo-600 hover:underline">Edit Panel</button>
        </div>
        {[
          { name: "Ritesh Kumar", title: "Engineering Manager", role: "Interviewer", avatar: "RK", color: "from-indigo-500 to-purple-600" },
          { name: "Ananya Singh", title: "Senior Backend Engineer", role: "Interviewer", avatar: "AS", color: "from-teal-400 to-cyan-500" },
          { name: "Manoj Kumar", title: "Tech Lead", role: "Interviewer", avatar: "MK", color: "from-amber-400 to-orange-500" },
          { name: "Priya Sharma", title: "HR Manager", role: "Observer", avatar: "PS", color: "from-pink-400 to-rose-500" },
        ].map((p) => (
          <div key={p.name} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
            <Avatar initials={p.avatar} gradient={p.color} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-gray-700 truncate">{p.name}</p>
              <p className="text-[9px] text-gray-400 truncate">{p.title}</p>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${p.role === "Observer" ? "bg-gray-100 text-gray-500" : "bg-indigo-100 text-indigo-600"}`}>{p.role}</span>
          </div>
        ))}
      </div>

      {/* Interview Details */}
      <div className="p-3 rounded-xl border border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-2">Interview Details</p>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          {[
            { label: "Role", value: interview.role },
            { label: "Department", value: interview.dept },
            { label: "Experience", value: `${interview.exp} • ${interview.exp}` },
            { label: "Location", value: "Bengaluru, India" },
            { label: "Interview Type", value: interview.type },
          ].map((d) => (
            <div key={d.label}><p className="text-gray-400">{d.label}</p><p className="font-semibold text-gray-700">{d.value}</p></div>
          ))}
        </div>
        <div className="mt-2">
          <p className="text-[10px] text-gray-400 mb-1">Focus Areas</p>
          <div className="flex flex-wrap gap-1">
            {["Data Structures", "System Design", "Problem Solving"].map((f) => (
              <span key={f} className="text-[9px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-3 rounded-xl border border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-2">Timeline</p>
        {[
          { event: "Interview Scheduled", detail: "By Priya Sharma on 19 May 2025", color: "bg-indigo-400" },
          { event: "Candidate Confirmed", detail: "19 May 2025, 04:30 PM", color: "bg-green-400" },
          { event: "Reminder Sent", detail: "21 May 2025, 08:30 AM", color: "bg-blue-400" },
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${t.color} mt-1 shrink-0`} />
            <div>
              <p className="text-[10px] font-medium text-gray-700">{t.event}</p>
              <p className="text-[9px] text-gray-400">{t.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="flex-1 text-xs border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 font-medium">Reschedule</button>
        <button className="flex-1 text-xs bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 font-medium">Add Note</button>
        <button className="flex-1 text-xs border border-red-200 text-red-600 py-2 rounded-xl hover:bg-red-50 font-medium">Cancel</button>
      </div>
    </div>
  );
}


export function InterviewsTab() {
  const [selectedInterview, setSelectedInterview] = useState<any>(interviews[0]);

  return (
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      {/* Interview-specific KPI row */}
      <div className="grid grid-cols-6 gap-3">
        {interviewKpis.map((k, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-500 font-medium leading-tight">{k.label}</span>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${k.bg}`}><k.icon className={`w-3.5 h-3.5 ${k.color}`} /></div>
            </div>
            <div className="text-base font-bold text-gray-900 leading-tight">{k.value}</div>
            <div className={`text-[10px] flex items-center gap-1 ${k.up ? "text-green-600" : "text-red-500"}`}>
              {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {k.change}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-1 min-h-0">
        {/* Schedule Table */}
        <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Interview Schedule</h3>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"><ChevronLeft className="w-3.5 h-3.5 text-gray-500" /></button>
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 border border-gray-200 px-2.5 py-1.5 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Today, 21 May 2025
              </div>
              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"><ChevronRight className="w-3.5 h-3.5 text-gray-500" /></button>
              <button className="flex items-center gap-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50"><Filter className="w-3 h-3" /> Filters</button>
              <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none bg-white">
                <option>All Interviews</option>
              </select>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700">
                <Plus className="w-3.5 h-3.5" /> Schedule Interview
              </button>
              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium">
                  <th className="text-left px-4 py-2.5">TIME</th>
                  <th className="text-left px-3 py-2.5">CANDIDATE</th>
                  <th className="text-left px-3 py-2.5">ROLE</th>
                  <th className="text-left px-3 py-2.5">INTERVIEW TYPE</th>
                  <th className="text-left px-3 py-2.5">PANEL</th>
                  <th className="text-left px-3 py-2.5">STATUS</th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {interviews.map((iv, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedInterview(iv)}
                    className={`border-b border-gray-50 cursor-pointer transition ${selectedInterview?.name === iv.name ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                  >
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <p className="font-semibold text-gray-800">{iv.time}</p>
                      <p className="text-[10px] text-gray-400">{iv.duration}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <Avatar initials={iv.avatar} gradient={iv.avatarColor} size="sm" />
                        <div>
                          <p className="font-semibold text-gray-800 text-[11px]">{iv.name}</p>
                          <div className="flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] text-gray-500">{iv.score}</span>
                            <span className="text-[10px] text-gray-400 ml-1">{iv.exp}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-gray-700 text-[11px]">{iv.role}</p>
                      <p className="text-[10px] text-gray-400">{iv.dept}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        <Video className="w-3 h-3 text-indigo-400 shrink-0" />
                        <div>
                          <p className="text-[11px] font-medium text-gray-700">{iv.type}</p>
                          <p className="text-[10px] text-gray-400">{iv.mode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center">
                        {iv.panel.map((p, j) => (
                          <div key={j} className={`w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-[8px] font-bold border-2 border-white ${j > 0 ? "-ml-1.5" : ""}`}>{p}</div>
                        ))}
                        {iv.panelExtra > 0 && (
                          <div className="-ml-1.5 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500 border-2 border-white">+{iv.panelExtra}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2.5"><StatusBadge status={iv.status} /></td>
                    <td className="px-3 py-2.5"><button className="p-1 rounded hover:bg-gray-200"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
              <span>Showing 1 to 8 of 32 interviews</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((n) => <button key={n} className={`px-2 py-1 rounded border text-xs ${n === 1 ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 hover:bg-gray-50"}`}>{n}</button>)}
                <span className="text-gray-400">...</span>
                <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">5</button>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Interview Detail Panel */}
        {selectedInterview && (
          <div className="w-72 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-4 overflow-y-auto">
            <InterviewDetailPanel interview={selectedInterview} onClose={() => setSelectedInterview(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

