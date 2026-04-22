import { 
  CreditCard, Wallet, Receipt, Briefcase
} from "lucide-react";

export const payrollTrend = [
  { month: "Jan", amount: 420000, tax: 65000 },
  { month: "Feb", amount: 435000, tax: 68000 },
  { month: "Mar", amount: 450000, tax: 70000 },
  { month: "Apr", amount: 480000, tax: 75000 },
  { month: "May", amount: 510000, tax: 80000 },
  { month: "Jun", amount: 525000, tax: 82000 },
];

export const expenseCategoryData = [
  { name: "Salaries", value: 525000, color: "#6366f1" },
  { name: "Benefits", value: 125000, color: "#10b981" },
  { name: "Overhead", value: 85000, color: "#f59e0b" },
  { name: "Marketing", value: 65000, color: "#ec4899" },
  { name: "Others", value: 35000, color: "#94a3b8" },
];

export const upcomingPayments = [
  { id: "P-1002", description: "Monthly Salary Disbursement", category: "Payroll", amount: "₹4,25,000", dueDate: "01 Jul 2025", status: "Scheduled", priority: "High" },
  { id: "P-1003", description: "Office Rent - Q3", category: "Infrastructure", amount: "₹85,000", dueDate: "05 Jul 2025", status: "Pending", priority: "Medium" },
  { id: "P-1004", description: "Cloud Infrastructure Bills", category: "IT Ops", amount: "₹42,500", dueDate: "10 Jul 2025", status: "Awaiting Approval", priority: "High" },
  { id: "P-1005", description: "Employee Reimbursements", category: "Perks", amount: "₹12,800", dueDate: "15 Jul 2025", status: "Scheduled", priority: "Low" },
];

export const budgetData = [
  { dept: "Engineering", allocated: 500000, spent: 425000 },
  { dept: "Marketing", allocated: 150000, spent: 142000 },
  { dept: "Sales", allocated: 200000, spent: 185000 },
  { dept: "Product", allocated: 120000, spent: 118000 },
  { dept: "HR", allocated: 80000, spent: 72000 },
];

export const kpis = [
  { label: "Total Disbursement", value: "₹24.8L", sub: "+12.5% vs Q1", trend: "up", icon: Wallet, color: "indigo" },
  { label: "Avg. Employee Cost", value: "₹72,400", sub: "Stable flow", trend: "stable", icon: Briefcase, color: "emerald" },
  { label: "Tax Liability", value: "₹4.12L", sub: "+₹18k this month", trend: "up", icon: Receipt, color: "amber" },
  { label: "Pending Claims", value: "₹18,500", sub: "5 claims awaiting", trend: "down", icon: CreditCard, color: "rose" },
];

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    "Scheduled": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Pending": "bg-amber-50 text-amber-700 border-amber-200",
    "Awaiting Approval": "bg-blue-50 text-blue-700 border-blue-200",
  };
  return map[s] || "bg-gray-50 text-gray-700 border-gray-200";
};
