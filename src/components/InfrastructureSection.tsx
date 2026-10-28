import React from 'react';
import { 
  PhoneCall, 
  Database, 
  CalendarCheck, 
  ArrowRight,
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface InfrastructureSectionProps {
  onOpenBooking: () => void;
  onHearDemo: () => void;
}

export const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({
  onOpenBooking,
  onHearDemo,
}) => {
  const processSteps = [
    { num: '01', title: 'Enquiry received', desc: 'Inbound phone call, after-hours voicemail, or web form inquiry arrives.' },
    { num: '02', title: 'Customer details captured', desc: 'Caller intent, contact details, suburb/location, and service needs are extracted.' },
    { num: '03', title: 'Appropriate response', desc: 'AI provides instant answers to supported routine FAQs or schedules immediate triage.' },
    { num: '04', title: 'Booking or team handoff', desc: 'Direct calendar hold, customer confirmation SMS, or urgent notification to staff.' },
    { num: '05', title: 'Follow-up', desc: 'Automated 24/48-hr check-in and database record update so no lead goes cold.' },
  ];

  return (
    <section id="infrastructure" className="scroll-mt-24 py-20 lg:py-28 bg-white relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F6F2] border border-[#E7E5E0] rounded-full text-xs font-mono text-[#303030] shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#191919]" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">Systems Infrastructure</span>
            <span aria-hidden="true" className="text-[#E7E5E0]">·</span>
            <span className="text-[#777777]">Production Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight leading-tight">
            The infrastructure behind a better customer experience.
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#303030] leading-relaxed">
            We engineer practical systems that help Australian businesses capture enquiries, answer routine questions, and maintain consistent follow-ups without expanding admin overhead.
          </p>
        </div>

        {/* 3 Core Infrastructure Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* A. AI Voice Reception */}
          <div className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-7 flex flex-col justify-between hover:border-[#D5D3CC] hover:bg-white transition-all shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E5E0] flex items-center justify-center text-[#191919] shadow-xs">
                  <PhoneCall className="w-5 h-5 text-[#191919]" />
                </div>
                <span className="font-mono text-[10px] font-bold text-[#777777] bg-white border border-[#E7E5E0] px-2 py-0.5 rounded">
                  PILLAR A
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#191919] mb-3">
                AI Voice Reception
              </h3>

              <p className="text-sm text-[#777777] leading-relaxed mb-6">
                A dedicated conversational voice assistant that answers incoming calls when your front desk or job-site team is busy.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#E7E5E0]">
                {[
                  'Respond immediately to incoming phone enquiries',
                  'Handle common questions regarding hours, services & pricing',
                  'Capture caller identity, contact info, and job intent',
                  'Assist with appointment requests and timing holds',
                  'Support 24/7 after-hours enquiry handling and call logs',
                  'Route calls or escalate urgent requests to on-call staff'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#303030]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#191919] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E7E5E0] text-[11px] text-[#777777] font-mono">
              Note: Carrier SIP/PSTN forwarding and agreed escalation logic configured per deployment.
            </div>
          </div>

          {/* B. Lead Capture and Follow-Up */}
          <div className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-7 flex flex-col justify-between hover:border-[#D5D3CC] hover:bg-white transition-all shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E5E0] flex items-center justify-center text-[#191919] shadow-xs">
                  <Database className="w-5 h-5 text-[#191919]" />
                </div>
                <span className="font-mono text-[10px] font-bold text-[#777777] bg-white border border-[#E7E5E0] px-2 py-0.5 rounded">
                  PILLAR B
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#191919] mb-3">
                Lead Capture and Follow-Up
              </h3>

              <p className="text-sm text-[#777777] leading-relaxed mb-6">
                Automated workflows ensuring every prospective customer receives a fast, structured confirmation and timely follow-up.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#E7E5E0]">
                {[
                  'Capture leads across phone, web forms, and missed calls',
                  'Record enquiry details directly into structured records',
                  'Send immediate SMS/email confirmations to customers',
                  'Instantly notify the assigned team member via SMS/Slack/Email',
                  'Reduce manual administrative data re-entry',
                  'Help businesses respond consistently within minutes'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#303030]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#191919] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E7E5E0] text-[11px] text-[#777777] font-mono">
              Integrates with Australian mobile networks and webhook-supported CRM platforms.
            </div>
          </div>

          {/* C. Appointment and Workflow Automation */}
          <div className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-7 flex flex-col justify-between hover:border-[#D5D3CC] hover:bg-white transition-all shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E5E0] flex items-center justify-center text-[#191919] shadow-xs">
                  <CalendarCheck className="w-5 h-5 text-[#191919]" />
                </div>
                <span className="font-mono text-[10px] font-bold text-[#777777] bg-white border border-[#E7E5E0] px-2 py-0.5 rounded">
                  PILLAR C
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#191919] mb-3">
                Appointment &amp; Workflow Automation
              </h3>

              <p className="text-sm text-[#777777] leading-relaxed mb-6">
                Connect your customer calendar, intake forms, and team dispatch rules into one reliable, hands-off pipeline.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-[#E7E5E0]">
                {[
                  'Automated appointment requests and booking workflows',
                  'Two-way SMS reminders and rescheduling links',
                  'Pre-service customer intake and job detail collection',
                  'Automatic CRM and booking status updates',
                  'Internal team alerts for schedule changes or cancellations',
                  'Elimination of repetitive manual coordination tasks'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#303030]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#191919] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E7E5E0] text-[11px] text-[#777777] font-mono">
              Direct synchronisation with Google Calendar, Outlook, and supported scheduling APIs.
            </div>
          </div>
        </div>

        {/* D. Show the Process: Horizontal Process on Desktop, Stacked on Mobile */}
        <div className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-mono text-[#777777] uppercase tracking-wider block mb-1">
              Deterministic Process Flow
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#191919]">
              How enquiries move through the system
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] mt-1">
              A reliable five-step sequence designed to eliminate missed opportunities and response lag.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {processSteps.map((step, idx) => (
              <div 
                key={step.num}
                className="bg-white border border-[#E7E5E0] rounded-xl p-4 flex flex-col justify-between relative shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#191919]">
                      {step.num}
                    </span>
                    {idx < processSteps.length - 1 && (
                      <span className="hidden md:inline font-mono text-xs text-[#777777]">→</span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#191919] mb-1.5 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#777777]">
              Interested in seeing this live? Test our simulated voice receptionist.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onHearDemo}
                className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-[#191919] bg-white hover:bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl transition-colors cursor-pointer text-center"
              >
                Hear the AI Demo
              </button>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-5 py-2 text-xs font-medium text-white bg-[#191919] hover:bg-[#303030] rounded-xl transition-colors cursor-pointer text-center"
              >
                Book a Strategy Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
