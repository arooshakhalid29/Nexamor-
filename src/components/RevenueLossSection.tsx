import React from 'react';
import { PhoneOff, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

interface RevenueLossSectionProps {
  onExploreCalculator?: () => void;
}

export const RevenueLossSection: React.FC<RevenueLossSectionProps> = ({
  onExploreCalculator,
}) => {
  const problems = [
    {
      icon: <PhoneOff className="w-5 h-5 text-[#191919]" />,
      title: 'Missed calls',
      highlight: 'contact another business',
      description: 'Potential customers may contact another business when nobody answers.'
    },
    {
      icon: <Clock className="w-5 h-5 text-[#191919]" />,
      title: 'Slow responses',
      highlight: 'lose interest',
      description: 'Interested leads may lose interest or choose a business that responds sooner.'
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-[#191919]" />,
      title: 'Forgotten follow-ups',
      highlight: 'missed opportunities',
      description: 'Enquiries that never receive a timely response can become missed opportunities.'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F6F2] border border-[#E7E5E0] rounded-full text-xs font-mono text-[#303030] shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#191919]" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">The Cost of Inaction</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight leading-tight">
            Your next customer might be calling your competitor.
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#303030] leading-relaxed">
            Every unanswered enquiry is a chance for a potential customer to move on. Slow replies and forgotten follow-ups can make that easier.
          </p>
        </div>

        {/* 3 Concise Problems: Horizontal on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#D5D3CC] hover:bg-white transition-all shadow-xs"
            >
              <div>
                <div className="p-2.5 bg-white border border-[#E7E5E0] text-[#191919] rounded-xl w-fit mb-4">
                  {prob.icon}
                </div>
                <h3 className="text-lg font-bold text-[#191919] mb-2">
                  {prob.title}
                </h3>
                <p className="text-sm text-[#303030] leading-relaxed">
                  {prob.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7E5E0] text-[11px] font-mono text-[#777777]">
                Risk: Customer goes elsewhere
              </div>
            </div>
          ))}
        </div>

        {/* Context Note & Smooth Link to Calculator */}
        <div className="p-5 bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <p className="text-xs text-[#777777] max-w-2xl leading-relaxed">
            <strong className="text-[#191919]">Real-world consideration:</strong> Not every missed call represents lost revenue. The actual commercial impact depends on your business model, enquiry quality, team availability, and conversion rate.
          </p>
          {onExploreCalculator && (
            <button
              onClick={onExploreCalculator}
              className="text-xs font-semibold text-[#191919] hover:text-[#777777] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Calculate potential revenue at risk</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#191919]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
