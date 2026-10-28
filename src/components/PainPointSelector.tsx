import React, { useState } from 'react';
import { 
  PhoneCall, 
  Clock, 
  Calendar, 
  BellRing, 
  Cpu, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface PainPointItem {
  id: number;
  label: string;
  solution: string;
  explanation: string;
  ctaText: string;
  icon: React.ReactNode;
  category: string;
}

interface PainPointSelectorProps {
  onSelectSolutionCta: (solutionCategory: string, solutionName: string) => void;
}

export const PainPointSelector: React.FC<PainPointSelectorProps> = ({
  onSelectSolutionCta,
}) => {
  const [selectedId, setSelectedId] = useState<number>(1);

  const painPoints: PainPointItem[] = [
    {
      id: 1,
      label: 'We miss customer calls.',
      solution: 'AI Voice Receptionist and Missed-Call Recovery',
      explanation: 'Give callers a way to receive an immediate response, share their enquiry, and request a follow-up when your team is unavailable.',
      ctaText: 'Explore Call Automation',
      icon: <PhoneCall className="w-5 h-5 text-[#191919]" />,
      category: 'voice-agents'
    },
    {
      id: 2,
      label: 'We reply to enquiries too slowly.',
      solution: 'AI Enquiry Handling and Lead Qualification',
      explanation: 'Help potential customers receive a faster initial response and guide enquiries toward the right next step.',
      ctaText: 'Explore Lead Response',
      icon: <Clock className="w-5 h-5 text-[#191919]" />,
      category: 'lead-recovery'
    },
    {
      id: 3,
      label: 'Booking appointments takes too much effort.',
      solution: 'Appointment Booking Automation',
      explanation: 'Collect appointment preferences and, when connected to a compatible calendar, help customers find and confirm available slots.',
      ctaText: 'Explore Booking Automation',
      icon: <Calendar className="w-5 h-5 text-[#191919]" />,
      category: 'appointment-booking'
    },
    {
      id: 4,
      label: 'We forget to follow up with leads.',
      solution: 'Lead Follow-Up Workflows',
      explanation: 'Organise enquiry details and trigger appropriate reminders or follow-up tasks through supported integrations.',
      ctaText: 'Explore Follow-Up Automation',
      icon: <BellRing className="w-5 h-5 text-[#191919]" />,
      category: 'crm-workflow'
    },
    {
      id: 5,
      label: 'Our team spends too much time on repetitive admin.',
      solution: 'AI and Workflow Automation',
      explanation: 'Reduce repetitive manual steps by connecting supported tools and automating routine tasks.',
      ctaText: 'Explore Workflow Automation',
      icon: <Cpu className="w-5 h-5 text-[#191919]" />,
      category: 'custom-automation'
    }
  ];

  const activeItem = painPoints.find((p) => p.id === selectedId) || painPoints[0];

  return (
    <section id="pain-points" className="py-20 lg:py-28 bg-white relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F6F2] border border-[#E7E5E0] rounded-full text-xs font-mono text-[#303030] shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#191919]" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">Identify Your Bottleneck</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight leading-tight">
            Where is your business losing leads?
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#303030] leading-relaxed">
            Choose the problem that sounds most familiar. We&apos;ll show you how Nexamor could help.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 5 Selectable Options */}
          <div className="lg:col-span-6 space-y-3" role="radiogroup" aria-label="Business pain points">
            {painPoints.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  role="radio"
                  aria-checked={isSelected}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919] ${
                    isSelected
                      ? 'bg-[#F7F6F2] border-[#191919] shadow-xs'
                      : 'bg-white border-[#E7E5E0] hover:bg-[#F7F6F2]/50 hover:border-[#D5D3CC]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-xl transition-colors ${
                      isSelected ? 'bg-[#191919] text-white' : 'bg-[#F7F6F2] text-[#777777]'
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block font-medium">
                        Problem 0{item.id}
                      </span>
                      <p className={`text-sm sm:text-base font-semibold leading-snug mt-0.5 ${
                        isSelected ? 'text-[#191919]' : 'text-[#303030]'
                      }`}>
                        {item.label}
                      </p>
                    </div>
                  </div>

                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#191919] bg-[#191919]' : 'border-[#E7E5E0] bg-white'
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Matched Solution Display */}
          <div className="lg:col-span-6 bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0] mb-5">
                <span className="text-xs font-mono uppercase text-[#777777] font-semibold tracking-wider">
                  MATCHED SOLUTION
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase bg-white border border-[#E7E5E0] text-[#191919]">
                  Option 0{activeItem.id} Active
                </span>
              </div>

              <div className="p-2.5 bg-white border border-[#E7E5E0] rounded-xl w-fit mb-4">
                {activeItem.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#191919] tracking-tight leading-snug">
                {activeItem.solution}
              </h3>

              <p className="mt-3 text-sm text-[#303030] leading-relaxed">
                {activeItem.explanation}
              </p>

              <div className="mt-6 pt-5 border-t border-[#E7E5E0] space-y-2">
                <span className="text-xs font-mono text-[#777777] uppercase block font-semibold">
                  How this helps your business:
                </span>
                <div className="space-y-1.5 text-xs text-[#303030]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#191919] shrink-0 mt-0.5" />
                    <span>Eliminates missed-caller drop-off when staff are on the tools or greeting arrivals.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#191919] shrink-0 mt-0.5" />
                    <span>Preserves structured notes and caller context so your team never begins from scratch.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectSolutionCta(activeItem.category, activeItem.solution)}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#191919] hover:bg-[#303030] active:bg-black text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <span>{activeItem.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
