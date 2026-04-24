import React from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle2, Clock, RotateCcw, XCircle, Settings2, Zap, Trash2, RefreshCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TaskCommandCenter = ({ tasks, onUpdateStatus, onConfig, onDelete, onUpdateNode }) => {
  const priorityColors = {
    'critical': 'text-red-400 border-red-500/20 bg-red-500/5',
    'high': 'text-pink-400 border-pink-500/20 bg-pink-500/5',
    'medium': 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    'low': 'text-white/20 border-white/5 bg-white/2'
  };

  return (
    <div className="glass h-full flex flex-col border-white/10 shadow-2xl overflow-hidden">
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-widest uppercase text-white/90">Chronos Queue</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-semibold mt-1">Daily Allocation</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {tasks.map((task) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "group flex flex-col p-6 rounded-3xl transition-all duration-500 border border-white/5 relative overflow-hidden",
              task.status === 'fully' ? "bg-green-500/5 opacity-40 border-green-500/10" : "bg-white/2 hover:bg-white/5"
            )}
          >
            <div className="flex items-start justify-between mb-4 gap-4 relative z-10">
              <div className="flex items-start gap-4 min-w-0 flex-1">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border shrink-0 mt-1",
                  priorityColors[task.priority]
                )}>
                  {task.priority}
                </span>
                <span className={cn(
                  "text-lg font-semibold tracking-tight transition-all break-words min-w-0 leading-snug",
                  task.status === 'fully' ? "text-white/20 line-through" : "text-white/90 font-beast"
                )}>
                  {task.title}
                </span>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0">
                <button 
                  onClick={() => onConfig(task.id)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-cyan-400 transition-all border border-white/5"
                >
                  <Settings2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDelete(task.id)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all border border-white/5"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-white/5 gap-4 relative z-10">
              <div className="flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-white/40">
                 <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{task.startTime}</span>
                 </div>
                 <button 
                   onClick={() => onUpdateNode(task.id, task.category === 'FORMAL' ? 'INFORMAL' : 'FORMAL')}
                   className="flex items-center gap-2 hover:text-pink-400 transition-colors cursor-pointer"
                 >
                    <Zap className="w-3 h-3 text-pink-500" />
                    <span>Node: {task.category}</span>
                 </button>
              </div>
              <div className="flex gap-2">
                 <button onClick={() => onUpdateStatus(task.id, 'fully')} className="px-5 py-2.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold uppercase tracking-wider hover:bg-green-500 hover:text-white transition-all shadow-md">Complete</button>
                 <button onClick={() => onUpdateStatus(task.id, 'halfway')} className="px-5 py-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all shadow-md">Halfway</button>
                 <button onClick={() => onUpdateStatus(task.id, 'not-done')} className="px-5 py-2.5 rounded-xl bg-white/5 text-white/50 border border-white/10 text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all flex items-center gap-2">
                    <RefreshCcw className="w-3 h-3" /> Reset
                 </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskCommandCenter;
