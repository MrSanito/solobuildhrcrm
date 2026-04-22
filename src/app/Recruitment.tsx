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

import JobRoles from "./JobRoles";
import ResumeScreening from "./ResumeScreening";

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

export default function Recruitment({ onNavigate, initialTab }:{onNavigate:(p:string)=>void, initialTab?: string}) {
  const [activeTab, setActiveTab] = useState(
    initialTab === "job-roles" ? "Job Roles" : 
    initialTab === "candidate-pipeline" ? "Candidate Pipeline" : 
    initialTab === "resumescreening" ? "Resume Screening" :
    "Job Roles"
  );

  return (
    <div className="p-6 space-y-5 min-h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Recruitment</h1>
          <p className="text-sm text-gray-500 mt-0.5">Attract, evaluate and hire the best talent.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-blue-500 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
            <Brain size={15}/> AI Hiring Intelligence
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus size={15}/> Create Job Opening
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 bg-white rounded-t-xl px-4 pt-2 -mb-1 shadow-sm overflow-x-auto">
        {TABS.map(tab=>(
          <button
            key={tab}
            onClick={()=> { setActiveTab(tab); if(tab==="Resume Screening") onNavigate("resumescreening"); }}
            className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab===tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="pt-2">
        {activeTab === "Job Roles" && <JobRoles />}
        {activeTab === "Resume Screening" && <ResumeScreening />}
        {activeTab === "Candidate Pipeline" && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <h3 className="text-lg font-medium text-gray-800">Candidate Pipeline</h3>
            <p className="text-sm mt-1">This module is under construction.</p>
          </div>
        )}
      </div>
    </div>
  );
}