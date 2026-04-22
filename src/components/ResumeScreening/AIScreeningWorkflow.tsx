import React from "react";
import { aiSteps } from "./data";

export default function AIScreeningWorkflow() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 text-sm mb-4">How AI Screening Works</h3>
      <div className="flex items-start gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {aiSteps.map((step,i)=>(
          <React.Fragment key={i}>
            <div className="flex flex-col items-center text-center flex-1 min-w-[120px]">
              <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-2xl mb-2">{step.icon}</div>
              <div className="text-[11px] font-semibold text-gray-700 mb-1">{step.title}</div>
              <div className="text-[10px] text-gray-500 leading-relaxed">{step.desc}</div>
            </div>
            {i<aiSteps.length-1 && (
              <div className="mt-5 flex-shrink-0 text-gray-300 text-lg hidden sm:block">→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
