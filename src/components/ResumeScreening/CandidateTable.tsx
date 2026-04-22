import React from "react";
import { Search, ChevronDown, Filter, Download, Eye, MoreVertical } from "lucide-react";
import { candidates, MatchBar, scoreColor } from "./data";

interface Props {
  selected: any;
  setSelected: (c: any) => void;
  filterTab: string;
  setFilterTab: (t: string) => void;
}

export default function CandidateTable({ selected, setSelected, filterTab, setFilterTab }: Props) {
  const filterTabs = [
    { label:"All Resumes", count:248 },
    { label:"Best Match", count:92 },
    { label:"Potential Candidates", count:78 },
    { label:"Not a Fit", count:78 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Filter tabs */}
      <div className="border-b border-gray-100 px-4 pt-2 flex gap-0">
        {filterTabs.map(ft=>(
          <button
            key={ft.label}
            onClick={()=>setFilterTab(ft.label)}
            className={`px-3 py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-1 ${
              filterTab===ft.label ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {ft.label} <span className={`text-[11px] ${filterTab===ft.label?"text-blue-600":"text-gray-400"}`}>{ft.count}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="px-4 py-2.5 border-b border-gray-50 flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-0 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input className="w-full h-8 pl-8 pr-3 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400" placeholder="Search by name, skills, keywords..."/>
        </div>
        {["All Jobs","All Sources","All Experience","All Locations"].map(f=>(
          <button key={f} className="flex items-center gap-1 h-8 px-2.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300">
            {f}<ChevronDown size={11}/>
          </button>
        ))}
        <button className="flex items-center gap-1 h-8 px-2.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 ml-auto">
          <Filter size={11}/> More Filters
        </button>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          Sort by: <button className="flex items-center gap-1 font-medium text-gray-700">AI Score (High to Low)<ChevronDown size={11}/></button>
        </div>
        <button className="flex items-center gap-1 h-8 px-2.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300">
          <Download size={11}/> Export
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="w-8 px-3 py-2"><input type="checkbox" className="rounded"/></th>
              <th className="px-3 py-2 text-left text-gray-500 font-medium">Candidate</th>
              <th className="px-3 py-2 text-left text-gray-500 font-medium">Job Applied</th>
              <th className="px-3 py-2 text-center text-gray-500 font-medium">AI Score</th>
              <th className="px-3 py-2 text-left text-gray-500 font-medium">Category</th>
              <th className="px-3 py-2 text-left text-gray-500 font-medium">Experience</th>
              <th className="px-3 py-2 text-left text-gray-500 font-medium">Skills Match</th>
              <th className="px-3 py-2 text-center text-gray-500 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c,i)=>(
              <tr
                key={i}
                onClick={()=>setSelected(c)}
                className={`border-b border-gray-50 cursor-pointer transition-colors ${selected.name===c.name?"bg-blue-50":"hover:bg-gray-50"}`}
              >
                <td className="px-3 py-2.5 text-center"><input type="checkbox" className="rounded" onClick={e=>e.stopPropagation()}/></td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                      {c.name.split(" ").map(w=>w[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{c.name}</div>
                      <div className="text-[10px] text-gray-400">{c.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-gray-600">{c.job}</td>
                <td className="px-3 py-2.5 text-center">
                  <span className="font-bold text-base" style={{color:scoreColor(c.score)}}>{c.score}</span>
                </td>
                <td className="px-3 py-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c.catColor}`}>{c.cat}</span>
                </td>
                <td className="px-3 py-2.5 text-gray-600">{c.exp}</td>
                <td className="px-3 py-2.5 w-28">
                  <MatchBar pct={c.match} color={scoreColor(c.score)}/>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1 hover:bg-gray-200 rounded text-gray-400"><Eye size={13}/></button>
                    <button className="p-1 hover:bg-gray-200 rounded text-gray-400"><MoreVertical size={13}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">Showing 1 to 8 of 248 entries</span>
        <div className="flex items-center gap-1">
          {["←",1,2,3,4,5,"...",31,"→"].map((p,i)=>(
            <button key={i} className={`w-7 h-7 text-xs rounded flex items-center justify-center transition-colors ${
              p===1 ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"
            }`}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
