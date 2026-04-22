export const EMPLOYEES = [
  { id:1,  name:"Rahul Sharma",    role:"Backend Developer",    dept:"Engineering",     loc:"Bengaluru", status:"Active",    perf:4.6, tenure:5.6, emp:"EMP1256", email:"rahul.sharma@techsol.com",  phone:"+91 98765 43210", manager:"Vikram Rao",   joined:"01 Jan 2020", workLoc:"Bengaluru, India", empType:"Full Time", payGrade:"P3", bizUnit:"Product Development" },
  { id:2,  name:"Sneha Iyer",      role:"UI/UX Designer",       dept:"Design",          loc:"Bengaluru", status:"Active",    perf:4.3, tenure:4.8, emp:"EMP1342" },
  { id:3,  name:"Vikram Rao",      role:"DevOps Engineer",      dept:"Engineering",     loc:"Hyderabad", status:"Active",    perf:4.2, tenure:6.2, emp:"EMP1298" },
  { id:4,  name:"Neha Patel",      role:"Product Manager",      dept:"Product",         loc:"Bengaluru", status:"Active",    perf:4.4, tenure:3.9, emp:"EMP1503" },
  { id:5,  name:"Arjun Mehta",     role:"Data Analyst",         dept:"Analytics",       loc:"Pune",      status:"Probation", perf:3.8, tenure:1.2, emp:"EMP1421" },
  { id:6,  name:"Pooja Singh",     role:"QA Engineer",          dept:"Engineering",     loc:"Bengaluru", status:"Active",    perf:4.1, tenure:3.6, emp:"EMP1487" },
  { id:7,  name:"Harshit Singh",   role:"SRE Engineer",         dept:"Engineering",     loc:"Noida",     status:"Active",    perf:4.1, tenure:5.1, emp:"EMP1510" },
  { id:8,  name:"Kavya Nair",      role:"HR Executive",         dept:"Human Resources", loc:"Bengaluru", status:"Active",    perf:4.0, tenure:2.3, emp:"EMP1533" },
  { id:9,  name:"Rohit Verma",     role:"Finance Analyst",      dept:"Finance",         loc:"Mumbai",    status:"Active",    perf:4.2, tenure:4.9, emp:"EMP1320" },
  { id:10, name:"Megha Gupta",     role:"Marketing Specialist", dept:"Marketing",       loc:"Bengaluru", status:"Active",    perf:4.3, tenure:3.1, emp:"EMP1377" },
]

export const PERF_EMPLOYEES = [
  { id:1, name:"Rahul Sharma",  role:"Backend Developer",    dept:"Engineering",     manager:"Vikram Rao",    score:4.6, label:"Exceptional",        trend:0.4,  dir:"up",   lastReview:"20 May 2025" },
  { id:2, name:"Sneha Iyer",    role:"UI/UX Designer",       dept:"Design",          manager:"Ananya Singh",  score:4.3, label:"Exceeds",             trend:0.2,  dir:"up",   lastReview:"19 May 2025" },
  { id:3, name:"Vikram Rao",    role:"DevOps Engineer",      dept:"Engineering",     manager:"Ritesh Kumar",  score:4.2, label:"Exceeds",             trend:null, dir:"none", lastReview:"18 May 2025" },
  { id:4, name:"Neha Patel",    role:"Product Manager",      dept:"Product",         manager:"Manoj Kumar",   score:3.6, label:"Meets",               trend:0.1,  dir:"up",   lastReview:"17 May 2025" },
  { id:5, name:"Arjun Mehta",   role:"Data Analyst",         dept:"Analytics",       manager:"Priya Sharma",  score:2.1, label:"Needs Improvement",   trend:0.3,  dir:"down", lastReview:"16 May 2025" },
  { id:6, name:"Pooja Singh",   role:"QA Engineer",          dept:"Engineering",     manager:"Harshit Singh", score:1.8, label:"At Risk",             trend:0.2,  dir:"down", lastReview:"15 May 2025" },
  { id:7, name:"Kavya Nair",    role:"HR Executive",         dept:"Human Resources", manager:"Priya Sharma",  score:3.2, label:"Meets",               trend:null, dir:"none", lastReview:"14 May 2025" },
]

export const DOCUMENTS = [
  { id:1,  name:"Passport.pdf",            ftype:"PDF", size:"1.2 MB", cat:"Personal",   emp:"Rahul Sharma",  empId:"EMP1256", uploaded:"20 May 2025", by:"Rahul Sharma", expiry:"20 May 2030", expiryIn:"in 4 years",  status:"Valid",         docType:"Passport",  docId:"DOC456789" },
  { id:2,  name:"Offer Letter.pdf",        ftype:"PDF", size:"245 KB", cat:"Employment", emp:"Sneha Iyer",    empId:"EMP1342", uploaded:"19 May 2025", by:"Priya Sharma", expiry:"—",           expiryIn:"",           status:"Valid" },
  { id:3,  name:"Aadhaar Card.jpg",        ftype:"JPG", size:"1.1 MB", cat:"Personal",   emp:"Vikram Rao",    empId:"EMP1298", uploaded:"18 May 2025", by:"Vikram Rao",   expiry:"—",           expiryIn:"",           status:"Valid" },
  { id:4,  name:"UAN Card.pdf",            ftype:"PDF", size:"713 KB", cat:"Employment", emp:"Neha Patel",    empId:"EMP1503", uploaded:"16 May 2025", by:"Neha Patel",   expiry:"—",           expiryIn:"",           status:"Valid" },
  { id:5,  name:"PAN Card.pdf",            ftype:"PDF", size:"512 KB", cat:"Personal",   emp:"Arjun Mehta",   empId:"EMP1421", uploaded:"15 May 2025", by:"Arjun Mehta",  expiry:"—",           expiryIn:"",           status:"Valid" },
  { id:6,  name:"B.Tech Certificate.pdf",  ftype:"PDF", size:"2.4 MB", cat:"Education",  emp:"Pooja Singh",   empId:"EMP1487", uploaded:"14 May 2025", by:"Pooja Singh",  expiry:"—",           expiryIn:"",           status:"Valid" },
  { id:7,  name:"Training Completion.pdf", ftype:"PDF", size:"1.3 MB", cat:"Training",   emp:"Harshit Singh", empId:"EMP1510", uploaded:"12 May 2025", by:"System",       expiry:"—",           expiryIn:"",           status:"Valid" },
  { id:8,  name:"Driving License.pdf",     ftype:"PDF", size:"856 KB", cat:"Personal",   emp:"Kavya Nair",    empId:"EMP1533", uploaded:"10 May 2025", by:"Kavya Nair",   expiry:"10 May 2028", expiryIn:"in 3 years", status:"Valid" },
  { id:9,  name:"Medical Certificate.pdf", ftype:"PDF", size:"672 KB", cat:"Compliance", emp:"Rohit Verma",   empId:"EMP1320", uploaded:"08 May 2025", by:"System",       expiry:"08 Jun 2025", expiryIn:"in 18 days", status:"Expiring Soon" },
  { id:10, name:"Background Check.pdf",    ftype:"PDF", size:"1.6 MB", cat:"Compliance", emp:"Megha Gupta",   empId:"EMP1377", uploaded:"05 May 2025", by:"HR Team",      expiry:"25 May 2025", expiryIn:"in 5 days",  status:"Expired" },
]

export const DIST_DATA = [
  { name:"Exceptional (4.5–5.0)",          pct:"10%", count:128, color:"#15803d" },
  { name:"Exceeds Expectations (3.5–4.4)", pct:"41%", count:512, color:"#4ade80" },
  { name:"Meets Expectations (2.5–3.4)",   pct:"39%", count:488, color:"#60a5fa" },
  { name:"Needs Improvement (1.5–2.4)",    pct:"8%",  count:96,  color:"#fb923c" },
  { name:"Unsatisfactory (1.0–1.4)",       pct:"2%",  count:24,  color:"#f87171" },
]

export const TREND_DATA = [
  { m:"Jan", v:3.6 }, { m:"Feb", v:3.7 }, { m:"Mar", v:3.8 },
  { m:"Apr", v:3.9 }, { m:"May", v:4.0 }, { m:"Jun", v:4.1 },
]
