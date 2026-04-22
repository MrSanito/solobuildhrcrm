import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import * as Icons from 'lucide-react';
const { Briefcase, Users, CalendarDays, CheckCircle2, Clock, AlertTriangle, Star, Target, X, MessageSquare, TrendingUp, TrendingDown, FileText, DollarSign, BarChart2 } = Icons;


export type TabName =
  | "Roles"
  | "Screening"
  | "Pipeline"
  | "Interviews"
  | "Offers"
  | "Intelligence";


export const topSources = [
  { name: "LinkedIn", value: 42, color: "#0077b5" },
  { name: "Naukri", value: 28, color: "#6366f1" },
  { name: "Referral", value: 18, color: "#22c55e" },
  { name: "Indeed", value: 7, color: "#f59e0b" },
  { name: "Others", value: 5, color: "#94a3b8" },
];

export const backendSkills = [
  { skill: "Python / Django", importance: "Must Have", pct: 90 },
  { skill: "REST APIs", importance: "Must Have", pct: 88 },
  { skill: "PostgreSQL / MySQL", importance: "Must Have", pct: 82 },
  { skill: "Data Structures", importance: "Should Have", pct: 76 },
  { skill: "Docker", importance: "Should Have", pct: 65 },
  { skill: "AWS (EC2, S3, RDS)", importance: "Nice to Have", pct: 50 },
  { skill: "Redis / Caching", importance: "Nice to Have", pct: 40 },
];

export const roles = [
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

export const kpiCards = [
  { label: "Open Roles", value: "28", change: "▼ 4 vs last month", up: false, icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Candidates in Pipeline", value: "312", change: "▲ 10.4% vs last month", up: true, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Interviews Pending", value: "56", change: "▼ 4 vs last month", up: false, icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Offers Pending", value: "18", change: "▲ 3 vs last month", up: true, icon: CheckCircle2, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Time to Hire (Avg)", value: "24 Days", change: "▼ 3 days vs last month", up: false, icon: Clock, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Hiring Pressure", value: "High", change: "8 roles need urgent attention", up: false, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", badge: "High" },
];

export const screeningBuckets = [
  { label: "Best Match", count: 92, pct: "29.4%", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: Star },
  { label: "Qualified", count: 146, pct: "46.5%", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: CheckCircle2 },
  { label: "Potential Candidates", count: 22, pct: "6.7%", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: Target },
  { label: "Rejected", count: 148, pct: "19.8%", color: "text-red-500", bg: "bg-red-50", border: "border-red-200", icon: X },
];

export const candidates = [
  { name: "Rahul Sharma", role: "Backend Developer", aiScore: 92, skills: 94, exp: "5.6 Yrs", source: "LinkedIn", added: "20 May 2025", avatar: "RS", tag: "Best Match", tagColor: "bg-green-100 text-green-700" },
  { name: "Priya Mehta", role: "Backend Developer", aiScore: 89, skills: 89, exp: "4.5 Yrs", source: "Naukri", added: "19 May 2025", avatar: "PM", tag: "Best Match", tagColor: "bg-green-100 text-green-700" },
  { name: "Vikram Rao", role: "Software Engineer", aiScore: 87, skills: 87, exp: "6.2 Yrs", source: "Referral", added: "18 May 2025", avatar: "VR", tag: "Best Match", tagColor: "bg-green-100 text-green-700" },
  { name: "Arjun Mehra", role: "Backend Developer", aiScore: 85, skills: 87, exp: "4.3 Yrs", source: "LinkedIn", added: "18 May 2025", avatar: "AM", tag: "Qualified", tagColor: "bg-blue-100 text-blue-700" },
  { name: "Kavya Nair", role: "Software Engineer", aiScore: 84, skills: 0, exp: "2.9 Yrs", source: "Indeed", added: "17 May 2025", avatar: "KN", tag: "Qualified", tagColor: "bg-blue-100 text-blue-700" },
  { name: "Aman Kumar", role: "Software Engineer", aiScore: 82, skills: 85, exp: "3.1 Yrs", source: "Naukri", added: "17 May 2025", avatar: "AK", tag: "Qualified", tagColor: "bg-blue-100 text-blue-700" },
  { name: "Pooja Singh", role: "Backend Developer", aiScore: 81, skills: 83, exp: "9.5 Yrs", source: "LinkedIn", added: "16 May 2025", avatar: "PS", tag: "Qualified", tagColor: "bg-blue-100 text-blue-700" },
  { name: "Rohit Verma", role: "Backend Engineer", aiScore: 80, skills: 82, exp: "4.0 Yrs", source: "Referral", added: "16 May 2025", avatar: "RV", tag: "Qualified", tagColor: "bg-blue-100 text-blue-700" },
];


export const pipelineColumns = [
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

export const conversionData = [
  { name: "Applied", value: 100 },
  { name: "Screening", value: 41 },
  { name: "Interview", value: 32.6 },
  { name: "Offer", value: 18.3 },
  { name: "Hired", value: 5.8 },
];

export const timeInStageData = [
  { stage: "Applied", days: 3 },
  { stage: "Screening", days: 5 },
  { stage: "Interview", days: 8 },
  { stage: "Offer", days: 4 },
];

export const priorityData = [
  { name: "High", value: 128, pct: "41%", color: "#ef4444" },
  { name: "Medium", value: 132, pct: "42%", color: "#f59e0b" },
  { name: "Low", value: 52, pct: "17%", color: "#6366f1" },
];

export const topRolesPipeline = [
  { role: "Backend Developer", count: 128, max: 128 },
  { role: "DevOps Engineer", count: 64, max: 128 },
  { role: "Data Analyst", count: 48, max: 128 },
  { role: "UI/UX Designer", count: 36, max: 128 },
  { role: "Product Manager", count: 18, max: 128 },
];


export const interviewKpis = [
  { label: "Interviews Today", value: "8", change: "▲ 2 vs yesterday", up: true, icon: CalendarDays, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Interviews This Week", value: "32", change: "▲ 12% vs last week", up: true, icon: BarChart2, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Feedback Pending", value: "14", change: "3 high priority", up: false, icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Panel Availability", value: "92%", change: "Good", up: true, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Avg Interview Score", value: "4.2/5", change: "▲ 0.3 vs last week", up: true, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Interview to Offer", value: "18.3%", change: "▲ 2.1% vs last month", up: true, icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
];

export const interviews = [
  { time: "09:30 AM", duration: "45 mins", name: "Sneha Iyer", exp: "4.8 yrs", score: 4.5, role: "Backend Developer", dept: "Engineering", type: "Technical Round 1", mode: "Online", panel: ["RK", "AS", "MK"], panelExtra: 1, status: "Scheduled", avatar: "SI", avatarColor: "from-pink-400 to-rose-500", id: "CAND-1258" },
  { time: "10:30 AM", duration: "60 mins", name: "Rahul Sharma", exp: "5.6 yrs", score: 4.2, role: "DevOps Engineer", dept: "Engineering", type: "Technical + System Design", mode: "Online", panel: ["RK", "AS", "MK"], panelExtra: 2, status: "Scheduled", avatar: "RS", avatarColor: "from-indigo-500 to-purple-600", id: "CAND-1247" },
  { time: "11:30 AM", duration: "45 mins", name: "Neha Patel", exp: "3.9 yrs", score: 4.1, role: "UI/UX Designer", dept: "Design", type: "Design Round", mode: "Online", panel: ["RK", "AS"], panelExtra: 0, status: "Scheduled", avatar: "NP", avatarColor: "from-rose-400 to-pink-500", id: "CAND-1239" },
  { time: "01:30 PM", duration: "60 mins", name: "Vikram Rao", exp: "6.2 yrs", score: 4.3, role: "Data Engineer", dept: "Engineering", type: "Technical + Case Study", mode: "Online", panel: ["RK", "AS", "MK"], panelExtra: 1, status: "Scheduled", avatar: "VR", avatarColor: "from-blue-500 to-indigo-600", id: "CAND-1231" },
  { time: "02:45 PM", duration: "30 mins", name: "Kavya Nair", exp: "2.8 yrs", score: 3.9, role: "Product Manager", dept: "Product", type: "Behavioral Round", mode: "Online", panel: ["RK", "AS"], panelExtra: 0, status: "Scheduled", avatar: "KN", avatarColor: "from-teal-400 to-cyan-500", id: "CAND-1224" },
  { time: "04:00 PM", duration: "45 mins", name: "Arjun Mehta", exp: "4.5 yrs", score: 4.0, role: "Backend Developer", dept: "Engineering", type: "Technical Round 2", mode: "Onsite", panel: ["RK", "AS", "MK"], panelExtra: 1, status: "Scheduled", avatar: "AM", avatarColor: "from-violet-400 to-purple-500", id: "CAND-1218" },
  { time: "05:00 PM", duration: "30 mins", name: "Rohit Verma", exp: "5.1 yrs", score: 4.2, role: "SRE Engineer", dept: "Engineering", type: "Culture Fit", mode: "Online", panel: ["RK", "AS"], panelExtra: 0, status: "Scheduled", avatar: "RV", avatarColor: "from-blue-400 to-cyan-500", id: "CAND-1209" },
  { time: "06:00 PM", duration: "60 mins", name: "Pooja Singh", exp: "3.6 yrs", score: 4.1, role: "QA Engineer", dept: "Engineering", type: "Technical + QA Round", mode: "Online", panel: ["RK", "AS", "MK"], panelExtra: 0, status: "Rescheduled", avatar: "PS", avatarColor: "from-emerald-400 to-teal-500", id: "CAND-1201" },
];


export const offerKpis = [
  { label: "Offers Pending", value: "18", change: "▲ 3 vs last month", up: true, icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Offers Awaiting Approval", value: "7", change: "▲ 2 vs last month", up: false, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Offers Accepted", value: "12", change: "▲ 4 vs last month", up: true, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Offers Declined", value: "6", change: "▼ 2 vs last month", up: false, icon: X, color: "text-red-600", bg: "bg-red-50" },
  { label: "Offer Acceptance Rate", value: "66.7%", change: "▲ 3.6% vs last month", up: true, icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Avg. Offer Value", value: "₹12.48 LPA", change: "▲ 3.2% vs last month", up: true, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
];

export const offers = [
  { name: "Rahul Sharma", exp: "5.6 yrs", role: "Backend Developer", dept: "Engineering", salary: "₹14.00 LPA", variable: "15% Variable", offerDate: "20 May 2025", status: "Pending", expiresOn: "29 May 2025", daysLeft: "9 days left", avatar: "RS", avatarColor: "from-indigo-500 to-purple-600", score: 92 },
  { name: "Sneha Iyer", exp: "4.8 yrs", role: "UI/UX Designer", dept: "Design", salary: "₹11.50 LPA", variable: "10% Variable", offerDate: "19 May 2025", status: "Awaiting Approval", expiresOn: "28 May 2025", daysLeft: "8 days left", avatar: "SI", avatarColor: "from-pink-400 to-rose-500", score: 88 },
  { name: "Vikram Rao", exp: "6.2 yrs", role: "DevOps Engineer", dept: "Engineering", salary: "₹16.00 LPA", variable: "15% Variable", offerDate: "18 May 2025", status: "Pending", expiresOn: "27 May 2025", daysLeft: "7 days left", avatar: "VR", avatarColor: "from-blue-500 to-indigo-600", score: 87 },
  { name: "Kavya Nair", exp: "3.9 yrs", role: "Product Manager", dept: "Product", salary: "₹18.50 LPA", variable: "20% Variable", offerDate: "17 May 2025", status: "Accepted", expiresOn: "–", daysLeft: "", avatar: "KN", avatarColor: "from-teal-400 to-cyan-500", score: 84 },
  { name: "Arjun Mehta", exp: "4.5 yrs", role: "Data Analyst", dept: "Analytics", salary: "₹9.50 LPA", variable: "10% Variable", offerDate: "16 May 2025", status: "Declined", expiresOn: "18 May 2025", daysLeft: "Candidate Declined", avatar: "AM", avatarColor: "from-violet-400 to-purple-500", score: 85 },
  { name: "Pooja Singh", exp: "3.6 yrs", role: "QA Engineer", dept: "Engineering", salary: "₹8.75 LPA", variable: "10% Variable", offerDate: "15 May 2025", status: "Accepted", expiresOn: "–", daysLeft: "", avatar: "PS", avatarColor: "from-emerald-400 to-teal-500", score: 81 },
  { name: "Harshit Singh", exp: "5.1 yrs", role: "SRE Engineer", dept: "Engineering", salary: "₹15.50 LPA", variable: "15% Variable", offerDate: "14 May 2025", status: "Awaiting Approval", expiresOn: "24 May 2025", daysLeft: "4 days left", avatar: "HS", avatarColor: "from-green-400 to-emerald-500", score: 86 },
  { name: "Neha Patel", exp: "3.2 yrs", role: "HR Executive", dept: "HR", salary: "₹6.00 LPA", variable: "8% Variable", offerDate: "13 May 2025", status: "Pending", expiresOn: "23 May 2025", daysLeft: "3 days left", avatar: "NP", avatarColor: "from-rose-400 to-pink-500", score: 89 },
];

