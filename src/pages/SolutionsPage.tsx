import React from 'react';
import { SOLUTIONS_DATA } from '../data/solutions';
import { 
  PhoneCall, 
  CalendarCheck, 
  Zap, 
  Bot, 
  Database, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface SolutionsPageProps {
  onOpenBooking: () => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onOpenBooking }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'voice-agents':
        return <PhoneCall className="w-6 h-6 text-[#191919]" />;
      case 'appointment-booking':
        return <CalendarCheck className="w-6 h-6 text-[#191919]" />;
      case 'lead-recovery':
        return <Zap className="w-6 h-6 text-[#191919]" />;
      case 'reception-support':
        return <Bot className="w-6 h-6 text-[#191919]" />;
      case 'crm-workflow':
        return <Database className="w-6 h-6 text-[#191919]" />;
      case 'custom-automation':
        return <Cpu className="w-6 h-6 text-[#191919]" />;
      default:
        return <Cpu className="w-6 h-6 text-[#191919]" />;
    }
  };

  return (
    <div className="py-16 lg:py-24 bg-[#F7F6F2] text-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Core Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Technical Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight leading-tight">
            AI Infrastructure Built for Australian Service Operations
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#303030] leading-relaxed">
            We don’t resell generic chatbots. We engineer the underlying telephony, calendar coordination, CRM synchronisation, and workflow pipelines that keep your business responding and booking 24/7.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-[#777777] font-mono">
            <ShieldCheck className="w-4 h-4 text-[#191919]" />
            <span>All systems adhere to Australian Privacy Principles and local telephony compliance.</span>
          </div>
        </div>

        {/* 6 Deep-Dive Solution Sections */}
        <div className="space-y-12">
          {SOLUTIONS_DATA.map((sol) => (
            <div
              key={sol.id}
              id={sol.id}
              className="bg-white border border-[#E7E5E0] rounded-2xl p-6 sm:p-10 shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                {/* Left Description */}
                <div className="lg:w-7/12 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#F7F6F2] border border-[#E7E5E0] text-[#191919] rounded-xl">
                      {getIcon(sol.id)}
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-[#777777] tracking-wider uppercase">
                        SOLUTION AREA {sol.letter}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">
                        {sol.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-[#191919] font-medium leading-snug">
                    {sol.tagline}
                  </p>

                  <p className="text-sm text-[#303030] leading-relaxed">
                    {sol.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-mono uppercase text-[#777777] tracking-wider block mb-2 font-semibold">
                      Engineered Capabilities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {sol.capabilities.map((cap, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[#303030] bg-[#F7F6F2] p-2.5 rounded-xl border border-[#E7E5E0]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#191919] shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Technical Integration Box */}
                <div className="lg:w-5/12 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl p-6 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#191919] font-semibold tracking-wider block mb-1">
                      Ideal Operational Profile
                    </span>
                    <p className="text-xs text-[#303030] leading-relaxed">
                      {sol.idealFor}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E7E5E0]">
                    <span className="text-[11px] font-mono uppercase text-[#777777] font-semibold tracking-wider block mb-1 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-[#191919]" />
                      <span>Technical &amp; Telephony Boundary</span>
                    </span>
                    <p className="text-xs text-[#777777] leading-relaxed">
                      {sol.integrationNote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E7E5E0]">
                    <button
                      onClick={onOpenBooking}
                      className="w-full py-2.5 bg-[#191919] hover:bg-[#303030] active:bg-black text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Scope This Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 p-8 bg-white border border-[#E7E5E0] rounded-2xl text-center space-y-4 shadow-xs">
          <h3 className="text-2xl font-bold text-[#191919]">
            Unsure which solution fits your current operational stage?
          </h3>
          <p className="text-sm text-[#303030] max-w-2xl mx-auto leading-relaxed">
            We review your current weekly call volume, dispatch software, and staff rosters to recommend whether a voice receptionist, SMS missed-call recovery, or calendar booking system will deliver the highest immediate return.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 bg-[#191919] hover:bg-[#303030] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Book a Technical Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
