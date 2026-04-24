import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square, Zap, ChevronRight, MoreVertical, Layers } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TaskCommandCenter = ({ tasks, onToggle, onAdd }) => {
  return (
    <div className="glass h-full flex flex-col">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Tasks</h2>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Today's Priority</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-bold uppercase">
            {tasks.filter(t => !t.completed).length} Pending
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {tasks.map((task) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "group flex items-center justify-between p-4 rounded-xl transition-all duration-300",
              task.completed ? "bg-white/2 opacity-50" : "hover:bg-white/5"
            )}
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onToggle(task.id)}
                className={cn(
                  "p-1 rounded transition-colors",
                  task.completed ? "text-blue-500" : "text-white/20 hover:text-white/40"
                )}
              >
                {task.completed ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
              </button>
              
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={cn(
                    "text-sm font-medium transition-all",
                    task.completed ? "text-white/30 line-through" : "text-white/90"
                  )}>
                    {task.title}
                  </span>
                  <span className={cn(
                    "text-[8px] px-1.5 py-0.5 rounded border uppercase font-bold tracking-tighter",
                    task.priority === 'high' ? "text-blue-400 border-blue-500/20 bg-blue-500/5" :
                    "text-white/20 border-white/5 bg-white/2"
                  )}>
                    {task.priority}
                  </span>
                </div>
                <div className="text-[10px] text-white/20 font-mono tracking-tighter">
                   Category: {task.category}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 transition-colors">
                <Zap className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-white/2 border-t border-white/5">
        <button 
          onClick={onAdd}
          className="w-full py-3 rounded-xl border border-dashed border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all text-sm text-white/30 hover:text-blue-400 font-medium flex items-center justify-center gap-2 group"
        >
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskCommandCenter;
