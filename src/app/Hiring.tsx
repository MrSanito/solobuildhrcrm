"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Bell,
  Send,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CalendarDays,
  Briefcase,
  Users,
  Clock,
  AlertTriangle,
  Filter,
  Search,
  Plus,
  Download,
  Star,
  MapPin,
  Edit3,
  MoreVertical,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Activity,
  X,
  BarChart2,
  FileText,
  Eye,
  Target,
  Video,
  Phone,
  Mail,
  User,
   Calendar,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  DollarSign,
  Award,
  Zap,
  Info,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────── */
type TabName =
  | "Roles"
  | "Screening"
  | "Pipeline"
  | "Interviews"
  | "Offers"
  | "Intelligence";

/* ─── Shared Mock Data ──────────────────────────────────── */
const topSources = [
  { name: "LinkedIn", value: 42, color: "#0077b5" },
  { name: "Naukri", value: 28, color: "#6366f1" },
  { name: "Referral", value: 18, color: "#22c55e" },
  { name: "Indeed", value: 7, color: "#f59e0b" },
  { name: "Others", value: 5, color: "#94a3b8" },
];

const backendSkills = [
  { skill: "Python / Django", importance: "Must Have", pct: 90 },
  { skill: "REST APIs", importance: "Must Have", pct: 88 },
  { skill: "PostgreSQL / MySQL", importance: "Must Have", pct: 82 },
  { skill: "Data Structures", importance: "Should Have", pct: 76 },
  { skill: "Docker", importance: "Should Have", pct: 65 },
  { skill: "AWS (EC2, S3, RDS)", importance: "Nice to Have", pct: 50 },
  { skill: "Redis / Caching", importance: "Nice to Have", pct: 40 },
];

const roles = [
  { id: 1, role: "Backend Developer", dept: "Engineering", exp: "3 – 8 Yrs", applicants: 248, pipeline: "Strong", urgency: "High", status: "Active" },
  { id: 2, role: "Frontend Developer", dept: "Engineering", exp: "2 – 6 Yrs", applicants: 186, pipeline: "Strong", urgency: "Medium", status: "Active" },
  { id: 3, role: "UI/UX Designer", dept: "Design", exp: "2 – 6 Yrs", applicants: 143, pipeline: "Medium", urgency: "Medium", status: "Active" },
  { id: 4, role: "DevOps Engineer", dept: "Engineering", exp: "3 – 8 Yrs", applicants: 118, pipeline: "Medium", urgency: "High", status: "Active" },
  { id: 5, role: "Data Analyst", dept: "Analytics", exp: "2 – 5 Yrs", applicants: 96, pipeline: "Weak", urgency: "Medium", status: "Active" },
  { id: 6, role: "Product Manager", dept: "Product", exp: "4 – 8 Yrs", applicants: 88, pipeline: "Strong", urgency: "High", status: "Active" },
  { id: 7, role: "QA Engineer", dept: "Engineering", exp: "2 – 6 Yrs", applicants: 74, pipeline: "Medium", urgency: "Low", status: "Active" },
  { id: 8, role: "HR Executive", dept: "HR", exp: "1 – 3 Yrs", applicants: 52, pipeline: "Weak", urgency: "Low", status: "Active" },
  { id: 9, role: "Digital Marketing Specialist", dept: "Marketing", exp: "2 – 5 Yrs", applicants: 46, pipeline: "Medium", urgency: "Low", status: "Active" },
  { id: 10, role: "Sales Executive", dept: "Sales", exp: "1 – 3 Yrs", applicants: 40, pipeline: "Weak", urgency: "Low", status: "Active" },
];

const kpiCards = [
  { label: "Open Roles", value: "28", change: "▼ 4 vs last month", up: false, icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Candidates in Pipeline", value: "312", change: "▲ 10.4% vs last month", up: true, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Interviews Pending", value: "56", change: "▼ 4 vs last month", up: false, icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Offers Pending", value: "18", change: "▲ 3 vs last month", up: true, icon: CheckCircle2, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Time to Hire (Avg)", value: "24 Days", change: "▼ 3 days vs last month", up: false, icon: Clock, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Hiring Pressure", value: "High", change: "8 roles need urgent attention", up: false, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", badge: "High" },
];

const screeningBuckets = [
  { label: "Best Match", count: 92, pct: "29.4%", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: Star },
  { label: "Qualified", count: 146, pct: "46.5%", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: CheckCircle2 },
  { label: "Potential Candidates", count: 22, pct: "6.7%", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: Target },
  { label: "Rejected", count: 148, pct: "19.8%", color: "text-red-500", bg: "bg-red-50", border: "border-red-200", icon: X },
];

const candidates = [
  { name: "Rahul Sharma", role: "Backend Developer", aiScore: 92, skills: 94, exp: "5.6 Yrs", source: "LinkedIn", added: "20 May 2025", avatar: "RS", tag: "Best Match", tagColor: "bg-green-100 text-green-700" },
  { name: "Priya Mehta", role: "Backend Developer", aiScore: 89, skills: 89, exp: "4.5 Yrs", source: "Naukri", added: "19 May 2025", avatar: "PM", tag: "Best Match", tagColor: "bg-green-100 text-green-700" },
  { name: "Vikram Rao", role: "Software Engineer", aiScore: 87, skills: 87, exp: "6.2 Yrs", source: "Referral", added: "18 May 2025", avatar: "VR", tag: "Best Match", tagColor: "bg-green-100 text-green-700" },
  { name: "Arjun Mehra", role: "Backend Developer", aiScore: 85, skills: 87, exp: "4.3 Yrs", source: "LinkedIn", added: "18 May 2025", avatar: "AM", tag: "Qualified", tagColor: "bg-blue-100 text-blue-700" },
  { name: "Kavya Nair", role: "Software Engineer", aiScore: 84, skills: 0, exp: "2.9 Yrs", source: "Indeed", added: "17 May 2025", avatar: "KN", tag: "Qualified", tagColor: "bg-blue-100 text-blue-700" },
  { name: "Aman Kumar", role: "Software Engineer", aiScore: 82, skills: 85, exp: "3.1 Yrs", source: "Naukri", added: "17 May 2025", avatar: "AK", tag: "Qualified", tagColor: "bg-blue-100 text-blue-700" },
  { name: "Pooja Singh", role: "Backend Developer", aiScore: 81, skills: 83, exp: "9.5 Yrs", source: "LinkedIn", added: "16 May 2025", avatar: "PS", tag: "Qualified", tagColor: "bg-blue-100 text-blue-700" },
  { name: "Rohit Verma", role: "Backend Engineer", aiScore: 80, skills: 82, exp: "4.0 Yrs", source: "Referral", added: "16 May 2025", avatar: "RV", tag: "Qualified", tagColor: "bg-blue-100 text-blue-700" },
];

/* ─── Pipeline Data ─────────────────────────────────────── */
const pipelineColumns = [
  {
    id: "applied", label: "Applied", count: 78, pct: "25.0%",
    candidates: [
      { name: "Sneha Iyer", role: "Backend Developer", score: 72, date: "Applied 19 May", avatar: "SI", avatarColor: "from-pink-400 to-rose-500" },
      { name: "Arjun Mehta", role: "Backend Developer", score: 68, date: "Applied 18 May", avatar: "AM", avatarColor: "from-violet-400 to-purple-500" },
      { name: "Rohit Verma", role: "Data Analyst", score: 64, date: "Applied 18 May", avatar: "RV", avatarColor: "from-blue-400 to-cyan-500" },
      { name: "Pooja Singh", role: "UI/UX Designer", score: 61, date: "Applied 17 May", avatar: "PS", avatarColor: "from-emerald-400 to-teal-500" },
    ],
    extra: 74,
    color: "border-t-gray-400",
  },
  {
    id: "screening", label: "Screening", count: 64, pct: "20.5%",
    candidates: [
      { name: "Rahul Sharma", role: "Backend Developer", score: 92, date: "Moved 20 May", avatar: "RS", avatarColor: "from-indigo-500 to-purple-600" },
      { name: "Vikram Rao", role: "DevOps Engineer", score: 87, date: "Moved 20 May", avatar: "VR", avatarColor: "from-blue-500 to-indigo-600" },
      { name: "Kavya Nair", role: "Backend Developer", score: 84, date: "Moved 19 May", avatar: "KN", avatarColor: "from-teal-400 to-cyan-500" },
      { name: "Aman Kumar", role: "Data Analyst", score: 78, date: "Moved 19 May", avatar: "AK", avatarColor: "from-amber-400 to-orange-500" },
    ],
    extra: 60,
    color: "border-t-blue-400",
  },
  {
    id: "interview", label: "Interview", count: 48, pct: "15.4%",
    candidates: [
      { name: "Neha Patel", role: "Backend Developer", score: 89, date: "Moved 19 May", avatar: "NP", avatarColor: "from-rose-400 to-pink-500" },
      { name: "Siddharth Jain", role: "DevOps Engineer", score: 86, date: "Moved 18 May", avatar: "SJ", avatarColor: "from-violet-500 to-purple-600" },
      { name: "Harshit Singh", role: "Product Manager", score: 82, date: "Moved 17 May", avatar: "HS", avatarColor: "from-green-400 to-emerald-500" },
      { name: "Megha Gupta", role: "Data Analyst", score: 80, date: "Moved 17 May", avatar: "MG", avatarColor: "from-amber-400 to-yellow-500" },
    ],
    extra: 44,
    color: "border-t-amber-400",
  },
  {
    id: "offer", label: "Offer", count: 18, pct: "5.8%",
    candidates: [
      { name: "Aditya Kulkarni", role: "Backend Developer", score: 95, date: "Offered 20 May", avatar: "AK", avatarColor: "from-green-500 to-emerald-600" },
      { name: "Tanvi Desai", role: "UI/UX Designer", score: 91, date: "Offered 19 May", avatar: "TD", avatarColor: "from-pink-500 to-rose-600" },
      { name: "Ankit Bansal", role: "DevOps Engineer", score: 88, date: "Offered 18 May", avatar: "AB", avatarColor: "from-blue-500 to-indigo-600" },
    ],
    extra: 15,
    color: "border-t-green-400",
  },
  {
    id: "hired", label: "Hired", count: 18, pct: "5.8%",
    candidates: [
      { name: "Rhea Kapoor", role: "Backend Developer", score: null, date: "Joined 19 May", avatar: "RK", avatarColor: "from-purple-500 to-violet-600" },
      { name: "Kunal Joshi", role: "Data Analyst", score: null, date: "Joined 16 May", avatar: "KJ", avatarColor: "from-teal-500 to-cyan-600" },
      { name: "Mohit Agarwal", role: "DevOps Engineer", score: null, date: "Joined 15 May", avatar: "MA", avatarColor: "from-orange-400 to-amber-500" },
      { name: "Simran Kaur", role: "Product Manager", score: null, date: "Joined 14 May", avatar: "SK", avatarColor: "from-rose-400 to-pink-500" },
    ],
    extra: 0,
    color: "border-t-emerald-500",
  },
];

const conversionData = [
  { name: "Applied", value: 100 },
  { name: "Screening", value: 41 },
  { name: "Interview", value: 32.6 },
  { name: "Offer", value: 18.3 },
  { name: "Hired", value: 5.8 },
];

const timeInStageData = [
  { stage: "Applied", days: 3 },
  { stage: "Screening", days: 5 },
  { stage: "Interview", days: 8 },
  { stage: "Offer", days: 4 },
];

const priorityData = [
  { name: "High", value: 128, pct: "41%", color: "#ef4444" },
  { name: "Medium", value: 132, pct: "42%", color: "#f59e0b" },
  { name: "Low", value: 52, pct: "17%", color: "#6366f1" },
];

const topRolesPipeline = [
  { role: "Backend Developer", count: 128, max: 128 },
  { role: "DevOps Engineer", count: 64, max: 128 },
  { role: "Data Analyst", count: 48, max: 128 },
  { role: "UI/UX Designer", count: 36, max: 128 },
  { role: "Product Manager", count: 18, max: 128 },
];

/* ─── Interviews Data ──────────────────────────────────── */
const interviewKpis = [
  { label: "Interviews Today", value: "8", change: "▲ 2 vs yesterday", up: true, icon: CalendarDays, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Interviews This Week", value: "32", change: "▲ 12% vs last week", up: true, icon: BarChart2, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Feedback Pending", value: "14", change: "3 high priority", up: false, icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Panel Availability", value: "92%", change: "Good", up: true, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Avg Interview Score", value: "4.2/5", change: "▲ 0.3 vs last week", up: true, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Interview to Offer", value: "18.3%", change: "▲ 2.1% vs last month", up: true, icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
];

const interviews = [
  { time: "09:30 AM", duration: "45 mins", name: "Sneha Iyer", exp: "4.8 yrs", score: 4.5, role: "Backend Developer", dept: "Engineering", type: "Technical Round 1", mode: "Online", panel: ["RK", "AS", "MK"], panelExtra: 1, status: "Scheduled", avatar: "SI", avatarColor: "from-pink-400 to-rose-500", id: "CAND-1258" },
  { time: "10:30 AM", duration: "60 mins", name: "Rahul Sharma", exp: "5.6 yrs", score: 4.2, role: "DevOps Engineer", dept: "Engineering", type: "Technical + System Design", mode: "Online", panel: ["RK", "AS", "MK"], panelExtra: 2, status: "Scheduled", avatar: "RS", avatarColor: "from-indigo-500 to-purple-600", id: "CAND-1247" },
  { time: "11:30 AM", duration: "45 mins", name: "Neha Patel", exp: "3.9 yrs", score: 4.1, role: "UI/UX Designer", dept: "Design", type: "Design Round", mode: "Online", panel: ["RK", "AS"], panelExtra: 0, status: "Scheduled", avatar: "NP", avatarColor: "from-rose-400 to-pink-500", id: "CAND-1239" },
  { time: "01:30 PM", duration: "60 mins", name: "Vikram Rao", exp: "6.2 yrs", score: 4.3, role: "Data Engineer", dept: "Engineering", type: "Technical + Case Study", mode: "Online", panel: ["RK", "AS", "MK"], panelExtra: 1, status: "Scheduled", avatar: "VR", avatarColor: "from-blue-500 to-indigo-600", id: "CAND-1231" },
  { time: "02:45 PM", duration: "30 mins", name: "Kavya Nair", exp: "2.8 yrs", score: 3.9, role: "Product Manager", dept: "Product", type: "Behavioral Round", mode: "Online", panel: ["RK", "AS"], panelExtra: 0, status: "Scheduled", avatar: "KN", avatarColor: "from-teal-400 to-cyan-500", id: "CAND-1224" },
  { time: "04:00 PM", duration: "45 mins", name: "Arjun Mehta", exp: "4.5 yrs", score: 4.0, role: "Backend Developer", dept: "Engineering", type: "Technical Round 2", mode: "Onsite", panel: ["RK", "AS", "MK"], panelExtra: 1, status: "Scheduled", avatar: "AM", avatarColor: "from-violet-400 to-purple-500", id: "CAND-1218" },
  { time: "05:00 PM", duration: "30 mins", name: "Rohit Verma", exp: "5.1 yrs", score: 4.2, role: "SRE Engineer", dept: "Engineering", type: "Culture Fit", mode: "Online", panel: ["RK", "AS"], panelExtra: 0, status: "Scheduled", avatar: "RV", avatarColor: "from-blue-400 to-cyan-500", id: "CAND-1209" },
  { time: "06:00 PM", duration: "60 mins", name: "Pooja Singh", exp: "3.6 yrs", score: 4.1, role: "QA Engineer", dept: "Engineering", type: "Technical + QA Round", mode: "Online", panel: ["RK", "AS", "MK"], panelExtra: 0, status: "Rescheduled", avatar: "PS", avatarColor: "from-emerald-400 to-teal-500", id: "CAND-1201" },
];

/* ─── Offers Data ───────────────────────────────────────── */
const offerKpis = [
  { label: "Offers Pending", value: "18", change: "▲ 3 vs last month", up: true, icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Offers Awaiting Approval", value: "7", change: "▲ 2 vs last month", up: false, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Offers Accepted", value: "12", change: "▲ 4 vs last month", up: true, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Offers Declined", value: "6", change: "▼ 2 vs last month", up: false, icon: X, color: "text-red-600", bg: "bg-red-50" },
  { label: "Offer Acceptance Rate", value: "66.7%", change: "▲ 3.6% vs last month", up: true, icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Avg. Offer Value", value: "₹12.48 LPA", change: "▲ 3.2% vs last month", up: true, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const offers = [
  { name: "Rahul Sharma", exp: "5.6 yrs", role: "Backend Developer", dept: "Engineering", salary: "₹14.00 LPA", variable: "15% Variable", offerDate: "20 May 2025", status: "Pending", expiresOn: "29 May 2025", daysLeft: "9 days left", avatar: "RS", avatarColor: "from-indigo-500 to-purple-600", score: 92 },
  { name: "Sneha Iyer", exp: "4.8 yrs", role: "UI/UX Designer", dept: "Design", salary: "₹11.50 LPA", variable: "10% Variable", offerDate: "19 May 2025", status: "Awaiting Approval", expiresOn: "28 May 2025", daysLeft: "8 days left", avatar: "SI", avatarColor: "from-pink-400 to-rose-500", score: 88 },
  { name: "Vikram Rao", exp: "6.2 yrs", role: "DevOps Engineer", dept: "Engineering", salary: "₹16.00 LPA", variable: "15% Variable", offerDate: "18 May 2025", status: "Pending", expiresOn: "27 May 2025", daysLeft: "7 days left", avatar: "VR", avatarColor: "from-blue-500 to-indigo-600", score: 87 },
  { name: "Kavya Nair", exp: "3.9 yrs", role: "Product Manager", dept: "Product", salary: "₹18.50 LPA", variable: "20% Variable", offerDate: "17 May 2025", status: "Accepted", expiresOn: "–", daysLeft: "", avatar: "KN", avatarColor: "from-teal-400 to-cyan-500", score: 84 },
  { name: "Arjun Mehta", exp: "4.5 yrs", role: "Data Analyst", dept: "Analytics", salary: "₹9.50 LPA", variable: "10% Variable", offerDate: "16 May 2025", status: "Declined", expiresOn: "18 May 2025", daysLeft: "Candidate Declined", avatar: "AM", avatarColor: "from-violet-400 to-purple-500", score: 85 },
  { name: "Pooja Singh", exp: "3.6 yrs", role: "QA Engineer", dept: "Engineering", salary: "₹8.75 LPA", variable: "10% Variable", offerDate: "15 May 2025", status: "Accepted", expiresOn: "–", daysLeft: "", avatar: "PS", avatarColor: "from-emerald-400 to-teal-500", score: 81 },
  { name: "Harshit Singh", exp: "5.1 yrs", role: "SRE Engineer", dept: "Engineering", salary: "₹15.50 LPA", variable: "15% Variable", offerDate: "14 May 2025", status: "Awaiting Approval", expiresOn: "24 May 2025", daysLeft: "4 days left", avatar: "HS", avatarColor: "from-green-400 to-emerald-500", score: 86 },
  { name: "Neha Patel", exp: "3.2 yrs", role: "HR Executive", dept: "HR", salary: "₹6.00 LPA", variable: "8% Variable", offerDate: "13 May 2025", status: "Pending", expiresOn: "23 May 2025", daysLeft: "3 days left", avatar: "NP", avatarColor: "from-rose-400 to-pink-500", score: 89 },
];

/* ─── Avatar Helper ─────────────────────────────────────── */
function Avatar({ initials, gradient, size = "md" }: { initials: string; gradient: string; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "w-12 h-12 text-sm" : size === "sm" ? "w-7 h-7 text-[9px]" : "w-8 h-8 text-[10px]";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}

/* ─── Badge helpers ─────────────────────────────────────── */
function UrgencyBadge({ level }: { level: string }) {
  const map: Record<string, string> = { High: "bg-red-100 text-red-700", Medium: "bg-amber-100 text-amber-700", Low: "bg-gray-100 text-gray-600" };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${map[level] ?? "bg-gray-100 text-gray-600"}`}>{level}</span>;
}

function PipelineBadge({ level }: { level: string }) {
  const map: Record<string, string> = { Strong: "text-green-600", Medium: "text-amber-600", Weak: "text-red-500" };
  const bars = level === "Strong" ? 3 : level === "Medium" ? 2 : 1;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((b) => (
        <div key={b} className={`h-2 w-4 rounded-sm ${b <= bars ? (level === "Strong" ? "bg-green-500" : level === "Medium" ? "bg-amber-400" : "bg-red-400") : "bg-gray-200"}`} />
      ))}
      <span className={`text-[10px] font-medium ${map[level]}`}>{level}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700",
    "Awaiting Approval": "bg-blue-100 text-blue-700",
    Accepted: "bg-green-100 text-green-700",
    Declined: "bg-red-100 text-red-700",
    Scheduled: "bg-indigo-100 text-indigo-700",
    Rescheduled: "bg-orange-100 text-orange-700",
    Expired: "bg-gray-100 text-gray-500",
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${map[status] ?? "bg-gray-100 text-gray-600"}`}>{status}</span>;
}

/* ─── Backend Developer Detail Panel ────────────────────── */
function BackendDevPanel() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-base font-bold text-gray-900">Backend Developer</h2>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Active</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> Engineering</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 3 – 6 Years</span>
            <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> ₹12 – ₹18 LPA</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50"><Edit3 className="w-3 h-3" /> Edit Role</button>
          <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"><MoreVertical className="w-4 h-4 text-gray-500" /></button>
        </div>
      </div>
      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 leading-relaxed">We are looking for a skilled Backend Developer to design, build and maintain scalable server-side applications and APIs.</div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-2">Capability Matrix</p>
          <div className="flex flex-col gap-2">
            {backendSkills.map((s) => (
              <div key={s.skill}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-gray-700">{s.skill}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${s.importance === "Must Have" ? "bg-red-100 text-red-600" : s.importance === "Should Have" ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500"}`}>{s.importance}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${s.importance === "Must Have" ? "bg-indigo-500" : s.importance === "Should Have" ? "bg-blue-400" : "bg-gray-400"}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-2">Hiring Demand (AI Insight)</p>
          <div className="p-3 bg-red-50 rounded-xl border border-red-100 mb-2">
            <p className="text-[10px] text-red-600 font-medium mb-1">High demand for this role due to:</p>
            {["3 ongoing projects delayed", "Team capacity 100% overloaded", "2 critical skills gaps identified"].map((r) => (
              <div key={r} className="flex items-start gap-1.5 mb-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" /><span className="text-[10px] text-red-700">{r}</span></div>
            ))}
          </div>
          <div className="flex flex-col items-center p-3 bg-white rounded-xl border border-gray-200">
            <div className="relative w-20 h-20 mb-2">
              <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray={`${(87 / 100) * 188} 188`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-lg font-bold text-gray-800">87</span></div>
            </div>
            <span className="text-[10px] text-red-600 font-semibold">Demand Score</span>
            <span className="text-xs font-bold text-red-700">High</span>
          </div>
        </div>
      </div>
      <div className="p-3 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-700">Pipeline Strength</p>
          <span className="text-xs font-bold text-green-600">Strong</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-1"><div className="h-2 rounded-full bg-green-500" style={{ width: "75%" }} /></div>
        <p className="text-[10px] text-gray-500">Sufficient candidate flow</p>
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Total Applicants</span>
          <span className="text-sm font-bold text-gray-800">248</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">Hiring Plan</p>
          {[{ label: "Target Hires", value: 3 }, { label: "Hired So Far", value: 1 }, { label: "In Progress", value: 2 }].map((h) => (
            <div key={h.label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
              <span className="text-[10px] text-gray-500">{h.label}</span>
              <span className="text-xs font-bold text-gray-800">{h.value}</span>
            </div>
          ))}
          <div className="mt-2"><p className="text-[10px] text-gray-400">Target Date</p><p className="text-[11px] font-semibold text-gray-700">30 Jun 2025</p></div>
        </div>
        <div className="p-3 rounded-xl border border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">Top Sources</p>
          <div className="flex justify-center mb-1">
            <PieChart width={80} height={80}>
              <Pie data={topSources} cx={35} cy={35} outerRadius={35} dataKey="value" strokeWidth={1}>
                {topSources.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </div>
          <div className="flex flex-col gap-0.5">
            {topSources.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] text-gray-600 flex-1">{s.name}</span>
                <span className="text-[10px] font-semibold text-gray-700">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Candidate Detail (Screening) ─────────────────────── */
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

/* ─── Pipeline Candidate Detail ────────────────────────── */
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

/* ─── Interview Candidate Detail ────────────────────────── */
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

/* ─── Offer Detail Panel ────────────────────────────────── */
function OfferDetailPanel({ offer, onClose }: { offer: any; onClose: () => void }) {
  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
      {/* Candidate Summary */}
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-gray-700">Candidate Summary</p>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-4 h-4 text-gray-400" /></button>
      </div>
      <div className="p-3 rounded-xl border border-gray-200 flex items-center gap-3">
        <Avatar initials={offer.avatar} gradient={offer.avatarColor} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-gray-900">{offer.name}</h3>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-green-600 text-green-600" /> {offer.score}% Match
            </span>
          </div>
          <p className="text-xs text-gray-500">{offer.role}</p>
          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400">
            <span>{offer.exp}</span>
            <span>•</span>
            <span>Bengaluru, India</span>
          </div>
        </div>
      </div>

      {/* Offer Details */}
      <div className="p-3 rounded-xl border border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-2">Offer Details</p>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <p className="text-gray-400">Offer Status</p>
            <StatusBadge status={offer.status} />
          </div>
          <div>
            <p className="text-gray-400">Offered Salary</p>
            <p className="font-bold text-gray-800">{offer.salary}</p>
            <p className="text-gray-500">+ {offer.variable}</p>
          </div>
          <div>
            <p className="text-gray-400">Offer Date</p>
            <p className="font-semibold text-gray-700">{offer.offerDate}</p>
          </div>
          <div>
            <p className="text-gray-400">Expires On</p>
            <p className="font-semibold text-gray-700">{offer.expiresOn}</p>
            {offer.daysLeft && <p className="text-red-500 font-medium">{offer.daysLeft}</p>}
          </div>
          <div>
            <p className="text-gray-400">CTC Breakdown</p>
            <button className="text-indigo-600 font-medium hover:underline">View Breakdown</button>
          </div>
          <div>
            <p className="text-gray-400">Notice Period</p>
            <p className="font-semibold text-gray-700">30 Days</p>
          </div>
          <div>
            <p className="text-gray-400">Work Location</p>
            <p className="font-semibold text-gray-700">Bengaluru, India</p>
          </div>
          <div>
            <p className="text-gray-400">Employment Type</p>
            <p className="font-semibold text-gray-700">Full Time</p>
          </div>
          <div>
            <p className="text-gray-400">Reporting Manager</p>
            <p className="font-semibold text-gray-700">Rohit Verma</p>
          </div>
          <div>
            <p className="text-gray-400">Cost to Company</p>
            <p className="font-bold text-gray-800">{offer.salary}</p>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
          <button className="text-xs text-indigo-600 flex items-center gap-1 hover:underline"><FileText className="w-3 h-3" /> View Offer Letter</button>
          <button className="p-1 hover:bg-gray-100 rounded"><Download className="w-3.5 h-3.5 text-gray-500" /></button>
        </div>
      </div>

      {/* Offer Timeline */}
      <div className="p-3 rounded-xl border border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-2">Offer Timeline</p>
        {[
          { event: "Offer Generated", date: "20 May 2025, 10:30 AM", color: "bg-green-500", done: true },
          { event: "Sent to Candidate", date: "20 May 2025, 10:45 AM", color: "bg-green-500", done: true },
          { event: "Awaiting Candidate Response", date: "–", color: "bg-amber-400", done: false },
          { event: "Offer Expires", date: "29 May 2025", color: "bg-gray-300", done: false },
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <div className={`w-2.5 h-2.5 rounded-full ${t.color} mt-0.5 shrink-0`} />
            <div>
              <p className="text-[10px] font-medium text-gray-700">{t.event}</p>
              <p className="text-[9px] text-gray-400">{t.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="flex-1 text-xs border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 font-medium">Edit Offer</button>
        <button className="flex-1 text-xs bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 font-medium">Resend Offer</button>
        <button className="flex-1 text-xs border border-red-200 text-red-600 py-2 rounded-xl hover:bg-red-50 font-medium">Withdraw</button>
      </div>
    </div>
  );
}

/* ─── Roles Tab ─────────────────────────────────────────── */
function RolesTab() {
  const [selectedRole, setSelectedRole] = useState<number>(1);
  return (
    <div className="flex gap-4 flex-1 min-h-0">
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">All Open Roles <span className="text-gray-400 font-normal">(28)</span></h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search roles" className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 w-36" />
            </div>
            <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50"><Filter className="w-3 h-3" /> Filters</button>
            <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
          </div>
        </div>
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-[11px] font-medium">
                <th className="text-left px-4 py-2.5">Role</th>
                <th className="text-left px-3 py-2.5">Department</th>
                <th className="text-center px-3 py-2.5">Applicants</th>
                <th className="text-left px-3 py-2.5">Pipeline Strength</th>
                <th className="text-center px-3 py-2.5">Urgency</th>
                <th className="text-center px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id} onClick={() => setSelectedRole(r.id)} className={`border-b border-gray-50 cursor-pointer transition ${selectedRole === r.id ? "bg-indigo-50" : "hover:bg-gray-50"}`}>
                  <td className="px-4 py-2.5"><p className="font-semibold text-gray-800">{r.role}</p><p className="text-[10px] text-gray-400">{r.exp}</p></td>
                  <td className="px-3 py-2.5 text-gray-600">{r.dept}</td>
                  <td className="px-3 py-2.5 text-center font-semibold text-gray-800">{r.applicants}</td>
                  <td className="px-3 py-2.5"><PipelineBadge level={r.pipeline} /></td>
                  <td className="px-3 py-2.5 text-center"><UrgencyBadge level={r.urgency} /></td>
                  <td className="px-3 py-2.5 text-center"><span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{r.status}</span></td>
                  <td className="px-3 py-2.5"><button className="p-1 rounded hover:bg-gray-200"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
            <span>Showing 1 to 10 of 28 roles</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((n) => <button key={n} className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">{n}</button>)}
              <span>...</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-gray-100 flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700"><Plus className="w-3.5 h-3.5" /> Create New Role</button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50"><Download className="w-3.5 h-3.5" /> Export Roles</button>
        </div>
      </div>
      <div className="w-80 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-4 overflow-y-auto">
        <BackendDevPanel />
      </div>
    </div>
  );
}

/* ─── Screening Tab ─────────────────────────────────────── */
function ScreeningTab() {
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

/* ─── Pipeline Tab ──────────────────────────────────────── */
function PipelineTab() {
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

/* ─── Interviews Tab ────────────────────────────────────── */
function InterviewsTab() {
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

/* ─── Offers Tab ────────────────────────────────────────── */
function OffersTab() {
  const [selectedOffer, setSelectedOffer] = useState<any>(offers[0]);
  const [activeOfferTab, setActiveOfferTab] = useState("All Offers");

  const offerSubTabs = [
    { label: "All Offers", count: 18 },
    { label: "Pending", count: 18 },
    { label: "Awaiting Approval", count: 7 },
    { label: "Accepted", count: 12 },
    { label: "Declined", count: 6 },
    { label: "Expired", count: 2 },
  ];

  const filteredOffers = activeOfferTab === "All Offers"
    ? offers
    : offers.filter((o) => {
        if (activeOfferTab === "Awaiting Approval") return o.status === "Awaiting Approval";
        return o.status === activeOfferTab;
      });

  return (
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      {/* Offer KPIs */}
      <div className="grid grid-cols-6 gap-3">
        {offerKpis.map((k, i) => (
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
        {/* Offers Table */}
        <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Offers <span className="text-gray-400 font-normal">(18)</span></h3>
            <div className="flex items-center gap-2">
              <div className="relative"><Search className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" /><input placeholder="Search candidates" className="pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg w-36 focus:outline-none focus:ring-1 focus:ring-indigo-300" /></div>
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50"><Filter className="w-3 h-3" /> Filters</button>
              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="flex border-b border-gray-100 px-3">
            {offerSubTabs.map((t) => (
              <button key={t.label} onClick={() => setActiveOfferTab(t.label)} className={`text-[11px] font-medium py-2 px-3 border-b-2 transition whitespace-nowrap -mb-px ${activeOfferTab === t.label ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
                {t.label} <span className="text-[10px]">({t.count})</span>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium">
                  <th className="text-left px-4 py-2.5">CANDIDATE</th>
                  <th className="text-left px-3 py-2.5">ROLE</th>
                  <th className="text-left px-3 py-2.5">OFFERED SALARY</th>
                  <th className="text-left px-3 py-2.5">OFFER DATE</th>
                  <th className="text-left px-3 py-2.5">STATUS</th>
                  <th className="text-left px-3 py-2.5">EXPIRES ON</th>
                  <th className="text-left px-3 py-2.5">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.map((o, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedOffer(o)}
                    className={`border-b border-gray-50 cursor-pointer transition ${selectedOffer?.name === o.name ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <Avatar initials={o.avatar} gradient={o.avatarColor} size="sm" />
                        <div>
                          <p className="font-semibold text-gray-800 text-[11px]">{o.name}</p>
                          <p className="text-[10px] text-gray-400">{o.exp}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-gray-700 text-[11px]">{o.role}</p>
                      <p className="text-[10px] text-gray-400">{o.dept}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="font-bold text-gray-800 text-[11px]">{o.salary}</p>
                      <p className="text-[10px] text-gray-400">+ {o.variable}</p>
                    </td>
                    <td className="px-3 py-2.5 text-gray-600 text-[11px]">{o.offerDate}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={o.status} /></td>
                    <td className="px-3 py-2.5">
                      <p className="text-[11px] text-gray-600">{o.expiresOn}</p>
                      {o.daysLeft && <p className={`text-[10px] font-medium ${o.status === "Declined" ? "text-red-500" : "text-amber-500"}`}>{o.daysLeft}</p>}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1 rounded hover:bg-gray-200"><Eye className="w-3.5 h-3.5 text-gray-500" /></button>
                        <button className="p-1 rounded hover:bg-gray-200"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
              <span>Showing 1 to 8 of 18 offers</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((n) => <button key={n} className={`px-2 py-1 rounded border text-xs ${n === 1 ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 hover:bg-gray-50"}`}>{n}</button>)}
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-gray-100 flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700"><Plus className="w-3.5 h-3.5" /> Generate Offer</button>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50">Bulk Actions <ChevronDown className="w-3 h-3" /></button>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50"><Download className="w-3.5 h-3.5" /> Export</button>
          </div>
        </div>

        {/* Offer Detail Panel */}
        {selectedOffer && (
          <div className="w-72 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-4 overflow-y-auto">
            <OfferDetailPanel offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Hiring Page ──────────────────────────────────── */
export default function HiringPage() {
  const [activeTab, setActiveTab] = useState<TabName>("Roles");

  const tabs: { name: TabName; icon: React.ElementType }[] = [
    { name: "Roles", icon: Briefcase },
    { name: "Screening", icon: Filter },
    { name: "Pipeline", icon: Activity },
    { name: "Interviews", icon: CalendarDays },
    { name: "Offers", icon: CheckCircle2 },
    { name: "Intelligence", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* ── Top Nav ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <h1 className="text-base font-bold text-gray-900">Hiring</h1>
          </div>
          <p className="text-[11px] text-gray-400">Find, attract and hire the best talent.</p>
        </div>
        <div className="flex-1 max-w-md mx-6">
          <div className="bg-gray-100 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs text-gray-400 truncate">What's on your mind today? Examples: "Hire backend engineer"…</span>
            <button className="ml-auto bg-indigo-600 text-white p-1.5 rounded-lg hover:bg-indigo-700"><Send className="w-3 h-3" /></button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700"><Sparkles className="w-3.5 h-3.5" /> AI Assistant</button>
          <button className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            <Bell className="w-4 h-4 text-gray-600" />
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">6</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
            <CalendarDays className="w-3.5 h-3.5 text-indigo-500" />
            21 May – 21 Jun 2025
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col p-4 gap-4">
        {/* ── KPI Row (only for Roles & Screening & Pipeline) ── */}
        {(activeTab === "Roles" || activeTab === "Screening" || activeTab === "Pipeline") && (
          <div className="grid grid-cols-6 gap-3">
            {kpiCards.map((k, i) => (
              <div key={i} className={`bg-white rounded-xl border p-3 shadow-sm flex flex-col gap-1 ${k.badge === "High" ? "border-red-200" : "border-gray-200"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-medium leading-tight">{k.label}</span>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${k.bg}`}><k.icon className={`w-3.5 h-3.5 ${k.color}`} /></div>
                </div>
                <div className={`text-base font-bold leading-tight ${k.badge === "High" ? "text-red-600" : "text-gray-900"}`}>{k.value}</div>
                <div className={`text-[10px] flex items-center gap-1 ${k.up ? "text-green-600" : "text-red-500"}`}>
                  {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {k.change}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 border-b border-gray-200">
          {tabs.map((tab) => (
            <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition -mb-px ${activeTab === tab.name ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              <tab.icon className="w-3.5 h-3.5" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="flex-1 min-h-0">
          {activeTab === "Roles" && <RolesTab />}
          {activeTab === "Screening" && <ScreeningTab />}
          {activeTab === "Pipeline" && <PipelineTab />}
          {activeTab === "Interviews" && <InterviewsTab />}
          {activeTab === "Offers" && <OffersTab />}
          {activeTab === "Intelligence" && (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-indigo-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-500">Intelligence view coming soon</p>
                <p className="text-xs text-gray-400 mt-1">Switch to Roles, Screening, Pipeline, Interviews or Offers to see data</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}