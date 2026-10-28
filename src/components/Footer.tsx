import React from 'react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionScroll = (sectionId: string) => {
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-[#F7F6F2] border-t border-[#E7E5E0] text-[#777777] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand & Market Focus */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#191919] text-white rounded-md flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
                N
              </div>
              <span className="font-bold text-xl tracking-tight text-[#191919] font-mono lowercase">
                nexamor
              </span>
              <span className="text-[10px] font-mono text-[#777777] bg-white border border-[#E7E5E0] rounded px-1.5 py-0.5 font-medium">
                Australia
              </span>
            </div>

            <p className="text-[#303030] leading-relaxed max-w-sm text-xs sm:text-sm">
              Nexamor engineers AI-powered voice receptionists, appointment booking workflows, and operational systems for Australian service businesses.
            </p>

            <div className="text-xs text-[#777777] space-y-1 pt-2 font-mono">
              <p>Operating across AEST / AEDT &amp; AWST timezones</p>
              <p>Sydney · Melbourne · Brisbane · Perth · Adelaide</p>
            </div>
          </div>

          {/* Section Navigation Links (Required by Section 12) */}
          <div>
            <h2 className="text-[#191919] font-semibold text-xs tracking-wider uppercase mb-4">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleSectionScroll('infrastructure')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  Infrastructure
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionScroll('moat')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  The Moat
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionScroll('roi')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  ROI Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionScroll('offer')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  Grand Slam Offer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionScroll('ai-demo')}
                  className="hover:text-[#777777] transition-colors text-left cursor-pointer text-[#191919] font-medium"
                >
                  Hear the AI Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Industry Focus */}
          <div>
            <h2 className="text-[#191919] font-semibold text-xs tracking-wider uppercase mb-4">
              Industries
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('industries')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  Home Services &amp; Trades
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('industries')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  Salons &amp; Hairdressers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('industries')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  Dental &amp; Healthcare Clinics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('industries')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  Automotive Repair Centres
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('industries')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  Enquiry-Driven Businesses
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Company Pages */}
          <div>
            <h2 className="text-[#191919] font-semibold text-xs tracking-wider uppercase mb-4">
              Company &amp; Legal
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  About Nexamor
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('how-it-works')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  Contact &amp; Scoping
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('privacy')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('terms')}
                  className="hover:text-[#191919] transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#E7E5E0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-[#777777]">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Nexamor. All rights reserved.</p>
            <p className="text-[#777777] max-w-2xl leading-normal">
              Nexamor operates as an AI Transformation Partner for Australian businesses. All calculations, ROI models, and demonstration scripts are provided as illustrative estimates; actual operational outcomes depend on specific client telephony, CRM infrastructure, lead volumes, and data hygiene.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0 font-medium text-[#777777]">
            <button
              onClick={() => handleNavClick('privacy')}
              className="hover:text-[#191919] transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span aria-hidden="true" className="text-[#E7E5E0]">·</span>
            <button
              onClick={() => handleNavClick('terms')}
              className="hover:text-[#191919] transition-colors cursor-pointer"
            >
              Terms
            </button>
            <span aria-hidden="true" className="text-[#E7E5E0]">·</span>
            <button
              onClick={onOpenBooking}
              className="text-[#191919] hover:text-[#777777] transition-colors font-semibold cursor-pointer"
            >
              Book a Strategy Call
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
