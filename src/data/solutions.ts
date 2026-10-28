import { SolutionItem } from '../types';

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'voice-agents',
    letter: 'A',
    title: 'AI Voice Agents',
    tagline: 'Conversational telephony engineered for inbound enquiry triage and dispatch.',
    description: 'Custom-built voice agents that handle phone calls during peak hours or after-hours, answering configured questions, capturing caller intent, qualifying urgency, and routing calls to on-call staff.',
    capabilities: [
      'Inbound call answering with zero dropped queues',
      'Configured business FAQs and service scope verification',
      'Urgency and emergency qualification (e.g. active water leaks vs routine quotes)',
      'Intelligent call routing and warm human escalation',
      'Structured enquiry capture into internal dispatch formats',
      'After-hours and weekend coverage without staff burnout',
      'Graceful handoff to designated staff when complex criteria are met'
    ],
    integrationNote: 'Requires SIP trunking, Twilio/Telnyx telephony gateway, or VoIP PBX redirection. Latency depends on voice model pipeline; engineered with local Australian telephony termination for natural conversational pacing.',
    idealFor: 'Trades contractors, emergency services, clinics, and automotive repair shops facing missed inbound calls.'
  },
  {
    id: 'appointment-booking',
    letter: 'B',
    title: 'Appointment Booking & Management',
    tagline: 'Connecting conversational workflows to live business calendars and scheduling engines.',
    description: 'Self-serve booking infrastructure that allows customers to schedule, reschedule, or cancel appointments via voice or web chat, respecting staff rosters, service buffers, and capacity limits.',
    capabilities: [
      'Real-time calendar availability lookup against staff rosters',
      'Two-way appointment booking with slot reservation rules',
      'Automated reschedule and cancellation self-service',
      'Custom confirmation notifications via SMS and email',
      'Multi-stage appointment reminder workflows to prevent no-shows',
      'Service-specific buffer time and resource allocation rules',
      'Human approval checkpoints for non-standard bookings'
    ],
    integrationNote: 'Integrates via standard REST APIs and Webhooks to supported calendar systems (Google Calendar, Microsoft Outlook/365, Timely, Cliniko, ServiceM8). Human review triggers can be configured for complex treatments or high-value quotes.',
    idealFor: 'Dental practices, allied health clinics, hair salons, and consultation-driven businesses.'
  },
  {
    id: 'lead-recovery',
    letter: 'C',
    title: 'Missed-Call & Lead Recovery',
    tagline: 'Capturing high-intent enquiries that drop off before reaching your team.',
    description: 'Automated recovery pipelines that detect unanswered calls, send immediate SMS follow-up options with interactive self-serve triage, and notify on-duty technicians or reception staff.',
    capabilities: [
      'Immediate instant-response SMS triggered on missed call events',
      'Conversational enquiry qualification via mobile-first messaging',
      'Smart customer intent classification into urgent, standard, or spam',
      'Priority lead dispatch to mobile technicians or office coordinators',
      'Automated re-engagement sequences for unconfirmed quotes',
      'Comprehensive audit log of recovered opportunities and response times'
    ],
    integrationNote: 'Follow-up actions strictly depend on business telephony capabilities (call diversion/missed call webhooks), Australian Spam Act compliance, and customer consent.',
    idealFor: 'HVAC contractors, commercial plumbers, and trade businesses where the first business to respond wins the job.'
  },
  {
    id: 'reception-support',
    letter: 'D',
    title: 'AI Receptionist & Customer Support',
    tagline: 'Front-desk automation for repetitive enquiries and operational routine questions.',
    description: 'Digital receptionist systems that answer opening hours, parking, pricing guidelines, service prerequisites, and status updates, freeing your front-desk staff to focus on in-person clients.',
    capabilities: [
      'Accurate answers to verified operational questions and FAQs',
      'Pre-appointment intake guidance and document checklist delivery',
      'Real-time location, parking, and transit directions assistance',
      'Quote intake and preliminary scope information collection',
      'Immediate staff escalation for distress, complaints, or VIP inquiries',
      'Omnichannel support across phone, website widget, and WhatsApp'
    ],
    integrationNote: 'System responses are strictly grounded in an approved business knowledge repository with explicit fallback responses when queries fall outside verified operational bounds.',
    idealFor: 'Boutique salons, multi-practitioner clinics, and customer-facing service centres.'
  },
  {
    id: 'crm-workflow',
    letter: 'E',
    title: 'CRM & Business Workflow Integration',
    tagline: 'Bridging conversational front-ends with your core operational systems of record.',
    description: 'We build the connective tissue between conversational front-ends and your operational backend: field service management, CRM records, job cards, inventory databases, and dispatch boards.',
    capabilities: [
      'Automated customer profile lookup and new client record creation',
      'Job card generation with structured problem descriptions and tags',
      'Bidirectional synchronisation between booking tools and dispatch calendars',
      'Automated post-job follow-up and review collection prompts',
      'Secure webhook listeners and resilient queue-backed API connectors',
      'Field service status notifications to waiting customers'
    ],
    integrationNote: 'Supported systems include ServiceM8, Jobber, HubSpot, Salesforce, Cliniko, and custom PostgreSQL/SQL databases. Custom middleware is deployed with end-to-end payload validation.',
    idealFor: 'Growing service businesses with fragmented software stacks seeking clean data synchronisation.'
  },
  {
    id: 'custom-automation',
    letter: 'F',
    title: 'Custom AI Automation',
    tagline: 'Engineered pipelines for document extraction, reporting, and repetitive business tasks.',
    description: 'Tailored automation pipelines that eliminate manual administrative drag—from extracting line items from supplier invoices to synthesizing daily dispatch logs into management summaries.',
    capabilities: [
      'Document and invoice parsing into accounting software',
      'Email triage and auto-drafting for quote requests',
      'Daily operational briefing generation for field supervisors',
      'Data normalisation across legacy spreadsheets and cloud platforms',
      'Internal knowledge assistants for staff SOP lookup',
      'Automated quality compliance checks on technician job notes'
    ],
    integrationNote: 'Custom engineering built on secure serverless runtimes with role-based access control, strict schema validation, and complete observability logs.',
    idealFor: 'Established commercial contractors and service companies with idiosyncratic operational workflows.'
  }
];
