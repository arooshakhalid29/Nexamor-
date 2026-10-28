import React from 'react';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface GrandSlamOfferSectionProps {
  onOpenBooking: () => void;
}

export const GrandSlamOfferSection: React.FC<GrandSlamOfferSectionProps> = ({
  onOpenBooking,
}) => {
  const guaranteeItems = [
    {
      num: '1',
      title: 'Performance-First Setup',
      detail: 'Paid only AFTER results and live testing, zero upfront risk.'
    },
    {
      num: '2',
      title: '48-Hour Rapid Deployment',
      detail: 'Paid only AFTER results, no downtime for your existing phone numbers.'
    },
    {
      num: '3',
      title: 'Conditional Guarantee',
      detail: '3 months of dedicated engineering support. We only succeed when you capture more revenue. No surprise charges.'
    },
    {
      num: '4',
      title: 'Aligned Partnership',
      detail: 'Transparent terms. Only active once your phone calls and bookings are converting reliably.'
    },
    {
      num: '5',
      title: 'AITP Model',
      detail: 'Results first, then scale. We map and automate your entire customer journey—delivering outsized value from first missed call to CRM confirmation.'
    }
  ];

  return (
    <section id="offer" className="scroll-mt-24 py-20 lg:py-28 bg-[#F7F6F2] relative border-b border-[#E7E5E0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main High-Class Guarantee Card matching Screenshot 3 */}
        <div className="bg-white border-2 border-[#191919] rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          
          {/* Subtle Shield Watermark in top right */}
          <div className="absolute top-8 right-8 text-[#E7E5E0]/50 pointer-events-none">
            <ShieldCheck className="w-20 h-20" />
          </div>

          <div className="space-y-6 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F6F2] border border-[#E7E5E0] rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-[#191919] font-bold">
              <span>EXCLUSIVE PARTNER PROTOCOL</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191919] tracking-tight leading-[1.1] uppercase max-w-xl">
              Risk-Free Revenue Recovery Protocol. Long-Term Guarantee.
            </h2>

            {/* 5 Numbered Items matching Screenshot 3 */}
            <div className="space-y-4 pt-4 border-t border-[#E7E5E0]">
              {guaranteeItems.map((item) => (
                <div key={item.num} className="flex items-start gap-3.5 text-xs sm:text-sm">
                  <div className="w-6 h-6 rounded-full bg-[#191919] text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono mt-0.5 shadow-xs">
                    {item.num}
                  </div>
                  <div className="leading-relaxed">
                    <strong className="text-[#191919] font-bold">{item.title}:</strong>{' '}
                    <span className="text-[#303030]">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Black Pill Action Button */}
            <div className="pt-6 space-y-3">
              <button
                onClick={onOpenBooking}
                className="w-full py-4.5 bg-[#191919] hover:bg-[#303030] active:bg-black text-white font-bold text-sm tracking-wider uppercase rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919]"
              >
                <span>BOOK YOUR 15-MIN STRATEGY AUDIT →</span>
              </button>

              <p className="text-center text-xs text-[#777777] font-mono">
                Limited to 2 new partners per month to ensure infrastructure stability.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
