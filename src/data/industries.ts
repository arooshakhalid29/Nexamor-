import { IndustryItem } from '../types';

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'home-services',
    title: 'Home Services & Trades',
    category: 'HVAC · Plumbing · Electrical · Locksmiths · Roofing',
    headline: 'Every urgent enquiry deserves a clear next step.',
    operationalChallenge: 'Trades technicians are often on-site, in roof cavities, or operating machinery when urgent calls arrive. Inbound emergency jobs are lost to competitors within minutes when nobody answers, while office staff spend hours qualifying addresses and retyping job details.',
    exampleWorkflow: {
      inbound: 'Customer calls after hours about a burst flexi-hose causing active ceiling flooding.',
      processing: 'Voice agent identifies urgent category, captures full street address, confirms water isolation status, and checks on-call technician roster.',
      action: 'Generates urgent dispatch card in ServiceM8/Jobber, alerts on-call plumber via SMS, and informs caller of estimated response window.',
      followUp: 'Sends automated tracking SMS to the homeowner and logs call recording and transcript to the customer CRM history.'
    },
    proposedAutomation: [
      '24/7 inbound phone triage with emergency keyword qualification',
      'Address verification and Australian suburb geo-fencing checks',
      'ServiceM8 / Jobber / SimPRO direct job card draft creation',
      'Instant SMS response for unanswered calls within 15 seconds',
      'Automated job-status and technician arrival notification texts'
    ],
    operationalBenefits: [
      'Immediate capture of high-value emergency jobs without 24/7 night staff',
      'Eliminates duplicate data entry between phone calls and dispatch software',
      'Reduces phone interruptions for technicians working on hazardous sites',
      'Provides transparent audio recordings and structured caller summaries'
    ],
    imageSrc: '/src/assets/images/aus_trades_operations_1793073151541.jpg',
    imageAlt: 'Australian commercial trades workshop with technicians reviewing digital dispatch tablets'
  },
  {
    id: 'salons-hairdressers',
    title: 'Salons & Hairdressers',
    category: 'Hair Salons · Barbershops · Skin Clinics · Day Spas',
    headline: 'Keep serving your clients while your booking system handles the next enquiry.',
    operationalChallenge: 'Stylists and colourists cannot safely answer ringing salon phones with tint bowls in hand or clients in the chair. Phone interruptions disrupt the salon atmosphere, and clients calling during busy Saturday slots often abandon rather than leave voicemails.',
    exampleWorkflow: {
      inbound: 'Client calls during a busy Friday afternoon requesting a half-head foils and cut appointment for next Saturday.',
      processing: 'AI assistant checks senior colourist roster in Timely/Fresha, factors in service duration (150 mins) and patch test history.',
      action: 'Offers two available matching Saturday timeslots, verifies client mobile, and holds the appointment provisional slot.',
      followUp: 'Sends SMS confirmation link with salon deposit policy and prep instructions; calendar updates in real time.'
    },
    proposedAutomation: [
      'Intelligent booking assistant connected directly to Timely, Fresha, or Shortcuts',
      'Service duration and processing-time buffer management',
      'Handling routine questions regarding pricing tiers, parking, and hair extensions',
      'Automated 48-hour SMS reminder sequence with one-tap confirm or reschedule',
      'Waitlist management that auto-offers newly cancelled slots to waiting clients'
    ],
    operationalBenefits: [
      'Zero ringing phones disrupting the in-chair client experience',
      '24/7 booking capability captures late-evening appointment requests',
      'Noticeably lower late cancellations and no-show rates via timed SMS reminders',
      'Front-desk team can dedicate 100% of their focus to welcoming arriving guests'
    ],
    imageSrc: '/src/assets/images/aus_salon_studio_1793073151440.jpg',
    imageAlt: 'Modern boutique Australian salon studio with styling stations and natural daylight'
  },
  {
    id: 'dental-healthcare',
    title: 'Dental & Healthcare Clinics',
    category: 'Dental Practices · Orthodontists · Physiotherapy · Allied Health',
    headline: 'Reduce administrative friction around appointments.',
    operationalChallenge: 'Reception staff are stretched between greeting in-clinic patients, processing HICAPS claims, managing intake forms, and handling continuous incoming phone enquiries for standard appointment rescheduling or general clinic information.',
    exampleWorkflow: {
      inbound: 'Patient phones asking to reschedule their Thursday hygiene check-up and asks about health fund rebate processing.',
      processing: 'AI conversational agent verifies patient identity via mobile and date-of-birth, retrieves appointment in Cliniko/Dental4Windows, and checks practitioner availability.',
      action: 'Moves appointment to the patient’s preferred replacement date, confirms health fund rebate items, and notes human review if dental pain is mentioned.',
      followUp: 'Dispatches instant calendar invite and SMS reschedule confirmation with clinic pre-arrival instructions.'
    },
    proposedAutomation: [
      'Routine appointment booking, rescheduling, and cancellation triage',
      'Automated answers to opening hours, clinic location, wheelchair access, and HICAPS items',
      'Strict clinical triage guardrails: immediate warm transfer to nurse/dentist if clinical distress is detected',
      'Pre-appointment digital health history intake dispatch',
      'Recall workflows that contact patients due for 6-month check-ups'
    ],
    operationalBenefits: [
      'Reduces front-desk queue congestion and phone ringing in patient waiting rooms',
      'Strict privacy boundaries: no automated medical advice or diagnosis',
      'Higher compliance with regular 6-month preventative health recalls',
      'Enables receptionists to deliver attentive, personal patient care in-clinic'
    ],
    imageSrc: '/src/assets/images/aus_clinic_reception_1793073151738.jpg',
    imageAlt: 'Minimalist Australian dental and healthcare reception with stone desk and warm timber'
  },
  {
    id: 'automotive-workshops',
    title: 'Automotive Workshops',
    category: 'Mechanics · Tyre Centres · Auto Electricians · Fleet Repairers',
    headline: 'Turn repetitive calls into organised service workflows.',
    operationalChallenge: 'Workshop managers spend 2 to 3 hours daily answering "is my car ready?", quoting standard logbook services, or coordinating loan vehicle availability while service bays stand waiting for technician sign-offs.',
    exampleWorkflow: {
      inbound: 'Customer calls to book a 60,000 km logbook service for a 2021 Toyota Hilux and asks for a drop-off loan car.',
      processing: 'System captures vehicle make, model, year, current odometer reading, confirms workshop hoist capacity, and verifies loan car availability.',
      action: 'Reserves hoist time slot and vehicle drop-off window in workshop management system; sends provisional estimate breakdown.',
      followUp: 'Sends morning-of drop-off reminder with key drop-box code and workshop gate opening times.'
    },
    proposedAutomation: [
      'Automated logbook service and pink-slip / roadworthy inspection booking',
      'Rego and VIN lookup integration for vehicle specification verification',
      'Automated "Vehicle Ready for Collection" SMS dispatch with digital invoice link',
      'After-hours towing and breakdown contact direction triage',
      'Proactive service reminder notices based on elapsed calendar months'
    ],
    operationalBenefits: [
      'Reduces repeated "status update" calls by up to 70% with automated stage notifications',
      'More accurate service booking information captured before the vehicle arrives',
      'Optimised hoist scheduling prevents morning drop-off bottlenecks',
      'Workshop foremen can stay focused on diagnostic testing and parts sourcing'
    ],
    imageSrc: '/src/assets/images/aus_auto_workshop_1793073151925.jpg',
    imageAlt: 'Australian automotive mechanical service bay with technician reviewing diagnostic tablet'
  },
  {
    id: 'allied-appointment',
    title: 'Other Appointment-Based Businesses',
    category: 'Veterinary Clinics · Pet Groomers · Physiotherapy · Pilates Studios',
    headline: 'Consistent communication for businesses where schedules determine profitability.',
    operationalChallenge: 'Whether managing grooming slots, exercise class capacities, or veterinary consultation rosters, uncoordinated bookings lead to empty staff hours, double-booked treatment rooms, and frustrated clients.',
    exampleWorkflow: {
      inbound: 'Client submits enquiry via web form after 8:00 PM asking to book a senior dog grooming session with sensitive skin requirements.',
      processing: 'AI workflow checks groomer skill tags, calculates appropriate bath and clipping duration, and checks next week availability.',
      action: 'Offers two suitable afternoon slots, collects pet temperament notes, and queues groomer confirmation.',
      followUp: 'Sends automated calendar invite and text reminder 24 hours prior to booking.'
    },
    proposedAutomation: [
      'Service-specific intake questionnaires and client note aggregation',
      'Waitlist automation that fills sudden cancellations within minutes',
      'Automated SMS payment link dispatch and deposit collection',
      'Consistent cancellation policy enforcement with gentle self-rescheduling',
      'Seamless transition to human staff whenever special requirements arise'
    ],
    operationalBenefits: [
      'Significantly improved calendar fill rates through rapid enquiry response',
      'Zero double-bookings across multi-staff or shared equipment environments',
      'Respects specific staff specialties and service duration variations',
      'Protects business revenue with automated deposit collection workflows'
    ],
    imageSrc: '/src/assets/images/aus_clinic_reception_1793073151738.jpg',
    imageAlt: 'Professional Australian allied appointment reception area'
  }
];
