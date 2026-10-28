import React from 'react';
import { Database, Zap, Clock } from 'lucide-react';

export const ProtocolSection: React.FC = () => {
  const cards = [
    {
      title: 'Deep-Sync with CRMs',
      desc: 'Native read/write capabilities for ServiceTitan, Housecall Pro, Jobber, and Cliniko. No manual data entry.',
      icon: <Database className="w-5 h-5 text-[#191919]" />
    },
    {
      title: 'Emergency Triage Logic',
      desc: 'Our AI doesn&apos;t just &apos;talk&apos;—it qualifies. It identifies high-value emergencies vs. routine inquiries in real time.',
      icon: <Zap className="w-5 h-5 text-[#191919]" />
    },
    {
      title: 'Sub-300ms Latency',
      desc: 'High-performance conversational voice stack that eliminates &apos;robotic delay&apos; for immediate professional urgency.',
      icon: <Clock className="w-5 h-5 text-[#191919]" />
    }
  ];

  return (
    <section id="infrastructure" className="scroll-mt-24 py-20 lg:py-28 bg-white relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header matching Screenshot 2 */}
        <div className="max-w-3xl mb-14">
          {/* Huge Ghost Number 02 */}
          <span className="text-7xl sm:text-8xl lg:text-9xl font-black text-[#E7E5E0]/60 font-mono tracking-tighter select-none block leading-none -mb-4">
            02
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] font-semibold block mb-2">
            THE SPECIALIZATION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191919] tracking-tight leading-tight uppercase">
            AITP Protocol.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#303030] leading-relaxed">
            As an AI Transformation Partner (AITP), our work goes beyond &quot;chatbots.&quot; We provide the architectural bridge between raw AI voice intelligence and your operational backbone.
          </p>
        </div>

        {/* 3 Sleek Cards matching Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-7 flex flex-col justify-between hover:border-[#D5D3CC] hover:bg-white transition-all shadow-xs"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E5E0] flex items-center justify-center text-[#191919] mb-5 shadow-xs">
                  {c.icon}
                </div>
                <h3 className="text-lg font-bold text-[#191919] mb-2">
                  {c.title}
                </h3>
                <p 
                  className="text-xs sm:text-sm text-[#777777] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: c.desc }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
