import { 
  Users, TrendingUp, TrendingDown, Clock, IndianRupee, BarChart2, FileText, Zap, Calendar
} from "lucide-react";

export type ReportCategory = "Workforce" | "Hiring" | "Attendance" | "Performance" | "Finance" | "Compliance";

export const headcountTrend = [
  { date: "21 May", value: 1156 },
  { date: "28 May", value: 1172 },
  { date: "4 Jun", value: 1168 },
  { date: "11 Jun", value: 1196 },
  { date: "18 Jun", value: 1248 },
];

export const attritionTrend = [
  { date: "21 May", rate: 10.5 },
  { date: "28 May", rate: 10.1 },
  { date: "4 Jun", rate: 9.8 },
  { date: "11 Jun", rate: 9.6 },
  { date: "18 Jun", rate: 9.3 },
  { date: "21 Jun", rate: 9.0 },
];

export const deptData = [
  { name: "Engineering", value: 432, pct: "34.6%", color: "#6366f1" },
  { name: "Sales", value: 268, pct: "21.5%", color: "#f59e0b" },
  { name: "Operations", value: 214, pct: "17.1%", color: "#22c55e" },
  { name: "HR", value: 119, pct: "9.5%", color: "#3b82f6" },
  { name: "Finance", value: 84, pct: "6.7%", color: "#ec4899" },
  { name: "Others", value: 131, pct: "10.8%", color: "#94a3b8" },
];

export const genderData = [
  { name: "Male", value: 762, pct: "62.2%", color: "#6366f1" },
  { name: "Female", value: 382, pct: "30.6%", color: "#ec4899" },
  { name: "Other", value: 104, pct: "8%", color: "#94a3b8" },
];

export const reportsList = [
  { name: "Employee Summary Report", category: "Workforce", categoryColor: "bg-indigo-100 text-indigo-700", desc: "Overall employee summary and demographics", lastGenerated: "20 Jun 2025, 06:15 PM", by: "Priya Sharma", format: "PDF" },
  { name: "Attrition Analysis Report", category: "Workforce", categoryColor: "bg-indigo-100 text-indigo-700", desc: "Attrition rate and trend analysis", lastGenerated: "20 Jun 2025, 05:40 PM", by: "Anit Verma", format: "XLSX" },
  { name: "Hiring Funnel Report", category: "Hiring", categoryColor: "bg-green-100 text-green-700", desc: "Hiring pipeline and conversion analysis", lastGenerated: "20 Jun 2025, 04:20 PM", by: "Priya Sharma", format: "PDF" },
  { name: "Attendance Summary Report", category: "Attendance", categoryColor: "bg-orange-100 text-orange-700", desc: "Attendance %, leaves and overtime summary", lastGenerated: "19 Jun 2025, 03:10 PM", by: "System", format: "XLSX" },
  { name: "Performance Summary Report", category: "Performance", categoryColor: "bg-blue-100 text-blue-700", desc: "Performance ratings and distribution", lastGenerated: "18 Jun 2025, 06:33 PM", by: "Anit Verma", format: "PDF" },
  { name: "Payroll Summary Report", category: "Finance", categoryColor: "bg-amber-100 text-amber-700", desc: "Payroll summary and variance analysis", lastGenerated: "18 Jun 2025, 05:05 PM", by: "System", format: "XLSX" },
  { name: "Cost vs Output Report", category: "Finance", categoryColor: "bg-amber-100 text-amber-700", desc: "Cost efficiency and output analysis", lastGenerated: "17 Jun 2025, 04:50 PM", by: "Priya Sharma", format: "PDF" },
  { name: "Compliance Status Report", category: "Compliance", categoryColor: "bg-red-100 text-red-700", desc: "Compliance status and violation summary", lastGenerated: "17 Jun 2025, 04:00 PM", by: "Anit Verma", format: "PDF" },
];

export const recentlyViewed = [
  { name: "Employee Summary Report", at: "20 Jun 2025, 06:15 PM", by: "Priya Sharma", icon: "👥" },
  { name: "Attrition Analysis Report", at: "20 Jun 2025, 05:40 PM", by: "Anit Verma", icon: "📉" },
  { name: "Payroll Summary Report", at: "18 Jun 2025, 05:05 PM", by: "System", icon: "💰" },
  { name: "Compliance Status Report", at: "17 Jun 2025, 04:00 PM", by: "Anit Verma", icon: "🛡️" },
];

export const savedTemplates = [
  { name: "Monthly Headcount", tags: "Workforce" },
  { name: "Department Scorecard", tags: "Performance, Attendance" },
  { name: "Compliance Overview Template", tags: "Compliance" },
  { name: "Hiring, Workforce", tags: "Hiring, Workforce" },
];

export const reportCategoriesData = [
  { name: "Workforce", value: 8, pct: "33%", color: "#6366f1" },
  { name: "Hiring", value: 3, pct: "13%", color: "#22c55e" },
  { name: "Attendance", value: 3, pct: "13%", color: "#f97316" },
  { name: "Performance", value: 3, pct: "13%", color: "#3b82f6" },
  { name: "Finance", value: 3, pct: "13%", color: "#f59e0b" },
  { name: "Compliance", value: 2, pct: "8%", color: "#ef4444" },
  { name: "Others", value: 2, pct: "8%", color: "#94a3b8" },
];

export const generationTrend = [
  { month: "Jan 25", count: 12 },
  { month: "Feb 25", count: 18 },
  { month: "Mar 25", count: 21 },
  { month: "Apr 25", count: 19 },
  { month: "May 25", count: 34 },
];

export const formatData = [
  { name: "PDF", value: 60, color: "#ef4444" },
  { name: "XLSX", value: 33, color: "#22c55e" },
  { name: "CSV", value: 7, color: "#6366f1" },
];

export const scheduledReports = [
  { name: "Monthly Management Dashboard", schedule: "Monthly (1st of every month)", nextRun: "01 Jul 2025, 09:00 AM", recipients: 5, format: "PDF", status: "Active" },
  { name: "Attendance Summary Report", schedule: "Weekly (Every Monday)", nextRun: "23 Jun 2025, 09:00 AM", recipients: 3, format: "XLSX", status: "Active" },
  { name: "Payroll Summary Report", schedule: "Monthly (Last day of month)", nextRun: "30 Jun 2025, 06:00 PM", recipients: 4, format: "XLSX", status: "Active" },
  { name: "Compliance Status Report", schedule: "Monthly (1st of every month)", nextRun: "01 Jul 2025, 10:00 AM", recipients: 6, format: "PDF", status: "Active" },
];

export const categoryTabs: { name: ReportCategory; icon: string; desc: string }[] = [
  { name: "Workforce", icon: "👥", desc: "Headcount, attrition, demographics" },
  { name: "Hiring", icon: "🎯", desc: "Hiring trend, source, time to hire" },
  { name: "Attendance", icon: "📅", desc: "Attendance %, leaves, overtime" },
  { name: "Performance", icon: "⭐", desc: "Ratings, distribution, trends" },
  { name: "Finance", icon: "💰", desc: "Payroll, expenses, cost analysis" },
];

export const kpiData = [
  { label: "Total Employees", value: "1,248", change: "▲ 2.4% vs last period", up: true, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "New Hires", value: "48", change: "▲ 12.5% vs last period", up: true, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  { label: "Attrition Rate", value: "9.3%", change: "▼ 1.2% vs last period", up: false, icon: TrendingDown, color: "text-red-600", bg: "bg-red-50" },
  { label: "Avg. Tenure", value: "3.6 Yrs", change: "▲ 0.3 yrs vs last period", up: true, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Total Payroll (INR)", value: "₹1,24,58,760", change: "▲ 4.38% vs last period", up: false, icon: IndianRupee, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Cost per Employee", value: "₹99,962", change: "▲ 3.21% vs last period", up: false, icon: BarChart2, color: "text-teal-600", bg: "bg-teal-50" },
];

export const reportStats = [
  { label: "Reports this month", value: "34", icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "% of total reports", value: "18%", icon: BarChart2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Reports generated on", value: "→ last month", icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Unique auto-generated reports", value: "32", icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
];
