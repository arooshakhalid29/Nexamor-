import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { StrategyCallSubmission } from '../types';

interface StrategyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (submission: StrategyCallSubmission) => void;
}

export const StrategyCallModal: React.FC<StrategyCallModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('trades');
  const [stateOrCity, setStateOrCity] = useState('VIC');
  const [businessSize, setBusinessSize] = useState('2-10');
  const [mainChallenge, setMainChallenge] = useState('missed_calls');
  const [preferredContact, setPreferredContact] = useState<'video' | 'phone' | 'email'>('video');
  const [projectDetails, setProjectDetails] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      setErrorMsg('Please provide your full name.');
      return false;
    }
    if (!businessName.trim()) {
      setErrorMsg('Please provide your business name.');
      return false;
    }
    if (!workEmail.trim() || !workEmail.includes('@') || !workEmail.includes('.')) {
      setErrorMsg('Please provide a valid business email address.');
      return false;
    }
    if (!consentAccepted) {
      setErrorMsg('Please acknowledge the privacy agreement before submitting.');
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMsg(null);

    // Save to local storage
    setTimeout(() => {
      try {
        const newSubmission: StrategyCallSubmission = {
          id: 'SUB-' + Date.now().toString(),
          createdAt: new Date().toISOString(),
          fullName: fullName.trim(),
          businessName: businessName.trim(),
          workEmail: workEmail.trim(),
          businessPhone: businessPhone.trim() || undefined,
          website: website.trim() || undefined,
          industry,
          stateOrCity,
          businessSize,
          mainChallenge,
          preferredContact,
          projectDetails: projectDetails.trim() || undefined,
        };

        const existing = JSON.parse(localStorage.getItem('nexamor_strategy_submissions') || '[]');
        existing.unshift(newSubmission);
        localStorage.setItem('nexamor_strategy_submissions', JSON.stringify(existing));

        setLoading(false);
        setSubmitted(true);
        if (onSuccess) onSuccess(newSubmission);
      } catch {
        setLoading(false);
        setErrorMsg('Failed to save submission locally. Please try again.');
      }
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setBusinessName('');
    setWorkEmail('');
    setBusinessPhone('');
    setWebsite('');
    setProjectDetails('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-strategy-title"
    >
      <div className="relative w-full max-w-2xl bg-white border border-[#E7E5E0] rounded-2xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto text-[#191919]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#777777] hover:text-[#191919] rounded-lg hover:bg-[#F7F6F2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191919] cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-[#191919] text-white rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#191919]">
              Strategy Call Request Received
            </h3>
            <p className="text-sm text-[#303030] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#191919]">{fullName}</strong>. We have logged your request for <strong className="text-[#191919]">{businessName}</strong>. Our systems architect will review your operational requirements and reach out via your preferred method ({preferredContact}) within one Australian business day.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#191919] hover:bg-[#303030] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
                <span className="text-[#191919] font-semibold">Technical Consultation</span>
                <span aria-hidden="true">·</span>
                <span>30-Min Discovery Session</span>
              </div>
              <h2 id="modal-strategy-title" className="text-2xl sm:text-3xl font-bold text-[#191919] tracking-tight">
                Let’s find the workflow holding your business back.
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#303030] leading-relaxed">
                Tell us how your business handles calls, enquiries, and appointments. We’ll discuss where automation may help, what should remain human-led, and what a practical first implementation could look like.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#303030] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Liam Walker"
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-sm text-[#191919] placeholder-[#777777] focus:outline-none focus:bg-white focus:border-[#191919] focus:ring-1 focus:ring-[#191919]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#303030] mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Electrical Services"
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-sm text-[#191919] placeholder-[#777777] focus:outline-none focus:bg-white focus:border-[#191919] focus:ring-1 focus:ring-[#191919]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#303030] mb-1">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="liam@apexelectrical.com.au"
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-sm text-[#191919] placeholder-[#777777] focus:outline-none focus:bg-white focus:border-[#191919] focus:ring-1 focus:ring-[#191919]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#303030] mb-1">
                    Business Phone <span className="text-[#777777]">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    placeholder="04xx xxx xxx or 03 xxxx xxxx"
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-sm text-[#191919] placeholder-[#777777] focus:outline-none focus:bg-white focus:border-[#191919] focus:ring-1 focus:ring-[#191919]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#303030] mb-1">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-xs text-[#191919] focus:outline-none focus:bg-white focus:border-[#191919]"
                  >
                    <option value="trades">HVAC, Plumbing, Electrical</option>
                    <option value="salon">Hair Salon &amp; Barbers</option>
                    <option value="dental">Dental &amp; Orthodontics</option>
                    <option value="auto">Automotive Workshop</option>
                    <option value="allied">Allied Health / Physio</option>
                    <option value="other">Other Service Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#303030] mb-1">
                    Australian State / City
                  </label>
                  <select
                    value={stateOrCity}
                    onChange={(e) => setStateOrCity(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-xs text-[#191919] focus:outline-none focus:bg-white focus:border-[#191919]"
                  >
                    <option value="NSW">NSW (Sydney &amp; Regional)</option>
                    <option value="VIC">VIC (Melbourne &amp; Regional)</option>
                    <option value="QLD">QLD (Brisbane, Gold Coast)</option>
                    <option value="WA">WA (Perth &amp; Regional)</option>
                    <option value="SA">SA (Adelaide)</option>
                    <option value="TAS">TAS (Hobart &amp; Launceston)</option>
                    <option value="ACT">ACT (Canberra)</option>
                    <option value="NT">NT (Darwin)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#303030] mb-1">
                    Team Size <span className="text-[#777777]">(Optional)</span>
                  </label>
                  <select
                    value={businessSize}
                    onChange={(e) => setBusinessSize(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-xs text-[#191919] focus:outline-none focus:bg-white focus:border-[#191919]"
                  >
                    <option value="1-3">Sole trader / 1–3 staff</option>
                    <option value="4-10">4–10 staff</option>
                    <option value="11-25">11–25 staff</option>
                    <option value="26+">26+ staff</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#303030] mb-1">
                  Primary Operational Challenge
                </label>
                <select
                  value={mainChallenge}
                  onChange={(e) => setMainChallenge(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-xs text-[#191919] focus:outline-none focus:bg-white focus:border-[#191919]"
                >
                  <option value="missed_calls">Missed calls during busy hours or after 5 PM</option>
                  <option value="booking_friction">Manual back-and-forth appointment scheduling</option>
                  <option value="repetitive_faqs">Too much time spent answering routine FAQs &amp; rates</option>
                  <option value="lead_dropoff">Quotes and inbound leads not receiving fast follow-up</option>
                  <option value="crm_sync">Manual copying of job notes between phone and software</option>
                  <option value="other">Custom automation requirement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#303030] mb-1">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'video', label: 'Video Call (Google Meet)' },
                    { id: 'phone', label: 'Telephone Call' },
                    { id: 'email', label: 'Email Proposal First' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPreferredContact(method.id as any)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-colors cursor-pointer ${
                        preferredContact === method.id
                          ? 'bg-[#191919] border-[#191919] text-white'
                          : 'bg-[#F7F6F2] border-[#E7E5E0] text-[#303030] hover:text-[#191919] hover:bg-white'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#303030] mb-1">
                  Additional Details or Existing Software Tools <span className="text-[#777777]">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="e.g. We use ServiceM8 for jobs and Telstra for our phone line. We miss around 15 calls a week when on job sites."
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-xs text-[#191919] placeholder-[#777777] focus:outline-none focus:bg-white focus:border-[#191919]"
                />
              </div>

              {/* Privacy Notice & Consent */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-0.5 accent-[#191919] rounded cursor-pointer"
                />
                <label htmlFor="consentCheckbox" className="text-[11px] text-[#777777] leading-snug cursor-pointer">
                  I agree to Nexamor reviewing my business contact details strictly to respond to this operational enquiry in accordance with the Australian Privacy Principles. No spam or third-party marketing.
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-medium text-[#777777] hover:text-[#191919] rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-[#191919] hover:bg-[#303030] active:bg-black disabled:bg-[#777777] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{loading ? 'Submitting Request...' : 'Schedule Strategy Session'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
