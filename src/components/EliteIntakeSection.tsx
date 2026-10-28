import React from 'react';
import { Lock, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface EliteIntakeSectionProps {
  onOpenBooking: () => void;
}

export const EliteIntakeSection: React.FC<EliteIntakeSectionProps> = ({
  onOpenBooking,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-white relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column matching Screenshot 3 */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F6F2] border border-[#E7E5E0] rounded-full text-[11px] font-mono text-[#777777] uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#191919]" />
              <span>Partner Qualification</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#191919] tracking-tight leading-[1.1] uppercase">
              We Don&apos;t Accept Everyone. <br />
              We Partner with the Best.
            </h2>

            <p className="text-base sm:text-lg text-[#303030] leading-relaxed">
              Because we deploy <strong className="text-[#191919]">high-performance business systems</strong> rather than surface-level tools, our resources are finite. We are a premium technical partner. We only accept 2 new partners per month to maintain our 100% success rate.
            </p>

            {/* 3 Qualification criteria */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#191919] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#191919]">
                    Operational Maturity
                  </h4>
                  <p className="text-xs sm:text-sm text-[#777777] leading-relaxed mt-0.5">
                    We only work with firms that have the internal capacity and staff readiness to handle the 20–30% enquiry surge we deliver.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#191919] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#191919]">
                    Direct Expert Access
                  </h4>
                  <p className="text-xs sm:text-sm text-[#777777] leading-relaxed mt-0.5">
                    You work directly with the specialists who build and manage your system. No account managers. No juniors. Just the engineers responsible for your results.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#191919] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#191919]">
                    Custom-Built Systems
                  </h4>
                  <p className="text-xs sm:text-sm text-[#777777] leading-relaxed mt-0.5">
                    We leverage world-class technology to build a system specifically for your business. We don&apos;t use cookie-cutter templates; we engineer the setup for durable results.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 bg-[#191919] hover:bg-[#303030] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Request Strategic Partnership Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Dark Elite Intake Protocol Card matching Screenshot 3 */}
          <div className="lg:col-span-5 bg-[#121212] border border-[#303030] rounded-2xl p-7 sm:p-8 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white">
                <Shield className="w-4 h-4 text-white" />
                <span>ELITE INTAKE PROTOCOL</span>
              </div>
              <Lock className="w-4 h-4 text-[#777777]" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold">Status: Open for Qualified Australian Partners</span>
              </div>
              <span className="text-[11px] font-mono text-[#777777] block">
                Current Intake Cycle: Limited Capacity
              </span>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-3 text-xs leading-relaxed text-[#E7E5E0]">
              <p>
                We do not mass-market. We identify and approach a select handful of Australian market leaders each quarter whose operational maturity is ready for elite-level transformation.
              </p>
              <p className="text-[#777777]">
                If you are reading this, your firm is reviewing high-potential AI voice and workflow infrastructure built to keep customer revenue in your bank account.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#777777] font-mono">
              <span>Strict 2-Partner Monthly Cap</span>
              <span className="text-white font-semibold">100% Delivery SLA</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
