import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { upcomingPayments, budgetData, statusBadge, formatCurrency } from "./data";

export default function PaymentsAndBudget() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Upcoming Payments Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Upcoming Disbursements</h3>
          <button className="text-xs font-bold text-indigo-600 hover:underline">Manage All</button>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                {["ID", "Description", "Category", "Amount", "Due Date", "Status"].map((h) => (
                  <th key={h} className="text-left py-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {upcomingPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">{p.id}</td>
                  <td className="py-4 px-6 text-xs font-medium text-slate-600">{p.description}</td>
                  <td className="py-4 px-6 text-xs text-slate-500">
                    <span className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold">{p.category}</span>
                  </td>
                  <td className="py-4 px-6 text-xs font-bold text-slate-900">{p.amount}</td>
                  <td className="py-4 px-6 text-xs text-slate-500 font-medium">{p.dueDate}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${statusBadge(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department Budget Utilization */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-slate-900">Budget Utilization</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">By Department</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="dept" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }}
              />
              <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(v: any) => formatCurrency(Number(v))} />
              <Bar dataKey="spent" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-50">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-[10px] font-bold text-emerald-600 uppercase">On Budget</p>
            <p className="text-sm font-bold text-slate-900">4 Departments</p>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
            <p className="text-[10px] font-bold text-rose-600 uppercase">Alert</p>
            <p className="text-sm font-bold text-slate-900">Engineering nearing limit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
