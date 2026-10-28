import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact section links required by design specification
  const sectionLinks = [
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'moat', label: 'The Moat' },
    { id: 'roi', label: 'ROI Engine' },
    { id: 'offer', label: 'Grand Slam Offer' },
  ];

  const handleSectionClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHearDemo = () => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('ai-demo') || document.getElementById('voice-demo');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById('ai-demo') || document.getElementById('voice-demo');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E7E5E0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-18">
          {/* Brand Wordmark matching minimal reference layout */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919] rounded-lg transition-opacity hover:opacity-90 shrink-0 cursor-pointer"
            aria-label="Nexamor homepage"
          >
            <div className="w-7 h-7 bg-[#191919] text-white rounded-md flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
              N
            </div>
            <span className="font-bold text-xl tracking-tight text-[#191919] font-mono lowercase">
              nexamor
            </span>
          </button>

          {/* Minimal Clean Navigation Links */}
          <nav 
            className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#777777]"
            aria-label="Main Navigation"
          >
            {sectionLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleSectionClick(link.id)}
                className="py-1 whitespace-nowrap shrink-0 transition-colors text-[#777777] hover:text-[#191919] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919] rounded cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Primary & Demo CTAs matching Screenshot 1 */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={handleHearDemo}
              className="px-4 sm:px-5 py-2 text-xs font-semibold text-white bg-[#191919] hover:bg-[#303030] active:bg-black rounded-full transition-all whitespace-nowrap shrink-0 shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919]"
            >
              Hear the AI Dispatcher
            </button>

            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold text-[#191919] bg-white hover:bg-[#F7F6F2] active:bg-[#E7E5E0] border border-[#E7E5E0] rounded-full transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919]"
            >
              Book a Strategy Call
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#777777] hover:text-[#191919] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919] rounded-lg cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E7E5E0] bg-white px-4 pt-3 pb-6 space-y-2 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="text-[11px] font-mono text-[#777777] uppercase px-3 py-1">
            Navigation
          </div>
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleSectionClick(link.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#191919] hover:bg-[#F7F6F2] transition-colors"
            >
              {link.label}
            </button>
          ))}
          
          <button
            onClick={handleHearDemo}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-[#191919] hover:bg-[#F7F6F2] transition-colors"
          >
            Hear the AI Demo
          </button>

          <div className="pt-3 border-t border-[#E7E5E0] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-sm font-medium text-white bg-[#191919] hover:bg-[#303030] rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Book a Strategy Call
            </button>

            {/* Discreet link to all pages */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-[#777777] px-3">
              <button 
                onClick={() => { setMobileMenuOpen(false); onNavigate('solutions'); }}
                className="hover:text-[#191919]"
              >
                Solutions
              </button>
              <span>·</span>
              <button 
                onClick={() => { setMobileMenuOpen(false); onNavigate('industries'); }}
                className="hover:text-[#191919]"
              >
                Industries
              </button>
              <span>·</span>
              <button 
                onClick={() => { setMobileMenuOpen(false); onNavigate('how-it-works'); }}
                className="hover:text-[#191919]"
              >
                How It Works
              </button>
              <span>·</span>
              <button 
                onClick={() => { setMobileMenuOpen(false); onNavigate('about'); }}
                className="hover:text-[#191919]"
              >
                About
              </button>
              <span>·</span>
              <button 
                onClick={() => { setMobileMenuOpen(false); onNavigate('contact'); }}
                className="hover:text-[#191919]"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
