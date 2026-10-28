import React, { useState } from 'react';
import { 
  Bot, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  RefreshCw,
  Wrench,
  Scissors,
  Activity,
  Car
} from 'lucide-react';

type DemoIndustry = 'plumber' | 'salon' | 'dental' | 'auto';

interface DemoScenario {
  id: DemoIndustry;
  label: string;
  icon: React.ReactNode;
  customerQuery: string;
  callerProfile: string;
  step1_intent: {
    classified: string;
    confidence: string;
    detectedKeywords: string[];
  };
  step2_entities: {
    label: string;
    value: string;
  }[];
  step3_decision: {
    action: string;
    reasoning: string;
    routeTo: string;
  };
  step4_escalation: {
    triggered: boolean;
    rule: string;
    handler: string;
  };
  step5_summary: {
    jobCode: string;
    time: string;
    priority: string;
    payloadText: string;
  };
}

const DEMO_SCENARIOS: Record<DemoIndustry, DemoScenario> = {
  plumber: {
    id: 'plumber',
    label: 'Emergency Plumber',
    icon: <Wrench className="w-4 h-4" />,
    callerProfile: 'Homeowner · Fitzroy North, VIC 3068',
    customerQuery: '"Hi, we have a burst flexi hose under our kitchen sink and water is pouring through the cabinets. Can someone come out tonight? We have turned off the tap but it’s still trickling."',
    step1_intent: {
      classified: 'Emergency Service Callout (Burst Pipe / Water Ingress)',
      confidence: '98.4%',
      detectedKeywords: ['burst flexi hose', 'water pouring', 'tonight', 'kitchen sink']
    },
    step2_entities: [
      { label: 'Caller Name', value: 'Sarah Henderson' },
      { label: 'Address', value: '84 Park Road, Fitzroy North VIC 3068' },
      { label: 'Issue Category', value: 'Active Water Leak / Flexi Hose' },
      { label: 'Water Isolation', value: 'Local isolator off; mains stopcock advice given' },
      { label: 'Callout Acceptance', value: 'Acknowledged after-hours rate $260 + GST' }
    ],
    step3_decision: {
      action: 'Emergency Technician Dispatch (Highest Priority)',
      reasoning: 'Active water ingress threatens structural timber; location is within Melbourne metro emergency boundary.',
      routeTo: 'On-Call Technician Van #3 (Dave K.)'
    },
    step4_escalation: {
      triggered: true,
      rule: 'Emergency water ingress with structural damage risk triggers automated phone bridge to on-call plumber if unacknowledged within 3 minutes.',
      handler: 'SIP Live Call Transfer / Priority Push Notification'
    },
    step5_summary: {
      jobCode: 'JOB-9042-EMERGENCY',
      time: '19:14 AEST',
      priority: 'CRITICAL',
      payloadText: 'Client Sarah Henderson reports ruptured flexi hose at 84 Park Rd Fitzroy North. Internal cabinets saturated. Mains isolation guided. Dispatched Dave K. (ETA 45 mins). SMS tracking link delivered.'
    }
  },
  salon: {
    id: 'salon',
    label: 'Hair Salon',
    icon: <Scissors className="w-4 h-4" />,
    callerProfile: 'Regular Client · Paddington, NSW 2021',
    customerQuery: '"Hi there! I am trying to book in with Chloe next Saturday for a full balayage, toner, and trim. Around 11:00 AM if possible? Also wondering if you have parking nearby."',
    step1_intent: {
      classified: 'Appointment Booking Request + Parking FAQ',
      confidence: '99.1%',
      detectedKeywords: ['Chloe', 'next Saturday', 'full balayage', 'toner', 'trim', 'parking']
    },
    step2_entities: [
      { label: 'Requested Stylist', value: 'Chloe (Senior Colourist)' },
      { label: 'Service Package', value: 'Full Balayage + Toner + Design Cut (210 mins)' },
      { label: 'Requested Date', value: 'Next Saturday (07 Nov)' },
      { label: 'Requested Time', value: '11:00 AM requested' },
      { label: 'Parking Advice', value: '2-hour free council parking on Campbell Ave' }
    ],
    step3_decision: {
      action: 'Slot Offer & Tentative Reservation',
      reasoning: 'Chloe has 11:30 AM availability with 15-minute colour processing buffer. 11:00 AM has existing booking.',
      routeTo: 'Timely Salon Software / SMS Booking Confirmation Link'
    },
    step4_escalation: {
      triggered: false,
      rule: 'Standard booking within verified stylist capability and schedule. No chemical allergy or complaint detected.',
      handler: 'Self-serve SMS confirmation with salon cancellation policy'
    },
    step5_summary: {
      jobCode: 'APT-8119-BALAYAGE',
      time: '14:22 AEDT',
      priority: 'STANDARD',
      payloadText: 'Provisional appointment placed for Chloe at 11:30 AM Saturday 07 Nov (210 mins). Deposit policy link ($80 hold) and parking guide dispatched via SMS to client. Timely calendar updated.'
    }
  },
  dental: {
    id: 'dental',
    label: 'Dental Practice',
    icon: <Activity className="w-4 h-4" />,
    callerProfile: 'New Patient · Indooroopilly, QLD 4068',
    customerQuery: '"Hello, my son has a chipped molar from weekend sport. It’s a bit sensitive to cold water but not bleeding. Can we get him checked out this afternoon or tomorrow morning? We have Bupa health fund."',
    step1_intent: {
      classified: 'Dental Triage & Appointment Scheduling + Private Health Fund Query',
      confidence: '97.8%',
      detectedKeywords: ['chipped molar', 'sports injury', 'sensitive to cold', 'Bupa']
    },
    step2_entities: [
      { label: 'Patient Category', value: 'Paediatric / Sports Dental Trauma' },
      { label: 'Symptom Triage', value: 'Chipped molar, cold sensitivity, no active haemorrhage' },
      { label: 'Health Fund', value: 'Bupa Preferred Provider (HICAPS on-the-spot)' },
      { label: 'Timeframe', value: 'Same-day urgent or next morning priority' }
    ],
    step3_decision: {
      action: 'Emergency Dental Slot Reservation',
      reasoning: 'Dental trauma with exposed dentine warrants same-day review by paediatric-certified dentist.',
      routeTo: 'Dr. Emily Chen (Today 16:30 Emergency Reserve Slot)'
    },
    step4_escalation: {
      triggered: false,
      rule: 'Clinical boundary verification: No loss of consciousness, airway compromise, or uncontrolled bleeding. Immediate escalation not required; same-day examination allocated.',
      handler: 'Nurse triage checklist logged in Cliniko record'
    },
    step5_summary: {
      jobCode: 'DEN-5510-TRAUMA',
      time: '11:05 AEST',
      priority: 'HIGH (SAME DAY)',
      payloadText: 'Booked 16:30 today with Dr. Chen. Chipped lower left molar. Bupa card reminder and digital medical history questionnaire dispatched to guardian via SMS.'
    }
  },
  auto: {
    id: 'auto',
    label: 'Automotive Workshop',
    icon: <Car className="w-4 h-4" />,
    callerProfile: 'Fleet Client · Welshpool, WA 6106',
    customerQuery: '"G’day mate, need to get our 2022 Ford Ranger booked in for its 75,000 km logbook service before our crew heads up north on Thursday. Do you guys do loan utes while it’s in?"',
    step1_intent: {
      classified: 'Logbook Service Booking + Loan Vehicle Availability Inquiry',
      confidence: '98.7%',
      detectedKeywords: ['Ford Ranger', '75,000 km logbook', 'before Thursday', 'loan ute']
    },
    step2_entities: [
      { label: 'Vehicle Model', value: '2022 Ford Ranger 2.0L Bi-Turbo Diesel' },
      { label: 'Service Interval', value: '75,000 km Manufacturer Logbook Schedule' },
      { label: 'Deadline', value: 'Wednesday completion required' },
      { label: 'Loan Vehicle', value: 'Utility / Commercial vehicle required' },
      { label: 'Service Bay', value: 'Hoist #4 (4.5T Light Commercial Capacity)' }
    ],
    step3_decision: {
      action: 'Workshop Booking & Loan Ute Hold',
      reasoning: 'Hoist #4 available Wednesday morning; Loan Ute #2 available for single-day commercial booking.',
      routeTo: 'Workshop Foreman Schedule & Loan Car Register'
    },
    step4_escalation: {
      triggered: false,
      rule: 'Standard commercial service within handbook parameters. No major mechanical engine seizure noted.',
      handler: 'Workshop management software auto-populates parts pull list (filters, oils, brake inspection)'
    },
    step5_summary: {
      jobCode: 'AUT-3391-LOGBOOK',
      time: '09:40 AWST',
      priority: 'MEDIUM',
      payloadText: 'Confirmed 08:00 Wednesday drop-off for 2022 Ranger. Loan Ute #2 reserved. Logbook parts checklist queued. Automated drop-off confirmation sent with key locker details.'
    }
  }
};

export const InteractiveDemo: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<DemoIndustry>('plumber');
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const scenario = DEMO_SCENARIOS[selectedIndustry];

  const handleRunFullDemo = () => {
    setIsSimulating(true);
    setActiveStage(1);
    
    let stage = 1;
    const interval = setInterval(() => {
      stage += 1;
      if (stage <= 5) {
        setActiveStage(stage);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1100);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F7F6F2] relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-2">
            <span className="text-[#191919] font-semibold">Interactive Simulator</span>
            <span aria-hidden="true">·</span>
            <span>Proof of Logic</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight">
            See what an automated customer journey could look like.
          </h2>
          <p className="mt-3 text-[#303030] text-sm sm:text-base leading-relaxed">
            Select an Australian business category to trace an illustrative inbound enquiry through automated triage, entity extraction, policy evaluation, escalation checks, and CRM payload assembly.
          </p>
          <div className="mt-4 p-3 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#777777] flex items-center gap-2.5 shadow-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px] bg-[#191919] text-white border border-[#191919] px-2 py-0.5 rounded font-mono shrink-0">
              Simulation Notice
            </span>
            <span className="text-[#303030]">
              This is a self-contained demonstration interface using simulated calendar availability and illustrative operational data. It does not place live telephone calls or access live client CRMs.
            </span>
          </div>
        </div>

        {/* Business Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {(Object.keys(DEMO_SCENARIOS) as DemoIndustry[]).map((key) => {
            const item = DEMO_SCENARIOS[key];
            const isSelected = selectedIndustry === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedIndustry(key);
                  setActiveStage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#191919] border-[#191919] text-white shadow-xs'
                    : 'bg-white border-[#E7E5E0] text-[#303030] hover:text-[#191919] hover:border-[#D5D3CC]'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The Simulated Call / Message */}
          <div className="lg:col-span-5 bg-white border border-[#E7E5E0] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E0] mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#191919]" />
                <span className="text-xs font-mono font-medium text-[#191919]">
                  INCOMING CUSTOMER ENQUIRY
                </span>
              </div>
              <span className="text-[11px] text-[#777777] font-mono">
                {scenario.callerProfile}
              </span>
            </div>

            <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E7E5E0] text-[#191919] text-sm leading-relaxed italic mb-6">
              {scenario.customerQuery}
            </div>

            {/* Run Full Simulation Button */}
            <button
              onClick={handleRunFullDemo}
              disabled={isSimulating}
              className="w-full py-2.5 px-4 bg-[#191919] hover:bg-[#303030] active:bg-black disabled:bg-[#777777] text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Processing Pipeline Stages...' : 'Run Automated Pipeline'}</span>
            </button>

            {/* Stage Selector Tabs */}
            <div className="mt-6 pt-5 border-t border-[#E7E5E0] space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-[#777777] tracking-wider block mb-2 font-semibold">
                Inspect Specific Pipeline Stage
              </span>
              {[
                { num: 1, label: '1. Intent Classification' },
                { num: 2, label: '2. Entity Extraction' },
                { num: 3, label: '3. Booking / Routing Decision' },
                { num: 4, label: '4. Human Escalation Boundary' },
                { num: 5, label: '5. Structured Summary for Business' }
              ].map((s) => (
                <button
                  key={s.num}
                  onClick={() => setActiveStage(s.num)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    activeStage === s.num
                      ? 'bg-[#F7F6F2] text-[#191919] font-medium border border-[#E7E5E0]'
                      : 'text-[#777777] hover:text-[#191919] hover:bg-[#F7F6F2]/60'
                  }`}
                >
                  <span>{s.label}</span>
                  {activeStage === s.num && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#191919]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Stage Inspection Details */}
          <div className="lg:col-span-7 bg-white border border-[#E7E5E0] rounded-2xl p-6 sm:p-7 shadow-xs">
            {activeStage === 1 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-[#191919]" />
                    <span className="text-xs font-mono font-semibold text-[#191919] uppercase tracking-wider">
                      Stage 01: Customer Intent Classification
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#191919] font-medium bg-[#F7F6F2] border border-[#E7E5E0] px-2 py-0.5 rounded">
                    Confidence: {scenario.step1_intent.confidence}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-[#777777] block mb-1">Identified Intent Category:</span>
                  <div className="text-base font-semibold text-[#191919] bg-[#F7F6F2] p-3 rounded-xl border border-[#E7E5E0]">
                    {scenario.step1_intent.classified}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-[#777777] block mb-2">Detected Acoustic &amp; Semantic Keywords:</span>
                  <div className="flex flex-wrap gap-2">
                    {scenario.step1_intent.detectedKeywords.map((kw, i) => (
                      <span key={i} className="text-xs font-mono bg-[#F7F6F2] text-[#303030] px-2.5 py-1 rounded-lg border border-[#E7E5E0]">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#777777] leading-relaxed pt-3 border-t border-[#E7E5E0]">
                  The model operates against a strict operational boundary taxonomy, immediately segregating emergency dispatch requests from routine price estimates.
                </p>
              </div>
            )}

            {activeStage === 2 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#191919]" />
                    <span className="text-xs font-mono font-semibold text-[#191919] uppercase tracking-wider">
                      Stage 02: Structured Entity Extraction
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#777777]">
                    {scenario.step2_entities.length} Key Parameters Extracted
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scenario.step2_entities.map((item, idx) => (
                    <div key={idx} className="bg-[#F7F6F2] p-3 rounded-xl border border-[#E7E5E0]">
                      <span className="text-[10px] uppercase font-mono text-[#777777] block mb-1 font-medium">
                        {item.label}
                      </span>
                      <span className="text-xs text-[#191919] font-medium leading-snug">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#777777] leading-relaxed pt-2 border-t border-[#E7E5E0]">
                  Entities are validated against local Australian data sources including Australia Post postcodes, geofenced trade zones, and provider schedules.
                </p>
              </div>
            )}

            {activeStage === 3 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-[#191919]" />
                    <span className="text-xs font-mono font-semibold text-[#191919] uppercase tracking-wider">
                      Stage 03: Booking / Routing Decision
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#777777]">
                    Deterministic Rule Execution
                  </span>
                </div>

                <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E7E5E0] space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#777777] block font-medium">
                      Autonomous Operational Action
                    </span>
                    <span className="text-sm font-semibold text-[#191919]">
                      {scenario.step3_decision.action}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#777777] block font-medium">
                      Decision Rule Rationale
                    </span>
                    <p className="text-xs text-[#303030] leading-relaxed mt-0.5">
                      {scenario.step3_decision.reasoning}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E7E5E0]">
                    <span className="text-[10px] uppercase font-mono text-[#777777] block font-medium">
                      Destination Target
                    </span>
                    <span className="text-xs font-mono text-[#191919]">
                      {scenario.step3_decision.routeTo}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeStage === 4 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#191919]" />
                    <span className="text-xs font-mono font-semibold text-[#191919] uppercase tracking-wider">
                      Stage 04: Human Escalation Protocol
                    </span>
                  </div>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                    scenario.step4_escalation.triggered ? 'bg-[#191919] text-white border border-[#191919]' : 'bg-[#F7F6F2] text-[#777777]'
                  }`}>
                    {scenario.step4_escalation.triggered ? 'Escalation Triggered' : 'Automated Resolution'}
                  </span>
                </div>

                <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E7E5E0] space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#777777] block mb-1 font-medium">
                      Escalation Rule Trigger
                    </span>
                    <p className="text-xs text-[#303030] leading-relaxed">
                      {scenario.step4_escalation.rule}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E7E5E0]">
                    <span className="text-[10px] uppercase font-mono text-[#777777] block mb-1 font-medium">
                      Operational Action Taken
                    </span>
                    <span className="text-xs font-mono text-[#191919]">
                      {scenario.step4_escalation.handler}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#777777] leading-relaxed pt-2">
                  Safeguards ensure the AI system never oversteps its remit. High-risk, sensitive, or clinical scenarios immediately involve human team members.
                </p>
              </div>
            )}

            {activeStage === 5 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#191919]" />
                    <span className="text-xs font-mono font-semibold text-[#191919] uppercase tracking-wider">
                      Stage 05: Structured Record Output
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#191919] font-medium">
                    {scenario.step5_summary.jobCode}
                  </span>
                </div>

                <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E7E5E0] font-mono text-xs text-[#303030] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#777777] pb-2 border-b border-[#E7E5E0]">
                    <span>RECORD: {scenario.step5_summary.jobCode}</span>
                    <span>PRIORITY: {scenario.step5_summary.priority}</span>
                    <span>TIMESTAMP: {scenario.step5_summary.time}</span>
                  </div>
                  <p className="leading-relaxed text-[#191919]">
                    {scenario.step5_summary.payloadText}
                  </p>
                </div>

                <p className="text-xs text-[#777777] leading-relaxed pt-2">
                  This structured summary is instantly pushed to the business’s ServiceM8, Cliniko, Timely, or CRM dispatch dashboard, accompanied by the audio recording.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
