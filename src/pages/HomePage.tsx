import React from 'react';
import { PageId } from '../types';
import { HeroSection } from '../components/HeroSection';
import { RevenueAtRiskCalculator } from '../components/RevenueAtRiskCalculator';
import { SectorSection } from '../components/SectorSection';
import { ProtocolSection } from '../components/ProtocolSection';
import { MoatSection } from '../components/MoatSection';
import { InteractiveVoiceDemo } from '../components/InteractiveVoiceDemo';
import { EliteIntakeSection } from '../components/EliteIntakeSection';
import { GrandSlamOfferSection } from '../components/GrandSlamOfferSection';
import { DarkImpactBanner } from '../components/DarkImpactBanner';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onSelectCaseStudy: (studyId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0 text-[#191919]">
      {/* =========================================================================
          1. HERO SECTION WITH VERTICAL TEXT TRANSLATION (DOWN-TO-UP / UP-TO-DOWN)
          ========================================================================= */}
      <HeroSection
        onOpenBooking={onOpenBooking}
        onHearDemo={() => scrollToId('ai-demo')}
        onViewInfrastructure={() => scrollToId('infrastructure')}
      />

      {/* =========================================================================
          2. AUDIT YOUR ANNUAL LEAK / LEAK CALCULATOR (SCREENSHOT 1)
          ========================================================================= */}
      <RevenueAtRiskCalculator 
        onOpenBooking={onOpenBooking}
        onExploreSolutions={() => scrollToId('sector')}
      />

      {/* =========================================================================
          3. 01 THE SECTOR — HIGH-STAKES SERVICE BUSINESSES (SCREENSHOT 1)
          ========================================================================= */}
      <SectorSection 
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />

      {/* =========================================================================
          4. 02 THE SPECIALIZATION — AITP PROTOCOL (SCREENSHOT 2)
          ========================================================================= */}
      <ProtocolSection />

      {/* =========================================================================
          5. 03 THE DEVELOPER MOAT & THE STRATEGIC GAP (SCREENSHOT 2)
          ========================================================================= */}
      <MoatSection onOpenBooking={onOpenBooking} />

      {/* =========================================================================
          6. INTERACTIVE VOICE DEMO — HEAR THE AI DISPATCHER (#ai-demo)
          ========================================================================= */}
      <InteractiveVoiceDemo />

      {/* =========================================================================
          7. WE DON'T ACCEPT EVERYONE & ELITE INTAKE PROTOCOL (SCREENSHOT 3)
          ========================================================================= */}
      <EliteIntakeSection onOpenBooking={onOpenBooking} />

      {/* =========================================================================
          8. GRAND SLAM OFFER — RISK-FREE REVENUE RECOVERY PROTOCOL (SCREENSHOT 3)
          ========================================================================= */}
      <GrandSlamOfferSection onOpenBooking={onOpenBooking} />

      {/* =========================================================================
          9. DEEP BLACK IMPACT STATEMENT BEFORE FOOTER (SCREENSHOT 3)
          ========================================================================= */}
      <DarkImpactBanner />
    </div>
  );
};
