import React from 'react';
import { ArrowRight, Search, Code2, Cpu, LineChart } from 'lucide-react';

interface EngagementModelProps {
  onOpenBooking: () => void;
}

export const EngagementModel: React.FC<EngagementModelProps> = ({ onOpenBooking }) => {
  const stages = [
    {
      num: '01',
      title: 'Workflow Audit & Discovery',
      icon: <Search className="w-5 h-5 text-[#191919]" />,
      summary: 'We examine your current customer journey, telephony volume, response rates, calendar platforms, and operational bottlenecks.',
      deliverables: [
        'Detailed operational flow diagram',
        'Friction and missed-opportunity risk assessment',
        'Technical feasibility analysis of your current software stack'
      ]
    },
    {
      num: '02',
      title: 'Pilot Implementation',
      icon: <Code2 className="w-5 h-5 text-[#191919]" />,
      summary: 'Rather than an overwhelming full-company transformation, we build and validate an initial system around one high-leverage workflow.',
      deliverables: [
        'Configured AI voice or scheduling conversational agent',
        'Interactive test environment with simulated call scenarios',
        'Custom business knowledge grounding and boundary safeguards'
      ]
    },
    {
      num: '03',
      title: 'Integration & Live Deployment',
      icon: <Cpu className="w-5 h-5 text-[#191919]" />,
      summary: 'We connect the validated pilot into your live telephony, calendar systems, and CRM records with end-to-end verification.',
      deliverables: [
        'SIP trunk or phone forwarding integration',
        'Direct API connection to CRM or booking platform',
        'Staff training and emergency handover protocols'
      ]
    },
    {
      num: '04',
      title: 'Continuous System Monitoring',
      icon: <LineChart className="w-5 h-5 text-[#191919]" />,
      summary: 'Ongoing maintenance, prompt optimization, model evaluation, and regular workflow adjustments based on real caller data.',
      deliverables: [
        'Monthly review of captured enquiries and edge-case failures',
        'Ongoing rule tuning and service pricing adjustments',
        'Telemetry monitoring for high-reliability telephony performance'
      ]
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F6F2] relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Engagement Framework</span>
            <span aria-hidden="true">·</span>
            <span>How We Partner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight leading-tight">
            A structured, risk-conscious engineering journey.
          </h2>
          <p className="mt-4 text-[#303030] text-sm sm:text-base leading-relaxed">
            We do not lock businesses into speculative multi-year contracts or hand over fragile black-box templates. We work alongside your management team through a disciplined four-phase delivery model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className="bg-white border border-[#E7E5E0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#D5D3CC] transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#F7F6F2] border border-[#E7E5E0] text-[#191919] rounded-xl">
                    {stage.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#777777] bg-[#F7F6F2] border border-[#E7E5E0] px-2 py-0.5 rounded">
                    STAGE {stage.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#191919] mb-2 leading-snug">
                  {stage.title}
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed mb-4">
                  {stage.summary}
                </p>

                <div className="pt-4 border-t border-[#E7E5E0] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-[#777777] block mb-1 font-semibold">
                    Key Outputs
                  </span>
                  {stage.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="text-xs text-[#303030] flex items-start gap-1.5 leading-snug">
                      <span className="text-[#191919] shrink-0 font-mono font-bold">›</span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white border border-[#E7E5E0] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div>
            <h4 className="text-sm font-semibold text-[#191919]">
              Every project begins with a scoped proposal based on your actual tech stack.
            </h4>
            <p className="text-xs text-[#777777] mt-0.5">
              No off-the-shelf guesswork. We provide transparent, itemised implementation milestones and infrastructure retainer quotes.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-[#191919] hover:bg-[#303030] text-white text-xs sm:text-sm font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Discuss a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
