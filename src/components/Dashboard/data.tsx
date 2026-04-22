import React from "react";
import { 
  Users, Briefcase, UserPlus, Wallet, UserCheck, Star, 
  CheckCircle2, Activity, TrendingUp, FileText, AlertTriangle 
} from "lucide-react";

export const performanceData = [
  { month: "Dec", high: 220, track: 800, needs: 130, risk: 25 },
  { month: "Jan", high: 230, track: 820, needs: 132, risk: 22 },
  { month: "Feb", high: 235, track: 835, needs: 134, risk: 21 },
  { month: "Mar", high: 240, track: 840, needs: 135, risk: 22 },
  { month: "Apr", high: 245, track: 841, needs: 136, risk: 22 },
  { month: "May", high: 248, track: 842, needs: 136, risk: 22 },
];

export const costOutputData = [
  { month: "Dec", cost: 1.9, output: 1.05 },
  { month: "Jan", cost: 2.05, output: 1.08 },
  { month: "Feb", cost: 2.1, output: 1.1 },
  { month: "Mar", cost: 2.2, output: 1.12 },
  { month: "Apr", cost: 2.35, output: 1.15 },
  { month: "May", cost: 2.48, output: 1.18 },
];

export const attendanceData = [
  { name: "Present", value: 1153, color: "#22c55e" },
  { name: "Absent", value: 62, color: "#ef4444" },
  { name: "Half Day", value: 33, color: "#f59e0b" },
];

export const kpiCards = [
  { label: "Total Employees", value: "1,248", change: "+18 vs last month", up: true, icon: Users, color: "indigo", sparkColor: "#6366f1", spark: [40, 45, 50, 48, 55, 60, 58, 65] },
  { label: "Open Roles", value: "28", change: "▼ 4 vs last month", up: false, icon: Briefcase, color: "emerald", sparkColor: "#10b981", spark: [32, 30, 28, 31, 29, 28, 27, 28] },
  { label: "New Hires (This Month)", value: "18", change: "+5 vs last month", up: true, icon: UserPlus, color: "blue", sparkColor: "#3b82f6", spark: [10, 12, 11, 14, 13, 15, 16, 18] },
  { label: "Payroll (This Month)", value: "₹2.48 Cr", change: "▲ 8.6% vs last month", up: true, icon: Wallet, color: "amber", sparkColor: "#f59e0b", spark: [2.0, 2.1, 2.15, 2.2, 2.3, 2.35, 2.42, 2.48] },
  { label: "Attendance Rate", value: "92.6%", change: "▼ 1.8% vs last month", up: false, icon: UserCheck, color: "teal", sparkColor: "#14b8a6", spark: [94, 93.5, 93, 93.2, 92.8, 92.5, 92.7, 92.6] },
  { label: "Avg Performance Score", value: "3.74 / 5", change: "▲ 0.21 vs last month", up: true, icon: Star, color: "violet", sparkColor: "#8b5cf6", spark: [3.4, 3.45, 3.5, 3.55, 3.6, 3.65, 3.7, 3.74] },
];

export const criticalAlerts = [
  { icon: CheckCircle2, label: "Pending Approvals", sub: "Leave, Offers, Expenses", count: 5, color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Activity, label: "Attendance Anomalies", sub: "Requires attention", count: 12, color: "text-blue-500", bg: "bg-blue-50" },
  { icon: TrendingUp, label: "High Payroll Variations", sub: "vs last month", count: 3, color: "text-red-500", bg: "bg-red-50" },
  { icon: FileText, label: "Documents Expiring Soon", sub: "Action required", count: 7, color: "text-purple-500", bg: "bg-purple-50" },
];

export const recentActivity = [
  { icon: FileText, color: "bg-indigo-100 text-indigo-600", title: "Rahul Sharma", sub: "Moved to Interview Stage", time: "20 May 2025, 10:30 AM" },
  { icon: CheckCircle2, color: "bg-green-100 text-green-600", title: "Leave Request", sub: "Approved for Sneha Iyer", time: "20 May 2025, 09:15 AM" },
  { icon: Wallet, color: "bg-amber-100 text-amber-600", title: "Payroll Processed", sub: "May 2025 payroll completed", time: "19 May 2025, 06:45 PM" },
  { icon: AlertTriangle, color: "bg-red-100 text-red-600", title: "Document Expiring", sub: "3 documents expire in 7 days", time: "19 May 2025, 03:20 PM" },
  { icon: UserPlus, color: "bg-teal-100 text-teal-600", title: "New Hire Onboarded", sub: "Aman Verma joined today", time: "19 May 2025, 11:00 AM" },
];

export const upcomingEvents = [
  { icon: Users, color: "bg-blue-100 text-blue-600", title: "Interview – Rahul Verma", time: "Today, 11:00 AM", urgent: true },
  { icon: FileText, color: "bg-purple-100 text-purple-600", title: "Policy Review Meeting", time: "Tomorrow, 3:00 PM", urgent: false },
  { icon: Star, color: "bg-amber-100 text-amber-600", title: "Performance Review Cycle", time: "26 May – 02 Jun 2025", urgent: false },
  { icon: Wallet, color: "bg-green-100 text-green-600", title: "Payroll Processing", time: "31 May 2025", urgent: false },
];

export const funnelStages = [
  { stage: "Applied", candidates: 1248, conversion: "100%", width: "100%" },
  { stage: "Screening", candidates: 312, conversion: "25.0%", width: "78%" },
  { stage: "Interview", candidates: 156, conversion: "12.5%", width: "58%" },
  { stage: "Offer", candidates: 32, conversion: "2.6%", width: "38%" },
  { stage: "Hired", candidates: 18, conversion: "1.4%", width: "22%" },
];

export const funnelColors = ["#4f46e5", "#6366f1", "#3b82f6", "#22c55e", "#f59e0b"];

export function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
      />
    </svg>
  );
}
