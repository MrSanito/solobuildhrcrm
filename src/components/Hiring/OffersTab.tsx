import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { offerKpis, offers } from './data';
import { Avatar, StatusBadge } from './Shared';

const { TrendingUp, TrendingDown, Search, Filter, MoreVertical, ChevronRight, ChevronDown, Plus, Download, Eye, X, Star, FileText } = Icons;


function OfferDetailPanel({ offer, onClose }: { offer: any; onClose: () => void }) {
  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
      {/* Candidate Summary */}
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-gray-700">Candidate Summary</p>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-4 h-4 text-gray-400" /></button>
      </div>
      <div className="p-3 rounded-xl border border-gray-200 flex items-center gap-3">
        <Avatar initials={offer.avatar} gradient={offer.avatarColor} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-gray-900">{offer.name}</h3>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-green-600 text-green-600" /> {offer.score}% Match
            </span>
          </div>
          <p className="text-xs text-gray-500">{offer.role}</p>
          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400">
            <span>{offer.exp}</span>
            <span>•</span>
            <span>Bengaluru, India</span>
          </div>
        </div>
      </div>

      {/* Offer Details */}
      <div className="p-3 rounded-xl border border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-2">Offer Details</p>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <p className="text-gray-400">Offer Status</p>
            <StatusBadge status={offer.status} />
          </div>
          <div>
            <p className="text-gray-400">Offered Salary</p>
            <p className="font-bold text-gray-800">{offer.salary}</p>
            <p className="text-gray-500">+ {offer.variable}</p>
          </div>
          <div>
            <p className="text-gray-400">Offer Date</p>
            <p className="font-semibold text-gray-700">{offer.offerDate}</p>
          </div>
          <div>
            <p className="text-gray-400">Expires On</p>
            <p className="font-semibold text-gray-700">{offer.expiresOn}</p>
            {offer.daysLeft && <p className="text-red-500 font-medium">{offer.daysLeft}</p>}
          </div>
          <div>
            <p className="text-gray-400">CTC Breakdown</p>
            <button className="text-indigo-600 font-medium hover:underline">View Breakdown</button>
          </div>
          <div>
            <p className="text-gray-400">Notice Period</p>
            <p className="font-semibold text-gray-700">30 Days</p>
          </div>
          <div>
            <p className="text-gray-400">Work Location</p>
            <p className="font-semibold text-gray-700">Bengaluru, India</p>
          </div>
          <div>
            <p className="text-gray-400">Employment Type</p>
            <p className="font-semibold text-gray-700">Full Time</p>
          </div>
          <div>
            <p className="text-gray-400">Reporting Manager</p>
            <p className="font-semibold text-gray-700">Rohit Verma</p>
          </div>
          <div>
            <p className="text-gray-400">Cost to Company</p>
            <p className="font-bold text-gray-800">{offer.salary}</p>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
          <button className="text-xs text-indigo-600 flex items-center gap-1 hover:underline"><FileText className="w-3 h-3" /> View Offer Letter</button>
          <button className="p-1 hover:bg-gray-100 rounded"><Download className="w-3.5 h-3.5 text-gray-500" /></button>
        </div>
      </div>

      {/* Offer Timeline */}
      <div className="p-3 rounded-xl border border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-2">Offer Timeline</p>
        {[
          { event: "Offer Generated", date: "20 May 2025, 10:30 AM", color: "bg-green-500", done: true },
          { event: "Sent to Candidate", date: "20 May 2025, 10:45 AM", color: "bg-green-500", done: true },
          { event: "Awaiting Candidate Response", date: "–", color: "bg-amber-400", done: false },
          { event: "Offer Expires", date: "29 May 2025", color: "bg-gray-300", done: false },
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <div className={`w-2.5 h-2.5 rounded-full ${t.color} mt-0.5 shrink-0`} />
            <div>
              <p className="text-[10px] font-medium text-gray-700">{t.event}</p>
              <p className="text-[9px] text-gray-400">{t.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="flex-1 text-xs border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 font-medium">Edit Offer</button>
        <button className="flex-1 text-xs bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 font-medium">Resend Offer</button>
        <button className="flex-1 text-xs border border-red-200 text-red-600 py-2 rounded-xl hover:bg-red-50 font-medium">Withdraw</button>
      </div>
    </div>
  );
}


export function OffersTab() {
  const [selectedOffer, setSelectedOffer] = useState<any>(offers[0]);
  const [activeOfferTab, setActiveOfferTab] = useState("All Offers");

  const offerSubTabs = [
    { label: "All Offers", count: 18 },
    { label: "Pending", count: 18 },
    { label: "Awaiting Approval", count: 7 },
    { label: "Accepted", count: 12 },
    { label: "Declined", count: 6 },
    { label: "Expired", count: 2 },
  ];

  const filteredOffers = activeOfferTab === "All Offers"
    ? offers
    : offers.filter((o) => {
        if (activeOfferTab === "Awaiting Approval") return o.status === "Awaiting Approval";
        return o.status === activeOfferTab;
      });

  return (
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      {/* Offer KPIs */}
      <div className="grid grid-cols-6 gap-3">
        {offerKpis.map((k, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-500 font-medium leading-tight">{k.label}</span>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${k.bg}`}><k.icon className={`w-3.5 h-3.5 ${k.color}`} /></div>
            </div>
            <div className="text-base font-bold text-gray-900 leading-tight">{k.value}</div>
            <div className={`text-[10px] flex items-center gap-1 ${k.up ? "text-green-600" : "text-red-500"}`}>
              {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {k.change}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-1 min-h-0">
        {/* Offers Table */}
        <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Offers <span className="text-gray-400 font-normal">(18)</span></h3>
            <div className="flex items-center gap-2">
              <div className="relative"><Search className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" /><input placeholder="Search candidates" className="pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg w-36 focus:outline-none focus:ring-1 focus:ring-indigo-300" /></div>
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50"><Filter className="w-3 h-3" /> Filters</button>
              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="flex border-b border-gray-100 px-3">
            {offerSubTabs.map((t) => (
              <button key={t.label} onClick={() => setActiveOfferTab(t.label)} className={`text-[11px] font-medium py-2 px-3 border-b-2 transition whitespace-nowrap -mb-px ${activeOfferTab === t.label ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
                {t.label} <span className="text-[10px]">({t.count})</span>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-medium">
                  <th className="text-left px-4 py-2.5">CANDIDATE</th>
                  <th className="text-left px-3 py-2.5">ROLE</th>
                  <th className="text-left px-3 py-2.5">OFFERED SALARY</th>
                  <th className="text-left px-3 py-2.5">OFFER DATE</th>
                  <th className="text-left px-3 py-2.5">STATUS</th>
                  <th className="text-left px-3 py-2.5">EXPIRES ON</th>
                  <th className="text-left px-3 py-2.5">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.map((o, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedOffer(o)}
                    className={`border-b border-gray-50 cursor-pointer transition ${selectedOffer?.name === o.name ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <Avatar initials={o.avatar} gradient={o.avatarColor} size="sm" />
                        <div>
                          <p className="font-semibold text-gray-800 text-[11px]">{o.name}</p>
                          <p className="text-[10px] text-gray-400">{o.exp}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-gray-700 text-[11px]">{o.role}</p>
                      <p className="text-[10px] text-gray-400">{o.dept}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="font-bold text-gray-800 text-[11px]">{o.salary}</p>
                      <p className="text-[10px] text-gray-400">+ {o.variable}</p>
                    </td>
                    <td className="px-3 py-2.5 text-gray-600 text-[11px]">{o.offerDate}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={o.status} /></td>
                    <td className="px-3 py-2.5">
                      <p className="text-[11px] text-gray-600">{o.expiresOn}</p>
                      {o.daysLeft && <p className={`text-[10px] font-medium ${o.status === "Declined" ? "text-red-500" : "text-amber-500"}`}>{o.daysLeft}</p>}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1 rounded hover:bg-gray-200"><Eye className="w-3.5 h-3.5 text-gray-500" /></button>
                        <button className="p-1 rounded hover:bg-gray-200"><MoreVertical className="w-3.5 h-3.5 text-gray-400" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
              <span>Showing 1 to 8 of 18 offers</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((n) => <button key={n} className={`px-2 py-1 rounded border text-xs ${n === 1 ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 hover:bg-gray-50"}`}>{n}</button>)}
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-gray-100 flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700"><Plus className="w-3.5 h-3.5" /> Generate Offer</button>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50">Bulk Actions <ChevronDown className="w-3 h-3" /></button>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50"><Download className="w-3.5 h-3.5" /> Export</button>
          </div>
        </div>

        {/* Offer Detail Panel */}
        {selectedOffer && (
          <div className="w-72 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-4 overflow-y-auto">
            <OfferDetailPanel offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

