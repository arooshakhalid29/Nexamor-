import React from 'react';
import { AlertCircle } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-16 lg:py-24 bg-[#F7F6F2] text-[#191919]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Regulatory Compliance</span>
            <span aria-hidden="true">·</span>
            <span>Australian Privacy Principles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs font-mono text-[#777777]">
            Last Updated: October 2026 · Australian Jurisdiction
          </p>
        </div>

        <div className="p-4 bg-white border border-[#E7E5E0] rounded-2xl text-xs text-[#303030] flex items-start gap-2.5 shadow-xs">
          <AlertCircle className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#191919]">Draft Legal Policy:</strong> This document represents Nexamor’s operational privacy policy aligned with the Privacy Act 1988 (Cth) and Australian Privacy Principles (APPs). Specific client enterprise deployments may include supplementary Data Processing Agreements (DPAs).
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#303030] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              1. Overview &amp; Commitment to Privacy
            </h2>
            <p>
              Nexamor (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates as an AI Transformation Partner (AITP) delivering software engineering, conversational voice infrastructure, and automated workflow integrations for Australian businesses. We are committed to safeguarding personal and commercial information in accordance with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              2. Information We Collect Through This Website
            </h2>
            <p>
              When you interact with our website or submit an enquiry via our &quot;Book a Strategy Call&quot; form, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#777777]">
              <li><strong className="text-[#191919]">Contact Identifiers:</strong> Full name, business email address, and optional telephone number.</li>
              <li><strong className="text-[#191919]">Commercial Profile:</strong> Business name, industry category, Australian state/city, estimated staff size, and operational challenges.</li>
              <li><strong className="text-[#191919]">Technical Metadata:</strong> Browser user-agent, session timestamps, and device viewport dimensions for responsive layout rendering.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              3. Telephony and Voice Processing Data
            </h2>
            <p>
              For clients engaging our AI Voice Receptionist or Inbound Triage systems, the following operational data may be processed:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#777777]">
              <li>Inbound caller telephone numbers and timestamps.</li>
              <li>Audio recordings and transient speech-to-text transcripts generated during configured triage workflows.</li>
              <li>Customer-disclosed entities required to schedule service (street addresses, problem descriptions, urgent trade dispatch notes).</li>
            </ul>
            <p className="text-[#777777]">
              <strong className="text-[#191919]">Notice:</strong> We do not sell, broker, or monetize client caller data. Audio recordings are encrypted and retained solely within client-controlled storage vaults for agreed audit periods.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              4. Non-Training Policy on Private Business Data
            </h2>
            <p>
              A cornerstone of our engineering practice is data isolation. Proprietary client prompts, customer records, calendar rosters, and internal operational transcripts are <strong>never</strong> submitted to public foundational AI models for model training or weight adjustments. We employ zero-retention enterprise API endpoints with private context windows.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              5. Third-Party Integrations and Telephony Carriers
            </h2>
            <p>
              To deliver functional automation, systems may transmit payloads to authorized client platforms:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#777777]">
              <li><strong className="text-[#191919]">Telephony Carriers:</strong> Australian SIP trunk providers and authorized gateways (e.g. Twilio, Telnyx).</li>
              <li><strong className="text-[#191919]">Business CRMs:</strong> Field management platforms including ServiceM8, Cliniko, Jobber, and Google Workspace, subject to client API credentials.</li>
              <li><strong className="text-[#191919]">SMS Gateways:</strong> Compliant carriers adhering to the Australian <em>Spam Act 2003</em>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              6. Security Practices and Limitations
            </h2>
            <p>
              We implement industry-standard cryptographic protocols including TLS 1.3 in transit and AES-256 for resting data payloads. While we employ rigorous architectural safeguards, no Internet transmission or database is completely impenetrable. We do not falsely claim certifications such as SOC 2 or ISO 27001 until formally audited and verified.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              7. Data Subject Rights &amp; Contact Information
            </h2>
            <p>
              Under the APPs, individuals have the right to request access to personal information held by Nexamor, or to request correction or complete deletion. For privacy enquiries, please contact:
            </p>
            <div className="p-4 bg-white border border-[#E7E5E0] rounded-xl font-mono text-xs text-[#303030] shadow-xs">
              <p>Privacy Officer · Nexamor Pty Ltd</p>
              <p>Email: privacy@nexamor.com.au / enquiries@nexamor.com.au</p>
              <p>Jurisdiction: Victoria, Australia</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
