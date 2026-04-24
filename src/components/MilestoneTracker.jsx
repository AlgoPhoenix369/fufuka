import React from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, CheckCircle2, Circle, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MilestoneTracker = ({ milestones, onAdd }) => {
  return (
    <div className="glass p-6 w-full max-w-md flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-2">
          <Target className="text-blue-500 w-5 h-5" />
          <h2 className="text-xl font-bold tracking-tight">Goals</h2>
        </div>
        <button 
          onClick={onAdd}
          className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto flex-1">
        {milestones.map((ms) => (
          <motion.div 
            key={ms.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="group cursor-default"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {ms.status === 'completed' ? (
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                ) : (
                  <Circle className="text-white/20 w-5 h-5" />
                )}
                <span className={cn(
                  "font-medium transition-colors",
                  ms.status === 'completed' ? "text-white/30 line-through" : "text-white/80"
                )}>
                  {ms.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/20">{ms.progress}%</span>
            </div>
            
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${ms.progress}%` }}
                transition={{ duration: 1 }}
                className={cn(
                  "h-full rounded-full",
                  ms.status === 'completed' ? "bg-green-500/30" : "bg-blue-500"
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>92% Efficiency</span>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;
