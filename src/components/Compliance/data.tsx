import React from "react";

export const trendData = [
  { month: "Dec '24", score: 78 },
  { month: "Jan '25", score: 82 },
  { month: "Feb '25", score: 85 },
  { month: "Mar '25", score: 88 },
  { month: "Apr '25", score: 90 },
  { month: "May '25", score: 92 },
];

export const statusData = [
  { name: "Compliant",     value: 116, pct: 92, color: "#22c55e" },
  { name: "At Risk",       value: 7,   pct: 6,  color: "#f59e0b" },
  { name: "Non Compliant", value: 3,   pct: 2,  color: "#ef4444" },
];

export const categories = [
  { name: "Statutory Compliance",    done: 42, total: 46, pct: 91 },
  { name: "Tax Compliance",          done: 18, total: 20, pct: 90 },
  { name: "Employment Laws",         done: 22, total: 24, pct: 92 },
  { name: "Policies & Procedures",   done: 19, total: 20, pct: 95 },
  { name: "Contracts & Agreements",  done: 17, total: 20, pct: 85 },
  { name: "Data Protection",         done: 8,  total: 10, pct: 80 },
  { name: "Others",                  done: 6,  total: 6,  pct: 100 },
];

export const requirements = [
  { name: "PF Payment – May 2025",             cat: "Statutory", applicableTo: "All Employees",    status: "Compliant",     due: "16 Jun 2025", risk: "Low"    },
  { name: "ESI Payment – May 2025",            cat: "Statutory", applicableTo: "All Employees",    status: "At Risk",       due: "15 Jun 2025", risk: "Medium" },
  { name: "TDS Return – Q1 FY25",              cat: "Statutory", applicableTo: "All Employees",    status: "Non Compliant", due: "31 May 2025", risk: "High"   },
  { name: "Professional Tax – Q1 FY25",        cat: "Statutory", applicableTo: "All Employees",    status: "Compliant",     due: "30 Jun 2025", risk: "Low"    },
  { name: "Code of Conduct Acknowledgement",   cat: "Policy",    applicableTo: "All Employees",    status: "Compliant",     due: "–",           risk: "Low"    },
  { name: "Data Privacy Training",             cat: "Policy",    applicableTo: "All Employees",    status: "At Risk",       due: "30 Jun 2025", risk: "Medium" },
  { name: "Employment Contracts Renewal",      cat: "Contract",  applicableTo: "12 Employees",     status: "At Risk",       due: "10 Jun 2025", risk: "Medium" },
  { name: "Gratuity Payment – FY24",           cat: "Statutory", applicableTo: "Eligible Employees", status: "Compliant",   due: "30 Jun 2025", risk: "Low"    },
];

export const violations = [
  { issue: "TDS Return – Q1 FY25\nNot filed on time",           impact: "High",   due: "31 May 2025", status: "Open" },
  { issue: "ESI Payment Delay – Apr 2025\nPayment submitted late", impact: "Medium", due: "–",          status: "Open" },
  { issue: "2 Employees – Aadhar Not Linked\nUAN not linked with Aadhar", impact: "Medium", due: "05 Jun 2025", status: "Open" },
  { issue: "Policy Acknowledgement Pending\n16 employees pending",  impact: "Low",    due: "10 Jun 2025", status: "Open" },
  { issue: "Contract Renewal Overdue\n3 contracts past due",       impact: "High",   due: "01 Jun 2025", status: "Open" },
];

export const expiringItems = [
  { doc: "PF Payment – May 2025",    app: "All Employees", expiry: "15 Jun 2025", days: 15, risk: "Low"    },
  { doc: "ESI Payment – May 2025",   app: "All Employees", expiry: "15 Jun 2025", days: 15, risk: "Medium" },
  { doc: "Professional Tax – Q1 FY25", app: "All Employees", expiry: "30 Jun 2025", days: 30, risk: "Low" },
  { doc: "Data Privacy Training",    app: "All Employees", expiry: "30 Jun 2025", days: 30, risk: "Medium" },
  { doc: "Employment Contracts",     app: "12 Employees",  expiry: "10 Jun 2025", days: 10, risk: "Medium" },
];

export const docStatusData = [
  { name: "Compliant",            value: 892, pct: 71.5, color: "#22c55e" },
  { name: "Expiring Soon",        value: 196, pct: 15.7, color: "#f59e0b" },
  { name: "Expired/Non-Compliant", value: 108, pct: 8.7,  color: "#ef4444" },
  { name: "Not Applicable",       value: 52,  pct: 4.1,  color: "#e2e8f0" },
];

export const calDays = Array.from({ length: 31 }, (_, i) => i + 1);
export const highRisk   = [31];
export const mediumRisk = [3, 10, 17, 24];
export const lowRisk    = [1, 2, 8, 15, 22, 29, 30];
export const today      = 21;

export const statCards = [
  { label: "Overall Compliance Score", val: "92%",   sub: "↑ 6% vs last month",  valCls: "text-emerald-600 text-2xl",  icon: "🛡" },
  { label: "Total Requirements",        val: "126",  sub: "All statutory & internal", valCls: "text-slate-800 text-2xl", icon: "📋" },
  { label: "Compliant",                 val: "116",  sub: "92% of total",          valCls: "text-emerald-600 text-2xl", icon: "✅" },
  { label: "At Risk",                   val: "7",    sub: "Needs attention",        valCls: "text-amber-500 text-2xl",   icon: "⚠" },
  { label: "Non Compliant",             val: "3",    sub: "Immediate action required", valCls: "text-red-600 text-2xl", icon: "🚫" },
  { label: "Expiring Soon (30 Days)",   val: "11",   sub: "Upcoming expiries",     valCls: "text-orange-500 text-2xl",  icon: "⏰" },
  { label: "Open Violations",           val: "5",    sub: "Active violations",     valCls: "text-red-600 text-2xl",    icon: "🚩" },
];

export const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    "Compliant":     "bg-emerald-100 text-emerald-700",
    "At Risk":       "bg-amber-100 text-amber-700",
    "Non Compliant": "bg-red-100 text-red-700",
  };
  return map[s] ?? "bg-slate-100 text-slate-600";
};

export const riskBadge = (r: string) => {
  const map: Record<string, string> = {
    "High":   "bg-red-100 text-red-700",
    "Medium": "bg-amber-100 text-amber-700",
    "Low":    "bg-emerald-100 text-emerald-700",
  };
  return map[r] ?? "bg-slate-100 text-slate-600";
};

export const impactDot = (impact: string) => {
  const map: Record<string, string> = { High: "bg-red-500", Medium: "bg-amber-500", Low: "bg-sky-400" };
  return map[impact] ?? "bg-slate-400";
};
