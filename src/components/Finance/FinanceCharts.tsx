import React, { useState } from "react";
import {
  AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip
} from "recharts";
import { payrollTrend, expenseCategoryData, formatCurrency } from "./data";

export default function FinanceCharts() {
  const [timeframe, setTimeframe] = useState("Last 6 Months");

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Main Spending Area Chart */}
      <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Payroll & Tax Trend</h3>
            <p className="text-xs text-slate-400">Monthly overview of employee disbursements</p>
          </div>
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>This Year</option>
          </select>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={payrollTrend}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                formatter={(v: any) => [formatCurrency(Number(v)), ""]}
                wrapperStyle={{ zIndex: 1000 }} 
                allowEscapeViewBox={{ x: true, y: true }}
              />
              <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
              <Area type="monotone" dataKey="tax" stroke="#f59e0b" strokeWidth={3} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-xs font-semibold text-slate-600">Net Salary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-slate-600">Statutory Tax</span>
          </div>
        </div>
      </div>

      {/* Expense Category Donut */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">Expense Distribution</h3>
        <p className="text-xs text-slate-400 mb-6">Allocation across key cost centers</p>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={expenseCategoryData} 
                innerRadius={70} 
                outerRadius={90} 
                paddingAngle={8} 
                dataKey="value"
                stroke="none"
              >
                {expenseCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => formatCurrency(Number(v))} wrapperStyle={{ zIndex: 1000 }} allowEscapeViewBox={{ x: true, y: true }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-bold text-slate-900">₹8.3L</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly Total</p>
          </div>
        </div>
        <div className="space-y-3 mt-4">
          {expenseCategoryData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-slate-600">{item.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-900">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
