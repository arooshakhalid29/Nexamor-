import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, ArrowRight, ChevronDown, ArrowUp, ArrowDown, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onHearDemo: () => void;
  onViewInfrastructure: () => void;
}

// 3 Headline hooks matching the inspiration screenshots
const HEADLINE_HOOKS = [
  {
    id: 1,
    line1: 'STOP BLEEDING REVENUE.',
    line2Prefix: 'EVERY MISSED CALL IS A ',
    highlight: '$5,000 GIFT',
    line2Suffix: ' TO YOUR COMPETITOR.',
  },
  {
    id: 2,
    line1: 'STOP LOSING LEADS.',
    line2Prefix: 'SLOW FOLLOW-UPS ARE ',
    highlight: 'HANDING CLIENTS',
    line2Suffix: ' TO COMPETITORS.',
  },
  {
    id: 3,
    line1: 'STOP SENDING CUSTOMERS',
    line2Prefix: 'TO OPERATORS WHO ',
    highlight: 'SIMPLY ANSWER FIRST.',
    line2Suffix: '',
  },
];

// Audio Waveform Bar Heights for the central inspiration visual
const WAVEFORM_BARS = [
  14, 22, 18, 32, 26, 44, 38, 52, 34, 48, 
  28, 40, 56, 36, 46, 60, 42, 50, 64, 48, 
  36, 54, 40, 58, 32, 44, 28, 48, 34, 40, 
  26, 38, 22, 30, 16, 24
];

const NATIVE_INTEGRATIONS = [
  'ServiceTitan',
  'Housecall Pro',
  'Jobber',
  'FieldEdge',
  'Cliniko',
  'Simpro',
  'Google LSA',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onHearDemo,
  onViewInfrastructure,
}) => {
  const [hookIndex, setHookIndex] = useState<number>(0);
  const [transitionDirection, setTransitionDirection] = useState<'down-to-up' | 'up-to-down'>('down-to-up');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    if (!mediaQuery.matches) {
      const interval = setInterval(() => {
        setHookIndex((prev) => (prev + 1) % HEADLINE_HOOKS.length);
      }, 4200);
      return () => {
        clearInterval(interval);
        mediaQuery.removeEventListener('change', handleMotionChange);
      };
    }

    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  const currentHook = HEADLINE_HOOKS[hookIndex];

  // Motion variants for smooth vertical text translation:
  // "down-to-up": enters from below (+40px), exits upward (-40px)
  // "up-to-down": enters from above (-40px), exits downward (+40px)
  const variants = {
    initial: {
      y: transitionDirection === 'down-to-up' ? 36 : -36,
      opacity: 0,
      filter: 'blur(4px)',
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: {
      y: transitionDirection === 'down-to-up' ? -36 : 36,
      opacity: 0,
      filter: 'blur(4px)',
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const toggleDirection = () => {
    setTransitionDirection((prev) => (prev === 'down-to-up' ? 'up-to-down' : 'down-to-up'));
  };

  return (
    <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-28 bg-[#F7F6F2] bg-architectural-grid border-b border-[#E7E5E0] text-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow directly matching Screenshot 1 */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#777777] font-medium">
            AI TRANSFORMATION PARTNER (AITP), MOVING BEYOND THE TRADITIONAL AGENCY
          </span>
        </div>

        {/* Fixed-height container with vertical text translation (down-to-up / up-to-down) */}
        <div className="min-h-[180px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[280px] flex items-center justify-center mb-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHook.id}
              initial={prefersReducedMotion ? false : variants.initial}
              animate={variants.animate}
              exit={prefersReducedMotion ? undefined : variants.exit}
              className="w-full"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#191919] leading-[1.05] text-balance">
                <span className="block font-black">
                  {currentHook.line1}
                </span>
                <span className="block mt-1 sm:mt-2 font-black">
                  {currentHook.line2Prefix}
                  <span className="relative inline-block text-[#191919]">
                    {currentHook.highlight}
                    {/* Minimalist highlight bar under the key dollar/loss phrase */}
                    <span className="absolute bottom-0 sm:bottom-1 left-0 right-0 h-2 sm:h-3 bg-[#E7E5E0] -z-10 rounded-xs" />
                  </span>
                  {currentHook.line2Suffix}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Direction Indicator & Manual Trigger (High Class Polish) */}
        <div className="flex items-center justify-center gap-3 mb-6 text-xs text-[#777777] font-mono">
          <div className="flex items-center gap-1.5 bg-white border border-[#E7E5E0] rounded-full px-3 py-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#191919] animate-pulse" />
            <span>0{hookIndex + 1} / 0{HEADLINE_HOOKS.length}</span>
            <span className="text-[#E7E5E0]">·</span>
            <button
              onClick={toggleDirection}
              className="text-[#191919] hover:text-[#777777] flex items-center gap-1 font-semibold cursor-pointer transition-colors"
              title="Click to switch text translation direction"
            >
              <span>{transitionDirection === 'down-to-up' ? 'Transition: Down to Up' : 'Transition: Up to Down'}</span>
              {transitionDirection === 'down-to-up' ? (
                <ArrowUp className="w-3 h-3 text-[#191919]" />
              ) : (
                <ArrowDown className="w-3 h-3 text-[#191919]" />
              )}
            </button>
          </div>
        </div>

        {/* Subtitle directly matching Screenshot 1 */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-[#303030] leading-relaxed mb-10 font-normal">
          Your current answering service is losing 27% of after-hours leads. We deploy proprietary AI Infrastructure that replaces human dispatchers, answers in &lt;300ms, qualifies emergencies, and books jobs directly into your CRM 24/7.
        </p>

        {/* Central Audio Waveform Visual (Directly from inspiration reference) */}
        <div 
          onClick={onHearDemo}
          className="flex items-center justify-center gap-1 sm:gap-1.5 h-14 sm:h-18 max-w-md mx-auto mb-10 px-4 py-2 cursor-pointer group"
          title="Click to test the live AI voice demo"
          aria-label="Voice waveform illustration. Click to try the voice demo."
        >
          {WAVEFORM_BARS.map((height, idx) => (
            <span
              key={idx}
              style={{ height: `${height * 0.7}px` }}
              className={`w-1 sm:w-1.5 rounded-full transition-all duration-300 ${
                idx % 4 === 0 
                  ? 'bg-[#191919] group-hover:bg-[#303030]' 
                  : idx % 2 === 0
                  ? 'bg-[#E7E5E0] group-hover:bg-[#191919]'
                  : 'bg-[#777777] group-hover:bg-[#191919]'
              }`}
            />
          ))}
        </div>

        {/* CTAs matching Screenshot 1 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <button
            onClick={onHearDemo}
            className="w-full sm:w-auto px-8 py-4 bg-[#191919] hover:bg-[#303030] active:bg-black text-white text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919]"
          >
            <Volume2 className="w-4 h-4 text-white" />
            <span>HEAR THE AI DISPATCHER (LIVE DEMO)</span>
          </button>

          <button
            onClick={onViewInfrastructure}
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#F7F6F2] active:bg-[#E7E5E0] text-[#191919] text-sm font-semibold rounded-full border border-[#E7E5E0] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919]"
          >
            <span>View Infrastructure</span>
            <ChevronDown className="w-4 h-4 text-[#777777]" />
          </button>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 py-4 text-xs font-semibold text-[#191919] hover:text-[#777777] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Book Strategy Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Native Integrations bar matching Screenshot 1 */}
        <div className="pt-8 border-t border-[#E7E5E0]/70 max-w-4xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#777777] block mb-4 font-semibold">
            NATIVE INTEGRATIONS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium italic text-[#777777]">
            {NATIVE_INTEGRATIONS.map((name, idx) => (
              <span key={idx} className="hover:text-[#191919] transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
