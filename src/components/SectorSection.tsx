import React from 'react';
import { Wrench, Stethoscope, Scissors, Car, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface SectorSectionProps {
  onNavigate?: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const SectorSection: React.FC<SectorSectionProps> = ({
  onOpenBooking,
}) => {
  const sectors = [
    {
      title: 'Trades & Home Services',
      sub: 'Plumbing, Electrical, HVAC & Roofing',
      desc: 'High callout urgency. If you miss a caller with a burst pipe or broken air conditioner, they dial the next Google listing in 60 seconds.',
      icon: <Wrench className="w-5 h-5 text-[#191919]" />
    },
    {
      title: 'Healthcare & Dental',
      sub: 'Private Dental, Allied & Specialist Clinics',
      desc: 'High appointment density. Routine booking and rescheduling questions take receptionists away from greeting arriving patients in-clinic.',
      icon: <Stethoscope className="w-5 h-5 text-[#191919]" />
    },
    {
      title: 'Salons & Aesthetics',
      sub: 'Hair Studios, Barbers & Aesthetic Clinics',
      desc: 'High after-hours demand. Over 40% of booking requests happen outside opening hours while stylists are with clients on the floor.',
      icon: <Scissors className="w-5 h-5 text-[#191919]" />
    },
    {
      title: 'Automotive Workshops',
      sub: 'Mechanics, Tyre Centres & Fleet Repair',
      desc: 'High ticket variation. Urgent vehicle breakdown calls and quote follow-ups need immediate intake and prompt technician routing.',
      icon: <Car className="w-5 h-5 text-[#191919]" />
    }
  ];

  return (
    <section id="sector" className="scroll-mt-24 py-20 lg:py-28 bg-white relative border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header matching Screenshot 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-5 relative">
            {/* Huge Ghost Number 01 */}
            <span className="text-7xl sm:text-8xl lg:text-9xl font-black text-[#E7E5E0]/60 font-mono tracking-tighter select-none block leading-none -mb-4">
              01
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] font-semibold block mb-2">
              THE SECTOR
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191919] tracking-tight leading-tight uppercase">
              High-Stakes Service Businesses.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-4 pt-2">
            <p className="text-base sm:text-lg text-[#191919] font-medium leading-relaxed">
              We don&apos;t build for everyone. We specialize exclusively in high-ticket, emergency-driven and appointment-based Australian sectors: <strong className="text-[#191919]">Trades &amp; Home Services</strong>, <strong className="text-[#191919]">Healthcare &amp; Dental</strong>, <strong className="text-[#191919]">Salons</strong>, and <strong className="text-[#191919]">Automotive</strong>.
            </p>
            <p className="text-sm sm:text-base text-[#777777] leading-relaxed">
              In these industries, the business model is binary: you either answer the call and roll a truck or hold the slot, or your competitor does. We identified an average <strong className="text-[#191919]">A$270,000 annual revenue leak</strong> across Australian service firms caused by human dispatch latency and after-hours silence. We exist to plug that leak with permanent infrastructure.
            </p>
          </div>
        </div>

        {/* 4 Sector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sec, idx) => (
            <div
              key={idx}
              className="bg-[#F7F6F2] border border-[#E7E5E0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#D5D3CC] hover:bg-white transition-all shadow-xs"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E5E0] flex items-center justify-center text-[#191919] mb-4 shadow-xs">
                  {sec.icon}
                </div>
                <h3 className="text-base font-bold text-[#191919] mb-1">
                  {sec.title}
                </h3>
                <span className="text-[11px] font-mono text-[#777777] block mb-3">
                  {sec.sub}
                </span>
                <p className="text-xs text-[#303030] leading-relaxed">
                  {sec.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E7E5E0]">
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-semibold text-[#191919] hover:text-[#777777] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Explore Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#191919]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
