import React from 'react';
import { Scale } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-16 lg:py-24 bg-[#F7F6F2] text-[#191919]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Commercial Terms</span>
            <span aria-hidden="true">·</span>
            <span>Australian Commercial Law</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs font-mono text-[#777777]">
            Effective Date: October 2026 · Australian Jurisdiction
          </p>
        </div>

        <div className="p-4 bg-white border border-[#E7E5E0] rounded-2xl text-xs text-[#303030] flex items-start gap-2.5 shadow-xs">
          <Scale className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
          <p>
            These Terms govern your use of the Nexamor website and establish the general framework for technical discovery and scoping. Formal project implementations are executed under individual Statements of Work (SOW) referencing agreed milestone schedules.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#303030] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              1. Engagement Framework and Scoping
            </h2>
            <p>
              Nexamor operates as an AI Transformation Partner (AITP). Demonstrations, ROI calculator figures, and architecture diagrams displayed on this website represent conceptual capabilities and illustrative scenarios. Actual commercial deliverables, timelines, and fees are defined solely within a signed Statement of Work (SOW).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              2. Acceptable Use and System Boundaries
            </h2>
            <p>
              When evaluating or deploying Nexamor automation systems, users and client organisations agree:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#777777]">
              <li>Not to deploy conversational voice systems for unsolicited telemarketing, robocalling, or unlawful harassment under the Australian <em>Do Not Call Register Act 2006</em>.</li>
              <li>Not to utilize automated reception workflows for emergency medical diagnosis, clinical prescribing, or triage of life-threatening events without human clinician supervision.</li>
              <li>Not to reverse engineer or probe security perimeters of proprietary internal software tools including Nexamor ClientHunter AI.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              3. Telephony and Upstream Third-Party Dependencies
            </h2>
            <p>
              Client acknowledges that conversational voice agents, SMS gateways, and calendar automations rely upon third-party infrastructure (such as Telstra, Optus, Twilio, Google, Microsoft, and specialized CRM APIs). Nexamor is not liable for intermittent service interruptions, upstream carrier latency, or carrier routing outages beyond our reasonable control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              4. Client Systems and Data Integrity
            </h2>
            <p>
              The client remains solely responsible for the accuracy of pricing, operating hours, staff availability rosters, and service guidelines provided to Nexamor for system prompt configuration. Nexamor incorporates human escalation pathways to mitigate conversational ambiguity, but cannot guarantee that callers will strictly adhere to recommended conversational guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              5. Australian Consumer Law (ACL) Alignment
            </h2>
            <p>
              Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred by the Australian Consumer Law contained in Schedule 2 of the <em>Competition and Consumer Act 2010</em> (Cth) that cannot be lawfully excluded. To the extent permitted by law, our liability for failure to comply with a consumer guarantee is limited to the resupply of the services or the cost of resupplying the services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              6. Intellectual Property
            </h2>
            <p>
              All website content, engineering workflows, proprietary algorithms, and brand assets of Nexamor remain the exclusive intellectual property of Nexamor. Custom integration code and workflow scripts developed specifically for a client are governed by the intellectual property clauses defined in the applicable Statement of Work.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#191919]">
              7. Governing Law
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of Victoria, Australia, and the parties submit to the non-exclusive jurisdiction of the courts of Victoria.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
