import React from 'react';
import { 
  Search, 
  MapPin, 
  Code2, 
  ShieldCheck, 
  LineChart, 
  Clock, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface HowItWorksPageProps {
  onOpenBooking: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onOpenBooking }) => {
  const stages = [
    {
      num: '01',
      title: 'Discover',
      tagline: 'Operational audit and customer journey mapping',
      icon: <Search className="w-6 h-6 text-[#191919]" />,
      description: 'We begin by analysing your inbound communication channels, call logs, staff scheduling friction, and core operational software. We identify where enquiries are currently dropping through the cracks.',
      deliverables: [
        'Weekly call volume and drop-off rate analysis',
        'Staff time-audit on repetitive enquiries and manual calendar re-entry',
        'API audit of existing CRM (ServiceM8, Cliniko, Jobber, Timely, etc.)',
        'Prioritised roadmap of high-ROI pilot opportunities'
      ],
      timelineNote: 'Typically completed in 3–5 business days'
    },
    {
      num: '02',
      title: 'Map',
      tagline: 'Workflow architecture, system boundaries, and escalation logic',
      icon: <MapPin className="w-6 h-6 text-[#191919]" />,
      description: 'Before writing any integration code, we map the exact logic tree: how the conversational agent greets callers, verified business FAQ rules, booking buffers, postcode geofencing, and precise human escalation thresholds.',
      deliverables: [
        'Complete conversational state machine and decision tree diagram',
        'Human transfer triggers and on-call escalation protocol',
        'Data hygiene and entity validation rules schema',
        'Written project scope with fixed milestone boundaries'
      ],
      timelineNote: 'Typically completed in 1 week'
    },
    {
      num: '03',
      title: 'Build',
      tagline: 'System engineering, model grounding, and API connectors',
      icon: <Code2 className="w-6 h-6 text-[#191919]" />,
      description: 'We configure and program the telephony ingress, speech recognition pipeline with Australian colloquial awareness, calendar reservation logic, and webhook dispatchers. Grounded exclusively in verified business documentation.',
      deliverables: [
        'Custom voice agent tuned for natural Australian conversational pacing',
        'Direct two-way calendar synchronisation with service duration rules',
        'Webhook listeners pushing structured JSON summaries to your software',
        'Secure Australian data storage configuration (TLS 1.3 encryption)'
      ],
      timelineNote: 'Typically 1–3 weeks depending on API complexity'
    },
    {
      num: '04',
      title: 'Test and Deploy',
      tagline: 'Synthetic stress testing, failure mode handling, and controlled rollout',
      icon: <ShieldCheck className="w-6 h-6 text-[#191919]" />,
      description: 'We subject the system to rigorous synthetic test scenarios—background noise, ambiguous accents, sudden hang-ups, and calendar collisions. Once verified, we deploy in parallel alongside your team before cutover.',
      deliverables: [
        '100+ scenario edge-case test suite with acoustic noise simulation',
        'Zero-drop verification of warm staff transfer fallbacks',
        'Parallel soft-launch (e.g. after-hours phone coverage first)',
        'Full team handover and emergency bypass operational training'
      ],
      timelineNote: '1–2 weeks of supervised soft-launch'
    },
    {
      num: '05',
      title: 'Improve',
      tagline: 'Evidence-based refinement and operational maintenance',
      icon: <LineChart className="w-6 h-6 text-[#191919]" />,
      description: 'Production systems require active stewardship. We review captured calls, analyse questions where human clarification was required, and continuously refine prompts and business rules.',
      deliverables: [
        'Monthly review meetings with captured enquiry statistics',
        'Prompt and FAQ updates reflecting new seasonal services or price changes',
        'Proactive monitoring of upstream software API updates and telephony gateways',
        'Iterative expansion into secondary operational workflows'
      ],
      timelineNote: 'Ongoing monthly partnership retainer'
    }
  ];

  return (
    <div className="py-16 lg:py-24 bg-[#F7F6F2] text-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Engineering Lifecycle</span>
            <span aria-hidden="true">·</span>
            <span>Predictable Implementation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight leading-tight">
            How We Engineer Your AI Transformation
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#303030] leading-relaxed">
            We avoid rushed, untested deployments. Our five-stage engineering process ensures your automated workflows are robust, boundary-checked, and deeply integrated into your existing business operations.
          </p>

          <div className="mt-6 p-4 bg-white border border-[#E7E5E0] rounded-xl flex items-center gap-3 text-xs text-[#303030] shadow-xs">
            <Clock className="w-5 h-5 text-[#191919] shrink-0" />
            <p>
              <strong className="text-[#191919]">Honest Timelines:</strong> We do not claim universal 48-hour rollouts. Meaningful systems integration requires proper API verification, telephony routing, and failure-mode testing. Standard pilots deploy in 2–4 weeks.
            </p>
          </div>
        </div>

        {/* 5 Stages Detail */}
        <div className="space-y-12">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className="bg-white border border-[#E7E5E0] rounded-2xl p-6 sm:p-10 shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="lg:w-7/12 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#F7F6F2] border border-[#E7E5E0] text-[#191919] rounded-xl">
                      {stage.icon}
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-[#777777] tracking-wider uppercase">
                        STAGE {stage.num}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">
                        {stage.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-[#191919]">
                    {stage.tagline}
                  </p>

                  <p className="text-sm text-[#303030] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="lg:w-5/12 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl p-6 space-y-4">
                  <span className="text-[11px] font-mono uppercase text-[#191919] font-semibold tracking-wider block">
                    Verified Deliverables
                  </span>
                  <ul className="space-y-2 text-xs">
                    {stage.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[#303030]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#191919] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-[#E7E5E0] text-[11px] text-[#777777] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#191919]" />
                    <span>{stage.timelineNote}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 p-8 bg-white border border-[#E7E5E0] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-xl font-bold text-[#191919]">
              Ready to begin Stage 01 with a Discovery session?
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] mt-1">
              We review your customer flow and telephony structure before any engineering commitment.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 bg-[#191919] hover:bg-[#303030] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Book a Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
