import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Target, Coffee } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SchedulePulse = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const currentHour = time.getHours();
  const currentMinute = time.getMinutes();
  const progressPercent = ((currentHour * 60 + currentMinute) / (24 * 60)) * 100;

  const events = [
    { hour: 9, title: "Work", type: "focus", icon: Zap },
    { hour: 13, title: "Meeting", type: "energy", icon: Target },
    { hour: 18, title: "Break", type: "rest", icon: Coffee },
  ];

  return (
    <div className="glass p-8 w-full">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Timeline</h2>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Daily Schedule</p>
          </div>
        </div>
        <div className="text-3xl font-black font-mono text-white/90 tracking-tighter italic">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </div>
      </div>

      <div className="relative h-24 mb-10 flex items-end gap-1.5">
        {hours.map((h) => {
          const isCurrent = h === currentHour;
          const hasEvent = events.find(e => e.hour === h);
          const isPast = h < currentHour;
          
          return (
            <div key={h} className="flex-1 flex flex-col items-center gap-3 group relative">
              <div className="relative w-full">
                {hasEvent && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
                  >
                    <span className="whitespace-nowrap text-[8px] uppercase tracking-tighter text-blue-400 font-black">
                      {hasEvent.title}
                    </span>
                  </motion.div>
                )}
                <div className={cn(
                  "w-full rounded-t-sm transition-all duration-700",
                  isCurrent ? "h-16 bg-blue-500" : 
                  isPast ? "h-6 bg-white/5" : "h-6 bg-white/2 group-hover:bg-white/5"
                )} />
              </div>
              <span className={cn(
                "text-[9px] font-bold font-mono transition-colors",
                isCurrent ? "text-blue-400" : "text-white/10"
              )}>
                {h.toString().padStart(2, '0')}
              </span>
            </div>
          );
        })}
        
        <motion.div 
          className="absolute bottom-6 h-20 w-px bg-blue-500/50 z-10"
          style={{ left: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default SchedulePulse;
