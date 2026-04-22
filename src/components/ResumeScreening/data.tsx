import React from "react";

export const candidates = [
  { name:"Rohit Sharma",  email:"rohit.sharma@email.com",  job:"Backend Developer", score:92, cat:"Best Match",  exp:"5.3 Yrs", match:89, catColor:"bg-green-100 text-green-700"  },
  { name:"Sneha Iyer",    email:"sneha.iyer@email.com",    job:"Backend Developer", score:78, cat:"Potential",   exp:"3.8 Yrs", match:72, catColor:"bg-amber-100 text-amber-700"  },
  { name:"Vikram Rao",    email:"vikram.rao@email.com",    job:"Backend Developer", score:75, cat:"Potential",   exp:"6.1 Yrs", match:68, catColor:"bg-amber-100 text-amber-700"  },
  { name:"Aisha Khan",    email:"aisha.khan@email.com",    job:"Backend Developer", score:68, cat:"Not a Fit",   exp:"1.9 Yrs", match:42, catColor:"bg-red-100 text-red-600"      },
  { name:"Karan Mehta",   email:"karan.mehta@email.com",   job:"Backend Developer", score:30, cat:"Not a Fit",   exp:"0.8 Yrs", match:28, catColor:"bg-red-100 text-red-600"      },
  { name:"Priya Nair",    email:"priya.nair@email.com",    job:"Backend Developer", score:85, cat:"Best Match",  exp:"4.6 Yrs", match:83, catColor:"bg-green-100 text-green-700"  },
  { name:"Arjun Singh",   email:"arjun.mehta@email.com",   job:"Backend Developer", score:71, cat:"Potential",   exp:"2.5 Yrs", match:66, catColor:"bg-amber-100 text-amber-700"  },
  { name:"Manish Gupta",  email:"manish.gupta@email.com",  job:"Backend Developer", score:29, cat:"Not a Fit",   exp:"1.2 Yrs", match:25, catColor:"bg-red-100 text-red-600"      },
];

export const aiSteps = [
  { n:1, icon:"📄", title:"1. Resume Parsing",     desc:"Extract text, skills, experience & education" },
  { n:2, icon:"🔍", title:"2. Data Understanding", desc:"Understand context, roles, tech stack & level" },
  { n:3, icon:"📊", title:"3. Match Scoring",      desc:"Score against job requirements and must-have parameters" },
  { n:4, icon:"🎯", title:"4. Potential Analysis", desc:"Evaluate learnability, growth potential & adaptability" },
  { n:5, icon:"📋", title:"5. Categorization",     desc:"Best Match / Potential / Not a Fit" },
];

export const scoreColor = (s: number) =>
  s >= 80 ? "#22c55e" : s >= 60 ? "#f59e0b" : "#ef4444";

export function MatchBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-medium text-gray-700 w-8 text-right">{pct}%</span>
    </div>
  );
}

export const DETAIL_TABS = ["AI Summary","Skills Match","Experience","Education","Resume","Notes"];
