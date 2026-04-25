import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const DAY_LABELS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const Calendar = ({ dateKey, setDateKey }) => {
  const [selYear, selMonth, selDay] = dateKey.split('-').map(Number);

  const [viewYear, setViewYear]   = useState(selYear);
  const [viewMonth, setViewMonth] = useState(selMonth); // 1-12
  const [mode, setMode]           = useState('days');   // 'days' | 'years'
  const [decadeStart, setDecadeStart] = useState(Math.floor(selYear / 12) * 12);

  // Keep view in sync if dateKey changes externally
  useEffect(() => {
    const [y, m] = dateKey.split('-').map(Number);
    setViewYear(y);
    setViewMonth(m);
  }, [dateKey]);

  const daysInMonth  = new Date(viewYear, viewMonth, 0).getDate();
  const firstWeekday = new Date(viewYear, viewMonth - 1, 1).getDay(); // 0=Sun

  const prevMonth = () => {
    if (viewMonth === 1) { setViewMonth(12); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 12) { setViewMonth(1); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDay = (d) => {
    const mm = String(viewMonth).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    setDateKey(`${viewYear}-${mm}-${dd}`);
  };

  const selectYear = (y) => {
    setViewYear(y);
    setMode('days');
  };

  const isSelected = (d) => viewYear === selYear && viewMonth === selMonth && d === selDay;

  const todayEAT = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })
  );
  const isToday = (d) =>
    todayEAT.getFullYear() === viewYear &&
    todayEAT.getMonth() + 1 === viewMonth &&
    todayEAT.getDate() === d;

  const years = Array.from({ length: 12 }, (_, i) => decadeStart + i);

  return (
    <div className="glass flex flex-col border-white/8 overflow-hidden" style={{ minHeight: '320px' }}>
      {/* Header strip */}
      <div className="px-5 pt-5 pb-3 border-b border-white/5 shrink-0">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25">
          Strategic Calendar
        </span>
      </div>

      {/* ── DAYS VIEW ─────────────────────────────── */}
      {mode === 'days' && (
        <div className="flex flex-col flex-1 p-4 gap-3">

          {/* Month / Year nav */}
          <div className="flex items-center justify-between shrink-0">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl hover:bg-white/8 text-white/30 hover:text-white/70 transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { setDecadeStart(Math.floor(viewYear / 12) * 12); setMode('years'); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/8 transition-all group"
            >
              <span className="text-sm font-bold text-white/75 tracking-wide group-hover:text-cyan-400 transition-colors">
                {MONTHS[viewMonth - 1].slice(0, 3)}
              </span>
              <span className="text-sm font-bold text-cyan-400 tracking-wide">
                {viewYear}
              </span>
            </button>

            <button
              onClick={nextMonth}
              className="p-2 rounded-xl hover:bg-white/8 text-white/30 hover:text-white/70 transition-all"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 shrink-0">
            {DAY_LABELS.map(d => (
              <div key={d} className="text-[9px] font-black text-white/18 text-center py-1 tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-1 flex-1">
            {Array.from({ length: firstWeekday }, (_, i) => (
              <div key={`blank-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
              <button
                key={d}
                onClick={() => selectDay(d)}
                className={cn(
                  'h-8 w-full rounded-lg text-[11px] font-bold transition-all',
                  isSelected(d)
                    ? 'bg-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                    : isToday(d)
                    ? 'bg-white/10 text-white ring-1 ring-white/25'
                    : 'text-white/30 hover:bg-white/8 hover:text-white/65'
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── YEARS VIEW ────────────────────────────── */}
      {mode === 'years' && (
        <div className="flex flex-col flex-1 p-4 gap-3">

          {/* Decade nav */}
          <div className="flex items-center justify-between shrink-0">
            <button
              onClick={() => setDecadeStart(s => s - 12)}
              className="p-2 rounded-xl hover:bg-white/8 text-white/30 hover:text-white/70 transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-white/50 tracking-wide">
              {decadeStart} – {decadeStart + 11}
            </span>
            <button
              onClick={() => setDecadeStart(s => s + 12)}
              className="p-2 rounded-xl hover:bg-white/8 text-white/30 hover:text-white/70 transition-all"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Year grid */}
          <div className="grid grid-cols-3 gap-2 flex-1 content-start">
            {years.map(y => (
              <button
                key={y}
                onClick={() => selectYear(y)}
                className={cn(
                  'py-3 rounded-xl text-xs font-bold transition-all',
                  y === viewYear
                    ? 'bg-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : y === selYear
                    ? 'bg-white/10 text-white ring-1 ring-white/20'
                    : 'text-white/35 hover:bg-white/8 hover:text-white/70'
                )}
              >
                {y}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMode('days')}
            className="shrink-0 text-[9px] font-bold uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors py-1"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
