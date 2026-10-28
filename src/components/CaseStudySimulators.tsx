import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Calendar, 
  PhoneCall, 
  ShieldAlert, 
  Search, 
  Send, 
  Terminal
} from 'lucide-react';

/* =========================================================================
   SIMULATOR 1: AI Voice Receptionist Interactive Telephony Simulator
   ========================================================================= */
export const VoiceReceptionistSimulator: React.FC = () => {
  const [activeCallStep, setActiveCallStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [escalateToHuman, setEscalateToHuman] = useState<boolean>(false);

  const dialogue = [
    { speaker: 'system', text: 'Incoming call from 0418 392 xxx (Richmond VIC) connecting to Nexamor Voice Engine...' },
    { speaker: 'ai', text: '"Good evening, thank you for calling Premier Plumbing & Gas Melbourne. I can help book a job or answer questions. Are you calling regarding an urgent issue or routine service?"' },
    { speaker: 'caller', text: '"Hi, yeah it’s pretty urgent. Our hot water heater in the backyard is hissing loudly and spraying boiling water everywhere. Can you send someone tonight?"' },
    { speaker: 'ai', text: '"I understand completely. Please stay clear of the unit for safety. If it is safe to do so, isolate the cold water inlet tap on the unit. What is your full address so I can check our emergency roster?"' },
    { speaker: 'caller', text: '"It’s 15 Highett Street, Richmond. Can someone get here within an hour?"' },
    { speaker: 'ai', text: '"Thank you. We have Van 4 located in Collingwood. Our after-hours emergency callout is $280 plus GST, which includes the first 30 minutes on-site. May I confirm your name and dispatch technician Dave?"' },
    { speaker: 'caller', text: '"Yes, name is Mark Davies, send Dave straight away please."' },
    { speaker: 'ai', text: '"Done, Mark. Dave has been notified and will arrive between 7:30 PM and 8:00 PM. I am sending an SMS confirmation with his GPS tracking link now."' }
  ];

  const handleNext = () => {
    if (activeCallStep < dialogue.length - 1) {
      setActiveCallStep((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setActiveCallStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-5 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E7E5E0]">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-[#191919]" />
          <span className="text-xs font-mono font-semibold text-[#191919] uppercase">
            Live Telephony Simulation
          </span>
          <span className="text-[10px] bg-white border border-[#E7E5E0] text-[#777777] font-mono px-1.5 py-0.5 rounded">
            Simulated Call
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (activeCallStep >= dialogue.length - 1) setActiveCallStep(0);
              setIsPlaying(!isPlaying);
              if (!isPlaying) handleNext();
            }}
            className="px-2.5 py-1 text-xs font-medium bg-[#191919] hover:bg-[#303030] text-white rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlaying ? 'Pause' : 'Step Through Call'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1 text-[#777777] hover:text-[#191919] rounded-lg hover:bg-white transition-colors cursor-pointer"
            title="Reset call"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Audio Waveform visualization */}
      <div className="h-7 bg-white rounded-lg border border-[#E7E5E0] flex items-center justify-center px-4 gap-1 overflow-hidden">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-[#191919] rounded-full transition-all duration-150"
            style={{
              height: isPlaying ? `${Math.max(15, (Math.sin(i * 0.8 + activeCallStep) + 1) * 45)}%` : '20%'
            }}
          />
        ))}
      </div>

      {/* Transcript Log */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {dialogue.slice(0, activeCallStep + 1).map((line, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-xl text-xs leading-relaxed ${
              line.speaker === 'ai'
                ? 'bg-white border border-[#E7E5E0] text-[#191919] ml-4 shadow-xs'
                : line.speaker === 'caller'
                ? 'bg-[#191919] text-white mr-4'
                : 'text-center font-mono text-[10px] text-[#777777] my-1'
            }`}
          >
            {line.speaker !== 'system' && (
              <span className={`font-mono text-[10px] uppercase tracking-wider block mb-0.5 font-bold ${
                line.speaker === 'ai' ? 'text-[#191919]' : 'text-[#777777]'
              }`}>
                {line.speaker === 'ai' ? 'Nexamor Voice Agent' : 'Caller (Mark D.)'}
              </span>
            )}
            <p>{line.text}</p>
          </div>
        ))}
      </div>

      {/* Escalation Toggle Experiment */}
      <div className="pt-3 border-t border-[#E7E5E0] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#191919]" />
          <span className="text-[#303030]">Test Operator Escalation Rule:</span>
        </div>
        <button
          onClick={() => setEscalateToHuman(!escalateToHuman)}
          className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-colors cursor-pointer ${
            escalateToHuman 
              ? 'bg-[#191919] border-[#191919] text-white font-medium' 
              : 'bg-white border-[#E7E5E0] text-[#777777] hover:text-[#191919]'
          }`}
        >
          {escalateToHuman ? 'Human Transfer: ON' : 'Human Transfer: OFF'}
        </button>
      </div>

      {escalateToHuman && (
        <div className="p-3 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#191919] font-mono shadow-xs">
          [ALERT] Caller escalation condition triggered. Live SIP transfer initiated to Manager On-Call (+61 418 xxx 999).
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SIMULATOR 2: Appointment Automation Slot Checker & Booking Validator
   ========================================================================= */
export const AppointmentBookingSimulator: React.FC = () => {
  const [selectedService, setSelectedService] = useState('foils');
  const [selectedDate, setSelectedDate] = useState('2026-11-04');
  const [selectedSlot, setSelectedSlot] = useState<string | null>('11:30 AM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const services = [
    { id: 'foils', name: 'Half-Head Foils & Cut', duration: '120 mins', buffer: '15 mins', price: '$240' },
    { id: 'dental', name: 'Comprehensive Checkup & Scale', duration: '45 mins', buffer: '15 mins', price: '$195' },
    { id: 'physio', name: 'Initial Musculoskeletal Consult', duration: '60 mins', buffer: '10 mins', price: '$140' }
  ];

  const currentService = services.find((s) => s.id === selectedService) || services[0];

  const availableSlots = [
    { time: '09:00 AM', status: 'available' },
    { time: '10:15 AM', status: 'booked' },
    { time: '11:30 AM', status: 'available' },
    { time: '02:00 PM', status: 'available' },
    { time: '03:45 PM', status: 'booked' },
    { time: '04:30 PM', status: 'available' }
  ];

  const handleConfirm = () => {
    if (!selectedSlot) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#191919]" />
          <span className="text-xs font-mono font-semibold text-[#191919] uppercase">
            Two-Way Calendar Engine Simulation
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#777777]">
          Timely / Cliniko API Mode
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-mono text-[#777777] block mb-1">
            Service Definition
          </label>
          <select
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              setBookingConfirmed(false);
            }}
            className="w-full px-2.5 py-1.5 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#191919]"
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.duration})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-mono text-[#777777] block mb-1">
            Simulated Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setBookingConfirmed(false);
            }}
            className="w-full px-2.5 py-1.5 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#191919]"
          />
        </div>
      </div>

      <div className="p-3 bg-white rounded-xl border border-[#E7E5E0] text-xs shadow-xs">
        <div className="flex items-center justify-between text-[#303030] mb-1">
          <span>Allocated Treatment Block:</span>
          <span className="font-mono font-semibold text-[#191919]">{currentService.duration}</span>
        </div>
        <div className="flex items-center justify-between text-[#777777]">
          <span>Automated Room Turnover Buffer:</span>
          <span className="font-mono text-[#303030]">+{currentService.buffer} sanitisation</span>
        </div>
      </div>

      <div>
        <label className="text-[11px] font-mono text-[#777777] block mb-1.5">
          Calculated Available Calendar Slots
        </label>
        <div className="grid grid-cols-3 gap-2">
          {availableSlots.map((slot, i) => (
            <button
              key={i}
              disabled={slot.status === 'booked'}
              onClick={() => {
                setSelectedSlot(slot.time);
                setBookingConfirmed(false);
              }}
              className={`p-2 rounded-xl text-xs font-mono transition-colors border cursor-pointer ${
                slot.status === 'booked'
                  ? 'bg-[#E7E5E0]/50 border-[#E7E5E0] text-[#777777] line-through cursor-not-allowed'
                  : selectedSlot === slot.time
                  ? 'bg-[#191919] border-[#191919] text-white font-bold'
                  : 'bg-white border-[#E7E5E0] text-[#303030] hover:text-[#191919] hover:border-[#D5D3CC]'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        {bookingConfirmed ? (
          <div className="p-3 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#191919] flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#191919] shrink-0" />
              <span>Calendar event committed. 48-hr reminder queued via SMS.</span>
            </div>
            <button
              onClick={() => setBookingConfirmed(false)}
              className="text-[10px] text-[#777777] hover:text-[#191919] underline cursor-pointer"
            >
              Reset
            </button>
          </div>
        ) : (
          <button
            onClick={handleConfirm}
            disabled={!selectedSlot}
            className="w-full py-2 bg-[#191919] hover:bg-[#303030] disabled:bg-[#777777] text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
          >
            Confirm Reservation for {selectedSlot}
          </button>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   SIMULATOR 3: ClientHunter AI Operational Signal Inspector
   ========================================================================= */
export const ClientHunterSimulator: React.FC = () => {
  const [suburb, setSuburb] = useState('Parramatta NSW');
  const [category, setCategory] = useState('Plumbing & Drainage');
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<any>({
    businessName: 'Illustrative Parramatta Plumbing Co.',
    phoneChannel: 'Mobile diversion to voicemail during job hours',
    onlineBooking: 'None (Email form only, avg response ~6h)',
    afterHoursSignal: 'No 24/7 answering configured',
    frictionScore: 'High Opportunity (Estimated 30-40% uncaptured leads)',
    recommendedPilot: 'AI Voice Receptionist for after-hours call diversion + Instant Missed-Call SMS'
  });

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setResult({
        businessName: `Sample ${category} (${suburb})`,
        phoneChannel: 'Standard landline with no out-of-hours IVR',
        onlineBooking: 'Static contact form requiring manual email reply',
        afterHoursSignal: 'Enquiries after 5 PM roll over to voicemail',
        frictionScore: 'Substantial (Estimated 15–25 missed weekly opportunities)',
        recommendedPilot: `Automated Lead Capture & Triage Pilot for ${category}`
      });
      setIsAuditing(false);
    }, 700);
  };

  return (
    <div className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#191919]" />
          <span className="text-xs font-mono font-semibold text-[#191919] uppercase">
            ClientHunter AI Opportunity Inspector
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#191919] bg-white border border-[#E7E5E0] px-2 py-0.5 rounded">
          Internal Tool
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-mono text-[#777777] block mb-1">
            Target Australian Region
          </label>
          <input
            type="text"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#191919] font-mono"
          />
        </div>

        <div>
          <label className="text-[11px] font-mono text-[#777777] block mb-1">
            Service Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#191919]"
          >
            <option value="Plumbing & Drainage">Plumbing &amp; Drainage</option>
            <option value="Air Conditioning & HVAC">Air Conditioning &amp; HVAC</option>
            <option value="Allied Health Clinics">Allied Health Clinics</option>
            <option value="Automotive Repairers">Automotive Repairers</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleRunAudit}
        disabled={isAuditing}
        className="w-full py-2 bg-[#191919] hover:bg-[#303030] text-xs font-medium text-white rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
      >
        <Search className="w-3.5 h-3.5" />
        <span>{isAuditing ? 'Evaluating Public Footprint...' : 'Evaluate Operational Signals'}</span>
      </button>

      {result && (
        <div className="bg-white border border-[#E7E5E0] rounded-xl p-3.5 space-y-2 text-xs font-mono shadow-xs">
          <div className="text-[#191919] font-bold text-xs pb-1 border-b border-[#E7E5E0]">
            {result.businessName}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#303030]">
            <div>
              <span className="text-[#777777] block">Phone Channel:</span>
              <span>{result.phoneChannel}</span>
            </div>
            <div>
              <span className="text-[#777777] block">Online Booking:</span>
              <span>{result.onlineBooking}</span>
            </div>
            <div>
              <span className="text-[#777777] block">After Hours:</span>
              <span>{result.afterHoursSignal}</span>
            </div>
            <div>
              <span className="text-[#777777] block">Opportunity Index:</span>
              <span className="text-[#191919] font-bold">{result.frictionScore}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#E7E5E0] text-[11px] text-[#777777]">
            <span className="text-[#191919] font-bold">Scoped Recommendation: </span>
            {result.recommendedPilot}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SIMULATOR 4: Business Workflow Pipeline (Webhook & Payload Inspector)
   ========================================================================= */
export const BusinessWorkflowSimulator: React.FC = () => {
  const [name, setName] = useState('Oliver Vance');
  const [suburb, setSuburb] = useState('Geelong VIC');
  const [service, setService] = useState('Switchboard Replacement');
  const [payloadSent, setPayloadSent] = useState(false);

  const handleSend = () => {
    setPayloadSent(true);
  };

  return (
    <div className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#191919]" />
          <span className="text-xs font-mono font-semibold text-[#191919] uppercase">
            Workflow Dispatcher &amp; Webhook Validator
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#777777]">
          JSON Schema v1.2
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setPayloadSent(false);
          }}
          placeholder="Client Name"
          className="px-2.5 py-1.5 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#191919]"
        />
        <input
          type="text"
          value={suburb}
          onChange={(e) => {
            setSuburb(e.target.value);
            setPayloadSent(false);
          }}
          placeholder="Suburb"
          className="px-2.5 py-1.5 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#191919]"
        />
        <input
          type="text"
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setPayloadSent(false);
          }}
          placeholder="Job Scope"
          className="px-2.5 py-1.5 bg-white border border-[#E7E5E0] rounded-xl text-xs text-[#191919]"
        />
      </div>

      <button
        onClick={handleSend}
        className="w-full py-2 bg-[#191919] hover:bg-[#303030] text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Transmit Webhook Payload</span>
      </button>

      <div className="bg-white border border-[#E7E5E0] rounded-xl p-3 text-xs font-mono text-[#191919] shadow-xs">
        <div className="flex items-center justify-between text-[10px] text-[#777777] pb-1 mb-2 border-b border-[#E7E5E0]">
          <span>PAYLOAD_INSPECTION_BUFFER</span>
          <span className={payloadSent ? 'text-[#191919] font-bold' : 'text-[#777777]'}>
            {payloadSent ? 'HTTP 200 DELIVERED' : 'AWAITING DISPATCH'}
          </span>
        </div>
        <pre className="text-[11px] leading-relaxed overflow-x-auto text-[#303030]">
{`{
  "event": "enquiry.validated",
  "timestamp": "${new Date().toISOString()}",
  "client": {
    "name": "${name}",
    "suburb": "${suburb}",
    "postcode_verified": true
  },
  "job": {
    "scope": "${service}",
    "sla_timer_sec": 900,
    "assigned_queue": "commercial_trades_east"
  }
}`}
        </pre>
      </div>
    </div>
  );
};
