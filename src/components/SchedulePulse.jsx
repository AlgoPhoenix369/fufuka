import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';
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
    { hour: 9, title: "Deep Work", type: "focus" },
    { hour: 13, title: "Client Strategy", type: "energy" },
    { hour: 17, title: "Performance Review", type: "focus" },
    { hour: 20, title: "System Audit", type: "rest" }
  ];

  return (
    <div className="glass p-6 w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Clock className="text-gold-500 w-5 h-5" />
          <h2 className="text-xl font-bold tracking-tight">24H Executive Pulse</h2>
        </div>
        <div className="text-2xl font-mono font-bold text-white/90">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>

      <div className="relative h-24 mb-12 flex items-end gap-1">
        {hours.map((h) => {
          const isCurrent = h === currentHour;
          const hasEvent = events.find(e => e.hour === h);
          
          return (
            <div key={h} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full">
                {hasEvent && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-tighter text-blue-400 font-bold"
                  >
                    {hasEvent.title}
                  </motion.div>
                )}
                <div className={cn(
                  "w-full rounded-t-sm transition-all duration-500",
                  isCurrent ? "h-16 bg-blue-500 shadow-[0_0_15px_rgba(0,112,243,0.5)]" : "h-8 bg-white/5 group-hover:bg-white/10",
                  h < currentHour && "bg-white/2"
                )} />
              </div>
              <span className={cn(
                "text-[10px] font-mono",
                isCurrent ? "text-blue-400 font-bold" : "text-white/20"
              )}>
                {h.toString().padStart(2, '0')}
              </span>
            </div>
          );
        })}
        
        {/* Current Time Indicator Line */}
        <motion.div 
          className="absolute bottom-6 h-20 w-0.5 bg-gold-500 z-10 shadow-[0_0_10px_#c6a052]"
          style={{ left: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/30">Next Action</div>
            <div className="text-sm font-medium">Infrastructure Deploy</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/30">Focus End</div>
            <div className="text-sm font-medium">17:45 (in 2h)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePulse;
