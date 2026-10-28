import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2
} from 'lucide-react';
import { StrategyCallSubmission } from '../types';

interface ContactPageProps {
  onSubmissionSuccess?: (sub: StrategyCallSubmission) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onSubmissionSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('trades');
  const [stateOrCity, setStateOrCity] = useState('VIC');
  const [businessSize, setBusinessSize] = useState('4-10');
  const [mainChallenge, setMainChallenge] = useState('missed_calls');
  const [preferredContact, setPreferredContact] = useState<'video' | 'phone' | 'email'>('video');
  const [projectDetails, setProjectDetails] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return false;
    }
    if (!businessName.trim()) {
      setErrorMsg('Please enter your business name.');
      return false;
    }
    if (!workEmail.trim() || !workEmail.includes('@') || !workEmail.includes('.')) {
      setErrorMsg('Please enter a valid work email address.');
      return false;
    }
    if (!consentAccepted) {
      setErrorMsg('Please accept the privacy terms before submitting.');
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
        if (onSubmissionSuccess) onSubmissionSuccess(newSubmission);
      } catch {
        setLoading(false);
        setErrorMsg('An error occurred saving your enquiry. Please check browser settings and retry.');
      }
    }, 600);
  };

  return (
    <div className="py-16 lg:py-24 bg-[#F7F6F2] text-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Operational Guidance */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
                <span className="text-[#191919] font-semibold">Start a Conversation</span>
                <span aria-hidden="true">·</span>
                <span>Engineering Consultation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight leading-tight">
                Let’s find the workflow holding your business back.
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#303030] leading-relaxed">
                Tell us how your business handles calls, enquiries, and appointments. We’ll discuss where automation may help, what should remain human-led, and what a practical first implementation could look like.
              </p>
            </div>

            {/* Direct Contact Context */}
            <div className="bg-white border border-[#E7E5E0] rounded-2xl p-6 space-y-4 text-xs shadow-xs">
              <span className="font-mono text-[11px] uppercase text-[#191919] font-semibold tracking-wider block">
                Direct Communications
              </span>

              <div className="flex items-start gap-3 text-[#303030]">
                <Mail className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#777777] text-[10px] font-mono">PRIMARY ENQUIRIES</span>
                  <a href="mailto:enquiries@nexamor.com.au" className="text-[#191919] hover:underline font-mono font-medium">
                    enquiries@nexamor.com.au
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#303030]">
                <Clock className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#777777] text-[10px] font-mono">HOURS &amp; RESPONSE SLA</span>
                  <p className="leading-snug">
                    Monday to Friday, 8:30 AM – 6:00 PM AEST / AEDT.<br />
                    All technical discovery submissions receive written reply within 1 business day.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#303030]">
                <MapPin className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#777777] text-[10px] font-mono">OPERATIONAL REGION</span>
                  <p className="leading-snug">
                    Engineering and client partnerships across all Australian States &amp; Territories (NSW, VIC, QLD, WA, SA, TAS, ACT, NT).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#E7E5E0] rounded-2xl flex items-start gap-3 text-xs text-[#777777] shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
              <p className="text-[#303030]">
                <strong className="text-[#191919]">Confidentiality Assurance:</strong> We respect commercial workflow confidentiality. Information shared regarding your call volume, software stack, or staffing is treated strictly as confidential scoping material.
              </p>
            </div>
          </div>

          {/* Right Column: Complete Validated Form */}
          <div className="lg:col-span-7 bg-white border border-[#E7E5E0] rounded-2xl p-6 sm:p-10 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-[#191919] text-white rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#191919]">
                  Strategy Request Successfully Submitted
                </h3>
                <p className="text-sm text-[#303030] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#191919]">{fullName}</strong>. We have logged your enquiry for <strong className="text-[#191919]">{businessName}</strong>. Our systems engineer will review your operational requirements and contact you via your preferred method ({preferredContact}) within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setBusinessName('');
                      setWorkEmail('');
                      setBusinessPhone('');
                      setProjectDetails('');
                    }}
                    className="px-6 py-2.5 bg-[#191919] hover:bg-[#303030] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Operational Request
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#191919] tracking-tight">
                    Book a Technical Strategy Session
                  </h2>
                  <p className="text-xs text-[#777777] mt-1">
                    No pressure or generic sales pitches. You will speak directly with an automation engineer.
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
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
                        placeholder="e.g. Rachel Adams"
                        className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-sm text-[#191919] placeholder-[#777777] focus:outline-none focus:bg-white focus:border-[#191919]"
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
                        placeholder="e.g. Bayside Allied Health"
                        className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-sm text-[#191919] placeholder-[#777777] focus:outline-none focus:bg-white focus:border-[#191919]"
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
                        placeholder="rachel@baysidehealth.com.au"
                        className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-sm text-[#191919] placeholder-[#777777] focus:outline-none focus:bg-white focus:border-[#191919]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#303030] mb-1">
                        Business Telephone <span className="text-[#777777]">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                        placeholder="04xx xxx xxx or 02 xxxx xxxx"
                        className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-sm text-[#191919] placeholder-[#777777] focus:outline-none focus:bg-white focus:border-[#191919]"
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
                        Australian State
                      </label>
                      <select
                        value={stateOrCity}
                        onChange={(e) => setStateOrCity(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-xs text-[#191919] focus:outline-none focus:bg-white focus:border-[#191919]"
                      >
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="WA">WA</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">NT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#303030] mb-1">
                        Team Size
                      </label>
                      <select
                        value={businessSize}
                        onChange={(e) => setBusinessSize(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-xs text-[#191919] focus:outline-none focus:bg-white focus:border-[#191919]"
                      >
                        <option value="1-3">1–3 staff</option>
                        <option value="4-10">4–10 staff</option>
                        <option value="11-25">11–25 staff</option>
                        <option value="26+">26+ staff</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#303030] mb-1">
                      Main Operational Bottleneck
                    </label>
                    <select
                      value={mainChallenge}
                      onChange={(e) => setMainChallenge(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-xs text-[#191919] focus:outline-none focus:bg-white focus:border-[#191919]"
                    >
                      <option value="missed_calls">Missed calls during active work or after-hours</option>
                      <option value="booking_friction">Manual appointment booking and rescheduling back-and-forth</option>
                      <option value="repetitive_faqs">Excessive staff time lost to standard pricing and FAQ questions</option>
                      <option value="lead_dropoff">High-intent quotes not receiving structured follow-up</option>
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
                        { id: 'video', label: 'Video Call' },
                        { id: 'phone', label: 'Telephone' },
                        { id: 'email', label: 'Email Proposal' }
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPreferredContact(method.id as any)}
                          className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-colors cursor-pointer ${
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
                      Business Details or Current Software Systems <span className="text-[#777777]">(Optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="e.g. We run Cliniko for medical appointments and want an automated receptionist for after-hours calls."
                      className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl text-xs text-[#191919] placeholder-[#777777] focus:outline-none focus:bg-white focus:border-[#191919]"
                    />
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="pageConsentCheckbox"
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="mt-0.5 accent-[#191919] rounded cursor-pointer"
                    />
                    <label htmlFor="pageConsentCheckbox" className="text-[11px] text-[#777777] leading-snug cursor-pointer">
                      I agree to Nexamor storing and processing these details strictly to evaluate our operational automation requirements under the Australian Privacy Principles.
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-[#191919] hover:bg-[#303030] active:bg-black disabled:bg-[#777777] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      <span>{loading ? 'Submitting Technical Enquiry...' : 'Schedule Strategy Session'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
