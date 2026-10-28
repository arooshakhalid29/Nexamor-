import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Target, 
  Eye, 
  Users, 
  Lock, 
  LineChart, 
  ArrowRight 
} from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const principles = [
    {
      title: 'Practical engineering over hype',
      icon: <Cpu className="w-5 h-5 text-[#191919]" />,
      desc: 'We do not sell sci-fi fantasies or empty promises. Useful AI is defined by whether it reliably answers an urgent phone call, reserves a valid calendar slot, or logs clean data into your CRM.'
    },
    {
      title: 'Business-first problem solving',
      icon: <Target className="w-5 h-5 text-[#191919]" />,
      desc: 'We start with your operational bottlenecks—missed after-hours calls, technician interruptions, unconfirmed appointments—and only build automation where it generates measurable return.'
    },
    {
      title: 'Transparent scope and limitations',
      icon: <Eye className="w-5 h-5 text-[#191919]" />,
      desc: 'We are completely transparent about what AI can and cannot do. We clearly distinguish between what is already implemented and what requires external third-party API capabilities.'
    },
    {
      title: 'Human oversight where appropriate',
      icon: <Users className="w-5 h-5 text-[#191919]" />,
      desc: 'AI is not a substitute for human trade craftsmanship, clinical diagnosis, or genuine empathy. We engineer deterministic escalation paths so that complex or sensitive calls reach human staff.'
    },
    {
      title: 'Security-conscious design',
      icon: <Lock className="w-5 h-5 text-[#191919]" />,
      desc: 'We adhere to the Australian Privacy Principles (APPs). Customer data is encrypted in transit and at rest, and private business information is never fed into public training datasets.'
    },
    {
      title: 'Continuous improvement based on evidence',
      icon: <LineChart className="w-5 h-5 text-[#191919]" />,
      desc: 'Production systems must be actively monitored. We review actual transcripts and operational edge cases to refine prompts and system logic over time.'
    }
  ];

  return (
    <div className="py-16 lg:py-24 bg-[#F7F6F2] text-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Engineering Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Brand Position</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight leading-tight">
            Engineering Practical Systems for Australian Business
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#303030] leading-relaxed">
            Nexamor was founded to bridge the divide between emerging artificial intelligence research and the daily operational realities of Australian service businesses.
          </p>
        </div>

        {/* Core Mission Block */}
        <div className="bg-white border border-[#E7E5E0] rounded-2xl p-8 sm:p-12 mb-16 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono text-[#777777] uppercase tracking-wider font-semibold">
              OUR GUIDING BELIEF
            </span>
            <blockquote className="text-xl sm:text-2xl font-display font-medium text-[#191919] leading-relaxed">
              &quot;At Nexamor, we believe useful AI is measured by what it helps a business accomplish. We focus on the systems behind customer communication, appointment workflows, and daily operations, bringing AI, software engineering, and integrations together around real business needs.&quot;
            </blockquote>
            <p className="text-xs text-[#777777] pt-2 font-mono">
              Nexamor Systems Architecture · Australian AI Transformation Partner
            </p>
          </div>
        </div>

        {/* 6 Guiding Principles */}
        <div className="mb-20">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">
              Our Core Engineering Principles
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#777777]">
              The non-negotiable architectural standards that govern every system we deploy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((pr, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E7E5E0] rounded-2xl p-6 space-y-3 hover:border-[#D5D3CC] transition-all shadow-xs"
              >
                <div className="p-2.5 bg-[#F7F6F2] border border-[#E7E5E0] text-[#191919] rounded-xl w-fit">
                  {pr.icon}
                </div>
                <h3 className="text-base font-bold text-[#191919]">
                  {pr.title}
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  {pr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Honest Positioning Statement */}
        <div className="bg-white border border-[#E7E5E0] rounded-2xl p-8 sm:p-10 mb-16 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#191919]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-semibold">Our Commercial Commitment</span>
              </div>
              <h3 className="text-xl font-bold text-[#191919]">
                No Fake Hype. No Speculative Certifications.
              </h3>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                We do not claim 20 years of AI history, invented team counts, or fake customer logos. We represent Nexamor as an agile, engineer-led consultancy building high-precision systems for Australian companies who demand accountability and measurable business improvement.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 bg-[#191919] hover:bg-[#303030] active:bg-black text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Work With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
