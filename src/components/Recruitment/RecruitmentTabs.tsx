import React from "react";

export const RECRUITMENT_TABS = [
  "Job Roles",
  "Resume Screening",
  "Candidate Pipeline",
  "Interviews",
  "Offers",
  "Hiring Intelligence",
  "Source Analytics",
  "Talent Pool",
  "Reports & Diagnostics"
];

interface Props {
  activeTab: string;
  setActiveTab: (t: string) => void;
  onNavigate: (p: string) => void;
}

export default function RecruitmentTabs({ activeTab, setActiveTab, onNavigate }: Props) {
  return (
    <div className="flex gap-0 border-b border-gray-200 bg-white rounded-t-xl px-4 pt-2 -mb-1 shadow-sm overflow-x-auto scrollbar-hide">
      {RECRUITMENT_TABS.map(tab=>(
        <button
          key={tab}
          onClick={()=> { 
            setActiveTab(tab); 
            if(tab==="Resume Screening") onNavigate("resumescreening"); 
          }}
          className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTab===tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
