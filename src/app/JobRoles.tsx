"use client";

import React, { useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";
import {
  Users, ChevronDown, ChevronRight, Brain, Plus,
  MoreVertical, Star, Calendar, TrendingUp, Clock,
  FileText, UserCheck, Gift, Target, AlertCircle,
} from "lucide-react";

/* ─── Stat data ─── */
const stats = [
  { label:"Total Openings",    value:"28",    sub:"▲ 4 vs last month",    subColor:"text-green-500",  sparkColor:"#3b82f6" },
  { label:"Active Candidates", value:"1,248", sub:"▲ 18.7% vs last month",subColor:"text-green-500",  sparkColor:"#22c55e" },
  { label:"In Interviews",     value:"156",   sub:"▲ 12.4% vs last month",subColor:"text-green-500",  sparkColor:"#a855f7" },
  { label:"Offers Extended",   value:"32",    sub:"▲ 6 vs last month",    subColor:"text-green-500",  sparkColor:"#f59e0b" },
  { label:"Hires This Month",  value:"18",    sub:"▲ 5 vs last month",    subColor:"text-green-500",  sparkColor:"#22c55e" },
  { label:"Avg. Time to Hire", value:"24 Days",sub:"▼ 3 days vs last month",subColor:"text-red-400", sparkColor:"#ef4444" },
];

/* ─── Job openings ─── */
const jobs = [
  { title:"Software Engineer (Backend)", dept:"Engineering", loc:"Bangalore", apps:128, priority:"High" },
  { title:"Product Manager",             dept:"Product",     loc:"Bangalore", apps:96,  priority:"High" },
  { title:"UI/UX Designer",              dept:"Design",      loc:"Hyderabad", apps:78,  priority:"Medium" },
  { title:"HR Executive",                dept:"HR",          loc:"Pune",      apps:64,  priority:"Medium" },
  { title:"Sales Executive",             dept:"Sales",       loc:"Mumbai",    apps:142, priority:"High" },
];

/* ─── Pipeline ─── */
const pipeline = [
  {
    stage:"Applied", count:1248, bg:"#dbeafe", textColor:"#1d4ed8",
    candidates:[
      { name:"Rahul Sharma",  role:"Software Engineer",  sub:"Applied on 21 May 2025", grad:"from-blue-500 to-indigo-600" },
      { name:"Priya Nair",    role:"Product Manager",    sub:"Applied on 21 May 2025", grad:"from-emerald-500 to-teal-600" },
      { name:"Amit Verma",    role:"UI/UX Designer",     sub:"Applied on 20 May 2025", grad:"from-orange-400 to-rose-500" },
    ], more:1045
  },
  {
    stage:"Screening", count:312, bg:"#fef9c3", textColor:"#854d0e",
    candidates:[
      { name:"Sneha Iyer",  role:"Software Engineer", sub:"Score: 88", grad:"from-pink-500 to-rose-600" },
      { name:"Karan Mehta", role:"Product Manager",   sub:"Score: 81", grad:"from-amber-500 to-orange-600" },
      { name:"Vikram Rao",  role:"UI/UX Designer",    sub:"Score: 78", grad:"from-teal-500 to-cyan-600" },
    ], more:309
  },
  {
    stage:"Interview", count:156, bg:"#f3e8ff", textColor:"#6b21a8",
    candidates:[
      { name:"Neha Joshi",  role:"Software Engineer", sub:"Round 2", grad:"from-violet-500 to-purple-600" },
      { name:"Rohit Singh", role:"Product Manager",   sub:"Round 1", grad:"from-blue-500 to-sky-600" },
      { name:"Arjun Nair",  role:"UI/UX Designer",    sub:"Round 2", grad:"from-green-500 to-emerald-600" },
    ], more:153
  },
  {
    stage:"Offer", count:32, bg:"#dcfce7", textColor:"#14532d",
    candidates:[
      { name:"Pooja Shah",   role:"Software Engineer", sub:"Offer Extended", grad:"from-pink-400 to-pink-600" },
      { name:"Vivek Kumar",  role:"Product Manager",   sub:"Offer Extended", grad:"from-indigo-500 to-purple-600" },
    ], more:30
  },
];

/* ─── Hiring sources ─── */
const sources = [
  { name:"LinkedIn",          value:599, pct:48, color:"#3b82f6" },
  { name:"Naukri",            value:274, pct:22, color:"#22c55e" },
  { name:"Employee Referral", value:199, pct:16, color:"#f59e0b" },
  { name:"Company Website",   value:125, pct:10, color:"#a855f7" },
  { name:"Others",            value:51,  pct:4,  color:"#94a3b8" },
];

/* ─── Recent activity ─── */
const activity = [
  { icon:"🟢", title:"Offer accepted by Ananya Reddy",       sub:"Software Engineer",              time:"10 min ago" },
  { icon:"🔵", title:"New application for Product Manager",  sub:"Priya Kapoor",                   time:"25 min ago" },
  { icon:"🟡", title:"Interview scheduled with Rohit Singh", sub:"Round 1 – 23 May 2025",          time:"1 hr ago" },
  { icon:"🟠", title:"Offer extended to Pooja Shah",         sub:"Software Engineer",              time:"2 hrs ago" },
  { icon:"🔵", title:"New job opening created",              sub:"DevOps Engineer",                time:"3 hrs ago" },
];

/* ─── Funnel data ─── */
const funnel = [
  { stage:"Applied",   count:1248, pct:null,   color:"#22d3ee",  h:56 },
  { stage:"Screening", count:312,  pct:"25.0%",color:"#34d399",  h:46 },
  { stage:"Interview", count:156,  pct:"12.5%",color:"#fbbf24",  h:38 },
  { stage:"Offer",     count:32,   pct:"2.6%", color:"#f97316",  h:30 },
  { stage:"Hired",     count:18,   pct:"1.4%", color:"#ef4444",  h:22 },
];

const TABS = ["Job Roles","Resume Screening","Candidate Pipeline","Interviews","Offers","Hiring Intelligence","Source Analytics","Talent Pool","Reports & Diagnostics"];

function Sparkline({color}:{color:string}) {
  const pts = [3,8,5,10,7,12,9,14].map((v,i)=>`${i*14},${16-v}`).join(" ");
  return (
    <svg viewBox="0 0 98 18" className="w-full h-6">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

export default function JobRoles() {
  return (
    <div className="space-y-4">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {stats.map(s=>(
          <div key={s.label} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500 truncate mb-1">{s.label}</div>
            <div className="text-xl font-bold text-gray-800">{s.value}</div>
            <div className={`text-[11px] mt-0.5 ${s.subColor}`}>{s.sub}</div>
            <Sparkline color={s.sparkColor}/>
          </div>
        ))}
      </div>

      {/* Main 3-column grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left col */}
        <div className="col-span-1 xl:col-span-4 space-y-4">
          {/* Open Job Openings */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">Open Job Openings</h3>
              <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400">
                  <th className="text-left pb-2 font-medium">Job Title</th>
                  <th className="text-left pb-2 font-medium">Dept</th>
                  <th className="text-left pb-2 font-medium">Loc</th>
                  <th className="text-right pb-2 font-medium">Apps</th>
                  <th className="text-center pb-2 font-medium">Status</th>
                  <th className="text-center pb-2 font-medium">Priority</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j,i)=>(
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2 pr-1">
                      <div className="font-medium text-gray-700 text-[11px] leading-tight">{j.title}</div>
                    </td>
                    <td className="py-2 text-gray-500 text-[11px]">{j.dept}</td>
                    <td className="py-2 text-gray-500 text-[11px]">{j.loc}</td>
                    <td className="py-2 text-right text-gray-700 font-medium text-[11px]">{j.apps}</td>
                    <td className="py-2 text-center">
                      <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-medium">Open</span>
                    </td>
                    <td className="py-2 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        j.priority==="High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                      }`}>{j.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-2 flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline">
              <Plus size={12}/> Create Job Opening
            </button>
          </div>

          {/* AI Hiring Recommendations */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">AI Hiring Recommendations</h3>
              <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Brain size={14} className="text-blue-600"/>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-800">DevOps Engineer</span>
                  </div>
                </div>
                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">High Priority</span>
              </div>
              <div>
                <div className="text-[11px] text-gray-500 font-medium mb-1">Why hire?</div>
                <div className="text-xs text-gray-600">High workload (128% of capacity) and 14 open tasks pending.</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-[11px] text-gray-500 font-medium mb-1">Recommended Action</div>
                <div className="text-sm font-semibold text-gray-800">Hire 2 DevOps Engineers</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-gray-400">Urgency Score</div>
                  <div className="text-xl font-bold text-gray-800">85 <span className="text-sm font-normal text-gray-400">/100</span></div>
                </div>
                <button className="px-3 py-1.5 border border-blue-500 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors">
                  View Full Insight
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center col */}
        <div className="col-span-1 xl:col-span-5 space-y-4">
          {/* Candidate Pipeline */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold text-gray-800 text-sm">Candidate Pipeline</h3>
                <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[9px] text-gray-500 cursor-help">?</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded px-2 py-1 flex items-center gap-1">This Month<ChevronDown size={11}/></button>
                <button className="text-xs text-blue-600 font-medium hover:underline">View Full Pipeline</button>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {pipeline.map(col=>(
                <div key={col.stage} className="flex-shrink-0 w-[160px] min-w-[160px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded border border-gray-200" style={{color:col.textColor, backgroundColor: col.bg + '10'}}>
                      {col.stage}
                    </span>
                    <span className="text-xs font-bold text-gray-700">{col.count.toLocaleString()}</span>
                  </div>
                  <div className="space-y-2">
                    {col.candidates.map((c,ci)=>(
                      <div key={ci} className="bg-white border border-gray-200 rounded-lg p-2 relative shadow-sm">
                        <button className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full"><MoreVertical size={12}/></button>
                        {col.stage==="Applied" && ci===0 && (
                          <Star size={11} className="absolute top-1.5 left-1.5 text-amber-400 fill-amber-400 z-10"/>
                        )}
                        <div className="flex items-center gap-1.5 mb-1 relative z-0">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 ${col.stage==="Applied" && ci===0 ? 'ml-3' : ''}`}>
                            {c.name.split(" ").map((w:string)=>w[0]).join("")}
                          </div>
                          <div className="min-w-0 flex-1 pr-4">
                            <div className="text-[11px] font-semibold text-gray-800 truncate">{c.name}</div>
                            <div className="text-[10px] text-gray-500 truncate">{c.role}</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-gray-400 truncate pr-4">{c.sub}</div>
                      </div>
                    ))}
                    {col.more > 0 && (
                      <div className="text-center text-[11px] text-blue-600 font-medium py-1 cursor-pointer hover:underline">
                        + {col.more.toLocaleString()} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Hiring Sources */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">Top Hiring Sources</h3>
              <button className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded px-2 py-1 flex items-center gap-1">This Month<ChevronDown size={11}/></button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0" style={{width:130,height:130}}>
                <ResponsiveContainer width={130} height={130}>
                  <PieChart>
                    <Pie data={sources} cx="50%" cy="50%" innerRadius={38} outerRadius={58} startAngle={90} endAngle={-270} dataKey="value" strokeWidth={2} stroke="#fff">
                      {sources.map((e,i)=><Cell key={i} fill={e.color}/>)}
                    </Pie>
                    <Tooltip contentStyle={{fontSize:11,borderRadius:8}} formatter={(v:any,n:any)=>[v,n]}/>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-lg font-bold text-gray-800">1,248</span>
                  <span className="text-[10px] text-gray-500">Total</span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {sources.map(s=>(
                  <div key={s.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor:s.color}}/>
                      <span className="text-gray-600">{s.name}</span>
                    </div>
                    <span className="text-gray-700 font-medium">{s.pct}% ({s.value})</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs">
              <div><span className="text-gray-500">Cost per Hire</span><span className="font-bold text-gray-800 ml-1">₹8,450</span></div>
              <div><span className="text-gray-500">Best Source</span><span className="font-bold text-green-600 ml-1">Employee Referral (₹3,200)</span></div>
            </div>
          </div>
        </div>

        {/* Right col */}
        <div className="col-span-1 xl:col-span-3 space-y-4">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">Recent Activity</h3>
              <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {activity.map((a,i)=>(
                <div key={i} className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-sm">{a.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium text-gray-700 leading-tight">{a.title}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{a.sub}</div>
                  </div>
                  <div className="text-[10px] text-gray-400 whitespace-nowrap">{a.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm mb-2">Quick Actions</h3>
            <div className="space-y-1">
              {[
                {label:"Create Job Opening",icon:Plus},
                {label:"Schedule Interview",icon:Calendar},
                {label:"Generate Offer Letter",icon:FileText},
                {label:"View Candidate Database",icon:Users},
              ].map(qa=>{
                const Icon=qa.icon;
                return (
                  <button key={qa.label} className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                      <Icon size={14} className="text-gray-400"/>
                      {qa.label}
                    </div>
                    <ChevronRight size={13} className="text-gray-300 group-hover:text-gray-500"/>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">Alerts</h3>
              <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {[
                { text:"5 interviews scheduled today",   action:"View Schedule", color:"text-blue-600" },
                { text:"3 offers pending approval",      action:"Review Now",    color:"text-amber-600" },
                { text:"2 job openings are inactive",    action:"Reactivate",    color:"text-gray-500" },
              ].map((al,i)=>(
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"/>
                    <span>{al.text}</span>
                  </div>
                  <button className={`text-[11px] font-medium whitespace-nowrap ${al.color} hover:underline`}>{al.action}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Conversion Rate */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">Pipeline Conversion Rate</h3>
              <button className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded px-2 py-1 flex items-center gap-1">This Month<ChevronDown size={11}/></button>
            </div>
            <div className="space-y-1.5">
              {funnel.map((f,i)=>(
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div
                      className="rounded h-7 flex items-center px-2"
                      style={{backgroundColor:f.color, width:`${100-(i*14)}%`, marginLeft:`${i*7}%`}}
                    >
                      <span className="text-white text-[11px] font-semibold">{f.count.toLocaleString()}</span>
                    </div>
                  </div>
                  {f.pct && <span className="text-[11px] text-gray-500 w-10 text-right">{f.pct}</span>}
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between text-xs">
              <span className="text-gray-500">Overall Conversion Rate</span>
              <span className="font-bold text-gray-800">1.4%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}