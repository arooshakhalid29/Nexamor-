import React from 'react';
import { 
  Wrench, 
  Scissors, 
  Stethoscope, 
  Car, 
  Briefcase, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { PageId } from '../types';

interface IndustriesSectionProps {
  onNavigate?: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const industries = [
    {
      id: 'trades',
      title: 'Home Services & Trades',
      subtitle: 'Plumbing, Electrical, HVAC, Roofing & Building',
      desc: 'Help manage incoming service enquiries, after-hours emergency calls, quote requests, and follow-ups while you and your crew are on tools.',
      benefits: ['Instant triage during job-site hours', 'Emergency callout location capture', 'Automated quote follow-up queue'],
      icon: <Wrench className="w-5 h-5 text-[#191919]" />
    },
    {
      id: 'salons',
      title: 'Salons & Hairdressers',
      subtitle: 'Hair, Beauty, Barber & Aesthetic Studios',
      desc: 'Help handle appointment requests, common treatment questions, and booking-related follow-ups without interrupting active client appointments.',
      benefits: ['24/7 booking intake after salon doors close', 'Automated cancellation fills', 'Treatment & stylist preference holds'],
      icon: <Scissors className="w-5 h-5 text-[#191919]" />
    },
    {
      id: 'dental',
      title: 'Dental & Appointment-Based Clinics',
      subtitle: 'Dental Practices, Physio & Allied Health',
      desc: 'Help streamline enquiry handling, appointment requests, reminders, and administrative workflows. Note: Designed strictly for administrative triage; does not provide clinical diagnosis or replace qualified medical staff.',
      benefits: ['Peak morning reception relief', 'Structured patient detail intake', 'Zero diagnostic claims — strict administrative bounds'],
      icon: <Stethoscope className="w-5 h-5 text-[#191919]" />
    },
    {
      id: 'automotive',
      title: 'Automotive Businesses',
      subtitle: 'Mechanics, Tyre Centres & Detailing Workshops',
      desc: 'Help handle service enquiries, booking requests, customer questions on turnaround times, and follow-ups on repair quotes.',
      benefits: ['Vehicle make/model & service type logging', 'Prompt quote confirmation callbacks', 'Reduced drop-off counter wait times'],
      icon: <Car className="w-5 h-5 text-[#191919]" />
    },
    {
      id: 'other',
      title: 'Other Enquiry-Driven Businesses',
      subtitle: 'Consulting, Property, Legal & Professional Services',
      desc: 'Customise workflows to suit businesses that depend on timely responses, qualifying high-value enquiries, and efficient calendar management.',
      benefits: ['Custom qualification questions', 'Direct lead assignment to appropriate staff', 'Complete audit trail of enquiries'],
      icon: <Briefcase className="w-5 h-5 text-[#191919]" />
    }
  ];

  return (
    <section id="industries" className="scroll-mt-24 py-20 lg:py-28 bg-[#F7F6F2] relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E5E0] rounded-full text-xs font-mono text-[#303030] shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#191919]" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">Domain Coverage</span>
            <span aria-hidden="true" className="text-[#E7E5E0]">·</span>
            <span className="text-[#777777]">Australian Service Sectors</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight leading-tight">
            Industries We Serve
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#303030] leading-relaxed">
            Practical AI voice and workflow systems tailored to real-world Australian operations — configured around the way your specific trade works.
          </p>
        </div>

        {/* 5 Industry Cards (Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="bg-white border border-[#E7E5E0] rounded-2xl p-7 flex flex-col justify-between hover:border-[#D5D3CC] transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl">
                    {ind.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#191919] leading-snug">
                      {ind.title}
                    </h3>
                    <p className="text-xs font-mono text-[#777777]">
                      {ind.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#303030] leading-relaxed mb-6">
                  {ind.desc}
                </p>

                <div className="space-y-1.5 pt-4 border-t border-[#E7E5E0]">
                  {ind.benefits.map((b, bIdx) => (
                    <div key={bIdx} className="text-xs text-[#777777] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#191919]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#E7E5E0]">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 bg-[#F7F6F2] hover:bg-white text-xs font-medium text-[#191919] border border-[#E7E5E0] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Discuss {ind.title} Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#191919]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-4 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#777777] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#191919] shrink-0" />
            <span>Integrations are configured per client and require compatible software or telephony access.</span>
          </div>
          {onNavigate && (
            <button
              onClick={() => {
                onNavigate('industries');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#191919] hover:text-[#777777] font-medium whitespace-nowrap cursor-pointer"
            >
              Explore all industry workflows →
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
