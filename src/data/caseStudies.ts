import { CaseStudyItem } from '../types';

export const CASE_STUDIES_DATA: CaseStudyItem[] = [
  {
    id: 'voice-receptionist-demo',
    title: 'AI Voice Receptionist System',
    subtitle: 'Conversational telephony pipeline for service triage and urgent call routing',
    status: 'Concept / Demonstration',
    statusType: 'concept',
    summary: 'A fully functional demonstration system illustrating how an inbound phone call is handled by an engineered voice AI stack: greeting the caller, isolating caller intent, capturing job details, and escalating to on-call staff when urgency thresholds are triggered.',
    problemStatement: 'Service businesses lose high-intent callers to voicemail when all lines are busy or calls arrive after hours. Callers rarely leave detailed voicemails, choosing instead to phone the next business on Google Search.',
    intendedAudience: 'Plumbing contractors, electrical services, HVAC technicians, and mobile emergency trade companies in Australia.',
    solutionArchitecture: [
      'Telephony ingress layer handling Australian geographic numbers (02, 03, 07, 08)',
      'Real-time streaming speech-to-text pipeline with Australian accent acoustic tuning',
      'Intent classifier categorising calls into: Emergency Dispatch, Standard Booking, Quote Request, Billing/General, or Spam',
      'Entity extraction engine pulling: Contact Name, Australian Address, Service Type, Suburb, Urgency Rating',
      'Warm escalation trigger initiating live SIP transfer to designated staff phone if emergency score exceeds threshold',
      'Asynchronous webhook dispatching structured JSON summary and audio recording to business endpoint'
    ],
    workflowSteps: [
      { step: '01', name: 'Inbound Ring & Greeting', detail: 'Answers within 2 rings with polite, natural Australian business greeting and purpose inquiry.' },
      { step: '02', name: 'Intent & Entity Extraction', detail: 'Detects job urgency (e.g., active water leak vs quote request) and gathers location details.' },
      { step: '03', name: 'Knowledge & Rule Evaluation', detail: 'Cross-checks business service coverage radius, minimum call-out rates, and technician availability.' },
      { step: '04', name: 'Dispatch or Escalation Decision', detail: 'If immediate technician attendance is required, transfers call directly; otherwise captures structured job card.' },
      { step: '05', name: 'Structured Summary Dispatch', detail: 'Transcribes audio, compiles JSON payload, and notifies on-duty team via SMS and webhook.' }
    ],
    technologies: ['WebRTC Audio Engine', 'Streaming Conversational Pipeline', 'Australian Suburb Geofence DB', 'Webhook Dispatcher', 'REST API Connector'],
    featuresDemonstrated: [
      'Simulated incoming phone call audio player',
      'Real-time transcription and semantic intent tagging',
      'Live address validation against Australian Postcode database',
      'Automated escalation decision logic test harness',
      'Structured job summary export formatted for ServiceM8 / Jobber'
    ],
    testingPerformed: [
      'Simulated 120 synthetic audio call scenarios across common trade emergencies',
      'Evaluated accuracy of Australian slang and trade terminology (e.g. "dunny", "sparky", "switchboard tripping")',
      'Verified zero-drop escalation fallback when recipient phone line is busy'
    ],
    limitations: [
      'Demonstration environment uses browser audio simulation; real telephony requires SIP trunk integration and Twilio/Telnyx account provisioning',
      'Escalation transfer requires business telephony provider supporting call forwarding or SIP transfers'
    ]
  },
  {
    id: 'appointment-automation-prototype',
    title: 'Multi-Channel Appointment Booking System',
    subtitle: 'Two-way calendar coordination engine with service duration buffers and SMS confirmation',
    status: 'Prototype / Demonstration',
    statusType: 'prototype',
    summary: 'A prototype booking engine designed for allied health clinics and boutique salons that validates staff rosters, checks double-booking constraints, applies buffer intervals, and confirms appointments with automated reminder sequences.',
    problemStatement: 'Manual phone and direct-message booking causes double bookings, unconfirmed holds, and front-desk bottlenecks during peak operational hours.',
    intendedAudience: 'Dental clinics, physiotherapy practices, boutique hair salons, and consultation-driven professionals.',
    solutionArchitecture: [
      'REST API connection layer interfacing with calendar availability APIs',
      'Constraint engine calculating service durations (e.g. 45 min consultation + 15 min room sterilisation)',
      'Timezone-aware scheduling engine handling daylight savings transitions across AEST/AEDT and AWST',
      'Two-way SMS communication worker for 48-hour and 2-hour appointment reminders',
      'Self-service rescheduling interface allowing patient self-rebooking without phone calls'
    ],
    workflowSteps: [
      { step: '01', name: 'Service Selection & Practitioner Matching', detail: 'Customer selects required clinical or aesthetic service; system identifies certified staff members.' },
      { step: '02', name: 'Real-Time Availability Lookup', detail: 'Queries practitioner calendar, subtracting existing bookings, breaks, and room capacity constraints.' },
      { step: '03', name: 'Provisional Slot Lock', detail: 'Temporarily reserves selected 30-min window for 5 minutes while client details are submitted.' },
      { step: '04', name: 'Confirmation & Record Creation', detail: 'Writes confirmed event into primary calendar database and creates/updates patient CRM record.' },
      { step: '05', name: 'Automated Reminder Sequence', detail: 'Schedules automated SMS notifications with one-tap confirmation or rescheduling links.' }
    ],
    technologies: ['TypeScript Engine', 'Google Calendar / Outlook API Connectors', 'SMS Notification Gateway', 'Audit Event Log'],
    featuresDemonstrated: [
      'Interactive date-and-time availability picker with live slot calculation',
      'Rule-based practitioner buffer injection (15-min clean up allowance)',
      'Automated SMS notification simulation with interactive reply simulation ("YES" to confirm)',
      'Customer cancellation and automated slot release workflow'
    ],
    testingPerformed: [
      'Concurrent booking collision tests: prevented double-bookings across 50 simulated simultaneous booking attempts',
      'Roster boundary testing across public holidays (Australia Day, Easter, Christmas) and staff leave periods',
      'Timezone compliance testing across Sydney, Brisbane, Adelaide, and Perth timezones'
    ],
    limitations: [
      'Prototype operates against simulated or test Google Calendar instances; production deployment requires OAuth verification and live practitioner roster syncing',
      'SMS delivery requires an active Australian SMS gateway (e.g. Twilio, MessageMedia)'
    ]
  },
  {
    id: 'clienthunter-ai-internal',
    title: 'Nexamor ClientHunter AI',
    subtitle: 'Internal prospecting and automation opportunity analysis system for Australian businesses',
    status: 'Internal Product / In Development',
    statusType: 'internal',
    summary: 'An internal proprietary system built by Nexamor to discover Australian service businesses, evaluate publicly observable operational signals (such as website booking friction, response mechanisms, and after-hours coverage), and draft highly contextual transformation proposals.',
    problemStatement: 'Generic sales outreach is wasteful and irrelevant. Business owners need to see specific, verifiable operational improvements before considering AI systems.',
    intendedAudience: 'Nexamor internal operations, system architects, and client strategy teams.',
    solutionArchitecture: [
      'Public business data aggregator querying Australian business registries, Google Places, and company websites',
      'Digital operational footprint analyser checking: mobile responsiveness, online booking widget presence, phone response prompts, and operating hours',
      'Opportunity identification heuristic ranking businesses based on likely missed-call vulnerability and administrative friction',
      'Contextual brief synthesizer structuring tailored pilot scope recommendations for discovery calls'
    ],
    workflowSteps: [
      { step: '01', name: 'Target Suburb & Category Query', detail: 'Extracts service businesses within defined Australian metropolitan and regional corridors.' },
      { step: '02', name: 'Public Footprint Audit', detail: 'Observes publicly accessible contact channels: presence of web chat, after-hours numbers, and online booking portals.' },
      { step: '03', name: 'Friction Analysis', detail: 'Identifies friction points such as "call only" booking for weekend-heavy trades or manual email forms.' },
      { step: '04', name: 'Pilot Scope Generation', detail: 'Prepares a preliminary 1-page operational diagram illustrating how an automated intake pipeline would function for that specific business model.' }
    ],
    technologies: ['Node.js Pipeline', 'Browser Automation Audit Suite', 'Semantic Enrichment Engine', 'Structured Proposal Compiler'],
    featuresDemonstrated: [
      'Australian trade & clinic directory lookup simulator',
      'Public operational signal inspector',
      'Scoring matrix for estimated missed-enquiry risk',
      'Automated generation of structured implementation roadmaps'
    ],
    testingPerformed: [
      'Audited 350 public web footprints of Australian service companies to validate opportunity classification heuristics',
      'Verified zero hallucination of contact info by enforcing strict domain verification checks'
    ],
    limitations: [
      'Strictly internal tool; not offered as a standalone software product to external clients',
      'Only relies on publicly available business data; cannot inspect private internal business systems without explicit authorization'
    ]
  },
  {
    id: 'workflow-automation-concept',
    title: 'End-to-End Business Workflow Pipeline',
    subtitle: 'Form validation, automated triage, database synchronisation, and task delegation',
    status: 'Concept / Demonstration',
    statusType: 'concept',
    summary: 'A concept demonstration tracing an incoming customer enquiry from initial form submission through data hygiene checks, database insertion, notification dispatch, and CRM task assignment.',
    problemStatement: 'Enquiries submitted through website forms frequently sit in shared email inboxes for hours or days, with no structured ownership, duplicate triage, or status visibility.',
    intendedAudience: 'Commercial contractors, facility maintenance firms, professional service firms, and equipment hire companies.',
    solutionArchitecture: [
      'Validated client enquiry submission component with sanitisation and honeypot spam protection',
      'Serverless event handler validating payload schema and checking duplicate submissions',
      'Secure database persistence writing immutable enquiry audit log',
      'Notification dispatcher pushing formatted alerts to Slack / Microsoft Teams / SMS',
      'Task scheduler generating a follow-up ticket with an assigned SLA timer'
    ],
    workflowSteps: [
      { step: '01', name: 'Enquiry Submission & Sanitisation', detail: 'Customer inputs project details; client-side and server-side validation strips malformed inputs.' },
      { step: '02', name: 'Schema Validation & Enrichment', detail: 'Enriches submission with Australian State, priority rating, and estimated project complexity score.' },
      { step: '03', name: 'Database Persistence', detail: 'Writes record into transactional storage with timestamp, audit ID, and pending triage status.' },
      { step: '04', name: 'Operational Notification', detail: 'Dispatches Slack / Teams webhook alert with one-click "Accept Lead" or "Escalate" action buttons.' },
      { step: '05', name: 'SLA Escalation Timer', detail: 'Monitors lead response time; triggers secondary alert if unacknowledged within 15 minutes.' }
    ],
    technologies: ['Event-Driven Microservice', 'PostgreSQL / SQL Schema', 'Webhook Ingress / Egress', 'SLA Monitoring Queue'],
    featuresDemonstrated: [
      'Live interactive form submission simulator',
      'Real-time payload inspection showing sanitized JSON data packet',
      'Simulated database write event with unique tracking reference',
      'Simulated operational Slack/Teams notification card preview'
    ],
    testingPerformed: [
      'Schema boundary fuzzing with high-concurrency payloads',
      'Simulated retry backoff logic for downstream webhook endpoint failure',
      'Australian ABN format validation heuristics testing'
    ],
    limitations: [
      'Demonstration implementation runs in sandbox memory; production deployment is configured with customer’s specific database, CRM, and team chat webhooks'
    ]
  }
];
