export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Partnership' | 'Technical' | 'Operations' | 'Pricing & Delivery';
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'what-is-aitp',
    category: 'Partnership',
    question: 'What is an AI Transformation Partner (AITP)?',
    answer: 'An AI Transformation Partner is an engineering consultancy that designs, builds, and maintains practical automated systems tailored to your specific operational workflows. Unlike generic digital agencies that resell pre-packaged SaaS chatbots or hype-driven tools, an AITP looks at your existing business bottlenecks—missed phone calls, manual booking friction, fragmented software—and integrates reliable automation that delivers measurable operational improvements.'
  },
  {
    id: 'is-this-just-a-chatbot',
    category: 'Technical',
    question: 'Is this just another website chatbot?',
    answer: 'No. Website chat is only a small potential interface in a larger system. Our primary work focuses on conversational voice agents connected to Australian phone numbers, two-way calendar synchronisation, automated SMS missed-call recovery, and deep integrations with business systems like ServiceM8, Cliniko, Jobber, and custom CRMs. The goal is automated operational execution, not superficial conversation.'
  },
  {
    id: 'can-voice-agents-book',
    category: 'Technical',
    question: 'Can an AI voice agent actually book appointments?',
    answer: 'Yes, when connected to a supported calendar API or scheduling platform. A voice agent can check real-time availability against your staff rosters, take into account service durations and buffer times, collect customer contact details, confirm the reservation, and issue calendar invites and SMS confirmations. Where treatments or jobs require human assessment, the system can place a provisional hold and flag the request for staff review.'
  },
  {
    id: 'crm-integration',
    category: 'Technical',
    question: 'Can Nexamor integrate with our existing CRM or booking system?',
    answer: 'Yes, provided your software provides an accessible API or webhook infrastructure. We regularly engineer connectors for platforms including ServiceM8, Jobber, Cliniko, Timely, Fresha, Google Workspace, Microsoft 365, HubSpot, and custom SQL databases. If a platform lacks a modern API, we assess available export/import mechanisms or propose lightweight middleware solutions.'
  },
  {
    id: 'after-hours-enquiries',
    category: 'Operations',
    question: 'Can it handle after-hours and weekend enquiries?',
    answer: 'Yes. One of the highest-leverage applications for Australian service businesses is after-hours call answering. The system can greet callers 24/7, answer common questions regarding operating hours and service areas, identify urgent emergencies, and either immediately transfer the call to an on-call technician or queue a high-priority morning callback.'
  },
  {
    id: 'human-escalation',
    category: 'Operations',
    question: 'What happens when a caller or enquiry requires a human?',
    answer: 'We design clear, deterministic human escalation paths into every workflow. If a caller expresses distress, requests a complex custom quotation, has a sensitive complaint, or explicitly asks to speak with a staff member, the system can initiate a warm live transfer to designated numbers, or collect full context and dispatch an urgent notification to your team via SMS or internal messaging.'
  },
  {
    id: 'start-with-one-workflow',
    category: 'Operations',
    question: 'Can we start with just one workflow rather than a full overhaul?',
    answer: 'In fact, we recommend it. Most successful automation projects begin with a single, high-friction bottleneck—such as missed-call follow-ups for trades or appointment rescheduling for clinics. Starting with a targeted pilot allows your team to experience the technology, refine edge cases, and verify business value before expanding into other operational areas.'
  },
  {
    id: 'data-handling-security',
    category: 'Technical',
    question: 'How do you handle sensitive business and customer data?',
    answer: 'We adhere to the Australian Privacy Principles (APPs) set out in the Privacy Act 1988 (Cth). Customer data is processed through secure, encrypted connections (TLS 1.3) and stored in regional cloud infrastructure where agreed. System prompts and private operational data are never used to train public foundational AI models. Role-based access controls and comprehensive audit logs are configured for all production deployments.'
  },
  {
    id: 'implementation-timeline',
    category: 'Pricing & Delivery',
    question: 'How long does an implementation typically take?',
    answer: 'Implementation timelines depend on system complexity and the number of integrations involved. A focused single-workflow pilot (e.g. an AI inbound triage assistant or missed-call SMS workflow) typically takes 2 to 4 weeks from discovery to deployment. Complex multi-system enterprise integrations across legacy databases and custom telephony usually require 6 to 10 weeks. We provide clear milestone schedules during the mapping stage.'
  },
  {
    id: 'how-much-does-it-cost',
    category: 'Pricing & Delivery',
    question: 'How much does an AI transformation project cost?',
    answer: 'Costs vary based on scope, architecture, telephony usage, and integration depth. We structure projects into a transparent one-off implementation and integration investment, followed by a predictable monthly infrastructure and ongoing maintenance retainer. We do not use speculative "pay only on revenue" models or hidden markups; every project receives a detailed written scope of work before commencement.'
  },
  {
    id: 'does-ai-replace-staff',
    category: 'Operations',
    question: 'Does this AI replace our existing team members?',
    answer: 'No. Our systems are engineered to eliminate repetitive administrative drag—such as repeatedly answering "what time do you open?", manually re-typing caller notes, or chasing unconfirmed appointments. By automating these low-complexity tasks, your team can concentrate on what humans do best: skilled trade craftsmanship, in-person clinical care, and building long-term client relationships.'
  },
  {
    id: 'how-to-measure-success',
    category: 'Pricing & Delivery',
    question: 'How do you measure the success of an implementation?',
    answer: 'We establish baseline operational metrics during the Discover stage and measure against them post-deployment. Common benchmarks include: percentage of after-hours calls captured, average response time to new web/phone enquiries, rate of appointment no-shows, staff hours saved on manual data entry, and customer feedback on booking convenience.'
  }
];
