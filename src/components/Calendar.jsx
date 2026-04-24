import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Calendar = ({ dateKey, setDateKey }) => {
  const [year, month, day] = dateKey.split('-').map(Number);
  const daysInMonth = 31; // Simple mock for now
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  return (
    <div className="glass p-6 flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Strategic Calendar</h3>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-white/5 rounded"><ChevronLeft className="w-4 h-4" /></button>
          <button className="p-1 hover:bg-white/5 rounded"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 flex-1 mt-auto items-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <div key={d} className="text-[10px] font-black text-white/10 text-center mb-2">{d}</div>
        ))}
        {days.map(d => {
          const isSelected = d === day;
          return (
            <button
              key={d}
              onClick={() => {
                const newDayStr = String(d).padStart(2, '0');
                const newMonthStr = String(month).padStart(2, '0');
                setDateKey(`${year}-${newMonthStr}-${newDayStr}`);
              }}
              className={cn(
                "h-8 rounded-lg text-xs font-bold transition-all",
                isSelected 
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(0,112,243,0.5)] scale-110" 
                  : "hover:bg-white/5 text-white/30"
              )}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
