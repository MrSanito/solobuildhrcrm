"use client";
import React, { useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import {
  RefreshCw, Calendar, ChevronDown, ChevronLeft, ChevronRight,
  ExternalLink, AlertTriangle, CheckCircle, XCircle, Info,
  Wifi, Database, Shield, Activity, Users, Zap, Server,
  Bell, Mail, MessageSquare, FileText, Play, RotateCcw,
  Megaphone, Save, Trash2, ArrowRight, Clock, MoreVertical,
} from "lucide-react";

/* ══════════════════════════════════════════════
   SHARED DATA
══════════════════════════════════════════════ */

/* ─── Sparkline helper data ─── */
const spUp   = [2,3,2,4,3,5,4,6,5,7].map(v=>({v}));
const spDown = [7,6,5,6,4,5,3,4,2,3].map(v=>({v}));
const spFlat = [4,4,5,4,5,5,4,5,4,5].map(v=>({v}));

function Spark({ data, color }: { data:{v:number}[]; color:string }) {
  const vals = data.map(d=>d.v);
  const mn=Math.min(...vals), mx=Math.max(...vals), rng=mx-mn||1;
  const W=80, H=24;
  const pts = vals.map((v,i)=>`${(i/(vals.length-1))*W},${H-((v-mn)/rng)*(H-4)-2}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-20 h-6">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Issues by severity donut ─── */
const severityData = [
  { name:"Critical", value:7,  pct:"25%", color:"#ef4444" },
  { name:"High",     value:9,  pct:"32%", color:"#f97316" },
  { name:"Medium",   value:8,  pct:"29%", color:"#f59e0b" },
  { name:"Low",      value:3,  pct:"11%", color:"#3b82f6" },
  { name:"Info",     value:1,  pct:"4%",  color:"#94a3b8" },
];

/* ─── System integrations ─── */
const integrations = [
  { name:"Payroll System",         status:"Connected", sync:"21 Jun, 05:30 PM", health:"Healthy"   },
  { name:"Attendance System",      status:"Connected", sync:"21 Jun, 05:28 PM", health:"Healthy"   },
  { name:"Email Service",          status:"Connected", sync:"21 Jun, 05:27 PM", health:"Healthy"   },
  { name:"Document Storage",       status:"Connected", sync:"21 Jun, 05:25 PM", health:"Healthy"   },
  { name:"Background Verification",status:"Connected", sync:"21 Jun, 05:24 PM", health:"Healthy"   },
  { name:"Tax Portal (T23b)",      status:"Warning",   sync:"21 Jun, 04:43 PM", health:"Degraded"  },
  { name:"F1 Portal",              status:"Connected", sync:"21 Jun, 05:20 PM", health:"Healthy"   },
  { name:"LTB Portal",             status:"Connected", sync:"21 Jun, 05:21 PM", health:"Healthy"   },
];

/* ─── AI Decision Log ─── */
const aiDecisions = [
  { type:"⚠️", entity:"Rahul Mehta",      prediction:"Attrition Risk", confidence:67, decided:"21 Jun, 05:30 PM", impact:"High Risk",     impC:"bg-red-100 text-red-700"    },
  { type:"⭐", entity:"Arjun Desai",       prediction:"Performance Flag",confidence:78, decided:"21 Jun, 05:28 PM", impact:"Needs Exceptional",impC:"bg-amber-100 text-amber-700" },
  { type:"👤", entity:"Hiring Recommendation",prediction:"Software Engineer",confidence:91,decided:"21 Jun, 05:25 PM",impact:"Strong Match",impC:"bg-green-100 text-green-700" },
  { type:"📈", entity:"Vikram Rao",        prediction:"Promotion Readiness",confidence:82,decided:"21 Jun, 05:05 PM",impact:"Ready in 6 Months",impC:"bg-blue-100 text-blue-700" },
  { type:"📊", entity:"Aditi Sharma",      prediction:"Marketing Benchmark",confidence:45,decided:"21 Jun, 05:00 PM", impact:"Market Below",  impC:"bg-orange-100 text-orange-700" },
];

/* ─── Overrides ─── */
const overrides = [
  { type:"System (AI)", suggestedBy:"Rahul Mehta",  entity:"High Attrition – Risk", overrideBy:"Anita Verma", reason:"Special project retention plan", time:"21 Jun, 05:00 PM", approved:true  },
  { type:"System (Rule)",suggestedBy:"Anita Desai", entity:"PF Amount: ₹3,500",     overrideBy:"Priya Sharma",reason:"Correction in salary structure",  time:"21 Jun, 04:52 PM", approved:true  },
  { type:"System (Policy)",suggestedBy:"Ravi Singh",entity:"Promotion Not Eligible", overrideBy:"Anit Verma",  reason:"Exception approved",              time:"21 Jun, 04:30 PM", approved:true  },
  { type:"System (AI)", suggestedBy:"Software Engineer",entity:"Medium Fit",        overrideBy:"Priya Sharma",reason:"Manual Review – Cleared",          time:"21 Jun, 04:00 PM", approved:false },
  { type:"System (Rule)",suggestedBy:"Leave Request",entity:"Approval: No",         overrideBy:"Priya Sharma",reason:"Emergency Approved",               time:"21 Jun, 03:00 PM", approved:true  },
];

/* ─── Communication log ─── */
const commLogs = [
  { from:"Priya Sharma (HR)", to:"All Employees", channel:"📢", subject:"Announcement – Office Holiday on 25th June", time:"21 Jun, 04:00 PM", initials:"PS", bg:"#6366f1" },
  { from:"Anit Verma",        to:"Rahul Mehta",   channel:"✉️", subject:"Direct Message – Discussion on project allocation", time:"21 Jun, 04:00 PM", initials:"AV", bg:"#ec4899" },
  { from:"System",            to:"Neha Patel",    channel:"✉️", subject:"Email – Payslip for May 2025",                    time:"21 Jun, 04:00 PM", initials:"SY", bg:"#94a3b8" },
  { from:"System",            to:"All Employees", channel:"✉️", subject:"Email – New Standalone Policy Update",            time:"21 Jun, 04:00 PM", initials:"SY", bg:"#94a3b8" },
  { from:"Priya Sharma (HR)", to:"Vikram Rao",    channel:"✉️", subject:"Direct Message – Leave request follow-up",        time:"21 Jun, 04:00 PM", initials:"PS", bg:"#6366f1" },
];

/* ─── Employee notifications ─── */
const notifications = [
  { notif:"Payslip for May 2025",                      sent:"21 Jun, 12:00 PM", channel:"App",   delivered:true, read:true,  failed:false, status:"Read"      },
  { notif:"Leave Request Update",                      sent:"21 Jun, 10:50 PM", channel:"App",   delivered:true, read:true,  failed:false, status:"Read"      },
  { notif:"Performance Review Reminder",               sent:"21 Jun, 10:15 PM", channel:"Email", delivered:false,read:false, failed:true,  status:"Delivered" },
  { notif:"Training Session Invite",                   sent:"21 Jun, 09:00 AM", channel:"App",   delivered:true, read:true,  failed:false, status:"Read"      },
  { notif:"Policy Update Notification",               sent:"21 Jun, 12:30 PM", channel:"Email", delivered:true, read:true,  failed:false, status:"Read"      },
];

/* ─── Activity Timeline ─── */
const activityTimeline = [
  { time:"21 Jun, 05:30 PM", desc:"Payroll processing completed for May 2025",  type:"Success", tc:"text-green-600",  bg:"bg-green-50",  border:"border-green-200" },
  { time:"21 Jun, 05:18 PM", desc:"Data sync with Attendance System",           type:"Success", tc:"text-green-600",  bg:"bg-green-50",  border:"border-green-200" },
  { time:"21 Jun, 05:12 PM", desc:"Override applied for Rahu Mehta (Attrition Risk)", type:"Info", tc:"text-blue-600", bg:"bg-blue-50", border:"border-blue-200" },
  { time:"21 Jun, 05:07 PM", desc:"Critical Alert: Payroll anomaly detected",   type:"Critical",tc:"text-red-600",    bg:"bg-red-50",    border:"border-red-200" },
  { time:"21 Jun, 05:15 PM", desc:"AI decision: Hiring recommendation generated",type:"Info",   tc:"text-blue-600",   bg:"bg-blue-50",   border:"border-blue-200" },
];

/* ─── Critical Alerts ─── */
const criticalAlerts = [
  { icon:"🔴", alert:"Payroll Anomaly Detected",       sub:"Overtime issue on 5 financial team",   module:"Finance",    sev:"Critical", sevC:"bg-red-100 text-red-700",    triggered:"21 Jun, 05:12 PM", impact:"High",   status:"Open", action:"Investigate" },
  { icon:"🟠", alert:"Compliance Violation",           sub:"IT overtime for 15 employees",          module:"Compliance", sev:"High",     sevC:"bg-orange-100 text-orange-700",triggered:"21 Jun, 04:45 PM", impact:"High",   status:"Open", action:"View Details" },
  { icon:"🟠", alert:"Integration Failure",            sub:"Biometric system failed",               module:"Work",       sev:"Critical", sevC:"bg-red-100 text-red-700",    triggered:"21 Jun, 04:30 PM", impact:"Medium", status:"Open", action:"Resolve" },
  { icon:"🟡", alert:"Performance Risk",               sub:"3 employees performance score dropped", module:"People",     sev:"High",     sevC:"bg-orange-100 text-orange-700",triggered:"21 Jun, 03:55 PM", impact:"Medium", status:"Open", action:"Review" },
  { icon:"🔵", alert:"Document Expiry Soon",           sub:"5 employee documents expiring in 15 days",module:"Compliance",sev:"Medium",  sevC:"bg-yellow-100 text-yellow-700",triggered:"21 Jun, 03:20 PM", impact:"Low",    status:"Open", action:"View Details" },
];

/* ─── Automation Monitor ─── */
const automations = [
  { name:"Offer Letter Generation", trigger:"On Candidate Selection", status:"Running", lastRun:"21 Jun, 05:28 PM", rate:96, rateC:"#22c55e" },
  { name:"Attendance Anomaly Detector",trigger:"Daily at 09:00 AM",  status:"Success", lastRun:"21 Jun, 05:00 PM", rate:93, rateC:"#22c55e" },
  { name:"Payroll Processing",        trigger:"Monthly – 1st",        status:"Success", lastRun:"21 Jun, 04:15 PM", rate:100,rateC:"#22c55e" },
  { name:"Probation Reminder",        trigger:"Daily at 10:00 AM",    status:"Success", lastRun:"21 Jun, 02:21 PM", rate:97, rateC:"#22c55e" },
  { name:"Document Expiry Alert",     trigger:"Daily at 08:00 AM",    status:"Success", lastRun:"21 Jun, 08:00 AM", rate:94, rateC:"#22c55e" },
  { name:"Exit Interview Trigger",    trigger:"On Resignation",        status:"Failed",  lastRun:"21 Jun, 01:30 PM", rate:80, rateC:"#ef4444" },
];

/* ─── Quick actions ─── */
const quickActions = [
  { icon:<Zap size={14} className="text-blue-600"/>,      bg:"bg-blue-50",   border:"border-blue-200",   label:"Trigger Data Sync"        },
  { icon:<Play size={14} className="text-green-600"/>,    bg:"bg-green-50",  border:"border-green-200",  label:"Run Payroll Simulation"   },
  { icon:<RotateCcw size={14} className="text-amber-600"/>,bg:"bg-amber-50", border:"border-amber-200",  label:"Reprocess Failed Jobs"    },
  { icon:<Megaphone size={14} className="text-purple-600"/>,bg:"bg-purple-50",border:"border-purple-200",label:"Send System Announcement" },
  { icon:<Save size={14} className="text-teal-600"/>,     bg:"bg-teal-50",   border:"border-teal-200",   label:"Backup Now"               },
  { icon:<Trash2 size={14} className="text-red-600"/>,    bg:"bg-red-50",    border:"border-red-200",    label:"Clear System Cache"       },
];

/* ════════════════════════════════════════════
   TOP VIEW — System Health (Image 2)
════════════════════════════════════════════ */
function SystemHealthView() {
  return (
    <div className="p-5 space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { icon:"💚", label:"System Health Score",  value:"93%",      sub:"▲ 4% vs last 7 days",      subC:"text-green-500", spark:spUp,   sC:"#22c55e" },
          { icon:"🔴", label:"Critical Alerts",      value:"7",        sub:"▲ 2 vs last 7 days",       subC:"text-red-500",   spark:spDown, sC:"#ef4444" },
          { icon:"⚡", label:"Active Automations",   value:"24",       sub:"▲ 3 vs last 7 days",       subC:"text-green-500", spark:spUp,   sC:"#3b82f6" },
          { icon:"💥", label:"Failed Automations",   value:"2",        sub:"▼ 1 vs last 7 days",       subC:"text-green-500", spark:spDown, sC:"#f97316" },
          { icon:"🔄", label:"Data Sync Status",     value:"All Good", sub:"Last sync: 5 mins ago",    subC:"text-green-500", spark:spFlat, sC:"#22c55e" },
          { icon:"👥", label:"Users Online",         value:"12",       sub:"▲ 3 vs last 7 days",       subC:"text-green-500", spark:spUp,   sC:"#6366f1",
            extra:<button className="text-[10px] text-indigo-600 font-semibold mt-0.5 hover:underline flex items-center gap-0.5">View Live Users <ArrowRight size={9}/></button> },
        ].map(c=>(
          <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="text-base">{c.icon}</span>
              <span className="text-[10px] text-gray-400 leading-tight">{c.label}</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{c.value}</div>
            <div className={`text-[10px] font-medium ${c.subC}`}>{c.sub}</div>
            <Spark data={c.spark} color={c.sC}/>
            {c.extra}
          </div>
        ))}
      </div>

      {/* System Health Overview + Issues by Severity */}
      <div className="grid grid-cols-12 gap-4">
        {/* Health overview */}
        <div className="col-span-7 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">System Health Overview</h3>
          <div className="grid grid-cols-5 gap-3">
            {[
              { icon:<Activity size={14}/>, label:"Application Status", sub1:"Operational", sub2:"Uptime: 99.92%",  c:"text-green-600", bg:"bg-green-50" },
              { icon:<Database size={14}/>, label:"Database",           sub1:"Operational", sub2:"Latency: 35 ms",  c:"text-green-600", bg:"bg-green-50" },
              { icon:<Wifi size={14}/>,     label:"Integrations",        sub1:"Operational", sub2:"All 18 connected",c:"text-green-600", bg:"bg-green-50" },
              { icon:<FileText size={14}/>, label:"Data Quality",        sub1:"Good",         sub2:"Score: 92%",      c:"text-green-600", bg:"bg-green-50" },
              { icon:<Shield size={14}/>,   label:"Security",            sub1:"Good",         sub2:"No threats detected",c:"text-green-600", bg:"bg-green-50" },
            ].map(h=>(
              <div key={h.label} className={`${h.bg} rounded-xl p-3 border border-green-100`}>
                <div className={`flex items-center gap-1.5 mb-1.5 ${h.c}`}>{h.icon}<span className="text-[10px] font-bold">{h.label}</span></div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-green-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"/>
                  {h.sub1}
                </div>
                <div className="text-[9px] text-gray-500 mt-0.5">{h.sub2}</div>
              </div>
            ))}
          </div>

          {/* Mini stat row */}
          <div className="grid grid-cols-5 gap-3 mt-3 pt-3 border-t border-gray-100">
            {[
              { icon:"📋", label:"Pending Approvals",  value:"16",    extra:<button className="text-[10px] text-indigo-600 font-semibold hover:underline">View All</button> },
              { icon:"🔄", label:"Data Sync Failures", value:"0",     extra:<button className="text-[10px] text-indigo-600 font-semibold hover:underline">View Logs</button> },
              { icon:"📅", label:"Scheduled Jobs",     value:"32",    extra:<button className="text-[10px] text-indigo-600 font-semibold hover:underline">View All</button> },
              { icon:"⏱️", label:"Avg. Response Time", value:"412 ms",extra:<span className="text-[9px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Good</span> },
              { icon:"💻", label:"System Load",        value:"34%",   extra:<span className="text-[9px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">Normal</span> },
            ].map(s=>(
              <div key={s.label} className="text-center">
                <div className="text-base mb-0.5">{s.icon}</div>
                <div className="text-base font-bold text-gray-900">{s.value}</div>
                <div className="text-[9px] text-gray-400 mb-1">{s.label}</div>
                {s.extra}
              </div>
            ))}
          </div>
        </div>

        {/* Issues by Severity */}
        <div className="col-span-5 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Issues by Severity</h3>
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0" style={{width:150,height:150}}>
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie data={severityData} cx="50%" cy="50%" innerRadius={48} outerRadius={68} dataKey="value" strokeWidth={2} stroke="#fff" startAngle={90} endAngle={-270}>
                    {severityData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-gray-400">Total</span>
                <span className="text-2xl font-bold text-gray-900">28</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {severityData.map(d=>(
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{backgroundColor:d.color}}/>
                  <span className="flex-1 text-[11px] text-gray-600 font-medium">{d.name}</span>
                  <span className="text-[11px] font-bold text-gray-800">{d.value}</span>
                  <span className="text-[10px] text-gray-400 w-8 text-right">({d.pct})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts + Automation Monitor */}
      <div className="grid grid-cols-12 gap-4">
        {/* Critical Alerts */}
        <div className="col-span-7 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">Critical Alerts</span>
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">●</span>
            </div>
            <button className="text-[11px] text-indigo-600 font-semibold hover:underline">View All Alerts</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Alert","Module","Severity","Triggered At","Impact","Status","Action"].map(h=>(
                    <th key={h} className="px-3 py-2 text-left text-[10px] text-gray-400 font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criticalAlerts.map((a,i)=>(
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{a.icon}</span>
                        <div>
                          <div className="text-[11px] font-semibold text-gray-800 whitespace-nowrap">{a.alert}</div>
                          <div className="text-[9px] text-gray-400">{a.sub}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-gray-600 whitespace-nowrap">{a.module}</td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${a.sevC}`}>{a.sev}</span>
                    </td>
                    <td className="px-3 py-2.5 text-[10px] text-gray-500 whitespace-nowrap">{a.triggered}</td>
                    <td className="px-3 py-2.5 text-[11px] text-gray-600">{a.impact}</td>
                    <td className="px-3 py-2.5">
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">{a.status}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <button className="text-[10px] text-indigo-600 border border-indigo-200 px-2 py-1 rounded-lg font-semibold hover:bg-indigo-50 transition-colors whitespace-nowrap">
                        {a.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">Showing 1 to 5 of 7 alerts</span>
            <div className="flex gap-1">
              {["‹",1,2,"›"].map((p,i)=>(
                <button key={i} className={`w-6 h-6 text-[10px] rounded flex items-center justify-center ${p===1?"bg-indigo-600 text-white":"border border-gray-200 text-gray-400 hover:bg-gray-100"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Automation Monitor */}
        <div className="col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">Automation Monitor</span>
            <button className="text-[11px] text-indigo-600 font-semibold hover:underline">View All</button>
          </div>
          <div className="p-3 space-y-2.5">
            {automations.map((a,i)=>(
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-gray-800 truncate">{a.name}</div>
                  <div className="text-[9px] text-gray-400 truncate">{a.trigger}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap ${
                  a.status==="Running" ? "bg-blue-100 text-blue-700" :
                  a.status==="Success" ? "bg-green-100 text-green-700" :
                  "bg-red-100 text-red-700"
                }`}>{a.status}</span>
                <div className="text-[9px] text-gray-400 whitespace-nowrap hidden xl:block">{a.lastRun}</div>
                <div className="w-16 flex items-center gap-1 flex-shrink-0">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${a.rate}%`,backgroundColor:a.rateC}}/>
                  </div>
                  <span className="text-[9px] font-bold text-gray-600">{a.rate}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-3 py-2 border-t border-gray-50 text-[10px] text-gray-400">
            Showing 1 to 6 of 24 automations
            <button className="text-indigo-600 font-semibold hover:underline ml-2">View All Automations</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   BOTTOM VIEW — Operational Logs (Image 1)
════════════════════════════════════════════ */
function OperationalView() {
  return (
    <div className="p-5 space-y-4">
      {/* Row 1: AI Decision Log + Overrides + System Integrations */}
      <div className="grid grid-cols-12 gap-4">
        {/* AI Decision Log */}
        <div className="col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">AI Decision Log</span>
            <button className="text-[10px] text-indigo-600 font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Entity","Prediction / Decision","Conf.","Decided At","Action"].map(h=>(
                    <th key={h} className="px-2.5 py-2 text-left text-[9px] text-gray-400 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aiDecisions.map((d,i)=>(
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-2.5 py-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{d.type}</span>
                        <span className="text-[10px] font-semibold text-gray-700 whitespace-nowrap">{d.entity}</span>
                      </div>
                    </td>
                    <td className="px-2.5 py-2">
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap ${d.impC}`}>{d.impact}</span>
                    </td>
                    <td className="px-2.5 py-2 text-[10px] text-gray-600">{d.confidence}%</td>
                    <td className="px-2.5 py-2 text-[9px] text-gray-400 whitespace-nowrap">{d.decided}</td>
                    <td className="px-2.5 py-2">
                      <button className="text-gray-300 hover:text-indigo-500 transition-colors"><MoreVertical size={12}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-3 py-2 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[9px] text-gray-400">1-5 of 15</span>
            <div className="flex gap-0.5">
              {["‹",1,2,3,4,"›"].map((p,i)=>(
                <button key={i} className={`w-5 h-5 text-[9px] rounded flex items-center justify-center ${p===1?"bg-indigo-600 text-white":"text-gray-400 hover:bg-gray-100"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Overrides & Manual Interventions */}
        <div className="col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Overrides & Manual Interventions</span>
            <button className="text-[10px] text-indigo-600 font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Type","Suggested By","Entity","Override By","Reason","Time"].map(h=>(
                    <th key={h} className="px-2.5 py-2 text-left text-[9px] text-gray-400 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {overrides.map((o,i)=>(
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-2.5 py-2">
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                        o.type.includes("AI") ? "bg-blue-100 text-blue-700" :
                        o.type.includes("Rule") ? "bg-amber-100 text-amber-700" :
                        "bg-purple-100 text-purple-700"
                      }`}>{o.type}</span>
                    </td>
                    <td className="px-2.5 py-2 text-[10px] text-gray-700 whitespace-nowrap">{o.suggestedBy}</td>
                    <td className="px-2.5 py-2 text-[10px] text-gray-600 max-w-[100px] truncate">{o.entity}</td>
                    <td className="px-2.5 py-2 text-[10px] text-gray-700 whitespace-nowrap">{o.overrideBy}</td>
                    <td className="px-2.5 py-2 text-[10px] text-gray-500 max-w-[120px] truncate">{o.reason}</td>
                    <td className="px-2.5 py-2 text-[9px] text-gray-400 whitespace-nowrap">{o.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-3 py-2 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[9px] text-gray-400">1-5 of 14</span>
            <div className="flex gap-0.5">
              {["‹",1,2,3,"›"].map((p,i)=>(
                <button key={i} className={`w-5 h-5 text-[9px] rounded flex items-center justify-center ${p===1?"bg-indigo-600 text-white":"text-gray-400 hover:bg-gray-100"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* System Integrations */}
        <div className="col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">System Integrations</span>
            <button className="text-[10px] text-indigo-600 font-semibold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {integrations.map((it,i)=>(
              <div key={i} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Server size={11} className="text-gray-500"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-gray-800 truncate">{it.name}</div>
                  <div className="text-[9px] text-gray-400">{it.sync}</div>
                </div>
                <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                  it.status==="Connected" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>{it.status}</span>
                <span className={`text-[9px] font-medium whitespace-nowrap flex-shrink-0 ${
                  it.health==="Healthy" ? "text-green-600" : "text-amber-600"
                }`}>● {it.health}</span>
              </div>
            ))}
          </div>
          <div className="px-3 py-2 border-t border-gray-50">
            <button className="text-[10px] text-indigo-600 font-semibold hover:underline">View All Integrations</button>
          </div>
        </div>
      </div>

      {/* Row 2: Communication Log + Employee Notifications + Activity Timeline */}
      <div className="grid grid-cols-12 gap-4">
        {/* Communication Log */}
        <div className="col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Communication Log</span>
            <button className="text-[10px] text-indigo-600 font-semibold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {commLogs.map((c,i)=>(
              <div key={i} className="flex items-start gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                  style={{backgroundColor:c.bg}}>{c.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-gray-700 truncate">{c.from}</div>
                  <div className="text-[9px] text-gray-500 truncate flex items-center gap-1">
                    <span>{c.channel}</span>
                    <span className="text-gray-300">→</span>
                    <span>{c.to}</span>
                  </div>
                  <div className="text-[9px] text-gray-400 truncate mt-0.5">{c.subject}</div>
                </div>
                <div className="text-[9px] text-gray-400 whitespace-nowrap flex-shrink-0">{c.time}</div>
              </div>
            ))}
          </div>
          <div className="px-3 py-2 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[9px] text-gray-400">1-5 of 32</span>
            <div className="flex gap-0.5">
              {["‹",1,2,3,4,5,"›"].map((p,i)=>(
                <button key={i} className={`w-5 h-5 text-[9px] rounded flex items-center justify-center ${p===1?"bg-indigo-600 text-white":"text-gray-400 hover:bg-gray-100"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Employee Notifications */}
        <div className="col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Employee Notifications</span>
            <button className="text-[10px] text-indigo-600 font-semibold hover:underline">View All</button>
          </div>
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-0 border-b border-gray-100">
            {[
              { icon:"📤", label:"Sent",      value:"248", c:"text-gray-800" },
              { icon:"✅", label:"Delivered", value:"241", c:"text-green-600" },
              { icon:"👁️", label:"Read",       value:"198", c:"text-blue-600" },
              { icon:"❌", label:"Failed",     value:"7",   c:"text-red-600" },
            ].map((n,i)=>(
              <div key={i} className="flex flex-col items-center py-3 border-r border-gray-100 last:border-r-0">
                <span className="text-base mb-0.5">{n.icon}</span>
                <span className={`text-lg font-bold ${n.c}`}>{n.value}</span>
                <span className="text-[9px] text-gray-400">{n.label}</span>
              </div>
            ))}
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Notification","Sent On","Channel","Delivered","Read","Failed","Status"].map(h=>(
                    <th key={h} className="px-2.5 py-2 text-left text-[9px] text-gray-400 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {notifications.map((n,i)=>(
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-2.5 py-2 text-[10px] font-medium text-gray-700 max-w-[150px] truncate">{n.notif}</td>
                    <td className="px-2.5 py-2 text-[9px] text-gray-400 whitespace-nowrap">{n.sent}</td>
                    <td className="px-2.5 py-2 text-[10px] text-gray-600">{n.channel}</td>
                    <td className="px-2.5 py-2 text-center">
                      {n.delivered ? <CheckCircle size={12} className="text-green-500 mx-auto"/> : <span className="text-gray-300">–</span>}
                    </td>
                    <td className="px-2.5 py-2 text-center">
                      {n.read ? <CheckCircle size={12} className="text-green-500 mx-auto"/> : <span className="text-gray-300">–</span>}
                    </td>
                    <td className="px-2.5 py-2 text-center">
                      {n.failed ? <XCircle size={12} className="text-red-400 mx-auto"/> : <span className="text-gray-300">–</span>}
                    </td>
                    <td className="px-2.5 py-2">
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold whitespace-nowrap ${
                        n.status==="Read"      ? "bg-green-100 text-green-700" :
                        n.status==="Delivered" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>{n.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-3 py-2 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[9px] text-gray-400">1-5 of 38</span>
            <div className="flex gap-0.5">
              {["‹",1,2,3,4,5,"›"].map((p,i)=>(
                <button key={i} className={`w-5 h-5 text-[9px] rounded flex items-center justify-center ${p===1?"bg-indigo-600 text-white":"text-gray-400 hover:bg-gray-100"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* System Activity Timeline */}
        <div className="col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">System Activity Timeline</span>
            <button className="text-[10px] text-indigo-600 font-semibold hover:underline">View All</button>
          </div>
          <div className="p-3 space-y-2.5">
            {activityTimeline.map((a,i)=>(
              <div key={i} className="flex items-start gap-2.5">
                <div className={`${a.bg} border ${a.border} rounded-lg px-2 py-1 flex-shrink-0 text-center min-w-[80px]`}>
                  <div className="text-[9px] text-gray-500 leading-tight">{a.time}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-medium text-gray-700 leading-snug">{a.desc}</div>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap ${
                  a.type==="Success"  ? "bg-green-100 text-green-700" :
                  a.type==="Critical" ? "bg-red-100 text-red-700" :
                  "bg-blue-100 text-blue-700"
                }`}>{a.type}</span>
              </div>
            ))}
          </div>
          <div className="px-3 py-2 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[9px] text-gray-400">1-5 of 30</span>
            <button className="text-[10px] text-indigo-600 font-semibold hover:underline">View Full Timeline</button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Quick Actions</h3>
        <div className="flex items-center gap-3 flex-wrap">
          {quickActions.map((qa,i)=>(
            <button key={i} className={`flex items-center gap-2 px-4 py-2 ${qa.bg} border ${qa.border} rounded-xl text-xs font-semibold text-gray-700 hover:opacity-80 transition-opacity shadow-sm`}>
              {qa.icon} {qa.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   CONTROL CENTER PAGE (default export)
════════════════════════════════════════════ */
type CCView = "System Health" | "Operational Logs";

export default function ControlCenter() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      {/* ── Page Header ── */}
      <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Shield size={17} className="text-indigo-600"/>
            <h1 className="text-base font-bold text-gray-900">Control Center</h1>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">System oversight, monitoring, and control hub for the entire HR ecosystem.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 shadow-sm hover:bg-gray-100 transition-colors">
            <Calendar size={12} className="text-gray-400"/>
            21 May – 21 Jun 2025
            <ChevronDown size={11} className="text-gray-400"/>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 shadow-sm hover:bg-gray-100 transition-colors">
            <RefreshCw size={12} className="text-gray-400"/> Refresh
          </button>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400">System Time</span>
            <span className="text-[11px] font-bold text-gray-800">21 Jun 2025, 05:30 PM</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" title="Online"/>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto">
        <SystemHealthView/>
        <div className="border-t border-gray-200" />
        <OperationalView/>
      </div>
    </div>
  );
}