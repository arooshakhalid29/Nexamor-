import React from 'react';
import { X, Cpu, Layers, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { CaseStudyItem } from '../types';
import { 
  VoiceReceptionistSimulator, 
  AppointmentBookingSimulator, 
  ClientHunterSimulator, 
  BusinessWorkflowSimulator 
} from './CaseStudySimulators';

interface CaseStudyModalProps {
  study: CaseStudyItem | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  onClose,
  onOpenBooking,
}) => {
  if (!study) return null;

  const renderSimulator = () => {
    switch (study.id) {
      case 'voice-receptionist-demo':
        return <VoiceReceptionistSimulator />;
      case 'appointment-automation-prototype':
        return <AppointmentBookingSimulator />;
      case 'clienthunter-ai-internal':
        return <ClientHunterSimulator />;
      case 'workflow-automation-concept':
        return <BusinessWorkflowSimulator />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div className="relative w-full max-w-4xl bg-white border border-[#E7E5E0] rounded-2xl shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto text-[#191919]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#777777] hover:text-[#191919] rounded-lg hover:bg-[#F7F6F2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919] cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Block */}
        <div className="pr-10 mb-6 pb-6 border-b border-[#E7E5E0]">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full font-medium border bg-[#191919] text-white border-[#191919]">
              STATUS: {study.status}
            </span>
            <span aria-hidden="true" className="text-[#E7E5E0]">·</span>
            <span className="text-xs text-[#777777] font-mono">
              Audience: {study.intendedAudience}
            </span>
          </div>

          <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">
            {study.title}
          </h2>
          <p className="text-sm text-[#303030] mt-1">
            {study.subtitle}
          </p>
        </div>

        {/* Interactive Simulator Section */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase text-[#191919] font-semibold tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#191919]" />
            <span>INTERACTIVE SYSTEM DEMONSTRATION</span>
          </h3>
          {renderSimulator()}
        </div>

        {/* Two-Column Specification Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs">
          {/* Problem Statement */}
          <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E7E5E0]">
            <h4 className="font-semibold text-[#191919] mb-2 flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#191919]" />
              <span>Operational Problem Addressed</span>
            </h4>
            <p className="text-[#303030] leading-relaxed">
              {study.problemStatement}
            </p>
          </div>

          {/* Solution Architecture */}
          <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E7E5E0]">
            <h4 className="font-semibold text-[#191919] mb-2 flex items-center gap-1.5 text-sm">
              <Cpu className="w-4 h-4 text-[#191919]" />
              <span>Engineered Architecture</span>
            </h4>
            <ul className="space-y-1.5 text-[#303030]">
              {study.solutionArchitecture.slice(0, 4).map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#191919] font-mono font-bold">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Workflow Lifecycle Sequence */}
        <div className="mb-8 bg-[#F7F6F2] p-5 rounded-xl border border-[#E7E5E0]">
          <h4 className="text-xs font-mono uppercase text-[#191919] tracking-wider mb-4 flex items-center gap-2 font-semibold">
            <Layers className="w-4 h-4 text-[#191919]" />
            <span>Workflow Sequence &amp; Execution Stages</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {study.workflowSteps.map((st) => (
              <div key={st.step} className="bg-white p-3 rounded-lg border border-[#E7E5E0] text-xs shadow-xs">
                <span className="font-mono text-[10px] text-[#191919] font-bold block mb-1">
                  STEP {st.step}
                </span>
                <span className="font-semibold text-[#191919] block mb-1">
                  {st.name}
                </span>
                <p className="text-[11px] text-[#777777] leading-tight">
                  {st.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testing, Verification & Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs">
          <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E7E5E0]">
            <h4 className="font-semibold text-[#191919] mb-2 flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-[#191919]" />
              <span>Testing &amp; Validation Performed</span>
            </h4>
            <ul className="space-y-1.5 text-[#303030]">
              {study.testingPerformed.map((test, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#191919] shrink-0 mt-0.5" />
                  <span>{test}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E7E5E0]">
            <h4 className="font-semibold text-[#191919] mb-2 flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#777777]" />
              <span>Known Boundaries &amp; Limitations</span>
            </h4>
            <ul className="space-y-1.5 text-[#777777]">
              {study.limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#777777] font-mono">›</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="pt-4 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#777777] font-mono">
            All code demonstrated is engineered to Australian trade and medical privacy standards.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#777777] hover:text-[#191919] rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-5 py-2.5 bg-[#191919] hover:bg-[#303030] active:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Discuss a Similar Implementation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
