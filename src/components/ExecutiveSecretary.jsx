import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ShieldCheck, Zap, Info } from 'lucide-react';

const ExecutiveSecretary = ({ tasks, remainingHours }) => {
  const pendingTasks = tasks.filter(t => t.status === 'not-done');
  const completionRate = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.status === 'fully').length / tasks.length) * 100) 
    : 0;

  let briefing = "Commander, the system is fully synchronized. Your available bank is secured.";
  
  if (pendingTasks.length > 5) {
    briefing = "Alert: Task density is increasing. I recommend entering Focus Mode for the next directive.";
  } else if (remainingHours < 2) {
    briefing = "Warning: Time bank is nearly exhausted. Prioritize critical nodes only.";
  } else if (completionRate > 80) {
    briefing = "Exceptional velocity, Commander. You are operating at peak efficiency.";
  }

  return (
    <div className="glass p-8 bg-gradient-to-br from-cyan-600/10 to-transparent border-cyan-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          <ShieldCheck className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400 italic">Executive Secretary</h3>
          <p className="text-[9px] text-white/20 uppercase tracking-widest font-black">AI Intelligence Interface</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
           <p className="text-sm text-white/80 font-medium leading-relaxed italic">
             "{briefing}"
           </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="bg-black/40 rounded-xl p-4 border border-white/5">
              <div className="text-[9px] font-black text-white/20 uppercase mb-1">Execution Score</div>
              <div className="text-xl font-black text-cyan-400 italic">{completionRate}%</div>
           </div>
           <div className="bg-black/40 rounded-xl p-4 border border-white/5">
              <div className="text-[9px] font-black text-white/20 uppercase mb-1">Node Density</div>
              <div className="text-xl font-black text-pink-400 italic">{tasks.length}</div>
           </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 text-[10px] font-black text-cyan-400/40 uppercase tracking-widest">
         <Info className="w-3.5 h-3.5" />
         <span>Next sync in 42 minutes</span>
      </div>
    </div>
  );
};

export default ExecutiveSecretary;
