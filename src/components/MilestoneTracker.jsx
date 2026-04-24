import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, CheckCircle2, Circle, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MilestoneTracker = ({ milestones, onAdd }) => {

  return (
    <div className="glass p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="text-blue-500 w-5 h-5" />
          <h2 className="text-xl font-bold tracking-tight">Active Milestones</h2>
        </div>
        <button 
          onClick={onAdd}
          className="p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {milestones.map((ms) => (
          <motion.div 
            key={ms.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {ms.status === 'completed' ? (
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                ) : (
                  <Circle className="text-white/20 w-5 h-5 group-hover:text-blue-400 transition-colors" />
                )}
                <span className={cn(
                  "font-medium transition-colors",
                  ms.status === 'completed' ? "text-white/40 line-through" : "text-white/90"
                )}>
                  {ms.title}
                </span>
              </div>
              <span className="text-xs font-mono text-white/30">{ms.progress}%</span>
            </div>
            
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${ms.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn(
                  "h-full rounded-full",
                  ms.status === 'completed' ? "bg-green-500/50" : "bg-gradient-to-r from-blue-600 to-blue-400"
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/40 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Efficiency: 92%</span>
        </div>
        <div className="text-xs font-mono text-blue-400 uppercase tracking-widest">
          On Track
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;
