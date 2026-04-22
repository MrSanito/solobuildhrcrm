import React from "react";
import { Star, Mail, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { DETAIL_TABS, scoreColor } from "./data";

interface Props {
  selected: any;
  detailTab: string;
  setDetailTab: (t: string) => void;
}

export default function CandidateDetailPanel({ selected, detailTab, setDetailTab }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Top Candidate badge */}
      <div className="px-4 pt-4 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-1 text-amber-500 mb-3">
          <Star size={13} className="fill-amber-400"/>
          <span className="text-xs font-semibold text-amber-600">Top Candidate</span>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {selected.name.split(" ").map((w: string)=>w[0]).join("")}
            </div>
            <div>
              <div className="font-bold text-gray-800 text-base">{selected.name}</div>
              <div className="text-sm text-gray-500">{selected.job}</div>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <span>📍 Bangalore, India</span>
                <span>·</span>
                <span>{selected.exp} Exp.</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <Mail size={10}/>
                <span>{selected.email}</span>
                <Phone size={10}/>
                <span>9876543210</span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs text-gray-400 mb-0.5">AI Score</div>
            <div className="text-3xl font-bold" style={{color:scoreColor(selected.score)}}>{selected.score}<span className="text-sm text-gray-400 font-normal">/100</span></div>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${selected.catColor}`}>{selected.cat}</span>
          </div>
        </div>
        <button className="mt-3 w-full py-2 border border-blue-500 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors">
          View Full Profile
        </button>
      </div>

      {/* Detail tabs */}
      <div className="border-b border-gray-100 px-4 flex gap-0 overflow-x-auto scrollbar-hide">
        {DETAIL_TABS.map(t=>(
          <button
            key={t}
            onClick={()=>setDetailTab(t)}
            className={`px-2.5 py-2.5 text-[11px] font-medium border-b-2 whitespace-nowrap transition-colors ${
              detailTab===t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* AI Summary content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {detailTab==="AI Summary" ? (
          <>
            {/* AI Recommendation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">AI Recommendation</h4>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${selected.catColor}`}>{selected.cat}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Strong match for the role. Candidate has the right skills, relevant experience and good alignment with job requirements.
              </p>
            </div>

            {/* Key Strengths */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Key Strengths</h4>
              <div className="space-y-1.5">
                {[
                  "Strong experience in Python, Django, REST APIs",
                  "Good problem solving and DSA skills",
                  "Relevant project experience in backend systems",
                  "Excellent educational background",
                ].map((s,i)=>(
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle size={13} className="text-green-500 flex-shrink-0 mt-0.5"/>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Potential Risks */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Potential Risks / Gaps</h4>
              <div className="space-y-1.5">
                {[
                  "Limited experience with Microservices architecture",
                  "Could improve in System Design depth",
                ].map((s,i)=>(
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <AlertCircle size={13} className="text-amber-400 flex-shrink-0 mt-0.5"/>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Match Breakdown */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Match Breakdown</h4>
              <div className="space-y-2.5">
                {[
                  { label:"Skills",        pct:89, color:"#22c55e" },
                  { label:"Experience",    pct:85, color:"#22c55e" },
                  { label:"Education",     pct:90, color:"#22c55e" },
                  { label:"Culture Fit (AI)", pct:78, color:"#3b82f6" },
                  { label:"Overall",       pct:selected.score, color:scoreColor(selected.score) },
                ].map(m=>(
                  <div key={m.label}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{m.label}</span>
                      <span className="font-semibold">{m.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{width:`${m.pct}%`,backgroundColor:m.color}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Potential Candidates */}
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <h4 className="text-xs font-bold text-amber-700 mb-1.5">Why in Potential Candidates?</h4>
              <p className="text-xs text-amber-700 leading-relaxed mb-2">
                If the candidate lacks 1-2 must-have skills, but shows strong learning ability and high potential, they are moved to this category.
              </p>
              <div className="text-xs text-amber-700 font-medium mb-1">We suggest considering them for:</div>
              <div className="space-y-1">
                {["Training & Upskilling","Junior role / Alternate role"].map((s,i)=>(
                  <div key={i} className="flex items-center gap-1.5 text-xs text-amber-700">
                    <CheckCircle size={11} className="text-amber-500"/>{s}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
            <AlertCircle size={24} />
            <p className="text-xs font-medium">{detailTab} detail coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
