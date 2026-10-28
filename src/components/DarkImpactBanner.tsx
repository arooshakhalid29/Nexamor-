import React from 'react';

export const DarkImpactBanner: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#0A0A0A] text-white text-center border-t border-[#1F1F1F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <p className="text-xl sm:text-2xl md:text-3xl text-[#CCCCCC] font-normal leading-relaxed text-balance">
          You don&apos;t care about our code, our latency, or our AI. You care about the{' '}
          <strong className="text-white font-bold underline decoration-white decoration-2 underline-offset-4">
            A$10,000+ recovered
          </strong>{' '}
          from the calls your competitors used to answer. We exist to make sure that money stays in your bank account.
        </p>

        <div className="w-16 h-0.5 bg-[#333333] mx-auto" />

        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#777777]">
          NEXAMOR AI TRANSFORMATION PARTNERS · AUSTRALIA
        </div>

      </div>
    </section>
  );
};
