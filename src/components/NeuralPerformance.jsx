import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity } from 'lucide-react';

const Performance = () => {
  const points = [20, 45, 30, 60, 40, 85, 50, 75, 90, 65, 80, 95];
  const max = Math.max(...points);
  const width = 300;
  const height = 100;
  
  const pathData = points.reduce((acc, point, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - (point / max) * height;
    return acc + `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }, "");

  return (
    <div className="glass p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-500 w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Performance</h3>
        </div>
        <div className="flex items-center gap-1 text-blue-400 text-xs font-mono font-bold">
          <TrendingUp className="w-3 h-3" />
          +12%
        </div>
      </div>

      <div className="relative w-full h-32 flex items-center justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0070f3" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0070f3" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
            fill="url(#lineGradient)"
          />
          
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={pathData}
            fill="none"
            stroke="#0070f3"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Peak</div>
          <div className="text-xl font-black font-mono text-white/80 tracking-tighter italic">98.2</div>
        </div>
        <div>
          <div className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Delay</div>
          <div className="text-xl font-black font-mono text-white/80 tracking-tighter italic">0.4</div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
