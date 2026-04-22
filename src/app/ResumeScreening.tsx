import React, { useState } from "react";
import { ChevronDown, Search, Filter, Download, Eye, MoreVertical, CheckCircle, XCircle, AlertCircle, Star, Phone, Mail, ExternalLink } from "lucide-react";

/* ─── Candidates ─── */
const candidates = [
  { name:"Rohit Sharma",  email:"rohit.sharma@email.com",  job:"Backend Developer", score:92, cat:"Best Match",  exp:"5.3 Yrs", match:89, catColor:"bg-green-100 text-green-700"  },
  { name:"Sneha Iyer",    email:"sneha.iyer@email.com",    job:"Backend Developer", score:78, cat:"Potential",   exp:"3.8 Yrs", match:72, catColor:"bg-amber-100 text-amber-700"  },
  { name:"Vikram Rao",    email:"vikram.rao@email.com",    job:"Backend Developer", score:75, cat:"Potential",   exp:"6.1 Yrs", match:68, catColor:"bg-amber-100 text-amber-700"  },
  { name:"Aisha Khan",    email:"aisha.khan@email.com",    job:"Backend Developer", score:68, cat:"Not a Fit",   exp:"1.9 Yrs", match:42, catColor:"bg-red-100 text-red-600"      },
  { name:"Karan Mehta",   email:"karan.mehta@email.com",   job:"Backend Developer", score:30, cat:"Not a Fit",   exp:"0.8 Yrs", match:28, catColor:"bg-red-100 text-red-600"      },
  { name:"Priya Nair",    email:"priya.nair@email.com",    job:"Backend Developer", score:85, cat:"Best Match",  exp:"4.6 Yrs", match:83, catColor:"bg-green-100 text-green-700"  },
  { name:"Arjun Singh",   email:"arjun.mehta@email.com",   job:"Backend Developer", score:71, cat:"Potential",   exp:"2.5 Yrs", match:66, catColor:"bg-amber-100 text-amber-700"  },
  { name:"Manish Gupta",  email:"manish.gupta@email.com",  job:"Backend Developer", score:29, cat:"Not a Fit",   exp:"1.2 Yrs", match:25, catColor:"bg-red-100 text-red-600"      },
];

/* ─── Match bar ─── */
function MatchBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-medium text-gray-700 w-8 text-right">{pct}%</span>
    </div>
  );
}

const scoreColor = (s: number) =>
  s >= 80 ? "#22c55e" : s >= 60 ? "#f59e0b" : "#ef4444";

const DETAIL_TABS = ["AI Summary","Skills Match","Experience","Education","Resume","Notes"];

const aiSteps = [
  { n:1, icon:"📄", title:"1. Resume Parsing",     desc:"Extract text, skills, experience & education" },
  { n:2, icon:"🔍", title:"2. Data Understanding", desc:"Understand context, roles, tech stack & level" },
  { n:3, icon:"📊", title:"3. Match Scoring",      desc:"Score against job requirements and must-have parameters" },
  { n:4, icon:"🎯", title:"4. Potential Analysis", desc:"Evaluate learnability, growth potential & adaptability" },
  { n:5, icon:"📋", title:"5. Categorization",     desc:"Best Match / Potential / Not a Fit" },
];

export default function ResumeScreening() {
  const [selected, setSelected] = useState(candidates[0]);
  const [detailTab, setDetailTab] = useState("AI Summary");
  const [filterTab, setFilterTab] = useState("All Resumes");

  const filterTabs = [
    { label:"All Resumes", count:248 },
    { label:"Best Match", count:92 },
    { label:"Potential Candidates", count:78 },
    { label:"Not a Fit", count:78 },
  ];

  return (
    <div className="p-6 space-y-5 min-h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Resume Screening</h1>
          <p className="text-sm text-gray-500 mt-0.5 max-w-xl">
            AI-Powered screening to identify the best candidates. We not only filter, but also identify high-potential candidates who could be a great fit.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter size={14}/> Screening Settings
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Download size={14}/> Upload Resumes
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label:"Total Resumes",        value:"248", sub:"↑ 18% from last 7 days",   subC:"text-green-500",  iconBg:"bg-blue-50",   icon:"📄" },
          { label:"Best Match",           value:"92",  sub:"37.10% of total",           subC:"text-gray-400",   iconBg:"bg-green-50",  icon:"✅" },
          { label:"Potential Candidates", value:"78",  sub:"31.45% of total",           subC:"text-gray-400",   iconBg:"bg-amber-50",  icon:"📋" },
          { label:"Not a Fit",            value:"78",  sub:"31.45% of total",           subC:"text-gray-400",   iconBg:"bg-red-50",    icon:"❌" },
          { label:"Shortlisted",          value:"24",  sub:"9.68% of total",            subC:"text-gray-400",   iconBg:"bg-purple-50", icon:"⭐" },
        ].map(c=>(
          <div key={c.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className={`${c.iconBg} rounded-xl p-3 text-xl flex-shrink-0`}>{c.icon}</div>
            <div>
              <div className="text-xs text-gray-500">{c.label}</div>
              <div className="text-2xl font-bold text-gray-800">{c.value}</div>
              <div className={`text-xs ${c.subC}`}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table + Detail */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left: table */}
        <div className="col-span-7 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Filter tabs */}
          <div className="border-b border-gray-100 px-4 pt-2 flex gap-0">
            {filterTabs.map(ft=>(
              <button
                key={ft.label}
                onClick={()=>setFilterTab(ft.label)}
                className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-1 ${
                  filterTab===ft.label ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {ft.label} <span className={`text-[11px] ${filterTab===ft.label?"text-blue-600":"text-gray-400"}`}>{ft.count}</span>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="px-4 py-2.5 border-b border-gray-50 flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-0 max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input className="w-full h-8 pl-8 pr-3 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400" placeholder="Search by name, skills, keywords..."/>
            </div>
            {["All Jobs","All Sources","All Experience","All Locations"].map(f=>(
              <button key={f} className="flex items-center gap-1 h-8 px-2.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300">
                {f}<ChevronDown size={11}/>
              </button>
            ))}
            <button className="flex items-center gap-1 h-8 px-2.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 ml-auto">
              <Filter size={11}/> More Filters
            </button>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              Sort by: <button className="flex items-center gap-1 font-medium text-gray-700">AI Score (High to Low)<ChevronDown size={11}/></button>
            </div>
            <button className="flex items-center gap-1 h-8 px-2.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300">
              <Download size={11}/> Export
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="w-8 px-3 py-2"><input type="checkbox" className="rounded"/></th>
                  <th className="px-3 py-2 text-left text-gray-500 font-medium">Candidate</th>
                  <th className="px-3 py-2 text-left text-gray-500 font-medium">Job Applied</th>
                  <th className="px-3 py-2 text-center text-gray-500 font-medium">AI Score</th>
                  <th className="px-3 py-2 text-left text-gray-500 font-medium">Category</th>
                  <th className="px-3 py-2 text-left text-gray-500 font-medium">Experience</th>
                  <th className="px-3 py-2 text-left text-gray-500 font-medium">Skills Match</th>
                  <th className="px-3 py-2 text-center text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c,i)=>(
                  <tr
                    key={i}
                    onClick={()=>setSelected(c)}
                    className={`border-b border-gray-50 cursor-pointer transition-colors ${selected.name===c.name?"bg-blue-50":"hover:bg-gray-50"}`}
                  >
                    <td className="px-3 py-2.5 text-center"><input type="checkbox" className="rounded" onClick={e=>e.stopPropagation()}/></td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                          {c.name.split(" ").map(w=>w[0]).join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{c.name}</div>
                          <div className="text-[10px] text-gray-400">{c.email}</div>
                        </div>
                        <a href="#" className="text-blue-500 flex-shrink-0">
                            {/* <Linkedin size={12}/> */}
                            </a>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{c.job}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-bold text-base" style={{color:scoreColor(c.score)}}>{c.score}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c.catColor}`}>{c.cat}</span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{c.exp}</td>
                    <td className="px-3 py-2.5 w-28">
                      <MatchBar pct={c.match} color={scoreColor(c.score)}/>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 hover:bg-gray-200 rounded text-gray-400"><Eye size={13}/></button>
                        <button className="p-1 hover:bg-gray-200 rounded text-gray-400"><MoreVertical size={13}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Showing 1 to 8 of 248 entries</span>
            <div className="flex items-center gap-1">
              {["←",1,2,3,4,5,"...",31,"→"].map((p,i)=>(
                <button key={i} className={`w-7 h-7 text-xs rounded flex items-center justify-center transition-colors ${
                  p===1 ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"
                }`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Detail panel */}
        <div className="col-span-5 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          {/* Top Candidate badge */}
          <div className="px-4 pt-4 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-1 text-amber-500 mb-3">
              <Star size={13} className="fill-amber-400"/>
              <span className="text-xs font-semibold text-amber-600">Top Candidate</span>
            </div>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                  {selected.name.split(" ").map(w=>w[0]).join("")}
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
          <div className="border-b border-gray-100 px-4 flex gap-0 overflow-x-auto">
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
          {detailTab==="AI Summary" && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            </div>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-12 gap-4">
        {/* How AI Works */}
        <div className="col-span-8 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 text-sm mb-4">How AI Screening Works</h3>
          <div className="flex items-start gap-2">
            {aiSteps.map((step,i)=>(
              <React.Fragment key={i}>
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-2xl mb-2">{step.icon}</div>
                  <div className="text-[11px] font-semibold text-gray-700 mb-1">{step.title}</div>
                  <div className="text-[10px] text-gray-500 leading-relaxed">{step.desc}</div>
                </div>
                {i<aiSteps.length-1 && (
                  <div className="mt-5 flex-shrink-0 text-gray-300 text-lg">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Screening Settings */}
        <div className="col-span-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Screening Settings</h3>
            <span className="bg-green-100 text-green-700 text-[10px] font-medium px-2 py-0.5 rounded-full">Active</span>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { label:"AI Model",                      value:"SB Auto AI v2.1" },
              { label:"Minimum AI Score for Best Match",value:"70" },
              { label:"Potential Candidate Range",      value:"50 – 69" },
              { label:"Must Have Skills Weightage",     value:"60%" },
            ].map((s,i)=>(
              <div key={i} className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">{s.label}</span>
                <span className="font-medium text-gray-700">{s.value}</span>
              </div>
            ))}
          </div>
          <button className="mt-3 text-xs text-blue-600 font-medium hover:underline">Manage Settings</button>
        </div>
      </div>
    </div>
  );
}