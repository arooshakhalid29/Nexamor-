import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Send, 
  Sparkles,
  Info,
  Clock,
  CalendarCheck,
  Wrench,
  Stethoscope,
  Scissors,
  Car,
  CheckCircle2,
  Database,
  ArrowRight,
  FastForward
} from 'lucide-react';

export type DemoScenarioId = 'trades' | 'dental' | 'salon' | 'auto';

interface Message {
  id: string;
  speaker: 'ai' | 'caller';
  text: string;
  time: string;
}

interface ExtractionRecord {
  callerName?: string;
  contactNumber?: string;
  location?: string;
  serviceRequested?: string;
  urgencyLevel: 'Emergency' | 'High' | 'Normal' | 'Routine';
  scheduledTime?: string;
  crmPayloadStatus: 'Listening' | 'Extracting' | 'Dispatched to CRM';
  targetSystem: string;
}

interface ScenarioTemplate {
  id: DemoScenarioId;
  title: string;
  industry: string;
  badge: string;
  icon: React.ReactNode;
  initialPrompt: string;
  initialOptions: string[];
  targetCrm: string;
  summaryNote: string;
}

const SCENARIOS: ScenarioTemplate[] = [
  {
    id: 'trades',
    title: 'Emergency Trades & HVAC',
    industry: 'Plumbing, HVAC & Electrical',
    badge: 'After-Hours Hotline',
    icon: <Wrench className="w-4 h-4 text-[#191919]" />,
    initialPrompt: "G'day, thanks for calling Nexamor Emergency Trade Dispatch. Our technicians are currently on emergency callouts, but I can dispatch an on-call tradesperson immediately. What is the emergency with your property?",
    initialOptions: [
      "Our hot water tank burst and flooding the driveway.",
      "Power tripped across the whole house, need an emergency electrician.",
      "Air conditioning unit stopped working in 38-degree heat.",
      "Just calling for a routine plumbing quote next week."
    ],
    targetCrm: 'ServiceTitan / ServiceM8',
    summaryNote: 'Triage rules distinguish live emergencies (<15 min SLA) from routine estimates, rolling emergency tickets directly into the on-call mobile roster.'
  },
  {
    id: 'dental',
    title: 'Dental & Medical Clinic',
    industry: 'Healthcare & Clinical Practice',
    badge: 'Clinical Intake Triage',
    icon: <Stethoscope className="w-4 h-4 text-[#191919]" />,
    initialPrompt: "Hello, thanks for calling Nexamor Dental & Medical Reception. How can I help with your appointment or health enquiry today?",
    initialOptions: [
      "I have severe tooth pain and need an emergency slot today.",
      "Looking to book a routine six-month dental clean and checkup.",
      "Can I check if you accept Bupa and HCF health funds?",
      "Need to reschedule my booking from Thursday to Friday."
    ],
    targetCrm: 'Cliniko / Best Practice',
    summaryNote: 'Clinical safeguards identify acute pain or trauma for prioritized emergency nurse review while autonomously managing routine checkup calendar bookings.'
  },
  {
    id: 'salon',
    title: 'Hair & Beauty Studio',
    industry: 'Salons, Barbers & Spas',
    badge: 'Salon Receptionist',
    icon: <Scissors className="w-4 h-4 text-[#191919]" />,
    initialPrompt: "Hi there! Thanks for calling Nexamor Salon & Hair Studio. Are you looking to book an appointment, or did you have a question about our styling services?",
    initialOptions: [
      "I'd like to book a haircut and blow-dry this Friday afternoon.",
      "Looking for a full head balayage colour consultation next week.",
      "Do you have any availability tomorrow with senior stylist Liam?",
      "Just wanted to ask about your price list for men's styling."
    ],
    targetCrm: 'Timely / Fresha',
    summaryNote: 'Books clients around stylists’ live chair schedules, confirms service durations, and captures deposit holds automatically.'
  },
  {
    id: 'auto',
    title: 'Automotive & Mechanical',
    industry: 'Car Service Centres & Mechanics',
    badge: 'Workshop Dispatch',
    icon: <Car className="w-4 h-4 text-[#191919]" />,
    initialPrompt: "Thanks for calling Nexamor Automotive Service Centre. Are you calling regarding a vehicle breakdown, logbook service, or an ongoing repair update?",
    initialOptions: [
      "My car broke down on the motorway and I need urgent towing and inspection.",
      "I need to book a 60,000 km logbook service for a Toyota Hilux.",
      "My brakes are squealing loudly, looking for a diagnostic check.",
      "Can I get a quick quote for an all-wheel tyre replacement?"
    ],
    targetCrm: 'Workshop Software / Auto-Quote',
    summaryNote: 'Captures vehicle make, registration, and symptom severity to allocate the correct hoist and technician bay in advance.'
  }
];

export const InteractiveVoiceDemo: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<DemoScenarioId>('trades');
  const [callStatus, setCallStatus] = useState<'ready' | 'speaking' | 'listening' | 'ended'>('ready');
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState<string>('');
  const [isVoiceMuted, setIsVoiceMuted] = useState<boolean>(false);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [micNotice, setMicNotice] = useState<string | null>(null);

  // Extracted CRM HUD State
  const [extraction, setExtraction] = useState<ExtractionRecord>({
    urgencyLevel: 'Emergency',
    crmPayloadStatus: 'Listening',
    targetSystem: 'ServiceM8 / ServiceTitan'
  });

  const activeScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const recognitionRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const speakingWatchdogRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Clean up speech synthesis and recognition on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (speakingWatchdogRef.current) {
        clearTimeout(speakingWatchdogRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  // Voice synthesis with failsafe watchdog so UI NEVER hangs in 'speaking'
  const speakVoice = (text: string, onFinish?: () => void) => {
    if (speakingWatchdogRef.current) {
      clearTimeout(speakingWatchdogRef.current);
      speakingWatchdogRef.current = null;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window) || isVoiceMuted) {
      // Audio muted or not supported: immediately transition after short visual pause
      const timer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 700);
      speakingWatchdogRef.current = timer;
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      // Select natural Australian or English voice if installed
      const voices = window.speechSynthesis.getVoices();
      const australianVoice = voices.find((v) => 
        v.lang.toLowerCase().includes('en-au') || 
        v.name.toLowerCase().includes('australia') ||
        v.lang.toLowerCase().includes('en-gb') ||
        (v.lang.toLowerCase().includes('en') && v.name.includes('Natural'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (australianVoice) {
        utterance.voice = australianVoice;
      }

      let hasCompleted = false;
      const completeOnce = () => {
        if (!hasCompleted) {
          hasCompleted = true;
          if (speakingWatchdogRef.current) {
            clearTimeout(speakingWatchdogRef.current);
            speakingWatchdogRef.current = null;
          }
          if (onFinish) onFinish();
        }
      };

      utterance.onend = completeOnce;
      utterance.onerror = completeOnce;

      // Watchdog failsafe: cancel lock after at most 4 seconds
      const maxDuration = Math.min(6000, Math.max(2000, text.length * 70));
      speakingWatchdogRef.current = setTimeout(completeOnce, maxDuration);

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onFinish) onFinish();
    }
  };

  // Start call
  const handleStartCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const initialPrompt = activeScenario.initialPrompt;
    setCallStatus('speaking');
    setCurrentOptions(activeScenario.initialOptions);
    setExtraction({
      urgencyLevel: activeScenario.id === 'trades' ? 'Emergency' : 'Normal',
      crmPayloadStatus: 'Extracting',
      targetSystem: activeScenario.targetCrm
    });

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTranscript([
      {
        id: 'msg-0',
        speaker: 'ai',
        text: initialPrompt,
        time
      }
    ]);

    speakVoice(initialPrompt, () => {
      setCallStatus('listening');
    });
  };

  // Switch scenario
  const handleSelectScenario = (id: DemoScenarioId) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (speakingWatchdogRef.current) {
      clearTimeout(speakingWatchdogRef.current);
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }
    setIsMicActive(false);
    setSelectedScenarioId(id);
    setCallStatus('ready');
    setTranscript([]);
    setCustomInput('');
    setMicNotice(null);
    const target = SCENARIOS.find((s) => s.id === id);
    if (target) {
      setCurrentOptions(target.initialOptions);
      setExtraction({
        urgencyLevel: id === 'trades' ? 'Emergency' : 'Normal',
        crmPayloadStatus: 'Listening',
        targetSystem: target.targetCrm
      });
    }
  };

  // Interrupt / Skip speech to immediately allow responding
  const handleSkipToListen = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (speakingWatchdogRef.current) {
      clearTimeout(speakingWatchdogRef.current);
      speakingWatchdogRef.current = null;
    }
    setCallStatus('listening');
  };

  // Intelligent Contextual Response Generator
  const generateContextualResponse = (
    userText: string,
    history: Message[],
    scenarioId: DemoScenarioId
  ): { aiResponse: string; nextOptions: string[]; newExtraction: Partial<ExtractionRecord>; isFinal?: boolean } => {
    const textLower = userText.toLowerCase();

    // 1. Check for Name extraction
    let detectedName: string | undefined = undefined;
    const nameMatch = userText.match(/(?:my name is|i'm|im|this is|call me|name's)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i) ||
      userText.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)[,\s]/);
    if (nameMatch && nameMatch[1]) {
      detectedName = nameMatch[1];
    } else if (textLower.includes('david')) detectedName = 'David Miller';
    else if (textLower.includes('sarah')) detectedName = 'Sarah Chen';
    else if (textLower.includes('liam')) detectedName = 'Liam';
    else if (textLower.includes('mark')) detectedName = 'Mark Davis';

    // 2. Check for Phone extraction
    let detectedPhone: string | undefined = undefined;
    const phoneMatch = userText.match(/(?:04\d{2}\s?\d{3}\s?\d{3})|(?:04\d{8})/);
    if (phoneMatch) {
      detectedPhone = phoneMatch[0];
    }

    // 3. Check for Suburb / Address extraction
    let detectedLocation: string | undefined = undefined;
    if (textLower.includes('richmond')) detectedLocation = '42 High St, Richmond VIC';
    else if (textLower.includes('sydney')) detectedLocation = 'North Sydney NSW';
    else if (textLower.includes('parramatta')) detectedLocation = 'Parramatta NSW';
    else if (textLower.includes('brisbane')) detectedLocation = 'Fortitude Valley QLD';
    else if (textLower.includes('geelong')) detectedLocation = 'Geelong VIC';
    else if (textLower.includes('motorway') || textLower.includes('m1') || textLower.includes('highway')) detectedLocation = 'M1 Freeway near Exit 8';
    else if (textLower.includes('street') || textLower.includes('road') || textLower.includes('ave')) {
      const streetMatch = userText.match(/\d+\s+[A-Za-z]+\s+(?:Street|St|Road|Rd|Avenue|Ave|Drive|Dr)/i);
      if (streetMatch) detectedLocation = streetMatch[0];
    }

    // 4. Check for Time / Scheduling extraction
    let detectedTime: string | undefined = undefined;
    if (textLower.includes('friday afternoon') || textLower.includes('friday')) detectedTime = 'This Friday at 2:00 PM';
    else if (textLower.includes('tuesday')) detectedTime = 'Next Tuesday at 10:30 AM';
    else if (textLower.includes('tomorrow')) detectedTime = 'Tomorrow at 8:30 AM';
    else if (textLower.includes('today') || textLower.includes('urgent') || textLower.includes('now')) detectedTime = 'Immediate Emergency Dispatch (<20 min)';

    // Scenario A: Trades & Emergency Dispatch
    if (scenarioId === 'trades') {
      if (textLower.includes('hot water') || textLower.includes('burst') || textLower.includes('flood') || textLower.includes('leak')) {
        return {
          aiResponse: "A burst hot water system is an urgent priority. I'm opening an emergency dispatch ticket right now. What is your property address, and who should our plumber ask for upon arrival?",
          nextOptions: [
            "42 High Street, Richmond. Ask for David, mobile 0418 555 777.",
            "18 Campbell Parade, Bondi. My name is Sarah, phone 0422 111 888.",
            "Can you tell me your after-hours callout fee first?"
          ],
          newExtraction: {
            serviceRequested: 'Emergency Hot Water Burst & Leak Containment',
            urgencyLevel: 'Emergency',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('power') || textLower.includes('tripped') || textLower.includes('electrician') || textLower.includes('blackout')) {
        return {
          aiResponse: "A full power trip can indicate switchboard failure or a water fault. Our licensed emergency electrician is on standby. What is your suburb or street address, and your contact phone number?",
          nextOptions: [
            "Parramatta NSW, 12 Station St. Contact Mark on 0412 888 999.",
            "Hawthorn VIC. Ask for Rachel on 0433 444 555.",
            "Is anyone available within the next hour?"
          ],
          newExtraction: {
            serviceRequested: 'Switchboard Power Trip / Electrical Emergency',
            urgencyLevel: 'Emergency',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('air conditioning') || textLower.includes('ac') || textLower.includes('heat')) {
        return {
          aiResponse: "Understood, a broken AC in extreme heat is a top priority for vulnerable households. What brand of system is it, and what address can our refrigeration tech attend?",
          nextOptions: [
            "Daikin split system at 74 George St, Parramatta. 0411 999 888.",
            "Ducted Actron Air at Richmond. Contact David on 0418 555 777."
          ],
          newExtraction: {
            serviceRequested: 'HVAC Compressor Breakdown / Cooling Failure',
            urgencyLevel: 'High',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('quote') || textLower.includes('routine') || textLower.includes('next week')) {
        return {
          aiResponse: "Certainly! We can arrange an on-site inspection for next week with our senior estimator. What day suits you best, and what's your best mobile number?",
          nextOptions: [
            "Tuesday morning suits best. Reach me on 0411 222 333.",
            "Thursday afternoon around 2 PM. Mobile is 0455 666 777."
          ],
          newExtraction: {
            serviceRequested: 'Routine Plumbing / Electrical Quote',
            urgencyLevel: 'Normal',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      // If user provided address/contact/name:
      if (detectedLocation || detectedPhone || detectedName) {
        const nameGreeting = detectedName ? `Thanks ${detectedName}` : 'Thank you';
        const locNote = detectedLocation ? ` for ${detectedLocation}` : '';
        const phoneNote = detectedPhone ? ` to mobile ${detectedPhone}` : '';
        return {
          aiResponse: `${nameGreeting}! I have logged your emergency trade request${locNote}. A priority dispatch notification has been transmitted to our on-call technician's device with a confirmation SMS sent${phoneNote}. Our tradesperson will call you within 10 minutes.`,
          nextOptions: [],
          newExtraction: {
            callerName: detectedName || 'David Miller',
            location: detectedLocation || '42 High St, Richmond VIC',
            contactNumber: detectedPhone || '0418 555 777',
            crmPayloadStatus: 'Dispatched to CRM',
            scheduledTime: 'Immediate Technician Rolled (<15 min)'
          },
          isFinal: true
        };
      }

      // Fallback response for Trades:
      return {
        aiResponse: `Understood. I have logged that request in our dispatch console. What is the address of the property and the best contact number to reach you on?`,
        nextOptions: [
          "42 High Street, Richmond. Mobile is 0418 555 777.",
          "Parramatta NSW, contact me on 0412 888 999."
        ],
        newExtraction: {
          serviceRequested: userText.slice(0, 40),
          crmPayloadStatus: 'Extracting'
        }
      };
    }

    // Scenario B: Dental Clinic & Healthcare
    if (scenarioId === 'dental') {
      if (textLower.includes('pain') || textLower.includes('emergency') || textLower.includes('ache') || textLower.includes('tooth')) {
        return {
          aiResponse: "I'm sorry you're experiencing severe pain. We reserve emergency relief appointments daily with Dr. Vance. We have an opening at 11:30 AM today or 3:15 PM this afternoon. Which time works for you?",
          nextOptions: [
            "11:30 AM today please, the pain is quite bad.",
            "3:15 PM this afternoon suits my work schedule better.",
            "Do I need to bring my Medicare card and private health insurance?"
          ],
          newExtraction: {
            serviceRequested: 'Acute Dental Pain / Emergency Toothache Relief',
            urgencyLevel: 'Emergency',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('routine') || textLower.includes('clean') || textLower.includes('checkup')) {
        return {
          aiResponse: "We would love to welcome you for a comprehensive exam and hygiene clean. We have appointments open this Friday at 10:00 AM or next Tuesday at 2:00 PM. Do either of those suit you?",
          nextOptions: [
            "Friday at 10:00 AM is perfect.",
            "Next Tuesday afternoon at 2:00 PM please.",
            "Can I also book a clean for my partner at the same time?"
          ],
          newExtraction: {
            serviceRequested: 'Routine 6-Month Dental Hygiene & Oral Checkup',
            urgencyLevel: 'Routine',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('bupa') || textLower.includes('hcf') || textLower.includes('health fund') || textLower.includes('hicaps')) {
        return {
          aiResponse: "Yes, we are a Preferred Provider for Bupa, HCF, Medibank, and CBHS, with on-the-spot HICAPS electronic claims processing. Would you like me to book your dental checkup or consult now?",
          nextOptions: [
            "Yes please, let's book Friday morning.",
            "How much is the out-of-pocket gap fee approximately?"
          ],
          newExtraction: {
            serviceRequested: 'HICAPS Fund Eligibility & Checkup Booking',
            urgencyLevel: 'Normal',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('reschedule') || textLower.includes('move') || textLower.includes('cancel')) {
        return {
          aiResponse: "I can assist with rescheduling that appointment. What is your full name and patient date of birth so I can retrieve your existing booking in our practice system?",
          nextOptions: [
            "Sarah Chen, DOB 14/05/1992. Move to Friday please.",
            "Mark Davis, mobile 0412 888 999."
          ],
          newExtraction: {
            serviceRequested: 'Patient Appointment Reschedule',
            urgencyLevel: 'Normal',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      // Booking confirmation step
      if (detectedTime || detectedName || detectedPhone || textLower.includes('perfect') || textLower.includes('suits') || textLower.includes('please')) {
        const nameGreeting = detectedName ? `Thank you, ${detectedName}` : 'Thank you';
        const timeNote = detectedTime || 'Friday at 10:00 AM';
        return {
          aiResponse: `${nameGreeting}. I have reserved your dental appointment for ${timeNote}. A calendar confirmation and medical intake link have been queued to your mobile. Please arrive 5 minutes early for your HICAPS swipe.`,
          nextOptions: [],
          newExtraction: {
            callerName: detectedName || 'Sarah Chen',
            scheduledTime: timeNote,
            contactNumber: detectedPhone || '0422 111 888',
            crmPayloadStatus: 'Dispatched to CRM'
          },
          isFinal: true
        };
      }

      return {
        aiResponse: "Understood. I can help coordinate that clinical booking. What is your full name and preferred day or time?",
        nextOptions: [
          "Sarah Chen, looking for Friday morning.",
          "David Miller, 0418 555 777."
        ],
        newExtraction: {
          serviceRequested: userText.slice(0, 40),
          crmPayloadStatus: 'Extracting'
        }
      };
    }

    // Scenario C: Salon & Beauty Studio
    if (scenarioId === 'salon') {
      if (textLower.includes('haircut') || textLower.includes('blow-dry') || textLower.includes('cut')) {
        return {
          aiResponse: "Wonderful! We'd love to take care of your styling. This Friday we have openings at 1:30 PM and 4:00 PM. Which time suits you best?",
          nextOptions: [
            "Friday at 1:30 PM works great.",
            "Friday at 4:00 PM please.",
            "Is there any time open on Saturday morning instead?"
          ],
          newExtraction: {
            serviceRequested: 'Cut, Style & Blow-Dry',
            urgencyLevel: 'Normal',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('balayage') || textLower.includes('colour') || textLower.includes('consultation')) {
        return {
          aiResponse: "Balayage transformations include a 15-minute strand test and shade consultation. We have consultation slots next Wednesday at 11:00 AM and Thursday at 2:00 PM. Would either of those suit?",
          nextOptions: [
            "Wednesday at 11:00 AM please.",
            "Thursday at 2:00 PM works best.",
            "Can I send an inspiration photo beforehand?"
          ],
          newExtraction: {
            serviceRequested: 'Full Balayage & Colour Transformation',
            urgencyLevel: 'Normal',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('liam') || textLower.includes('stylist') || textLower.includes('senior')) {
        return {
          aiResponse: "Liam is our Master Stylist. He has one opening left tomorrow at 3:30 PM for cutting and blow-dries. Would you like me to reserve that chair for you?",
          nextOptions: [
            "Yes please, lock in 3:30 PM with Liam for me.",
            "What if I need colour with Liam as well?"
          ],
          newExtraction: {
            serviceRequested: 'Master Stylist Appointment (Liam)',
            urgencyLevel: 'Normal',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('price') || textLower.includes('cost') || textLower.includes('men')) {
        return {
          aiResponse: "Our master barber cuts are $55 AUD including consultation and hot-towel finish. Ladies' style cuts start at $95 AUD with wash and blow-wave. Would you like to check available chair times today or this weekend?",
          nextOptions: [
            "Yes, let's book a cut for this Friday afternoon.",
            "Do you have anything open this Saturday?"
          ],
          newExtraction: {
            serviceRequested: 'Pricing Enquiry & Service Consultation',
            urgencyLevel: 'Routine',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      // Salon Confirmation Step
      if (detectedTime || detectedName || detectedPhone || textLower.includes('works') || textLower.includes('lock in') || textLower.includes('please')) {
        const nameGreeting = detectedName ? `Thanks ${detectedName}` : 'Wonderful';
        const timeNote = detectedTime || 'Friday afternoon at 1:30 PM';
        return {
          aiResponse: `${nameGreeting}! I have booked your chair for ${timeNote}. An instant confirmation SMS with location directions and our salon preparation guide has been dispatched to your mobile.`,
          nextOptions: [],
          newExtraction: {
            callerName: detectedName || 'Jessica Taylor',
            scheduledTime: timeNote,
            contactNumber: detectedPhone || '0421 888 444',
            crmPayloadStatus: 'Dispatched to CRM'
          },
          isFinal: true
        };
      }

      return {
        aiResponse: "Sounds great! May I take your full name and preferred day to lock your salon reservation in?",
        nextOptions: [
          "Jessica Taylor, this Friday at 1:30 PM. 0421 888 444.",
          "Sarah Chen, next Tuesday morning please."
        ],
        newExtraction: {
          serviceRequested: userText.slice(0, 40),
          crmPayloadStatus: 'Extracting'
        }
      };
    }

    // Scenario D: Automotive & Workshop
    if (scenarioId === 'auto') {
      if (textLower.includes('broke down') || textLower.includes('breakdown') || textLower.includes('towing') || textLower.includes('motorway')) {
        return {
          aiResponse: "Sorry to hear your vehicle broke down — safety is paramount. I'm opening an emergency workshop intake ticket now. Where is the vehicle currently located, and what is the make and model?",
          nextOptions: [
            "Toyota Hilux on M1 Motorway near Exit 8. Name is Mark, 0412 888 999.",
            "Ford Ranger parked in North Sydney, engine won't turn over.",
            "Can you organise a flatbed tow truck to your workshop?"
          ],
          newExtraction: {
            serviceRequested: 'Emergency Roadside Breakdown & Workshop Intake',
            urgencyLevel: 'Emergency',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('logbook') || textLower.includes('service') || textLower.includes('hilux') || textLower.includes('toyota')) {
        return {
          aiResponse: "We provide warranty-backed logbook servicing using genuine OEM filters and fluids. We can book your vehicle for drop-off at 8:00 AM tomorrow or Thursday. Would either day suit your schedule?",
          nextOptions: [
            "Tomorrow at 8:00 AM drop-off is great.",
            "Thursday morning drop-off please.",
            "Do you provide a complimentary courtesy car during the service?"
          ],
          newExtraction: {
            serviceRequested: 'Warranty Logbook Servicing (Scheduled Maintenance)',
            urgencyLevel: 'Normal',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('brake') || textLower.includes('squeal') || textLower.includes('diagnostic')) {
        return {
          aiResponse: "Brake squealing typically indicates pad wear down to the acoustic warning indicators. We can conduct an immediate brake safety check tomorrow at 9:00 AM. May I take your vehicle registration and contact number?",
          nextOptions: [
            "Rego is ABC-123. Contact Mark on 0412 888 999.",
            "Registration YYY-999. Reach me on 0433 222 111."
          ],
          newExtraction: {
            serviceRequested: 'Brake Rotor & Pad Safety Diagnostic',
            urgencyLevel: 'High',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      if (textLower.includes('tyre') || textLower.includes('tire') || textLower.includes('quote')) {
        return {
          aiResponse: "We supply major brands including Bridgestone, Michelin, and Dunlop with wheel alignment included. What tyre size or vehicle model are you fitting?",
          nextOptions: [
            "265/65 R17 all-terrains for a dual-cab ute.",
            "Standard road tyres for a Mazda 3 hatchback."
          ],
          newExtraction: {
            serviceRequested: 'Tyre Fitment & Wheel Alignment Package',
            urgencyLevel: 'Normal',
            crmPayloadStatus: 'Extracting'
          }
        };
      }

      // Auto Confirmation Step
      if (detectedLocation || detectedPhone || detectedName || textLower.includes('rego') || textLower.includes('tomorrow')) {
        const nameGreeting = detectedName ? `Thanks ${detectedName}` : 'Understood';
        const locNote = detectedLocation ? ` at ${detectedLocation}` : '';
        return {
          aiResponse: `${nameGreeting}! I have entered your vehicle intake ticket into Workshop Software${locNote}. Our service manager has allocated hoist bay 2 for your vehicle, and an automated drop-off SMS has been paged to your phone.`,
          nextOptions: [],
          newExtraction: {
            callerName: detectedName || 'Mark Davis',
            location: detectedLocation || 'Parramatta Workshop',
            contactNumber: detectedPhone || '0412 888 999',
            crmPayloadStatus: 'Dispatched to CRM',
            scheduledTime: detectedTime || 'Tomorrow 8:00 AM Drop-off'
          },
          isFinal: true
        };
      }

      return {
        aiResponse: "Understood. I can coordinate with our workshop manager. What is the vehicle registration number and the best mobile number to confirm your booking?",
        nextOptions: [
          "Rego ABC-123, mobile is 0412 888 999.",
          "Toyota Hilux, contact David on 0418 555 777."
        ],
        newExtraction: {
          serviceRequested: userText.slice(0, 40),
          crmPayloadStatus: 'Extracting'
        }
      };
    }

    // Default Fallback
    return {
      aiResponse: `Thank you for those details. I have captured that in our intake buffer and alerted our team. What is the best contact number and name to finalise your ticket?`,
      nextOptions: [
        "Reach me on 0412 888 999, ask for Mark.",
        "Mobile is 0418 555 777, my name is David."
      ],
      newExtraction: {
        serviceRequested: userText.slice(0, 50),
        crmPayloadStatus: 'Extracting'
      }
    };
  };

  // Process Caller Reply (tapped, typed, or spoken via mic)
  const handleCallerReply = (replyText: string) => {
    if (!replyText.trim()) return;

    // If mic is active, stop it
    if (recognitionRef.current && isMicActive) {
      try { recognitionRef.current.stop(); } catch {}
      setIsMicActive(false);
    }

    // Cancel any previous speaking timer
    if (speakingWatchdogRef.current) {
      clearTimeout(speakingWatchdogRef.current);
      speakingWatchdogRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = {
      id: `caller-${Date.now()}`,
      speaker: 'caller',
      text: replyText.trim(),
      time
    };

    const newHistory = [...transcript, userMessage];
    setTranscript(newHistory);
    setCustomInput('');
    setCallStatus('speaking');

    // Generate accurate, context-aware AI response based on what caller specifically said
    const { aiResponse, nextOptions, newExtraction, isFinal } = generateContextualResponse(
      replyText.trim(),
      newHistory,
      selectedScenarioId
    );

    // Update CRM extraction record
    setExtraction((prev) => ({
      ...prev,
      ...newExtraction
    }));

    setTimeout(() => {
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        speaker: 'ai',
        text: aiResponse,
        time: aiTime
      };

      setTranscript((prev) => [...prev, aiMessage]);
      setCurrentOptions(nextOptions);

      speakVoice(aiResponse, () => {
        if (isFinal) {
          setCallStatus('ended');
          setExtraction((prev) => ({ ...prev, crmPayloadStatus: 'Dispatched to CRM' }));
        } else {
          setCallStatus('listening');
        }
      });
    }, 450);
  };

  // Toggle speech-to-text mic input
  const toggleMicrophone = () => {
    if (isMicActive) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
      setIsMicActive(false);
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setMicNotice('Speech recognition is not available in your browser sandbox. Please tap a suggested response or type your answer below.');
      return;
    }

    try {
      setMicNotice(null);
      const rec = new SpeechRec();
      rec.lang = 'en-AU';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsMicActive(true);
      };

      rec.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        if (spoken) {
          handleCallerReply(spoken);
        }
      };

      rec.onerror = (e: any) => {
        setIsMicActive(false);
        if (e.error === 'not-allowed') {
          setMicNotice('Microphone permission was not granted. You can type or tap the suggested responses directly.');
        } else {
          setMicNotice(`Microphone status: ${e.error || 'No speech heard'}. You can type or tap below.`);
        }
      };

      rec.onend = () => {
        setIsMicActive(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch {
      setIsMicActive(false);
      setMicNotice('Could not start microphone. Please use text input or tap the quick response buttons.');
    }
  };

  // End Call
  const handleEndCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (speakingWatchdogRef.current) {
      clearTimeout(speakingWatchdogRef.current);
      speakingWatchdogRef.current = null;
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }
    setIsMicActive(false);
    setCallStatus('ended');
  };

  return (
    <section id="ai-demo" className="scroll-mt-24 py-20 lg:py-28 bg-[#F7F6F2] relative border-b border-[#E7E5E0]">
      {/* Anchor alias for compatibility */}
      <span id="voice-demo" className="scroll-mt-24 absolute -top-24" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E5E0] rounded-full text-xs font-mono text-[#303030] shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#191919]" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">Interactive Voice Demo</span>
            <span aria-hidden="true" className="text-[#E7E5E0]">·</span>
            <span className="text-[#777777]">Live Responsive Simulation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191919] tracking-tight leading-tight">
            Hear the AI Dispatcher
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#303030] leading-relaxed">
            Test how Nexamor answers after-hours enquiries, diagnoses urgency in real time, and writes clean structured booking payloads directly to your CRM.
          </p>

          <div className="mt-4 p-3 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#777777] flex items-start gap-2.5 shadow-xs">
            <Info className="w-4 h-4 text-[#777777] shrink-0 mt-0.5" />
            <p className="text-[#303030]">
              <strong className="text-[#191919]">Live Conversational Testing:</strong> Select a business sector below. Tap any quick answer, type your own custom question, or speak with your microphone. The AI dynamically adapts its answers and updates the real-time CRM extraction buffer on the right.
            </p>
          </div>
        </div>

        {/* 4 Industry Scenario Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {SCENARIOS.map((sc) => {
            const isSelected = selectedScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc.id)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#191919] shadow-xs ring-1 ring-[#191919]'
                    : 'bg-white/70 border-[#E7E5E0] hover:bg-white text-[#777777] hover:border-[#D5D3CC]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#191919] text-white' : 'bg-[#F7F6F2] text-[#191919]'}`}>
                    {sc.icon}
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase ${
                    isSelected ? 'bg-[#191919] text-white' : 'bg-[#F7F6F2] text-[#777777]'
                  }`}>
                    {sc.badge}
                  </span>
                </div>
                <h3 className={`text-sm font-bold leading-snug ${isSelected ? 'text-[#191919]' : 'text-[#303030]'}`}>
                  {sc.title}
                </h3>
                <p className="text-xs text-[#777777] mt-0.5 truncate">
                  {sc.industry}
                </p>
              </button>
            );
          })}
        </div>

        {/* 2-Column Responsive Layout: Phone Call Interface on Left + Live CRM Buffer HUD on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Call Interface (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E7E5E0] rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between">
            {/* Top Bar: Call Status & Voice Controls */}
            <div className="p-4 sm:p-5 bg-[#F7F6F2] border-b border-[#E7E5E0] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E5E0] flex items-center justify-center text-[#191919] shadow-xs">
                  <Phone className={`w-5 h-5 ${callStatus === 'speaking' ? 'animate-pulse text-[#191919]' : 'text-[#191919]'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#191919]">
                      Nexamor Voice Dispatcher
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold bg-white border border-[#E7E5E0]">
                      &lt;300ms SLA
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#777777] mt-0.5 font-mono">
                    <span className={`w-2 h-2 rounded-full ${
                      callStatus === 'speaking'
                        ? 'bg-[#191919] animate-ping'
                        : callStatus === 'listening'
                        ? 'bg-emerald-500 animate-pulse'
                        : callStatus === 'ended'
                        ? 'bg-slate-400'
                        : 'bg-amber-400'
                    }`} />
                    <span className="capitalize font-medium text-[#303030]">
                      Status: {callStatus === 'ready' ? 'Ready to Call' : callStatus === 'speaking' ? 'AI Dispatcher Speaking...' : callStatus === 'listening' ? 'Listening for Caller Response...' : 'Call Completed'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Control Actions */}
              <div className="flex items-center gap-2">
                {callStatus === 'speaking' && (
                  <button
                    onClick={handleSkipToListen}
                    className="px-2.5 py-1.5 bg-white border border-[#E7E5E0] hover:bg-[#F7F6F2] text-xs font-mono font-medium text-[#191919] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    title="Skip voice playback and answer immediately"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    <span>Skip Speech</span>
                  </button>
                )}

                <button
                  onClick={() => setIsVoiceMuted(!isVoiceMuted)}
                  className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isVoiceMuted
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : 'bg-white border-[#E7E5E0] text-[#303030] hover:text-[#191919]'
                  }`}
                  title={isVoiceMuted ? 'Voice audio is muted' : 'Voice audio is active'}
                >
                  {isVoiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#191919]" />}
                  <span className="hidden sm:inline">{isVoiceMuted ? 'Muted' : 'Voice'}</span>
                </button>

                {callStatus !== 'ready' && (
                  <button
                    onClick={handleStartCall}
                    className="p-2 bg-white border border-[#E7E5E0] hover:bg-[#F7F6F2] text-[#303030] text-xs font-medium rounded-xl transition-colors cursor-pointer"
                    title="Restart demo from beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

                {callStatus !== 'ready' && callStatus !== 'ended' && (
                  <button
                    onClick={handleEndCall}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <PhoneOff className="w-3.5 h-3.5" />
                    <span>Hang Up</span>
                  </button>
                )}
              </div>
            </div>

            {/* Transcript Scroll Area */}
            <div className="p-5 sm:p-6 min-h-[300px] max-h-[420px] overflow-y-auto space-y-4 bg-white">
              {callStatus === 'ready' && transcript.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-4 max-w-md mx-auto">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F6F2] border border-[#E7E5E0] flex items-center justify-center mx-auto text-[#191919]">
                    <Sparkles className="w-6 h-6 text-[#191919]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#191919]">
                      Ready to test: {activeScenario.title}
                    </h4>
                    <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                      Click below to simulate an incoming customer call. The AI dispatcher greets you immediately. You can test emergencies, custom questions, or tap suggested answers.
                    </p>
                  </div>
                  <button
                    onClick={handleStartCall}
                    className="px-6 py-3 bg-[#191919] hover:bg-[#303030] active:bg-black text-white text-xs sm:text-sm font-semibold rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Start Test Call ({activeScenario.badge})</span>
                  </button>
                </div>
              ) : (
                <>
                  {transcript.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.speaker === 'caller' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#777777]">
                          {msg.speaker === 'ai' ? 'Nexamor Dispatcher (AU)' : 'Caller (You)'}
                        </span>
                        <span className="text-[10px] font-mono text-[#777777]">
                          {msg.time}
                        </span>
                      </div>
                      <div
                        className={`max-w-[88%] sm:max-w-[78%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          msg.speaker === 'ai'
                            ? 'bg-[#F7F6F2] text-[#191919] border border-[#E7E5E0] rounded-tl-xs'
                            : 'bg-[#191919] text-white rounded-tr-xs shadow-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={transcriptEndRef} />
                </>
              )}
            </div>

            {/* Caller Input Controls & Dynamic Suggestions */}
            {callStatus !== 'ready' && (
              <div className="p-4 sm:p-5 bg-[#F7F6F2] border-t border-[#E7E5E0] space-y-3">
                {micNotice && (
                  <div className="text-[11px] text-[#303030] bg-white border border-[#E7E5E0] p-2.5 rounded-xl">
                    {micNotice}
                  </div>
                )}

                {callStatus === 'ended' ? (
                  <div className="p-4 bg-white rounded-xl border border-[#E7E5E0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#191919]">
                        <CheckCircle2 className="w-4 h-4 text-[#191919]" />
                        <span>Call Completed &amp; Structured Ticket Pushed</span>
                      </div>
                      <p className="text-xs text-[#777777] mt-0.5">
                        {activeScenario.summaryNote}
                      </p>
                    </div>
                    <button
                      onClick={handleStartCall}
                      className="px-4 py-2 bg-[#191919] hover:bg-[#303030] text-white text-xs font-semibold rounded-xl whitespace-nowrap cursor-pointer transition-colors shadow-xs"
                    >
                      Replay Call
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Dynamic Quick Suggestions that accurately respond */}
                    {currentOptions.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono uppercase text-[#777777] font-semibold">
                            Suggested Caller Responses (Tap to test):
                          </span>
                          <span className="text-[10px] font-mono text-[#777777]">
                            Or type/speak below
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {currentOptions.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleCallerReply(opt)}
                              className="text-left text-xs bg-white hover:bg-[#FAF9F5] active:bg-[#F0EEE6] text-[#191919] border border-[#E7E5E0] hover:border-[#191919] px-3.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs font-medium flex items-center justify-between group"
                            >
                              <span>&ldquo;{opt}&rdquo;</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#191919] transition-transform group-hover:translate-x-0.5 shrink-0 ml-2" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Microphone Audio & Custom Text Input Form */}
                    <div className="pt-2 border-t border-[#E7E5E0] flex items-center gap-2">
                      <button
                        onClick={toggleMicrophone}
                        className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                          isMicActive
                            ? 'bg-[#191919] border-[#191919] text-white animate-pulse'
                            : 'bg-white border-[#E7E5E0] text-[#191919] hover:bg-[#FAF9F5]'
                        }`}
                        title="Speak using microphone"
                      >
                        {isMicActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#191919]" />}
                        <span className="hidden sm:inline font-mono text-[11px]">{isMicActive ? 'Listening...' : 'Mic'}</span>
                      </button>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleCallerReply(customInput);
                        }}
                        className="flex-1 flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={customInput}
                          onChange={(e) => setCustomInput(e.target.value)}
                          placeholder="Type any custom response or enquiry..."
                          className="flex-1 px-3.5 py-2 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#191919] placeholder-[#777777] focus:outline-none focus:border-[#191919] shadow-xs"
                        />
                        <button
                          type="submit"
                          disabled={!customInput.trim()}
                          className="px-3.5 py-2 bg-[#191919] hover:bg-[#303030] disabled:bg-[#E7E5E0] disabled:text-[#777777] text-white text-xs font-medium rounded-xl transition-colors cursor-pointer shadow-xs"
                          title="Send custom caller reply"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Real-time Telephony & CRM Extraction HUD (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E7E5E0] rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#191919]" />
                <span className="text-xs font-mono font-bold text-[#191919] uppercase tracking-wider">
                  Real-Time CRM Extraction HUD
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                extraction.crmPayloadStatus === 'Dispatched to CRM'
                  ? 'bg-[#191919] text-white'
                  : extraction.crmPayloadStatus === 'Extracting'
                  ? 'bg-[#E7E5E0] text-[#191919]'
                  : 'bg-[#F7F6F2] text-[#777777]'
              }`}>
                {extraction.crmPayloadStatus}
              </span>
            </div>

            <p className="text-xs text-[#777777] leading-relaxed">
              While the caller speaks, Nexamor parses unstructured conversation into deterministic operational entities, preventing administrative re-typing:
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="bg-[#F7F6F2] p-3 rounded-xl border border-[#E7E5E0]">
                <span className="text-[10px] uppercase text-[#777777] block font-semibold mb-0.5">
                  Extracted Caller Name
                </span>
                <span className="text-sm font-bold text-[#191919]">
                  {extraction.callerName || 'Awaiting identification...'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#F7F6F2] p-3 rounded-xl border border-[#E7E5E0]">
                  <span className="text-[10px] uppercase text-[#777777] block font-semibold mb-0.5">
                    Contact Phone
                  </span>
                  <span className="text-xs font-semibold text-[#191919]">
                    {extraction.contactNumber || 'Caller ID captured'}
                  </span>
                </div>
                <div className="bg-[#F7F6F2] p-3 rounded-xl border border-[#E7E5E0]">
                  <span className="text-[10px] uppercase text-[#777777] block font-semibold mb-0.5">
                    Urgency Rating
                  </span>
                  <span className={`text-xs font-bold ${
                    extraction.urgencyLevel === 'Emergency'
                      ? 'text-rose-600'
                      : extraction.urgencyLevel === 'High'
                      ? 'text-amber-600'
                      : 'text-[#191919]'
                  }`}>
                    {extraction.urgencyLevel}
                  </span>
                </div>
              </div>

              <div className="bg-[#F7F6F2] p-3 rounded-xl border border-[#E7E5E0]">
                <span className="text-[10px] uppercase text-[#777777] block font-semibold mb-0.5">
                  Job Scope / Clinical Service
                </span>
                <span className="text-xs text-[#191919] leading-relaxed block">
                  {extraction.serviceRequested || 'Listening for caller enquiry...'}
                </span>
              </div>

              <div className="bg-[#F7F6F2] p-3 rounded-xl border border-[#E7E5E0]">
                <span className="text-[10px] uppercase text-[#777777] block font-semibold mb-0.5">
                  Property Address / Suburb
                </span>
                <span className="text-xs text-[#191919]">
                  {extraction.location || 'Pending suburb specification...'}
                </span>
              </div>

              <div className="bg-[#F7F6F2] p-3 rounded-xl border border-[#E7E5E0]">
                <span className="text-[10px] uppercase text-[#777777] block font-semibold mb-0.5">
                  Target Dispatch Destination
                </span>
                <div className="flex items-center justify-between text-xs text-[#191919]">
                  <span className="font-semibold">{extraction.targetSystem}</span>
                  <span className="text-[10px] text-[#777777]">Webhook API v2</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E7E5E0] text-[11px] text-[#777777] leading-relaxed">
              <strong className="text-[#191919]">Enterprise Moat:</strong> When deployed for your company, this voice infrastructure operates with sub-300ms latency, native CRM read/write synchronization, and custom escalation rules straight to your team.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
