import React, { useState } from 'react';
import { 
  AlertCircle, 
  Clock, 
  CalendarX, 
  Layers, 
  HelpCircle, 
  PhoneOff,
  ArrowRight
} from 'lucide-react';

interface ProblemSectionProps {
  onOpenBooking: () => void;
  onNavigateToCalculator?: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({
  onOpenBooking,
  onNavigateToCalculator,
}) => {
  const [activeTab, setActiveTab] = useState<'trades' | 'salons' | 'dental' | 'auto'>('trades');

  const industryExamples = {
    trades: {
      industry: 'Home Services & Trades (Plumbing, HVAC, Electrical)',
      scenario: 'Missed emergency calls on the road or in roof spaces',
      detail: 'When a homeowner calls at 6:30 PM with water gushing through an architrave, they phone the first three Google Ads results. If your phone rings out while you are completing a job, they immediately hire the competitor who answers within 15 seconds.',
      consequence: 'Lost $300–$1,500 emergency call-out jobs and potential long-term domestic repiping contracts.',
      statLabel: 'Estimated friction point',
      statValue: '68% of trade callers hire the first provider who answers live'
    },
    salons: {
      industry: 'Salons & Hairdressers',
      scenario: 'Constant phone ringing during high-focus client appointments',
      detail: 'Senior colourists cannot step away from precision foils to answer basic questions about Saturday availability or parking. Front-desk staff are juggling card payments, retail sales, and greeting arrivals, leaving callers on hold until they hang up.',
      consequence: 'Client experience degraded by constant ringers; unfilled last-minute cancellation gaps worth $200–$400 each.',
      statLabel: 'Operational drag',
      statValue: 'Up to 3 hours per day lost to manual calendar coordination'
    },
    dental: {
      industry: 'Dental Practices & Allied Health',
      scenario: 'Front-desk triage backlog between physical arrivals and incoming calls',
      detail: 'Receptionists are processing private health fund claims and seating patients while handling repetitive calls for routine check-up rescheduling, directions, or fee quotes. Unanswered callers frequently abandon rather than leave voicemail.',
      consequence: 'Underfilled recall schedules, late cancellation churn, and rushed front-desk client experiences.',
      statLabel: 'Administrative pressure',
      statValue: '25–40% of inbound clinic calls are routine rescheduling or general FAQs'
    },
    auto: {
      industry: 'Automotive Repair & Mechanical Workshops',
      scenario: 'Repetitive "is my car ready?" status calls interrupting workshop foremen',
      detail: 'Mechanics on the tools have to stop engine diagnostics or brake adjustments to locate job cards and report on part arrival times. Customers calling for standard 10,000 km service quotes get delayed while staff manually calculate book times.',
      consequence: 'Decreased billable workshop hours and congested morning service desk drop-offs.',
      statLabel: 'Productivity leak',
      statValue: 'Foremen lose 2+ hours daily answering repeated status inquiries'
    }
  };

  const generalProblems = [
    {
      icon: <PhoneOff className="w-5 h-5 text-[#191919]" />,
      title: 'Calls arriving while staff are actively serving customers',
      description: 'Physical customers in front of your counter get interrupted, while incoming callers face busy tones or voicemails that rarely convert.'
    },
    {
      icon: <Clock className="w-5 h-5 text-[#191919]" />,
      title: 'After-hours enquiries waiting until the following morning',
      description: 'Potential clients research and contact businesses between 7:00 PM and 10:00 PM. Waiting 12 hours to reply allows competitors to step in.'
    },
    {
      icon: <CalendarX className="w-5 h-5 text-[#191919]" />,
      title: 'Appointment requests lost between messages and calendars',
      description: 'Double-bookings, missed buffer intervals, and manual re-entry errors create friction for both staff and paying clients.'
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-[#191919]" />,
      title: 'Repetitive operational questions consuming skilled staff hours',
      description: 'Highly paid technicians and receptionists repeatedly answer routine questions regarding opening hours, parking, and standard rates.'
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-[#191919]" />,
      title: 'High-intent leads that never receive structured follow-up',
      description: 'Quotes sent via email or left on voicemails lack automated re-engagement, letting profitable proposals quietly expire.'
    },
    {
      icon: <Layers className="w-5 h-5 text-[#191919]" />,
      title: 'Information fragmented across spreadsheets, inboxes, and apps',
      description: 'Customer context is scattered across personal staff mobiles, paper job cards, and disparate software tools with zero central sync.'
    }
  ];

  const currentTab = industryExamples[activeTab];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F6F2] relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-3">
            <span className="text-[#191919] font-semibold">Operational Reality</span>
            <span aria-hidden="true">·</span>
            <span>Where Revenue Drops Off</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight leading-tight">
            Your customers don’t wait for your workflow to catch up.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#303030] leading-relaxed">
            In service and appointment-based businesses, speed of response, scheduling clarity, and reliable follow-up determine whether an enquiry becomes a confirmed booking or a lost opportunity.
          </p>
        </div>

        {/* 6 Core Friction Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {generalProblems.map((prob, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E7E5E0] rounded-2xl p-6 transition-all hover:border-[#D5D3CC] hover:shadow-xs"
            >
              <div className="p-2.5 bg-[#F7F6F2] border border-[#E7E5E0] text-[#191919] rounded-xl w-fit mb-4">
                {prob.icon}
              </div>
              <h3 className="text-base font-semibold text-[#191919] mb-2 leading-snug">
                {prob.title}
              </h3>
              <p className="text-sm text-[#777777] leading-relaxed">
                {prob.description}
              </p>
            </div>
          ))}
        </div>

        {/* Industry Perspective Interactive Tabs */}
        <div className="bg-white border border-[#E7E5E0] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E7E5E0]">
            <div>
              <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block mb-1">
                Industry Contexts
              </span>
              <h3 className="text-lg font-semibold text-[#191919]">
                How manual bottlenecks present in your specific trade or clinic
              </h3>
            </div>

            {/* Segmented Tab Controls */}
            <div className="flex items-center gap-1 p-1 bg-[#F7F6F2] rounded-xl border border-[#E7E5E0] self-start sm:self-auto overflow-x-auto max-w-full">
              {[
                { id: 'trades', label: 'Trades & HVAC' },
                { id: 'salons', label: 'Hair & Beauty' },
                { id: 'dental', label: 'Dental & Clinics' },
                { id: 'auto', label: 'Automotive' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#191919] text-white shadow-xs'
                      : 'text-[#777777] hover:text-[#191919]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="text-xs font-mono text-[#777777] font-medium">
                {currentTab.industry}
              </div>
              <h4 className="text-xl font-bold text-[#191919] leading-snug">
                {currentTab.scenario}
              </h4>
              <p className="text-sm text-[#303030] leading-relaxed">
                {currentTab.detail}
              </p>
              <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E7E5E0] text-xs text-[#303030]">
                <span className="font-semibold text-[#191919] block mb-1">
                  Commercial Implication:
                </span>
                {currentTab.consequence}
              </div>
            </div>

            <div className="bg-[#F7F6F2] p-6 rounded-xl border border-[#E7E5E0] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#777777] tracking-wider block mb-2 font-medium">
                  {currentTab.statLabel}
                </span>
                <p className="text-xl font-bold text-[#191919] mb-4 leading-snug">
                  {currentTab.statValue}
                </p>
                <p className="text-xs text-[#777777] leading-relaxed">
                  These operational friction points are addressable with deterministic intake and calendar validation pipelines.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7E5E0]">
                {onNavigateToCalculator && (
                  <button
                    onClick={onNavigateToCalculator}
                    className="text-xs font-medium text-[#191919] hover:text-[#777777] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Calculate potential recovered volume</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#191919]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section Climax Statement */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-xl sm:text-2xl font-display font-medium text-[#191919]">
            The problem isn’t that your team isn’t working hard enough. It’s that too much depends on manual processes.
          </p>
          <div className="mt-6">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 text-sm font-medium text-white bg-[#191919] hover:bg-[#303030] active:bg-black rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919]"
            >
              <span>Find Your Automation Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
