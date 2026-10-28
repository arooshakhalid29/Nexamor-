import React, { useState, useEffect } from 'react';
import { X, Trash2, Mail, Phone, Building2, MapPin } from 'lucide-react';
import { StrategyCallSubmission } from '../types';

interface SubmissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionsDrawer: React.FC<SubmissionsDrawerProps> = ({ isOpen, onClose }) => {
  const [submissions, setSubmissions] = useState<StrategyCallSubmission[]>([]);

  const loadSubmissions = () => {
    try {
      const data = JSON.parse(localStorage.getItem('nexamor_strategy_submissions') || '[]');
      setSubmissions(data);
    } catch {
      setSubmissions([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadSubmissions();
    }
  }, [isOpen]);

  const handleClear = () => {
    localStorage.removeItem('nexamor_strategy_submissions');
    setSubmissions([]);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <div className="w-full max-w-lg h-full bg-white border-l border-[#E7E5E0] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto text-[#191919]">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E0] mb-6">
            <div>
              <h2 id="drawer-title" className="text-lg font-bold text-[#191919] flex items-center gap-2">
                <span>Strategy Call Enquiries Log</span>
                <span className="text-xs bg-[#191919] text-white px-2 py-0.5 rounded-full font-mono font-medium">
                  {submissions.length}
                </span>
              </h2>
              <p className="text-xs text-[#777777] mt-0.5">
                Saved submissions stored in browser local storage database
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#777777] hover:text-[#191919] rounded-lg hover:bg-[#F7F6F2] cursor-pointer"
              aria-label="Close submissions log"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-12 text-[#777777] text-xs">
              <p>No strategy call enquiries submitted yet.</p>
              <p className="text-[#777777] mt-1">
                Submissions from the &quot;Book a Strategy Call&quot; form will appear here with full parameters.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl p-4 text-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E0]">
                    <span className="font-bold text-[#191919] text-sm">
                      {sub.fullName}
                    </span>
                    <span className="font-mono text-[10px] text-[#777777]">
                      {new Date(sub.createdAt).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[#303030]">
                    <div className="flex items-center gap-1.5 truncate">
                      <Building2 className="w-3.5 h-3.5 text-[#191919] shrink-0" />
                      <span className="truncate">{sub.businessName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#777777] shrink-0" />
                      <span>{sub.stateOrCity} ({sub.industry})</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-[#777777] shrink-0" />
                      <span className="truncate">{sub.workEmail}</span>
                    </div>
                    {sub.businessPhone && (
                      <div className="flex items-center gap-1.5 truncate">
                        <Phone className="w-3.5 h-3.5 text-[#191919] shrink-0" />
                        <span>{sub.businessPhone}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#E7E5E0] text-[#777777]">
                    <div className="text-[10px] uppercase font-mono text-[#777777] font-semibold">
                      Challenge &amp; Preferred Channel:
                    </div>
                    <p className="text-[#191919] mt-0.5 font-medium">
                      {sub.mainChallenge} · {sub.preferredContact.toUpperCase()}
                    </p>
                    {sub.projectDetails && (
                      <p className="text-[#303030] mt-1 italic">
                        &quot;{sub.projectDetails}&quot;
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {submissions.length > 0 && (
          <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between">
            <button
              onClick={handleClear}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Log</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#191919] hover:bg-[#303030] text-white text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
