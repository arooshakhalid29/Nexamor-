import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  FileCheck, 
  CalendarCheck, 
  BellRing,
  Play,
  Pause,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

interface WorkflowNode {
  id: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  statusText: string;
  payload: {
    event: string;
    details: Record<string, string>;
  };
}

export const HeroWorkflowVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const steps: WorkflowNode[] = [
    {
      id: 1,
      label: 'Incoming enquiry',
      sublabel: 'Phone, web, or missed call',
      icon: <PhoneCall className="w-4 h-4 text-[#191919]" />,
      statusText: 'Inbound Call Captured (03 9481 xxxx · Melbourne VIC)',
      payload: {
        event: 'telephony.inbound_call',
        details: {
          caller_id: '+61 412 xxx 891',
          time: '18:42 AEST (After-Hours)',
          source: 'Workshop Main Line',
          response_latency: '1.2s live pickup'
        }
      }
    },
    {
      id: 2,
      label: 'Information captured',
      sublabel: 'Intent & triage extraction',
      icon: <FileCheck className="w-4 h-4 text-[#191919]" />,
      statusText: 'Classified: Emergency Burst Pipe · Northcote VIC',
      payload: {
        event: 'pipeline.details_extracted',
        details: {
          intent: 'emergency_water_leak',
          suburb_matched: 'Northcote VIC 3070',
          urgency_level: 'High (Active Ceiling Ingress)',
          callout_accepted: '$240 + GST rate agreed'
        }
      }
    },
    {
      id: 3,
      label: 'Appointment or follow-up',
      sublabel: 'Roster check & slot reserved',
      icon: <CalendarCheck className="w-4 h-4 text-[#191919]" />,
      statusText: 'Emergency Window Confirmed · 45–60 min ETA',
      payload: {
        event: 'calendar.slot_allocated',
        details: {
          assigned_bay: 'On-Call Van #02',
          window: 'Tonight 19:30 - 20:00',
          calendar_sync: 'ServiceM8 Dispatch Schedule',
          sms_tracking: 'Dispatched to customer phone'
        }
      }
    },
    {
      id: 4,
      label: 'Team notification',
      sublabel: 'Technician & CRM record sync',
      icon: <BellRing className="w-4 h-4 text-[#191919]" />,
      statusText: 'Technician Alerted & Job Card Created',
      payload: {
        event: 'dispatch.team_notified',
        details: {
          technician: 'Marcus T. (Acknowledged in 30s)',
          job_id: 'JOB-4092-EMERGENCY',
          audio_transcript: 'Saved to CRM record vault',
          status: 'En route to property'
        }
      }
    }
  ];

  // Auto-advance loop when playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 3600);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStepData = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div className="w-full bg-white border border-[#E7E5E0] rounded-2xl p-5 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative">
      {/* Visual Header / Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E7E5E0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider bg-[#E7E5E0] text-[#191919] border border-[#D5D3CC] px-2 py-0.5 rounded font-semibold">
              Illustrative Workflow
            </span>
            <span className="text-xs text-[#777777] font-mono">
              Conceptual Flow
            </span>
          </div>
          <p className="text-xs text-[#777777] mt-1">
            Simulated progression of an inbound enquiry through automated triage to team dispatch
          </p>
        </div>

        {/* Play/Pause/Reset Controls */}
        <div className="flex items-center gap-1.5 shrink-0 bg-[#F7F6F2] p-1 rounded-lg border border-[#E7E5E0]">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#303030] hover:text-[#191919] hover:bg-white rounded transition-colors cursor-pointer"
            title={isPlaying ? 'Pause demonstration' : 'Resume demonstration'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#191919]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#191919]" />
                <span>Play</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setActiveStep(1);
              setIsPlaying(true);
            }}
            className="p-1 text-[#777777] hover:text-[#191919] hover:bg-white rounded transition-colors cursor-pointer"
            title="Reset to step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4-Step Linear Flow Progression */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 my-5">
        {steps.map((step) => {
          const isActive = step.id === activeStep;
          const isPast = step.id < activeStep;
          return (
            <button
              key={step.id}
              onClick={() => {
                setActiveStep(step.id);
                setIsPlaying(false);
              }}
              className={`text-left p-3.5 rounded-xl border transition-all text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#191919] cursor-pointer ${
                isActive
                  ? 'bg-[#F7F6F2] border-[#191919] shadow-xs'
                  : isPast
                  ? 'bg-white border-[#E7E5E0] text-[#303030] hover:border-[#D5D3CC]'
                  : 'bg-white/50 border-[#E7E5E0]/80 text-[#777777] hover:border-[#D5D3CC]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#191919] text-white' : 'bg-[#F7F6F2] text-[#777777]'}`}>
                  {step.icon}
                </div>
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  isActive ? 'bg-[#191919] text-white' : 'bg-[#F7F6F2] text-[#777777]'
                }`}>
                  0{step.id}
                </span>
              </div>
              <p className={`font-semibold text-xs leading-snug ${isActive ? 'text-[#191919]' : 'text-[#303030]'}`}>
                {step.label}
              </p>
              <p className="text-[11px] text-[#777777] mt-0.5 truncate">
                {step.sublabel}
              </p>
            </button>
          );
        })}
      </div>

      {/* Simulated Output & Payload Console */}
      <div className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#E7E5E0]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-[#777777] font-semibold tracking-wider">
              STAGE EVENT:
            </span>
            <span className="text-xs text-[#191919] font-mono font-medium">
              {currentStepData.payload.event}
            </span>
          </div>
          <span className="text-xs text-[#303030] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#191919]" />
            <span>{currentStepData.statusText}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
          {Object.entries(currentStepData.payload.details).map(([key, value]) => (
            <div key={key} className="bg-white p-2.5 rounded-lg border border-[#E7E5E0]">
              <span className="text-[10px] uppercase font-mono text-[#777777] tracking-wider block mb-0.5">
                {key.replace(/_/g, ' ')}
              </span>
              <span className="text-[#191919] font-mono text-xs break-words font-medium">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#777777]">
        <p className="flex items-center gap-1.5">
          <ArrowRight className="w-3 h-3 text-[#191919] shrink-0" />
          <span>Deterministic business rules ensure context transfers without manual retyping.</span>
        </p>
        <span className="font-mono text-[#777777]">
          Illustrative diagram · Non-live simulation
        </span>
      </div>
    </div>
  );
};
