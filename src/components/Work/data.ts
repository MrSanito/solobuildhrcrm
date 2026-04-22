export interface DayData { present?: number; leaves?: number; allocations?: number; }

export const calData: Record<string, DayData> = {
  w27:{ present:12 }, w28:{ present:18 }, w29:{ present:17, leaves:1 }, w30:{ present:19 }, d1:{ present:20 },
  d4:{ allocations:4 }, d5:{ present:16, leaves:1, allocations:7 }, d6:{ present:18, allocations:2 },
  d7:{ present:19, leaves:2, allocations:6 }, d8:{ present:17 }, d9:{ present:20, allocations:3 },
  d11:{}, d12:{ present:18, leaves:3 }, d13:{ present:18, allocations:5 }, d14:{ present:20, allocations:6 },
  d15:{ present:19 }, d16:{ present:18, leaves:1 },
  d18:{}, d19:{ present:17, allocations:4 }, d20:{ present:18, leaves:2 },
  d21:{ present:19, allocations:6, leaves:2 },
  d22:{ present:20, allocations:7 }, d23:{ present:19 },
  d25:{ present:18, allocations:5 }, d26:{ present:17 }, e28:{ present:18, leaves:1 },
  e29:{ present:19 }, e30:{ present:20, allocations:6 },
};

export const weeks: { key: string; label: string; ghost?: boolean }[][] = [
  [
    { key:"w27", label:"27", ghost:true }, { key:"w28", label:"28", ghost:true },
    { key:"w29", label:"29", ghost:true }, { key:"w30", label:"30", ghost:true },
    { key:"d1",  label:"1"  }, { key:"d2",  label:"2"  }, { key:"d3",  label:"3"  },
  ],
  [
    { key:"d4",  label:"4"  }, { key:"d5",  label:"5"  }, { key:"d6",  label:"6"  },
    { key:"d7",  label:"7"  }, { key:"d8",  label:"8"  }, { key:"d9",  label:"9"  }, { key:"d10", label:"10" },
  ],
  [
    { key:"d11", label:"11" }, { key:"d12", label:"12" }, { key:"d13", label:"13" },
    { key:"d14", label:"14" }, { key:"d15", label:"15" }, { key:"d16", label:"16" }, { key:"d17", label:"17" },
  ],
  [
    { key:"d18", label:"18" }, { key:"d19", label:"19" }, { key:"d20", label:"20" },
    { key:"d21", label:"21" }, { key:"d22", label:"22" }, { key:"d23", label:"23" }, { key:"d24", label:"24" },
  ],
  [
    { key:"d25", label:"25" }, { key:"d26", label:"26" }, { key:"d27", label:"27" },
    { key:"e28", label:"28", ghost:true }, { key:"e29", label:"29", ghost:true },
    { key:"e30", label:"30", ghost:true }, { key:"e31", label:"31", ghost:true },
  ],
];

export const presentEmployees = [
  { name:"Rahul Sharma",  role:"Backend Developer",   time:"In: 09:01 AM", initials:"RS", bg:"#6366f1" },
  { name:"Sneha Iyer",    role:"UI/UX Designer",       time:"In: 09:05 AM", initials:"SI", bg:"#ec4899" },
  { name:"Vikram Rao",    role:"DevOps Engineer",      time:"In: 09:10 AM", initials:"VR", bg:"#14b8a6" },
  { name:"Neha Patel",    role:"Product Manager",      time:"In: 09:15 AM", initials:"NP", bg:"#8b5cf6" },
  { name:"Arjun Mehta",   role:"Data Analyst",         time:"In: 09:22 AM", initials:"AM", bg:"#f59e0b" },
];

export const allocations = [
  { name:"Rahul Sharma",  project:"HRMS Implementation",      role:"Backend Developer",   pct:100, bg:"#6366f1" },
  { name:"Sneha Iyer",    project:"Mobile App Redesign",       role:"UI/UX Designer",      pct:80,  bg:"#ec4899" },
  { name:"Vikram Rao",    project:"Visual Migration",          role:"DevOps Engineer",     pct:110, bg:"#f59e0b" },
  { name:"Neha Patel",    project:"Product Launch",            role:"Product Manager",     pct:70,  bg:"#22c55e" },
  { name:"Arjun Mehta",   project:"Data Analytics Platform",   role:"Data Analyst",        pct:60,  bg:"#3b82f6" },
  { name:"Pooja Singh",   project:"QA Automation",             role:"QA Engineer",         pct:50,  bg:"#a855f7" },
];

export const leaveEmployees = [
  { name:"Ananya Singh",  role:"",              type:"Casual Leave", sub:"Full Day",      initials:"AS", bg:"#22c55e", status:"Pending" },
  { name:"Harshit Singh", role:"QA Engineer",   type:"Sick Leave",   sub:"Half Day (PM)", initials:"HS", bg:"#f97316", status:"Pending" },
];

export const priorities = [
  { label:"Critical",      count:6,  sub:"Requires immediate action", color:"text-red-500",    bg:"bg-red-50",     icon:"🔴", border:"border-red-200",    extra:false },
  { label:"High Priority", count:10, sub:"Action needed this week",   color:"text-orange-500", bg:"bg-orange-50",  icon:"🟠", border:"border-orange-200", extra:false },
  { label:"Medium Priority",count:8, sub:"Important but not urgent",  color:"text-blue-500",   bg:"bg-blue-50",    icon:"🔵", border:"border-blue-200",   extra:false },
  { label:"Low Priority",  count:4,  sub:"For awareness",             color:"text-green-500",  bg:"bg-green-50",   icon:"🟢", border:"border-green-200",  extra:false },
  { label:"Automatable",   count:12, sub:"Can be auto-resolved",      color:"text-violet-500", bg:"bg-violet-50",  icon:"🤖", border:"border-violet-200", extra:true  },
];

export const todayItems = [
  {
    icon:"🔴", title:"Approve Leave Request",    sub:"Casual Leave - 2 Days",
    type:"Approval",   typeC:"bg-green-100 text-green-700",
    who:"Ananya Singh",    emp:"EMP1487", initials:"AS", avatarBg:"#22c55e",
    why:"Leave request submitted 19 May 2025",
    impact:"High",   impC:"bg-red-100 text-red-600",
    due:"Today 10:00 AM", dueC:"text-red-500 font-semibold",
    overdue:false,
  },
  {
    icon:"🟠", title:"Role Assessment Needed",   sub:"Data Analyst Pipeline",
    type:"Assessment", typeC:"bg-blue-100 text-blue-700",
    who:"Pipeline Bot", emp:"AI-SYSTEM", initials:"AI", avatarBg:"#6366f1",
    why:"3 candidates reached technical threshold",
    impact:"Medium", impC:"bg-orange-100 text-orange-600",
    due:"Today 02:30 PM", dueC:"text-gray-600",
    overdue:false,
  },
  {
    icon:"🔴", title:"Payroll Verification",     sub:"May 2025 Cycle",
    type:"Compliance", typeC:"bg-amber-100 text-amber-700",
    who:"Finance Team", emp:"DEPT-FIN", initials:"FI", avatarBg:"#10b981",
    why:"4 exceptions detected in attendance logs",
    impact:"Critical", impC:"bg-red-100 text-red-600",
    due:"Today 11:59 PM", dueC:"text-red-500 font-semibold",
    overdue:false,
  },
  {
    icon:"🔴", title:"Resolve Attendance Gap",   sub:"Vikram Rao",
    type:"Anomaly",    typeC:"bg-red-100 text-red-700",
    who:"Vikram Rao",      emp:"EMP1522", initials:"VR", avatarBg:"#14b8a6",
    why:"Missed punch-out on 20 May 2025",
    impact:"Low",    impC:"bg-orange-100 text-orange-600",
    due:"Yesterday 06:00 PM", dueC:"text-red-600 font-bold",
    overdue:true,
  },
];
