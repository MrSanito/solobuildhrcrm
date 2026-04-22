"use client";

import React, { useState } from "react";
import SidebarLayout from "./SidebarLayout";
import Dashboard from "./Dashboard";
import Recruitment from "./Recruitment";
import ResumeScreening from "./ResumeScreening";
import Hiring from "./Hiring";
import People from "./People";
import Work from "./Work";
import Compliance from "./Compliance";
import Finance from "./Finance";
import Reports from "./Reports";
import ControlCenter from "./ControlCenter";

type Page =
  | "dashboard"
  | "recruitment"
  | "job-roles"
  | "resumescreening"
  | "candidate-pipeline"
  | "interviews"
  | "offers"
  | "hiring-intelligence-rec"
  | "source-analytics"
  | "talent-pool"
  | "reports-diagnostics"
  | "compliance"
  | "finance"
  | "reports"
  | string;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  React.useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      console.error("GLOBAL ERROR:", e.message);
      alert("ERROR DETECTED: " + e.message);
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  const renderPage = () => {
    console.log("Rendering page for state:", currentPage);
    // Removed standalone Resume Screening route, it is now handled by Recruitment
    if (currentPage === "dashboard") {
      return <Dashboard />;
    }

    if (currentPage === "hiring") {
      return <Hiring />;
    }

    if (currentPage === "people") {
      return <People />;
    }
    if (currentPage === "work") {
      return <Work />;
    }
    if (currentPage === "compliance") {
      return <Compliance />;
    }
    if (currentPage === "finance") {
      return <Finance />;
    }
    if (currentPage === "reports") {
      return <Reports />;
    }
    if (currentPage === "control-center") {
      return <ControlCenter />;
    }

    // List of recruitment-related sub-pages
    const recruitmentPages = [
      "recruitment",
      "job-roles",
      "candidate-pipeline",
      "resumescreening",
      "interviews",
      "offers",
      "hiring-intelligence-rec",
      "source-analytics",
      "talent-pool",
      "reports-diagnostics"
    ];

    if (recruitmentPages.includes(currentPage)) {
      return <Recruitment onNavigate={setCurrentPage} initialTab={currentPage} />;
    }

    // Placeholder for other pages
    return (
      <div className="flex items-center justify-center h-full min-h-96">
        <div className="text-center">
          <div className="text-4xl mb-3">🚧</div>
          <h2 className="text-lg font-semibold text-gray-700 capitalize">
            {currentPage.replace(/-/g, " ")}
          </h2>
          <p className="text-sm text-gray-400 mt-1">This page is under construction.</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <SidebarLayout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </SidebarLayout>
    </>
  );
}