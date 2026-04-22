"use client";
import React from "react";
import JobStats from "../components/JobRoles/JobStats";
import JobRolesGrid from "../components/JobRoles/JobRolesGrid";

export default function JobRoles() {
  return (
    <div className="space-y-4">
      <JobStats />
      <JobRolesGrid />
    </div>
  );
}