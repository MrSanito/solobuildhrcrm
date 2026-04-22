"use client";

import React, { useState } from "react";
import { Brain, Plus } from "lucide-react";

import JobRoles from "./JobRoles";
import ResumeScreening from "./ResumeScreening";
import RecruitmentTabs from "../components/Recruitment/RecruitmentTabs";

export default function Recruitment({ onNavigate, initialTab }:{onNavigate:(p:string)=>void, initialTab?: string}) {
  const [activeTab, setActiveTab] = useState(
    initialTab === "job-roles" ? "Job Roles" : 
    initialTab === "candidate-pipeline" ? "Candidate Pipeline" : 
    initialTab === "resumescreening" ? "Resume Screening" :
    "Job Roles"
  );

  return (
    <div className="p-6 space-y-5 min-h-full bg-gray-50 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Recruitment</h1>
          <p className="text-sm text-gray-500 mt-0.5">Attract, evaluate and hire the best talent.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-blue-500 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm">
            <Brain size={15}/> AI Hiring Intelligence
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md">
            <Plus size={15}/> Create Job Opening
          </button>
        </div>
      </div>

      <RecruitmentTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNavigate={onNavigate} 
      />

      {/* Dynamic Content */}
      <div className="pt-2">
        {activeTab === "Job Roles" && <JobRoles />}
        {activeTab === "Resume Screening" && <ResumeScreening />}
        {activeTab === "Candidate Pipeline" && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Candidate Pipeline</h3>
            <p className="text-sm mt-1 text-gray-400">This module is under construction.</p>
          </div>
        )}
      </div>
    </div>
  );
}