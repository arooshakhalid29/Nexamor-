import React from 'react';
import { ShieldCheck, Zap, Terminal } from 'lucide-react';

interface MoatSectionProps {
  onOpenBooking: () => void;
}

export const MoatSection: React.FC<MoatSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="moat" className="scroll-mt-24 py-20 lg:py-28 bg-[#F7F6F2] relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* 03 THE DEVELOPER MOAT matching Screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Authentic IDE Code Window matching Screenshot 2 */}
          <div className="lg:col-span-6 bg-white border border-[#E7E5E0] rounded-2xl shadow-xs overflow-hidden font-mono text-xs">
            {/* Top Window Bar */}
            <div className="bg-[#F7F6F2] px-4 py-3 border-b border-[#E7E5E0] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] text-[#777777] font-semibold">
                infrastructure_deployment.yaml
              </span>
              <Terminal className="w-3.5 h-3.5 text-[#777777]" />
            </div>

            {/* Code Body */}
            <div className="p-5 sm:p-6 text-[#191919] space-y-1.5 leading-relaxed overflow-x-auto bg-[#FCFBF9]">
              <div className="text-[#777777]"># Nexamor Core Voice &amp; CRM Daemon</div>
              <div><span className="text-[#191919] font-bold">services</span>:</div>
              <div className="pl-4"><span className="text-[#191919] font-bold">ai-dispatcher</span>:</div>
              <div className="pl-8"><span className="text-[#777777]">image</span>: <span className="text-emerald-700 font-semibold">nexamor/voice-engine:v2.4.0</span></div>
              <div className="pl-8"><span className="text-[#777777]">latency</span>: <span className="text-emerald-700 font-semibold">&lt;300ms</span></div>
              <div className="pl-8"><span className="text-[#777777]">concurrency</span>: <span className="text-orange-600">50</span></div>
              <div className="pl-8"><span className="text-[#191919] font-bold">integrations</span>:</div>
              <div className="pl-12 text-[#303030]">- servicetitan: <span className="text-emerald-700">write_access</span></div>
              <div className="pl-12 text-[#303030]">- jobber_au: <span className="text-emerald-700">schedule_sync</span></div>
              <div className="pl-12 text-[#303030]">- cliniko: <span className="text-emerald-700">appointment_lock</span></div>
              <div className="pl-8"><span className="text-[#191919] font-bold">languages</span>:</div>
              <div className="pl-12 text-[#777777]">- <span className="text-[#191919]">en-AU (Australian Accent &amp; Slang)</span></div>
              <div className="pl-12 text-[#777777]">- <span className="text-[#191919]">en-UK / en-US</span></div>
              <div className="pl-8"><span className="text-[#191919] font-bold">security</span>:</div>
              <div className="pl-12 text-[#777777]">encryption: <span className="text-emerald-700 font-semibold">AES-256</span></div>
              <div className="pl-12 text-[#777777]">ownership: <span className="text-[#191919] font-bold">client_held</span></div>
            </div>

            {/* Bottom Status Line */}
            <div className="bg-[#F7F6F2] px-4 py-2 border-t border-[#E7E5E0] flex items-center justify-between text-[11px] text-[#777777]">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Build State: SUCCEEDED
              </span>
              <span>Sync Time: &lt;90.002s</span>
            </div>
          </div>

          {/* Right: The Developer Moat Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Huge Ghost Number 03 */}
              <span className="text-7xl sm:text-8xl font-black text-[#E7E5E0]/60 font-mono tracking-tighter select-none block leading-none -mb-3">
                03
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] font-semibold block mb-2">
                THE DEVELOPER MOAT
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191919] tracking-tight leading-tight uppercase">
                Built by Engineers, Not Salespeople.
              </h2>
            </div>

            <p className="text-base text-[#303030] leading-relaxed">
              This isn&apos;t a marketing experiment. Our systems are built by a team with <strong className="text-[#191919]">deep backend architectural experience</strong> and verified technical deployments across Australia.
            </p>

            <p className="text-base text-[#303030] leading-relaxed">
              We don&apos;t just &quot;set up&quot; a service; we build a <strong className="text-[#191919] italic font-semibold">private AI asset</strong> that your company owns. No vendor lock-in. No per-seat licenses. Just raw infrastructure power.
            </p>

            {/* Badges matching Screenshot 2 */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E7E5E0] rounded-full text-xs font-mono text-[#191919] font-medium shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#191919]" />
                <span>Australian Privacy &amp; SOC2 Aligned</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E7E5E0] rounded-full text-xs font-mono text-[#191919] font-medium shadow-xs">
                <Zap className="w-4 h-4 text-[#191919]" />
                <span>Direct API Access</span>
              </div>
            </div>
          </div>

        </div>

        {/* The Strategic Gap matching Screenshot 2 */}
        <div className="space-y-12 pt-12 border-t border-[#E7E5E0]">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-3xl sm:text-4xl font-black text-[#191919] tracking-tight uppercase">
              The Strategic Gap.
            </h3>
            <p className="text-sm sm:text-base text-[#777777]">
              A message to your business: Most AI implementations fail because they are &quot;tacked on.&quot; We build from the foundation up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Left Card: The Traditional Agency */}
            <div className="bg-white border border-[#E7E5E0] rounded-2xl p-7 flex flex-col justify-between shadow-xs opacity-80 hover:opacity-100 transition-opacity">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#777777] font-semibold block mb-2">
                  THE TRADITIONAL AGENCY
                </span>
                <h4 className="text-xl font-bold text-[#777777] italic mb-4">
                  &quot;Tacked-On&quot; Bots
                </h4>
                <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                  Sells a generic chatbot or voice-wrapper &quot;tacked onto&quot; your website. It&apos;s low value, easy for customers to ignore, and completely disconnected from your core business operations.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E7E5E0] text-[11px] font-mono text-rose-600 font-medium">
                ✕ Disconnected · Manual Re-entry · Unreliable
              </div>
            </div>

            {/* Right Card: Nexamor Integrated Infrastructure (High Class Highlight) */}
            <div className="bg-white border-2 border-[#191919] rounded-2xl p-7 flex flex-col justify-between shadow-sm relative">
              <div className="absolute top-6 right-6 text-[#E7E5E0]">
                <Zap className="w-6 h-6 text-[#191919]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#191919] font-bold block mb-2">
                  NEXAMOR (AITP)
                </span>
                <h4 className="text-xl font-black text-[#191919] mb-4">
                  Integrated Infrastructure
                </h4>
                <p className="text-xs sm:text-sm text-[#303030] leading-relaxed">
                  We don&apos;t sell bots. We build <strong className="text-[#191919]">integrated infrastructure</strong> that embeds directly into your CRM, telephony, and workflows. We automate the entire journey—from the first missed call to the final booking.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E7E5E0] text-[11px] font-mono text-emerald-700 font-bold flex items-center justify-between">
                <span>✓ Direct Sync · Sub-300ms · 24/7 Dispatch</span>
                <button
                  onClick={onOpenBooking}
                  className="text-xs text-[#191919] underline font-semibold hover:text-[#777777] cursor-pointer"
                >
                  Audit Your Setup →
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
