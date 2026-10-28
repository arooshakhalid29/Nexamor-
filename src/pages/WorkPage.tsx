import React, { useState } from 'react';
import { CASE_STUDIES_DATA } from '../data/caseStudies';
import { CaseStudyItem } from '../types';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { 
  ChevronRight, 
  ShieldCheck, 
  Info,
  Play
} from 'lucide-react';

interface WorkPageProps {
  onOpenBooking: () => void;
  selectedStudyId?: string | null;
  onClearSelectedStudy?: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  onOpenBooking,
  selectedStudyId,
  onClearSelectedStudy,
}) => {
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudyItem | null>(() => {
    if (selectedStudyId) {
      return CASE_STUDIES_DATA.find((c) => c.id === selectedStudyId) || null;
    }
    return null;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'concept' | 'prototype' | 'internal'>('all');

  const filteredStudies = CASE_STUDIES_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.statusType === activeFilter;
  });

  return (
    <div className="py-16 lg:py-24 bg-[#F7F6F2] text-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Engineering Portfolio</span>
            <span aria-hidden="true">·</span>
            <span>Honest Project Registrations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight leading-tight">
            Built with purpose. Designed around real workflows.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#303030] leading-relaxed">
            We believe trust is earned through transparency. Below are our current functional prototypes, concept demonstrations, and internal automation tools. We never invent fictitious client logos, fake revenue figures, or fabricated customer testimonials.
          </p>

          <div className="mt-6 p-4 bg-white border border-[#E7E5E0] rounded-2xl flex items-start gap-3 text-xs text-[#777777] shadow-xs">
            <Info className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
            <p className="text-[#303030]">
              Each project includes complete architectural schemas, testing performed, and operational limitations. You can launch interactive simulators for each system directly in your browser.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Projects (4)' },
            { id: 'prototype', label: 'Prototypes (1)' },
            { id: 'concept', label: 'Concept Demos (2)' },
            { id: 'internal', label: 'Internal Products (1)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors border cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#191919] border-[#191919] text-white font-semibold shadow-xs'
                  : 'bg-white border-[#E7E5E0] text-[#777777] hover:text-[#191919]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white border border-[#E7E5E0] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#D5D3CC] transition-all shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold border bg-[#191919] text-white border-[#191919]">
                    {study.status}
                  </span>
                  <span className="text-xs text-[#777777] font-mono">
                    Audience: {study.intendedAudience.split(',')[0]}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#191919] tracking-tight">
                  {study.title}
                </h2>
                <p className="text-xs font-medium text-[#777777] font-mono">
                  {study.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#303030] leading-relaxed">
                  {study.summary}
                </p>

                <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E7E5E0] space-y-2 text-xs">
                  <span className="font-mono text-[10px] uppercase text-[#777777] block font-bold">
                    Primary Operational Problem:
                  </span>
                  <p className="text-[#303030] leading-relaxed">
                    {study.problemStatement}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono uppercase text-[#777777] block font-bold">
                    Technologies &amp; Architecture:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {study.technologies.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-mono bg-[#F7F6F2] text-[#303030] px-2 py-0.5 rounded border border-[#E7E5E0]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setActiveModalStudy(study)}
                  className="w-full sm:w-auto flex-1 py-2.5 bg-[#191919] hover:bg-[#303030] active:bg-black text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Launch Interactive Simulator</span>
                </button>
                <button
                  onClick={() => setActiveModalStudy(study)}
                  className="w-full sm:w-auto py-2.5 px-4 bg-white hover:bg-[#F7F6F2] text-[#191919] text-xs font-medium rounded-xl border border-[#E7E5E0] transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>Full Tech Specs</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#191919]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Future Client Projects Notice */}
        <div className="mt-16 p-8 bg-white border border-[#E7E5E0] rounded-2xl text-center space-y-3 shadow-xs">
          <ShieldCheck className="w-6 h-6 text-[#191919] mx-auto" />
          <h3 className="text-xl font-bold text-[#191919]">
            Our Standard for Verified Case Studies
          </h3>
          <p className="text-xs sm:text-sm text-[#777777] max-w-2xl mx-auto leading-relaxed">
            As Nexamor pilots transition into live production with client permission, verified case studies will be published with full auditable operational metrics, telephony logs, and client endorsement. We never fabricate client references.
          </p>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        study={activeModalStudy}
        onClose={() => {
          setActiveModalStudy(null);
          if (onClearSelectedStudy) onClearSelectedStudy();
        }}
        onOpenBooking={onOpenBooking}
      />
    </div>
  );
};
