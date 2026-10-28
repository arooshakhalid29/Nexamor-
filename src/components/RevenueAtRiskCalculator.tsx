import React, { useState, useId } from 'react';
import { Phone, Zap, ShieldCheck, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';

interface RevenueAtRiskCalculatorProps {
  onOpenBooking?: () => void;
  onExploreSolutions?: () => void;
}

export const RevenueAtRiskCalculator: React.FC<RevenueAtRiskCalculatorProps> = ({
  onOpenBooking,
}) => {
  const missedWeeklyInputId = useId();

  // Baseline defaults
  const [weeklyMissed, setWeeklyMissed] = useState<number>(10);
  const [avgTicket, setAvgTicket] = useState<number>(500);
  const [leakRate, setLeakRate] = useState<number>(20);

  // Safe numerical calculations
  const safeMissed = Math.max(0, isNaN(weeklyMissed) ? 0 : weeklyMissed);
  const safeTicket = Math.max(0, isNaN(avgTicket) ? 0 : avgTicket);
  const safeRate = Math.min(100, Math.max(0, isNaN(leakRate) ? 0 : leakRate));

  // Annual calculation: weekly × leakRate% × avgTicket × 52
  const annualLeak = safeMissed * (safeRate / 100) * safeTicket * 52;

  const handleReset = () => {
    setWeeklyMissed(10);
    setAvgTicket(500);
    setLeakRate(20);
  };

  const formatAUD = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(amount).replace('$', 'A$');
  };

  return (
    <section id="roi" className="scroll-mt-24 py-20 lg:py-28 bg-[#F7F6F2] relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column matching Screenshot 1 */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E5E0] rounded-full text-[11px] font-mono text-[#777777] uppercase tracking-wider mb-4 shadow-xs">
                <span>ROI Engine</span>
                <span className="text-[#E7E5E0]">·</span>
                <span>Financial Impact</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-[#191919] tracking-tight leading-[1.1] uppercase">
                Audit Your{' '}
                <span className="relative inline-block text-[#191919]">
                  {formatAUD(annualLeak)}
                  <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#E7E5E0] -z-10 rounded-xs" />
                </span>{' '}
                Potential Annual Leak.
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#303030] leading-relaxed">
                Most owners think a missed call is just a &quot;call back later.&quot; In high-stakes service businesses, if you don&apos;t answer in 3 rings, they click the next Google result.
              </p>
            </div>

            {/* 3 Value bullets matching Screenshot 1 */}
            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E5E0] flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-4 h-4 text-[#191919]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191919]">
                    We are not a chatbot.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#777777] mt-0.5 leading-relaxed">
                    Chatbots don&apos;t book high-value jobs or triage emergencies. Our voice AI infrastructure does.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E5E0] flex items-center justify-center shrink-0 shadow-xs">
                  <Zap className="w-4 h-4 text-[#191919]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191919]">
                    Revenue Recovery Engine.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#777777] mt-0.5 leading-relaxed">
                    Automated outbound follow-up on every abandoned call and missed web enquiry within 60 seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E5E0] flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#191919]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191919]">
                    &quot;Done-For-You&quot; (DFY) Deployment.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#777777] mt-0.5 leading-relaxed">
                    You don&apos;t need to learn AI. We build, install, test, and manage the entire infrastructure for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Card matching Screenshot 1 */}
          <div className="lg:col-span-6 bg-white border border-[#E7E5E0] rounded-2xl p-7 sm:p-9 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#191919]">
                LEAK CALCULATOR
              </span>
              <button
                onClick={handleReset}
                className="text-xs font-mono text-[#777777] hover:text-[#191919] flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset calculator values"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Slider: Missed Calls Per Week */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor={missedWeeklyInputId} className="font-semibold text-[#191919]">
                  Missed Calls Per Week
                </label>
                <span className="font-mono font-bold text-base text-[#191919] bg-[#F7F6F2] border border-[#E7E5E0] px-3 py-1 rounded-lg">
                  {safeMissed}
                </span>
              </div>
              <input
                id={missedWeeklyInputId}
                type="range"
                min="0"
                max="80"
                step="1"
                value={weeklyMissed}
                onChange={(e) => setWeeklyMissed(Number(e.target.value))}
                className="w-full accent-[#191919] bg-[#E7E5E0] h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#777777]">
                <span>0 calls</span>
                <span>Default: 10/wk</span>
                <span>80 calls</span>
              </div>
            </div>

            {/* Readouts & Ticket selection */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-sm py-2 border-t border-[#E7E5E0]">
                <span className="text-[#777777]">Average Ticket (AUD)</span>
                <div className="flex items-center gap-1.5">
                  {[350, 500, 1500].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAvgTicket(val)}
                      className={`px-2 py-0.5 text-xs font-mono rounded cursor-pointer transition-colors ${
                        avgTicket === val
                          ? 'bg-[#191919] text-white font-bold'
                          : 'bg-[#F7F6F2] text-[#777777] hover:text-[#191919] border border-[#E7E5E0]'
                      }`}
                    >
                      A${val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm py-2 border-t border-[#E7E5E0]">
                <span className="text-[#777777]">Industry Leak Rate</span>
                <span className="font-mono font-semibold text-[#191919]">
                  {safeRate}%
                </span>
              </div>
            </div>

            {/* Big Prominent Calculated Result */}
            <div className="pt-4 border-t border-[#E7E5E0] space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold block">
                ESTIMATED ANNUAL REVENUE LEAK
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-[#191919] tracking-tight">
                {formatAUD(annualLeak)}
              </div>
            </div>

            {/* CTA Button matching Screenshot 1 */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-4 bg-[#191919] hover:bg-[#303030] active:bg-black text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919]"
              >
                <span>Calculate Your Opportunity With Nexamor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mandatory Transparency Note */}
            <div className="text-[11px] text-[#777777] leading-relaxed pt-2 border-t border-[#E7E5E0] flex items-start gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#777777] shrink-0 mt-0.5" />
              <p>
                Illustrative estimate based on your provided assumptions. Not a verified industry benchmark or guaranteed recovery. Actual results depend on call volume, ticket size, and operational capacity.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
