import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

interface WhyNexamorProps {
  onOpenBooking: () => void;
}

export const WhyNexamor: React.FC<WhyNexamorProps> = ({ onOpenBooking }) => {
  const comparisonItems = [
    {
      factor: 'Starting Point',
      traditional: 'Starts with software features and generic pre-built templates',
      nexamor: 'Starts with your existing operational workflow, bottlenecks, and staff roles'
    },
    {
      factor: 'System Integration',
      traditional: 'Operates in isolation as a disconnected chat widget or stand-alone tool',
      nexamor: 'Directly connects supported calendars, CRM platforms, dispatch boards, and telephony'
    },
    {
      factor: 'Data Continuity',
      traditional: 'Loses context between calls, chats, and internal records; requires manual copying',
      nexamor: 'Preserves caller context, structured notes, and audio transcripts across systems'
    },
    {
      factor: 'Human Escalation',
      traditional: 'Binary dead-ends or unhelpful "leave a message" bots that frustrate customers',
      nexamor: 'Deterministic rules for live transfers, urgency thresholds, and priority staff alerts'
    },
    {
      factor: 'Reliability & Safety',
      traditional: 'Generic prompt engineering with unmanaged hallucinations and open-ended drift',
      nexamor: 'Boundary-checked logic, domain geofencing, and verified business knowledge'
    },
    {
      factor: 'Commercial Focus',
      traditional: 'Sells vague AI novelty or user licenses without operational ownership',
      nexamor: 'Engineers for measurable business outcomes: captured revenue, saved hours, zero missed calls'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Our Architectural Difference</span>
            <span aria-hidden="true">·</span>
            <span>Built Around Real Operations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight leading-tight">
            We don’t bolt AI onto your business. We design around how it actually works.
          </h2>
          <p className="mt-4 text-[#303030] text-sm sm:text-base leading-relaxed">
            Most businesses that trial artificial intelligence get frustrated because they purchase disconnected software that adds more administrative friction. Nexamor acts as an engineering partner integrating tailored systems into your operational fabric.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="bg-white border border-[#E7E5E0] rounded-2xl overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#F7F6F2] border-b border-[#E7E5E0] p-4 sm:p-6 text-xs font-mono">
            <div className="md:col-span-3 text-[#777777] uppercase tracking-wider font-semibold">
              Operational Dimension
            </div>
            <div className="md:col-span-4 text-[#777777] uppercase tracking-wider mt-2 md:mt-0 font-medium">
              Traditional Disconnected Tools
            </div>
            <div className="md:col-span-5 text-[#191919] uppercase tracking-wider mt-2 md:mt-0 font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#191919]" />
              <span>The Nexamor Engineering Approach</span>
            </div>
          </div>

          <div className="divide-y divide-[#E7E5E0]">
            {comparisonItems.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-6 gap-3 sm:gap-4 text-sm items-start hover:bg-[#F7F6F2]/60 transition-colors">
                <div className="md:col-span-3 font-semibold text-[#191919]">
                  {item.factor}
                </div>
                <div className="md:col-span-4 text-[#777777] flex items-start gap-2.5 text-xs sm:text-sm">
                  <X className="w-4 h-4 text-rose-500/70 shrink-0 mt-0.5" />
                  <span>{item.traditional}</span>
                </div>
                <div className="md:col-span-5 text-[#191919] flex items-start gap-2.5 text-xs sm:text-sm">
                  <div className="p-0.5 rounded bg-[#E7E5E0] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#191919]" />
                  </div>
                  <span className="font-medium text-[#191919]">{item.nexamor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F7F6F2] border border-[#E7E5E0] p-6 rounded-2xl">
          <div>
            <h3 className="text-[#191919] font-semibold text-base">
              Ready to replace disconnected tools with an integrated workflow?
            </h3>
            <p className="text-xs text-[#777777] mt-0.5">
              We audit your existing telephony, booking, and CRM tools during an initial technical discovery session.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-[#191919] hover:bg-[#303030] text-white text-xs sm:text-sm font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Book a Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
