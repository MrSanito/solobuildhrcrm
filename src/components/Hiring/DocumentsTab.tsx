"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  FileText,
  File,
  Image,
  Shield,
  Maximize2,
  Share2,
  Upload,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
type DocDetailTab = "Overview" | "Activity" | "Approvals" | "Versions";

/* ─── Mock Data ─────────────────────────────────────────── */
const docKpis = [
  { label: "Total Documents", value: "4,256", change: "▲ 145 vs last month", up: true, icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Expiring Soon (30 Days)", value: "128", change: "▲ 12 vs last month", up: false, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Expired Documents", value: "23", change: "▼ 5 vs last month", up: false, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  { label: "Compliance Rate", value: "92%", change: "▲ 4% vs last month", up: true, icon: Shield, color: "text-green-600", bg: "bg-green-50" },
  { label: "Pending Approvals", value: "34", change: "▼ 6 vs last month", up: false, icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Documents per Employee", value: "3.4", change: "▲ 0.3 vs last month", up: true, icon: File, color: "text-teal-600", bg: "bg-teal-50" },
];

const subTabs = [
  { label: "All Documents", count: 4256 },
  { label: "Personal", count: 1236 },
  { label: "Employment", count: 1456 },
  { label: "Compliance", count: 892 },
  { label: "Training", count: 672 },
];

type DocStatus = "Valid" | "Expiring Soon" | "Expired";

interface Doc {
  name: string;
  ext: string;
  size: string;
  iconColor: string;
  category: string;
  categoryColor: string;
  employee: string;
  empId: string;
  avatarInitials: string;
  avatarGradient: string;
  uploadedOn: string;
  uploadedBy: string;
  expiryDate: string | null;
  expiryLabel: string | null;
  expiryColor: string | null;
  status: DocStatus;
  type: string;
  fileSize: string;
  docId: string;
}

const documents: Doc[] = [
  { name: "Passport.pdf", ext: "PDF", size: "1.2 MB", iconColor: "bg-red-100 text-red-500", category: "Personal", categoryColor: "bg-purple-100 text-purple-700", employee: "Rahul Sharma", empId: "EMP1256", avatarInitials: "RS", avatarGradient: "from-indigo-500 to-purple-600", uploadedOn: "20 May 2025", uploadedBy: "Rahul Sharma", expiryDate: "20 May 2030", expiryLabel: "in 4 years", expiryColor: "text-gray-500", status: "Valid", type: "Passport", fileSize: "1.2 MB", docId: "DOC456789" },
  { name: "Offer Letter.pdf", ext: "PDF", size: "245 KB", iconColor: "bg-blue-100 text-blue-500", category: "Employment", categoryColor: "bg-blue-100 text-blue-700", employee: "Sneha Iyer", empId: "EMP1342", avatarInitials: "SI", avatarGradient: "from-pink-400 to-rose-500", uploadedOn: "19 May 2025", uploadedBy: "Priya Sharma", expiryDate: null, expiryLabel: null, expiryColor: null, status: "Valid", type: "Offer Letter", fileSize: "245 KB", docId: "DOC456790" },
  { name: "Aadhaar Card.jpg", ext: "JPG", size: "1.1 MB", iconColor: "bg-amber-100 text-amber-500", category: "Personal", categoryColor: "bg-purple-100 text-purple-700", employee: "Vikram Rao", empId: "EMP1298", avatarInitials: "VR", avatarGradient: "from-blue-500 to-indigo-600", uploadedOn: "18 May 2025", uploadedBy: "Vikram Rao", expiryDate: null, expiryLabel: null, expiryColor: null, status: "Valid", type: "ID Card", fileSize: "1.1 MB", docId: "DOC456791" },
  { name: "UAN Card.pdf", ext: "PDF", size: "713 KB", iconColor: "bg-blue-100 text-blue-500", category: "Employment", categoryColor: "bg-blue-100 text-blue-700", employee: "Neha Patel", empId: "EMP1503", avatarInitials: "NP", avatarGradient: "from-rose-400 to-pink-500", uploadedOn: "16 May 2025", uploadedBy: "Neha Patel", expiryDate: null, expiryLabel: null, expiryColor: null, status: "Valid", type: "UAN Card", fileSize: "713 KB", docId: "DOC456792" },
  { name: "PAN Card.pdf", ext: "PDF", size: "512 KB", iconColor: "bg-red-100 text-red-500", category: "Personal", categoryColor: "bg-purple-100 text-purple-700", employee: "Arjun Mehta", empId: "EMP1421", avatarInitials: "AM", avatarGradient: "from-violet-400 to-purple-500", uploadedOn: "15 May 2025", uploadedBy: "Arjun Mehta", expiryDate: null, expiryLabel: null, expiryColor: null, status: "Valid", type: "PAN Card", fileSize: "512 KB", docId: "DOC456793" },
  { name: "B.Tech Certificate.pdf", ext: "PDF", size: "2.4 MB", iconColor: "bg-amber-100 text-amber-500", category: "Education", categoryColor: "bg-amber-100 text-amber-700", employee: "Pooja Singh", empId: "EMP1487", avatarInitials: "PS", avatarGradient: "from-emerald-400 to-teal-500", uploadedOn: "14 May 2025", uploadedBy: "Pooja Singh", expiryDate: null, expiryLabel: null, expiryColor: null, status: "Valid", type: "Certificate", fileSize: "2.4 MB", docId: "DOC456794" },
  { name: "Training Completion.pdf", ext: "PDF", size: "1.3 MB", iconColor: "bg-green-100 text-green-500", category: "Training", categoryColor: "bg-green-100 text-green-700", employee: "Harshit Singh", empId: "EMP1510", avatarInitials: "HS", avatarGradient: "from-green-400 to-emerald-500", uploadedOn: "12 May 2025", uploadedBy: "System", expiryDate: null, expiryLabel: null, expiryColor: null, status: "Valid", type: "Certificate", fileSize: "1.3 MB", docId: "DOC456795" },
  { name: "Driving License.pdf", ext: "PDF", size: "856 KB", iconColor: "bg-blue-100 text-blue-500", category: "Personal", categoryColor: "bg-purple-100 text-purple-700", employee: "Kavya Nair", empId: "EMP1533", avatarInitials: "KN", avatarGradient: "from-teal-400 to-cyan-500", uploadedOn: "10 May 2025", uploadedBy: "Kavya Nair", expiryDate: "10 May 2028", expiryLabel: "in 3 years", expiryColor: "text-gray-500", status: "Valid", type: "Driving License", fileSize: "856 KB", docId: "DOC456796" },
  { name: "Medical Certificate.pdf", ext: "PDF", size: "672 KB", iconColor: "bg-orange-100 text-orange-500", category: "Compliance", categoryColor: "bg-red-100 text-red-700", employee: "Rohit Verma", empId: "EMP1320", avatarInitials: "RV", avatarGradient: "from-orange-400 to-amber-500", uploadedOn: "08 May 2025", uploadedBy: "System", expiryDate: "08 Jun 2025", expiryLabel: "in 18 days", expiryColor: "text-orange-500", status: "Expiring Soon", type: "Medical Certificate", fileSize: "672 KB", docId: "DOC456797" },
  { name: "Background Check.pdf", ext: "PDF", size: "1.6 MB", iconColor: "bg-blue-100 text-blue-500", category: "Compliance", categoryColor: "bg-red-100 text-red-700", employee: "Megha Gupta", empId: "EMP1377", avatarInitials: "MG", avatarGradient: "from-amber-400 to-yellow-500", uploadedOn: "05 May 2025", uploadedBy: "HR Team", expiryDate: "25 May 2025", expiryLabel: "in 5 days", expiryColor: "text-red-500", status: "Expired", type: "Background Check", fileSize: "1.6 MB", docId: "DOC456798" },
];

/* ─── Helpers ────────────────────────────────────────────── */
function StatusBadge({ status }: { status: DocStatus }) {
  const map: Record<DocStatus, string> = {
    "Valid": "bg-green-50 text-green-700 border border-green-200",
    "Expiring Soon": "bg-amber-50 text-amber-700 border border-amber-200",
    "Expired": "bg-red-50 text-red-600 border border-red-200",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${map[status]}`}>
      {status}
    </span>
  );
}

function Avatar({ initials, gradient }: { initials: string; gradient: string }) {
  return (
    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-[9px] font-bold shrink-0`}>
      {initials}
    </div>
  );
}

/* ─── Document Detail Panel ─────────────────────────────── */
function DocumentDetailPanel({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<DocDetailTab>("Overview");

  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl ${doc.iconColor} flex items-center justify-center shrink-0`}>
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-gray-900">{doc.name}</h3>
              <StatusBadge status={doc.status} />
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">{doc.category} Document</p>
            <p className="text-[10px] text-gray-500 font-medium">{doc.employee} ({doc.empId})</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 shrink-0">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Detail Tabs */}
      <div className="flex border-b border-gray-100">
        {(["Overview", "Activity", "Approvals", "Versions"] as DocDetailTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`text-[11px] font-medium py-2 px-3 border-b-2 transition -mb-px whitespace-nowrap ${activeTab === t ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <>
          {/* Metadata */}
          <div className="flex flex-col gap-0">
            {[
              { label: "Document Name", value: doc.name },
              { label: "Category", value: doc.category },
              { label: "Document Type", value: doc.type },
              { label: "Uploaded By", value: doc.uploadedBy },
              { label: "Uploaded On", value: `${doc.uploadedOn}, 10:30 AM` },
              { label: "Expiry Date", value: doc.expiryDate ? `${doc.expiryDate} (${doc.expiryLabel})` : "—", valueClass: doc.expiryColor ?? "" },
              { label: "File Size", value: doc.fileSize },
              { label: "Document ID", value: doc.docId },
              { label: "Status", value: doc.status, isStatus: true },
            ].map((row) => (
              <div key={row.label} className="flex items-start py-2 border-b border-gray-50 last:border-0">
                <span className="text-[11px] text-gray-400 w-32 shrink-0">{row.label}</span>
                {row.isStatus ? (
                  <StatusBadge status={doc.status} />
                ) : (
                  <span className={`text-[11px] font-medium text-gray-800 ${row.valueClass}`}>{row.value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Preview */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Preview</p>
            <div className="flex gap-3">
              {/* Passport thumbnail placeholder */}
              <div className="w-24 h-28 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 flex flex-col items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-amber-400/20 border-2 border-amber-300/40 flex items-center justify-center mb-1">
                  <Shield className="w-5 h-5 text-amber-300/70" />
                </div>
                <p className="text-[8px] text-slate-300 font-semibold tracking-widest text-center px-1">PASSPORT</p>
                <p className="text-[7px] text-slate-400 tracking-wider">REPUBLIC OF INDIA</p>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <button className="flex items-center justify-between text-xs text-gray-700 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition font-medium">
                  View Fullscreen <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button className="flex items-center justify-between text-xs text-gray-700 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition font-medium">
                  Download <Download className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button className="flex items-center justify-between text-xs text-gray-700 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition font-medium">
                  Share <Share2 className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Actions</p>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition font-medium">
                <Upload className="w-3.5 h-3.5" /> Upload New Version
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs border border-red-200 text-red-600 py-2 rounded-lg hover:bg-red-50 transition font-medium">
                <Trash2 className="w-3.5 h-3.5" /> Delete Document
              </button>
            </div>
          </div>
        </>
      )}

      {activeTab === "Activity" && (
        <div className="flex flex-col gap-2">
          {[
            { event: "Document Uploaded", detail: `By ${doc.uploadedBy} on ${doc.uploadedOn}`, color: "bg-indigo-400" },
            { event: "Document Verified", detail: "By HR Team on 21 May 2025", color: "bg-green-400" },
            { event: "Reminder Sent", detail: "Expiry reminder scheduled", color: "bg-amber-400" },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50">
              <div className={`w-2 h-2 rounded-full ${a.color} mt-1 shrink-0`} />
              <div>
                <p className="text-[11px] font-semibold text-gray-700">{a.event}</p>
                <p className="text-[10px] text-gray-400">{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Approvals" && (
        <div className="flex flex-col gap-2">
          <div className="p-3 rounded-lg border border-green-200 bg-green-50">
            <p className="text-[11px] font-semibold text-green-700">Approved by HR Manager</p>
            <p className="text-[10px] text-green-500">Priya Sharma • 21 May 2025</p>
          </div>
          <div className="p-3 rounded-lg border border-gray-100 bg-gray-50 text-[10px] text-gray-400 text-center">No further approvals required</div>
        </div>
      )}

      {activeTab === "Versions" && (
        <div className="flex flex-col gap-2">
          {[{ version: "v1.0", date: doc.uploadedOn, uploader: doc.uploadedBy, current: true }].map((v, i) => (
            <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[11px] font-semibold text-gray-700">{v.version}</p>
                  {v.current && <span className="text-[9px] bg-indigo-100 text-indigo-600 px-1.5 rounded-full font-medium">Current</span>}
                </div>
                <p className="text-[10px] text-gray-400">{v.date} • {v.uploader}</p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-gray-100"><Download className="w-3.5 h-3.5 text-gray-400" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main DocumentsTab Component ──────────────────────── */
export default function DocumentsTab() {
  const [activeSubTab, setActiveSubTab] = useState("All Documents");
  const [selectedDoc, setSelectedDoc] = useState<Doc>(documents[0]);
  const [checkedRows, setCheckedRows] = useState<Set<number>>(new Set());
  const [allChecked, setAllChecked] = useState(false);

  const toggleRow = (i: number) => {
    const next = new Set(checkedRows);
    next.has(i) ? next.delete(i) : next.add(i);
    setCheckedRows(next);
  };

  const toggleAll = () => {
    setAllChecked(!allChecked);
    setCheckedRows(allChecked ? new Set() : new Set(documents.map((_, i) => i)));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* KPI Row */}
      <div className="grid grid-cols-6 gap-3">
        {docKpis.map((k, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-medium leading-tight">{k.label}</span>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${k.bg}`}>
                <k.icon className={`w-3.5 h-3.5 ${k.color}`} />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900 leading-tight">{k.value}</div>
            <div className={`text-[10px] flex items-center gap-1 ${k.up ? "text-green-600" : "text-red-500"}`}>
              {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {k.change}
            </div>
          </div>
        ))}
      </div>

      {/* Table + Detail Panel */}
      <div className="flex gap-3">
        {/* Documents Table */}
        <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">
              Documents <span className="text-gray-400 font-normal">(4,256)</span>
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  placeholder="Search documents..."
                  className="pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg w-44 focus:outline-none focus:ring-1 focus:ring-indigo-300"
                />
              </div>
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-3 h-3" /> Filters
              </button>
              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Sub Tabs */}
          <div className="flex border-b border-gray-100 px-3 overflow-x-auto">
            {subTabs.map((t) => (
              <button
                key={t.label}
                onClick={() => setActiveSubTab(t.label)}
                className={`text-[11px] font-medium py-2.5 px-3 border-b-2 transition whitespace-nowrap -mb-px ${activeSubTab === t.label ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-700"}`}
              >
                {t.label} <span className="text-gray-400">({t.count.toLocaleString()})</span>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium bg-gray-50/50">
                  <th className="px-4 py-2.5 text-left w-8">
                    <input type="checkbox" checked={allChecked} onChange={toggleAll} className="w-3.5 h-3.5 accent-indigo-600 rounded" />
                  </th>
                  <th className="text-left px-3 py-2.5">Document Name</th>
                  <th className="text-left px-3 py-2.5">Category</th>
                  <th className="text-left px-3 py-2.5">Employee</th>
                  <th className="text-left px-3 py-2.5">Uploaded On</th>
                  <th className="text-left px-3 py-2.5">Expiry Date</th>
                  <th className="text-left px-3 py-2.5">Status</th>
                  <th className="text-left px-3 py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedDoc(doc)}
                    className={`border-b border-gray-50 cursor-pointer transition ${selectedDoc?.name === doc.name ? "bg-indigo-50" : "hover:bg-gray-50"} ${checkedRows.has(i) ? "bg-indigo-50/50" : ""}`}
                  >
                    <td className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={checkedRows.has(i)} onChange={() => toggleRow(i)} className="w-3.5 h-3.5 accent-indigo-600 rounded" />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${doc.iconColor} flex items-center justify-center shrink-0`}>
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-[11px]">{doc.name}</p>
                          <p className="text-[10px] text-gray-400">{doc.ext} • {doc.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${doc.categoryColor}`}>{doc.category}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <Avatar initials={doc.avatarInitials} gradient={doc.avatarGradient} />
                        <div>
                          <p className="text-[11px] font-semibold text-gray-700">{doc.employee}</p>
                          <p className="text-[10px] text-gray-400">{doc.empId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="text-[11px] text-gray-700">{doc.uploadedOn}</p>
                      <p className="text-[10px] text-gray-400">by {doc.uploadedBy}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      {doc.expiryDate ? (
                        <>
                          <p className={`text-[11px] font-medium ${doc.expiryColor}`}>{doc.expiryDate}</p>
                          <p className={`text-[10px] ${doc.expiryColor}`}>{doc.expiryLabel}</p>
                        </>
                      ) : (
                        <span className="text-gray-300 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button className="p-1.5 rounded-lg hover:bg-gray-200 transition"><Download className="w-3.5 h-3.5 text-gray-500" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-200 transition"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-4 py-2.5 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
              <span>Showing 1 to 10 of 4,256 documents</span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50"><ChevronLeft className="w-3.5 h-3.5" /></button>
                {[1, 2, 3, "...", 426].map((n, i) => (
                  <button key={i} className={`px-2 py-1 rounded border text-xs ${n === 1 ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 hover:bg-gray-50"}`}>{n}</button>
                ))}
                <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50"><ChevronRight className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Document Detail Panel */}
        {selectedDoc && (
          <div className="w-72 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-4 overflow-y-auto max-h-[calc(100vh-280px)]">
            <DocumentDetailPanel doc={selectedDoc} onClose={() => setSelectedDoc(null as any)} />
          </div>
        )}
      </div>
    </div>
  );
}