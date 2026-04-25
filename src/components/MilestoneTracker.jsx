import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, CheckCircle2, Circle, TrendingUp, Trash2, Edit3, Check, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const STRENGTH_EMOJIS = ['💪', '🔥', '⚡', '🚀', '🏆', '💎', '⚔️', '🦁', '🧠', '🎯', '🌊', '💡'];

const FlashingEmoji = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % STRENGTH_EMOJIS.length), 600);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.span
      key={idx}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1.2, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="text-2xl select-none"
    >
      {STRENGTH_EMOJIS[idx]}
    </motion.span>
  );
};

const goalColors = [
  { bar: 'bg-pink-500',   text: 'text-pink-400',   border: 'border-pink-500/30' },
  { bar: 'bg-cyan-500',   text: 'text-cyan-400',   border: 'border-cyan-500/30' },
  { bar: 'bg-violet-500', text: 'text-violet-400', border: 'border-violet-500/30' },
  { bar: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500/30' },
  { bar: 'bg-green-500',  text: 'text-green-400',  border: 'border-green-500/30' },
  { bar: 'bg-yellow-400', text: 'text-yellow-400', border: 'border-yellow-500/30' },
];

const MilestoneTracker = ({ milestones, tasks, onAdd, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [addingNew, setAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const startEdit = (ms) => { setEditingId(ms.id); setEditTitle(ms.title); };
  const saveEdit = () => { if (editTitle.trim()) { onEdit(editingId, editTitle.trim()); } setEditingId(null); };
  const cancelEdit = () => setEditingId(null);

  const submitNew = () => {
    if (newTitle.trim()) { onAdd(newTitle.trim()); setNewTitle(''); setAddingNew(false); }
  };
  const cancelNew = () => { setNewTitle(''); setAddingNew(false); };

  const getLinkedTasks = (goalId) => (tasks || []).filter(t => t.goalId === goalId);
  const getProgress = (goalId) => {
    const linked = getLinkedTasks(goalId);
    if (!linked.length) return 0;
    return Math.round((linked.filter(t => t.status === 'fully').length / linked.length) * 100);
  };

  return (
    <div className="glass p-6 w-full flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div className="flex items-center gap-3">
          <Target className="text-blue-400 w-5 h-5" />
          <h2 className="text-base font-bold tracking-widest uppercase text-white/90">Performance Goals</h2>
          <AnimatePresence mode="wait">
            <FlashingEmoji />
          </AnimatePresence>
        </div>
        <button
          onClick={() => setAddingNew(true)}
          className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-white/40 hover:text-cyan-400 transition-all border border-white/10 hover:border-cyan-500/30"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Inline new goal input */}
      <AnimatePresence>
        {addingNew && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 shrink-0 overflow-hidden"
          >
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
              <input
                autoFocus
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') submitNew(); if (e.key === 'Escape') cancelNew(); }}
                placeholder="New goal title..."
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder-white/30"
              />
              <button onClick={submitNew} className="text-green-400 hover:text-green-300 transition-colors"><Check className="w-4 h-4" /></button>
              <button onClick={cancelNew} className="text-red-400 hover:text-red-300 transition-colors"><X className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals list */}
      <div className="space-y-4 overflow-y-auto flex-1 pr-1">
        {milestones.length === 0 && !addingNew && (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
            <span className="text-4xl">🎯</span>
            <p className="text-xs text-white/20 italic">No goals yet. Add one to link your tasks.</p>
          </div>
        )}

        {milestones.map((ms, i) => {
          const color = goalColors[i % goalColors.length];
          const linked = getLinkedTasks(ms.id);
          const pct = getProgress(ms.id);
          const done = linked.filter(t => t.status === 'fully').length;
          const isComplete = linked.length > 0 && done === linked.length;

          return (
            <motion.div
              key={ms.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn('group rounded-2xl border p-4 bg-white/2 hover:bg-white/5 transition-all', color.border)}
            >
              {/* Title row */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {isComplete
                    ? <CheckCircle2 className="text-green-500 w-4 h-4 shrink-0" />
                    : <Circle className={cn('w-4 h-4 shrink-0', color.text)} />}

                  {editingId === ms.id ? (
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <input
                        autoFocus
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit(); }}
                        className="flex-1 bg-white/5 border border-cyan-500/50 rounded-xl px-3 py-1 text-sm text-white outline-none"
                      />
                      <button onClick={saveEdit} className="text-green-400 hover:text-green-300"><Check className="w-3.5 h-3.5" /></button>
                      <button onClick={cancelEdit} className="text-red-400 hover:text-red-300"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ) : (
                    <span className={cn('text-sm font-semibold truncate', isComplete ? 'text-white/30 line-through' : 'text-white/90')}>
                      {ms.title}
                    </span>
                  )}
                </div>

                {editingId !== ms.id && (
                  <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => startEdit(ms)} className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-cyan-400 transition-all">
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button onClick={() => onDelete(ms.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8 }}
                  className={cn('h-full rounded-full', isComplete ? 'bg-green-500/60' : color.bar)}
                />
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/25 uppercase tracking-wider font-semibold">
                  {linked.length} task{linked.length !== 1 ? 's' : ''} · {done} done
                </span>
                <span className={cn('text-[10px] font-mono font-bold', color.text)}>{pct}%</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-white/25 text-[10px] font-semibold uppercase tracking-widest">
          <TrendingUp className="w-3 h-3" />
          <span>{milestones.length} Goals Active</span>
        </div>
        <div className="flex gap-1 text-lg">
          {['🔥','⚡','💪'].map((e,i) => (
            <motion.span key={i} animate={{ y: [0,-4,0] }} transition={{ duration: 1.2, repeat: Infinity, delay: i*0.3 }} className="cursor-default select-none">{e}</motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;
