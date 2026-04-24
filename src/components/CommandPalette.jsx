import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Zap, Target, CheckCircle2, Settings } from 'lucide-react';

const CommandPalette = ({ onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const actions = [
    { id: 'task', label: 'Add Task', icon: CheckCircle2, shortcut: 'T' },
    { id: 'milestone', label: 'Add Goal', icon: Target, shortcut: 'G' },
    { id: 'focus', label: 'Enter Focus', icon: Zap, shortcut: 'F' },
    { id: 'settings', label: 'Settings', icon: Settings, shortcut: ',' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            className="w-full max-w-xl glass overflow-hidden shadow-2xl border-white/20"
          >
            <div className="p-4 flex items-center gap-3 border-b border-white/10 bg-white/2">
              <Search className="w-5 h-5 text-white/40" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search commands..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-white/20"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/40 font-mono">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            <div className="p-2">
              {actions.map((action) => (
                <div 
                  key={action.id}
                  onClick={() => {
                    onAction(action.id);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-white/40 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                      <action.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-white/70 group-hover:text-white">
                      {action.label}
                    </span>
                  </div>
                  <div className="px-2 py-1 rounded bg-white/5 text-[10px] text-white/20 font-mono group-hover:text-white/40">
                    {action.shortcut}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/2 border-t border-white/5 flex items-center justify-between text-[9px] text-white/20 uppercase tracking-widest font-bold">
              <span>Pulse Terminal v1.0.4</span>
              <div className="flex gap-4">
                <span>↑↓ navigate</span>
                <span>↵ execute</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
