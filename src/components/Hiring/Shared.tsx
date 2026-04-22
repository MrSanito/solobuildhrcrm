import * as React from 'react';

export function Avatar({ initials, gradient, size = "md" }: { initials: string; gradient: string; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "w-12 h-12 text-sm" : size === "sm" ? "w-7 h-7 text-[9px]" : "w-8 h-8 text-[10px]";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}


export function UrgencyBadge({ level }: { level: string }) {
  const map: Record<string, string> = { High: "bg-red-100 text-red-700", Medium: "bg-amber-100 text-amber-700", Low: "bg-gray-100 text-gray-600" };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${map[level] ?? "bg-gray-100 text-gray-600"}`}>{level}</span>;
}

export function PipelineBadge({ level }: { level: string }) {
  const map: Record<string, string> = { Strong: "text-green-600", Medium: "text-amber-600", Weak: "text-red-500" };
  const bars = level === "Strong" ? 3 : level === "Medium" ? 2 : 1;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((b) => (
        <div key={b} className={`h-2 w-4 rounded-sm ${b <= bars ? (level === "Strong" ? "bg-green-500" : level === "Medium" ? "bg-amber-400" : "bg-red-400") : "bg-gray-200"}`} />
      ))}
      <span className={`text-[10px] font-medium ${map[level]}`}>{level}</span>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700",
    "Awaiting Approval": "bg-blue-100 text-blue-700",
    Accepted: "bg-green-100 text-green-700",
    Declined: "bg-red-100 text-red-700",
    Scheduled: "bg-indigo-100 text-indigo-700",
    Rescheduled: "bg-orange-100 text-orange-700",
    Expired: "bg-gray-100 text-gray-500",
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${map[status] ?? "bg-gray-100 text-gray-600"}`}>{status}</span>;
}

