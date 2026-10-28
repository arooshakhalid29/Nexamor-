import React, { useState, useId } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  Info,
  RotateCcw
} from 'lucide-react';

interface RoiCalculatorProps {
  onOpenBooking: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBooking }) => {
  const enquiriesInputId = useId();
  const unansweredInputId = useId();
  const qualifiedInputId = useId();
  const avgValueInputId = useId();
  const marginInputId = useId();
  const recoveryInputId = useId();
  const costInputId = useId();

  // Conservative, realistic defaults
  const [weeklyEnquiries, setWeeklyEnquiries] = useState<number>(45);
  const [unansweredPct, setUnansweredPct] = useState<number>(22);
  const [qualifiedPct, setQualifiedPct] = useState<number>(65);
  const [avgJobValue, setAvgJobValue] = useState<number>(320);
  const [marginPct, setMarginPct] = useState<number>(45);
  const [recoveryRatePct, setRecoveryRatePct] = useState<number>(35);
  const [monthlySystemCost, setMonthlySystemCost] = useState<number>(490);

  const handleReset = () => {
    setWeeklyEnquiries(45);
    setUnansweredPct(22);
    setQualifiedPct(65);
    setAvgJobValue(320);
    setMarginPct(45);
    setRecoveryRatePct(35);
    setMonthlySystemCost(490);
  };

  // Mathematical Calculations
  const monthlyEnquiries = weeklyEnquiries * 4.333;
  const monthlyUnanswered = monthlyEnquiries * (unansweredPct / 100);
  const potentiallyValuableEnquiries = monthlyUnanswered * (qualifiedPct / 100);
  
  // Potential Recovered Bookings
  const recoveredBookingsMonth = potentiallyValuableEnquiries * (recoveryRatePct / 100);
  
  // Potential Recovered Gross Revenue
  const potentialRecoveredRevenue = recoveredBookingsMonth * avgJobValue;
  const annualRecoveredRevenue = potentialRecoveredRevenue * 12;

  // Contribution Margin Impact
  const grossContribution = potentialRecoveredRevenue * (marginPct / 100);
  const netMonthlyImpact = grossContribution - monthlySystemCost;

  // Break-even Recovery Rate calculation
  const breakEvenDenominator = potentiallyValuableEnquiries * avgJobValue * (marginPct / 100);
  const breakEvenRecoveryRate = breakEvenDenominator > 0 
    ? Math.min(100, Math.max(1, (monthlySystemCost / breakEvenDenominator) * 100))
    : 0;

  return (
    <section id="roi-calculator" className="py-20 lg:py-28 bg-white relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Opportunity Modeling</span>
            <span aria-hidden="true">·</span>
            <span>Operational Scenario</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight">
            Calculate your operational opportunity cost.
          </h2>
          <p className="mt-3 text-[#303030] text-sm sm:text-base leading-relaxed">
            Test realistic scenarios based on your current weekly enquiry volume, typical unanswered rate, and average transaction value.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E0]">
              <div className="flex items-center gap-2 text-[#191919] font-semibold text-sm">
                <Calculator className="w-4 h-4 text-[#191919]" />
                <span>Scenario Inputs (Conservative Estimates)</span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-[#777777] hover:text-[#191919] flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset to default conservative parameters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Input 1: Weekly Enquiries */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={enquiriesInputId} className="text-[#303030] font-medium">Inbound enquiries per week (calls, web, emails)</label>
                <span className="font-mono text-[#191919] font-semibold bg-white border border-[#E7E5E0] px-2 py-0.5 rounded-md tabular-nums shadow-xs">
                  {weeklyEnquiries} / week
                </span>
              </div>
              <input
                id={enquiriesInputId}
                type="range"
                min="10"
                max="250"
                step="5"
                value={weeklyEnquiries}
                onChange={(e) => setWeeklyEnquiries(Number(e.target.value))}
                className="w-full accent-[#191919] bg-[#E7E5E0] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[11px] text-[#777777] block">
                Estimated ~{Math.round(monthlyEnquiries)} enquiries per calendar month.
              </span>
            </div>

            {/* Input 2: Unanswered Proportion */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={unansweredInputId} className="text-[#303030] font-medium">Estimated proportion currently unanswered / missed</label>
                <span className="font-mono text-[#191919] font-semibold bg-white border border-[#E7E5E0] px-2 py-0.5 rounded-md tabular-nums shadow-xs">
                  {unansweredPct}%
                </span>
              </div>
              <input
                id={unansweredInputId}
                type="range"
                min="5"
                max="60"
                step="1"
                value={unansweredPct}
                onChange={(e) => setUnansweredPct(Number(e.target.value))}
                className="w-full accent-[#191919] bg-[#E7E5E0] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[11px] text-[#777777] block">
                Includes calls during client appointments, after 5:00 PM, and weekend overflow.
              </span>
            </div>

            {/* Input 3: Qualified Opportunity Proportion */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={qualifiedInputId} className="text-[#303030] font-medium">Proportion of missed enquiries that represent genuine potential jobs</label>
                <span className="font-mono text-[#191919] font-semibold bg-white border border-[#E7E5E0] px-2 py-0.5 rounded-md tabular-nums shadow-xs">
                  {qualifiedPct}%
                </span>
              </div>
              <input
                id={qualifiedInputId}
                type="range"
                min="20"
                max="90"
                step="5"
                value={qualifiedPct}
                onChange={(e) => setQualifiedPct(Number(e.target.value))}
                className="w-full accent-[#191919] bg-[#E7E5E0] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[11px] text-[#777777] block">
                Excludes wrong numbers, spam callers, and enquiries outside service radius.
              </span>
            </div>

            {/* Input 4: Average Transaction Value */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={avgValueInputId} className="text-[#303030] font-medium">Average job or booking value ($ AUD)</label>
                <span className="font-mono text-[#191919] font-semibold bg-white border border-[#E7E5E0] px-2 py-0.5 rounded-md tabular-nums shadow-xs">
                  ${avgJobValue} AUD
                </span>
              </div>
              <input
                id={avgValueInputId}
                type="range"
                min="80"
                max="2500"
                step="20"
                value={avgJobValue}
                onChange={(e) => setAvgJobValue(Number(e.target.value))}
                className="w-full accent-[#191919] bg-[#E7E5E0] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[11px] text-[#777777] block">
                Typical single appointment or standard service transaction invoice.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Input 5: Contribution Margin */}
              <div className="space-y-2 bg-white p-4 rounded-xl border border-[#E7E5E0] shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor={marginInputId} className="text-[#303030] font-medium">Contribution Margin</label>
                  <span className="font-mono text-[#191919] font-semibold tabular-nums">
                    {marginPct}%
                  </span>
                </div>
                <input
                  id={marginInputId}
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={marginPct}
                  onChange={(e) => setMarginPct(Number(e.target.value))}
                  className="w-full accent-[#191919] bg-[#E7E5E0] h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-[#777777] block">
                  Gross profit margin after direct labour &amp; materials.
                </span>
              </div>

              {/* Input 6: Estimated Recovery Rate */}
              <div className="space-y-2 bg-white p-4 rounded-xl border border-[#E7E5E0] shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor={recoveryInputId} className="text-[#303030] font-medium">Estimated Recovery Rate</label>
                  <span className="font-mono text-[#191919] font-semibold tabular-nums">
                    {recoveryRatePct}%
                  </span>
                </div>
                <input
                  id={recoveryInputId}
                  type="range"
                  min="15"
                  max="70"
                  step="5"
                  value={recoveryRatePct}
                  onChange={(e) => setRecoveryRatePct(Number(e.target.value))}
                  className="w-full accent-[#191919] bg-[#E7E5E0] h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-[#777777] block">
                  Proportion captured via immediate response &amp; self-booking.
                </span>
              </div>
            </div>

            {/* Input 7: Estimated Automation & Retainer Cost */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-[#E7E5E0] shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={costInputId} className="text-[#303030] font-medium">Estimated monthly automation &amp; infrastructure investment</label>
                <span className="font-mono text-[#191919] font-semibold tabular-nums">
                  ${monthlySystemCost} AUD / mo
                </span>
              </div>
              <input
                id={costInputId}
                type="range"
                min="200"
                max="1500"
                step="50"
                value={monthlySystemCost}
                onChange={(e) => setMonthlySystemCost(Number(e.target.value))}
                className="w-full accent-[#191919] bg-[#E7E5E0] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-[#777777] block">
                Illustrative ongoing operational infrastructure and telephone line fees.
              </span>
            </div>
          </div>

          {/* Right Column: Output Summary & Opportunity Breakdown */}
          <div className="lg:col-span-5 bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0] mb-6">
                <span className="text-xs font-mono uppercase text-[#191919] font-semibold">
                  SCENARIO ANALYSIS RESULTS
                </span>
                <span className="text-[11px] text-[#777777] font-mono">
                  Monthly Baseline
                </span>
              </div>

              {/* Marquee Metric 1: Potential Recovered Revenue */}
              <div className="bg-white p-5 rounded-2xl border border-[#E7E5E0] mb-4 shadow-xs">
                <span className="text-xs text-[#777777] block mb-1">
                  Illustrative Potential Recovered Revenue
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-[#191919] tabular-nums">
                    ${Math.round(potentialRecoveredRevenue).toLocaleString()}
                  </span>
                  <span className="text-xs text-[#777777] font-mono">
                    AUD / month
                  </span>
                </div>
                <div className="text-xs text-[#777777] font-mono mt-1 font-medium">
                  ≈ ${Math.round(annualRecoveredRevenue).toLocaleString()} AUD annualised volume
                </div>
              </div>

              {/* Key Intermediate Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">
                <div className="bg-white p-3.5 rounded-xl border border-[#E7E5E0] shadow-xs">
                  <span className="text-[10px] uppercase text-[#777777] block mb-1">
                    Unanswered / Mo
                  </span>
                  <span className="text-base text-[#191919] font-bold tabular-nums">
                    {Math.round(monthlyUnanswered)} calls
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#E7E5E0] shadow-xs">
                  <span className="text-[10px] uppercase text-[#777777] block mb-1">
                    Recovered Bookings
                  </span>
                  <span className="text-base text-[#191919] font-bold tabular-nums">
                    {recoveredBookingsMonth.toFixed(1)} / mo
                  </span>
                </div>
              </div>

              {/* Net Economic Impact */}
              <div className="bg-white p-4 rounded-xl border border-[#E7E5E0] space-y-2 text-xs shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Gross Contribution ({marginPct}%):</span>
                  <span className="font-mono text-[#191919] tabular-nums font-medium">
                    +${Math.round(grossContribution).toLocaleString()} AUD
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Entered System Cost:</span>
                  <span className="font-mono text-[#777777] tabular-nums">
                    -${monthlySystemCost} AUD
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E7E5E0] flex items-center justify-between font-semibold">
                  <span className="text-[#191919]">Estimated Net Monthly Value:</span>
                  <span className="font-mono text-[#191919] text-sm tabular-nums">
                    +${Math.round(netMonthlyImpact).toLocaleString()} AUD / mo
                  </span>
                </div>
              </div>

              {/* Break-even Indicator */}
              <div className="mt-4 p-3 bg-white rounded-xl border border-[#E7E5E0] flex items-center justify-between text-xs shadow-xs">
                <div className="flex items-center gap-1.5 text-[#303030]">
                  <Info className="w-3.5 h-3.5 text-[#777777]" />
                  <span>Break-Even Recovery Rate:</span>
                </div>
                <span className="font-mono font-bold text-[#191919] tabular-nums bg-[#F7F6F2] border border-[#E7E5E0] px-2 py-0.5 rounded">
                  {breakEvenRecoveryRate.toFixed(1)}% of lost leads
                </span>
              </div>
            </div>

            {/* Disclaimer & Action */}
            <div className="mt-6 pt-4 border-t border-[#E7E5E0] space-y-4">
              <div className="flex items-start gap-2 text-[11px] text-[#777777] leading-normal">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#777777]" />
                <p>
                  <strong>Disclaimer:</strong> This calculation is an illustrative scenario model based strictly on user-entered assumptions. It is not an earnings claim, financial forecast, or guarantee of commercial results.
                </p>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 bg-[#191919] hover:bg-[#303030] active:bg-black text-white text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer shadow-xs text-center"
              >
                Discuss Feasibility for Your Volume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
