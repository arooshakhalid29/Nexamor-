import React from 'react';
import { INDUSTRIES_DATA } from '../data/industries';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface IndustriesPageProps {
  onOpenBooking: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="py-16 lg:py-24 bg-[#F7F6F2] text-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Industry Specialisation</span>
            <span aria-hidden="true">·</span>
            <span>Australian Business Contexts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight leading-tight">
            Workflows Tailored to How Your Industry Really Operates
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#303030] leading-relaxed">
            Every service business has unique operational realities. From emergency tradies on hazardous sites to dental practices requiring strict clinical escalation, we design systems with deep respect for industry standards.
          </p>
        </div>

        {/* Industry Cards */}
        <div className="space-y-16">
          {INDUSTRIES_DATA.map((ind) => (
            <div
              key={ind.id}
              id={ind.id}
              className="bg-white border border-[#E7E5E0] rounded-2xl overflow-hidden shadow-xs"
            >
              {/* Top Photo & Headline Hero */}
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[380px] bg-slate-100">
                  <img
                    src={ind.imageSrc}
                    alt={ind.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-xs font-mono text-white/80 uppercase tracking-wider font-semibold">
                      {ind.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mt-1">
                      {ind.title}
                    </h2>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#191919] italic mb-3">
                      &quot;{ind.headline}&quot;
                    </h3>
                    <p className="text-sm text-[#303030] leading-relaxed">
                      {ind.operationalChallenge}
                    </p>
                  </div>

                  {ind.id === 'dental-healthcare' && (
                    <div className="p-4 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-xs text-[#303030] flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-[#191919]">Clinical Safeguard Notice:</strong> Our healthcare workflows handle administrative enquiries, opening hours, HICAPS items, and routine appointment scheduling. The system is never a replacement for clinical judgement and does not diagnose conditions or provide medical advice. Any report of trauma, acute pain, or emergency is flagged for immediate human nurse or clinician review.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#E7E5E0]">
                    <span className="text-xs text-[#777777] font-mono">
                      Compatible with standard Australian CRM &amp; calendar stacks
                    </span>
                    <button
                      onClick={onOpenBooking}
                      className="px-5 py-2.5 bg-[#191919] hover:bg-[#303030] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Discuss {ind.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Breakdown: Example Workflow & Proposed Automation */}
              <div className="p-6 sm:p-10 bg-[#F7F6F2] border-t border-[#E7E5E0] grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
                {/* Example Workflow */}
                <div className="lg:col-span-6 space-y-3">
                  <span className="text-[11px] font-mono uppercase text-[#777777] font-semibold tracking-wider block">
                    Real-World Workflow Example
                  </span>
                  <div className="space-y-2 bg-white p-4 rounded-xl border border-[#E7E5E0] shadow-xs">
                    <div>
                      <span className="font-mono text-[#777777] text-[10px] block">1. INBOUND TRIGGER:</span>
                      <p className="text-[#191919] leading-relaxed font-medium">{ind.exampleWorkflow.inbound}</p>
                    </div>
                    <div className="pt-2 border-t border-[#E7E5E0]">
                      <span className="font-mono text-[#777777] text-[10px] block">2. PROCESSING &amp; TRIAGE:</span>
                      <p className="text-[#303030] leading-relaxed">{ind.exampleWorkflow.processing}</p>
                    </div>
                    <div className="pt-2 border-t border-[#E7E5E0]">
                      <span className="font-mono text-[#777777] text-[10px] block">3. AUTOMATED ACTION:</span>
                      <p className="text-[#303030] leading-relaxed">{ind.exampleWorkflow.action}</p>
                    </div>
                    <div className="pt-2 border-t border-[#E7E5E0]">
                      <span className="font-mono text-[#777777] text-[10px] block">4. AUDIT &amp; FOLLOW-UP:</span>
                      <p className="text-[#777777] leading-relaxed">{ind.exampleWorkflow.followUp}</p>
                    </div>
                  </div>
                </div>

                {/* Proposed Automation & Expected Operational Benefits */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#777777] font-semibold tracking-wider block mb-2">
                      Proposed Automation Features
                    </span>
                    <ul className="space-y-1.5">
                      {ind.proposedAutomation.map((auto, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2 text-[#303030] bg-white p-2.5 rounded-xl border border-[#E7E5E0] shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#191919] shrink-0 mt-0.5" />
                          <span>{auto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#777777] font-semibold tracking-wider block mb-2">
                      Expected Operational Benefits
                    </span>
                    <ul className="space-y-1 text-[#777777]">
                      {ind.operationalBenefits.map((ben, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <span className="text-[#191919] font-mono font-bold">›</span>
                          <span className="text-[#303030]">{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
