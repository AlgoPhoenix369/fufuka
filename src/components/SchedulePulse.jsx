import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Target, Coffee, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SchedulePulse = ({ tasks }) => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const currentHour = time.getHours();
  const currentMinute = time.getMinutes();
  const progressPercent = ((currentHour * 60 + currentMinute) / (24 * 60)) * 100;

  return (
    <div className="glass p-8 w-full border-white/10">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tighter italic uppercase">Timeline Force</h2>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">Temporal Allocation</p>
          </div>
        </div>
        <div className="text-4xl font-black font-mono text-white/90 tracking-tighter italic glow-text">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </div>
      </div>

      <div className="relative h-32 mb-10 flex items-end gap-1.5">
        {hours.map((h) => {
          const isCurrent = h === currentHour;
          const isPast = h < currentHour;
          const hasTask = tasks && tasks.find(t => parseInt(t.startTime.split(':')[0]) === h);
          
          return (
            <div key={h} className="flex-1 flex flex-col items-center gap-4 group relative">
              <div className="relative w-full">
                {hasTask && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center"
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full mb-1",
                      hasTask.status === 'fully' ? "bg-green-400" : "bg-pink-500 animate-ping"
                    )} />
                    <span className={cn(
                      "whitespace-nowrap text-[8px] uppercase tracking-tighter font-black italic",
                      hasTask.status === 'fully' ? "text-green-400/50" : "text-pink-400"
                    )}>
                      {hasTask.title.slice(0, 10)}...
                    </span>
                  </motion.div>
                )}
                <div className={cn(
                  "w-full rounded-t-lg transition-all duration-700",
                  isCurrent ? "h-24 bg-gradient-to-t from-pink-600 to-cyan-400 shadow-[0_0_30px_rgba(255,0,122,0.5)]" : 
                  isPast ? "h-8 bg-white/5" : "h-8 bg-white/2 group-hover:bg-white/5"
                )} />
              </div>
              <span className={cn(
                "text-[10px] font-black font-mono transition-colors",
                isCurrent ? "text-cyan-400" : "text-white/10"
              )}>
                {h.toString().padStart(2, '0')}
              </span>
            </div>
          );
        })}
        
        <motion.div 
          className="absolute bottom-10 h-32 w-px bg-pink-500 z-10 shadow-[0_0_15px_#ff007a]"
          style={{ left: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default SchedulePulse;
