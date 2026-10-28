import React from 'react';
import { 
  PhoneCall, 
  Zap, 
  CalendarCheck, 
  Database, 
  Cpu, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface CompactSolutionsSectionProps {
  onOpenBooking: () => void;
  onExploreMore: () => void;
}

export const CompactSolutionsSection: React.FC<CompactSolutionsSectionProps> = ({
  onOpenBooking,
  onExploreMore,
}) => {
  const solutions = [
    {
      title: 'AI Voice Receptionist',
      whatItDoes: 'Help callers get an initial response, answer supported routine questions, and route enquiries.',
      whoBenefits: 'Service businesses missing calls while on job sites or serving customers face-to-face.',
      icon: <PhoneCall className="w-5 h-5 text-[#191919]" />,
      statusNote: 'Tested conversational logic; carrier forwarding required'
    },
    {
      title: 'Missed-Call Recovery',
      whatItDoes: 'Create a follow-up process for eligible missed calls or enquiries where the required phone integration is configured.',
      whoBenefits: 'High-volume businesses where unanswered callers immediately contact competitors.',
      icon: <Zap className="w-5 h-5 text-[#191919]" />,
      statusNote: 'Automated SMS or intake queue integration'
    },
    {
      title: 'Appointment Automation',
      whatItDoes: 'Collect booking requests and connect to compatible scheduling systems when integrated.',
      whoBenefits: 'Salons, dental clinics, allied health practices, and automotive workshops.',
      icon: <CalendarCheck className="w-5 h-5 text-[#191919]" />,
      statusNote: 'Requires supported calendar or booking API access'
    },
    {
      title: 'Lead Qualification and Follow-Up',
      whatItDoes: 'Capture enquiry details, organise leads, and support consistent follow-up workflows.',
      whoBenefits: 'Companies receiving quotes or online queries that go cold without fast response.',
      icon: <Database className="w-5 h-5 text-[#191919]" />,
      statusNote: 'Configurable webhook and CRM pipeline'
    },
    {
      title: 'Business Workflow Automation',
      whatItDoes: 'Connect compatible applications and reduce repetitive manual tasks.',
      whoBenefits: 'Teams spending hours manually copying contact and job data across spreadsheets.',
      icon: <Cpu className="w-5 h-5 text-[#191919]" />,
      statusNote: 'Custom connector architecture'
    }
  ];

  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#F7F6F2] relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E5E0] rounded-full text-xs font-mono text-[#303030] shadow-xs mb-3">
              <span className="w-2 h-2 rounded-full bg-[#191919]" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">Practical Automation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight">
              What Nexamor delivers.
            </h2>
            <p className="mt-3 text-base text-[#303030] leading-relaxed">
              Targeted systems engineered to stop leads from falling through the cracks, explained in plain language.
            </p>
          </div>

          <button
            onClick={onExploreMore}
            className="text-xs font-semibold text-[#191919] hover:text-[#777777] flex items-center gap-1 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View full technical details</span>
            <ChevronRight className="w-4 h-4 text-[#191919]" />
          </button>
        </div>

        {/* Compact Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E7E5E0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#D5D3CC] transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#F7F6F2] border border-[#E7E5E0] text-[#191919] rounded-xl w-fit">
                    {sol.icon}
                  </div>
                  <span className="text-[10px] font-mono text-[#777777] uppercase bg-[#F7F6F2] border border-[#E7E5E0] px-2 py-0.5 rounded">
                    Area 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#191919] mb-2">
                  {sol.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#303030] leading-relaxed mb-4">
                  {sol.whatItDoes}
                </p>

                <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#E7E5E0] space-y-1 mb-4">
                  <span className="text-[10px] font-mono uppercase text-[#777777] font-semibold block">
                    Who benefits:
                  </span>
                  <p className="text-xs text-[#303030] leading-relaxed">
                    {sol.whoBenefits}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E7E5E0] flex items-center justify-between text-[11px] font-mono text-[#777777]">
                <span>{sol.statusNote}</span>
              </div>
            </div>
          ))}

          {/* Quick Consultation Card */}
          <div className="bg-[#191919] text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A0A0A0] font-semibold block mb-2">
                Custom Scoping
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Unsure which workflow to automate first?
              </h3>
              <p className="text-xs text-[#E7E5E0] leading-relaxed mb-6">
                We review your call volume, staff rosters, and software stack to determine what should be automated and what should stay human-led.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 bg-white hover:bg-[#F7F6F2] text-[#191919] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Discuss Your Workflow Needs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
