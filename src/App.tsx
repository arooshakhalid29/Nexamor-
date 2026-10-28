import React, { useState, useEffect } from 'react';
import { PageId, StrategyCallSubmission } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StrategyCallModal } from './components/StrategyCallModal';
import { SubmissionsDrawer } from './components/SubmissionsDrawer';
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { WorkPage } from './pages/WorkPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { Database } from 'lucide-react';

export default function App() {
  // Sync page state with window.location.hash
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'home',
      'solutions',
      'industries',
      'how-it-works',
      'work',
      'about',
      'contact',
      'privacy',
      'terms',
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'solutions',
        'industries',
        'how-it-works',
        'work',
        'about',
        'contact',
        'privacy',
        'terms',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCaseStudyFromHome = (studyId: string) => {
    setSelectedStudyId(studyId);
    handleNavigate('work');
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#191919] flex flex-col font-sans selection:bg-[#191919] selection:text-white">
      {/* Top Bar Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={() => setIsBookingOpen(true)}
            onSelectCaseStudy={handleSelectCaseStudyFromHome}
          />
        )}

        {currentPage === 'solutions' && (
          <SolutionsPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}

        {currentPage === 'industries' && (
          <IndustriesPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}

        {currentPage === 'work' && (
          <WorkPage
            onOpenBooking={() => setIsBookingOpen(true)}
            selectedStudyId={selectedStudyId}
            onClearSelectedStudy={() => setSelectedStudyId(null)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onOpenBooking={() => setIsBookingOpen(true)} />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'privacy' && <PrivacyPolicyPage />}

        {currentPage === 'terms' && <TermsPage />}
      </main>

      {/* Corporate Minimal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Strategy Call Booking Modal */}
      <StrategyCallModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Saved Submissions Drawer for testing verification */}
      <SubmissionsDrawer
        isOpen={isSubmissionsOpen}
        onClose={() => setIsSubmissionsOpen(false)}
      />

      {/* Discreet floating helper to inspect local submission log */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          onClick={() => setIsSubmissionsOpen(true)}
          className="px-2.5 py-1.5 bg-white/95 hover:bg-[#F7F6F2] border border-[#E7E5E0] rounded-lg text-[11px] font-mono text-[#777777] hover:text-[#191919] shadow-sm flex items-center gap-1.5 backdrop-blur-sm transition-colors cursor-pointer"
          title="Review saved strategy call enquiries stored in browser database"
        >
          <Database className="w-3.5 h-3.5 text-[#191919]" />
          <span>Enquiries Log</span>
        </button>
      </div>
    </div>
  );
}
