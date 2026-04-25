import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Clock, Settings2, Zap, Trash2, RefreshCcw, Target, ChevronDown, ChevronRight, Link } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const priorityColors = {
  'critical': 'text-red-400 border-red-500/20 bg-red-500/5',
  'high':     'text-pink-400 border-pink-500/20 bg-pink-500/5',
  'medium':   'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
  'low':      'text-white/20 border-white/5 bg-white/2'
};

const goalAccentColors = [
  { border: 'border-pink-500/40',   text: 'text-pink-400',   bg: 'bg-pink-500/5'   },
  { border: 'border-cyan-500/40',   text: 'text-cyan-400',   bg: 'bg-cyan-500/5'   },
  { border: 'border-violet-500/40', text: 'text-violet-400', bg: 'bg-violet-500/5' },
  { border: 'border-orange-500/40', text: 'text-orange-400', bg: 'bg-orange-500/5' },
  { border: 'border-green-500/40',  text: 'text-green-400',  bg: 'bg-green-500/5'  },
  { border: 'border-yellow-500/40', text: 'text-yellow-400', bg: 'bg-yellow-500/5' },
];

const TaskCard = ({ task, milestones, onUpdateStatus, onConfig, onDelete, onUpdateNode, onAssignGoal }) => {
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const linkedGoal = milestones.find(m => m.id === task.goalId);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "group flex flex-col p-5 rounded-2xl transition-all duration-500 border border-white/5 relative overflow-visible ml-3",
        task.status === 'fully' ? "bg-green-500/5 opacity-40 border-green-500/10" : "bg-white/2 hover:bg-white/5"
      )}
    >
      {/* Title row */}
      <div className="flex items-start justify-between mb-3 gap-3 relative z-10">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className={cn("px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border shrink-0 mt-1", priorityColors[task.priority])}>
            {task.priority}
          </span>
          <span className={cn("text-sm font-semibold tracking-tight transition-all break-words min-w-0 leading-snug", task.status === 'fully' ? "text-white/20 line-through" : "text-white/90")}>
            {task.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0">
          <button onClick={() => onConfig(task.id)} className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-cyan-400 transition-all border border-white/5">
            <Settings2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all border border-white/5">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Goal assignment row */}
      <div className="relative mb-3">
        <button
          onClick={() => setShowGoalPicker(p => !p)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all border",
            linkedGoal
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20"
              : "bg-white/3 text-white/25 border-white/5 hover:bg-white/8 hover:text-white/50"
          )}
        >
          <Link className="w-3 h-3" />
          {linkedGoal ? linkedGoal.title : '— Assign Goal —'}
        </button>

        <AnimatePresence>
          {showGoalPicker && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              className="absolute left-0 top-full mt-1 z-50 min-w-[200px] glass border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => { onAssignGoal(task.id, null); setShowGoalPicker(false); }}
                className="w-full text-left px-4 py-3 text-xs text-white/40 hover:bg-white/5 transition-all border-b border-white/5"
              >
                — Unassigned —
              </button>
              {milestones.map((goal, i) => {
                const c = goalAccentColors[i % goalAccentColors.length];
                return (
                  <button
                    key={goal.id}
                    onClick={() => { onAssignGoal(task.id, goal.id); setShowGoalPicker(false); }}
                    className={cn("w-full text-left px-4 py-3 text-xs font-semibold transition-all hover:bg-white/5 flex items-center gap-2", c.text)}
                  >
                    <Target className="w-3 h-3 shrink-0" />
                    {goal.title}
                    {task.goalId === goal.id && <span className="ml-auto text-green-400">✓</span>}
                  </button>
                );
              })}
              {milestones.length === 0 && (
                <p className="px-4 py-3 text-xs text-white/20 italic">No goals yet. Add goals first.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/5 gap-2 relative z-10">
        <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-white/35">
          <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-cyan-400" /><span>{task.startTime}</span></div>
          <button onClick={() => onUpdateNode(task.id, task.category === 'FORMAL' ? 'INFORMAL' : 'FORMAL')} className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
            <Zap className="w-3 h-3 text-pink-500" /><span>{task.category}</span>
          </button>
        </div>
        <div className="flex gap-1.5">
          <button onClick={() => onUpdateStatus(task.id, 'fully')} className="px-3 py-1.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-bold uppercase tracking-wider hover:bg-green-500 hover:text-white transition-all">✓</button>
          <button onClick={() => onUpdateStatus(task.id, 'halfway')} className="px-3 py-1.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[9px] font-bold uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all">½</button>
          <button onClick={() => onUpdateStatus(task.id, 'not-done')} className="px-3 py-1.5 rounded-xl bg-white/5 text-white/40 border border-white/10 text-[9px] font-bold uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all flex items-center gap-1">
            <RefreshCcw className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const GoalGroup = ({ goal, tasks, color, milestones, onUpdateStatus, onConfig, onDelete, onUpdateNode, onAssignGoal }) => {
  const [open, setOpen] = useState(true);
  const done = tasks.filter(t => t.status === 'fully').length;
  const pct = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <div className="space-y-1.5">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn("w-full flex items-center justify-between px-4 py-2.5 rounded-2xl border transition-all hover:bg-white/5", color.border, color.bg)}
      >
        <div className="flex items-center gap-2.5">
          <Target className={cn("w-3.5 h-3.5 shrink-0", color.text)} />
          <span className={cn("text-xs font-bold uppercase tracking-widest truncate", color.text)}>{goal.title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-white/30">{done}/{tasks.length} · {pct}%</span>
          {open ? <ChevronDown className="w-3.5 h-3.5 text-white/30" /> : <ChevronRight className="w-3.5 h-3.5 text-white/30" />}
        </div>
      </button>

      {/* Thin progress bar under header */}
      <div className="h-0.5 mx-4 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6 }}
          className={cn("h-full rounded-full", color.border.replace('border-', 'bg-').replace('/40', '/60'))}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-1.5 overflow-hidden"
          >
            {tasks.length === 0 ? (
              <p className="ml-6 text-[11px] text-white/20 italic py-2 tracking-wide">No tasks linked. Open any task → Assign Goal.</p>
            ) : tasks.map(task => (
              <TaskCard
                key={task.id} task={task} milestones={milestones}
                onUpdateStatus={onUpdateStatus} onConfig={onConfig}
                onDelete={onDelete} onUpdateNode={onUpdateNode} onAssignGoal={onAssignGoal}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TaskCommandCenter = ({ tasks, milestones, onUpdateStatus, onConfig, onDelete, onUpdateNode, onAssignGoal }) => {
  const unassigned = tasks.filter(t => !t.goalId);

  return (
    <div className="glass h-full flex flex-col border-white/10 shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-500">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-widest uppercase text-white/90">Chronos Queue</h2>
            <p className="text-[10px] text-white/35 uppercase tracking-[0.2em] font-semibold mt-0.5">Goal-Linked · Daily Allocation</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Goal-grouped sections */}
        {milestones.map((goal, i) => {
          const color = goalAccentColors[i % goalAccentColors.length];
          const goalTasks = tasks.filter(t => t.goalId === goal.id);
          return (
            <GoalGroup
              key={goal.id} goal={goal} tasks={goalTasks} color={color}
              milestones={milestones} onUpdateStatus={onUpdateStatus}
              onConfig={onConfig} onDelete={onDelete} onUpdateNode={onUpdateNode} onAssignGoal={onAssignGoal}
            />
          );
        })}

        {/* Unassigned bucket */}
        {unassigned.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Unassigned Tasks</span>
              <span className="text-[10px] text-white/20">({unassigned.length})</span>
            </div>
            {unassigned.map(task => (
              <TaskCard
                key={task.id} task={task} milestones={milestones}
                onUpdateStatus={onUpdateStatus} onConfig={onConfig}
                onDelete={onDelete} onUpdateNode={onUpdateNode} onAssignGoal={onAssignGoal}
              />
            ))}
          </div>
        )}

        {tasks.length === 0 && milestones.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 text-center text-white/15">
            <Layers className="w-10 h-10 mb-3 opacity-20" />
            <p className="text-xs font-semibold uppercase tracking-widest">Queue Empty</p>
            <p className="text-[11px] mt-1">Import tasks or add a goal to begin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCommandCenter;
