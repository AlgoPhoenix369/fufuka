import React, { useState, useEffect } from 'react';
import SubliminalEngine from './components/SubliminalEngine';
import MilestoneTracker from './components/MilestoneTracker';
import SchedulePulse from './components/SchedulePulse';
import CommandPalette from './components/CommandPalette';
import TaskCommandCenter from './components/TaskCommandCenter';
import NeuralPerformance from './components/NeuralPerformance';
import { Activity, Shield, Zap, Globe, X, Cpu, BarChart3, Radio } from 'lucide-react';

function App() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Launch Project", progress: 65, status: "in-progress" },
    { id: 2, title: "Beta Testing", progress: 30, status: "in-progress" },
    { id: 3, title: "Design Review", progress: 100, status: "completed" }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Update documentation", priority: "high", category: "Core", completed: false },
    { id: 2, title: "Review pull requests", priority: "medium", category: "Team", completed: true },
    { id: 3, title: "Weekly sync", priority: "low", category: "Meeting", completed: false },
    { id: 4, title: "Refactor API", priority: "high", category: "Dev", completed: false },
  ]);

  const addMilestone = (title) => {
    setMilestones([...milestones, {
      id: Date.now(),
      title,
      progress: 0,
      status: "in-progress"
    }]);
  };

  const addTask = (title) => {
    setTasks([{
      id: Date.now(),
      title,
      priority: "medium",
      category: "Task",
      completed: false
    }, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
      <SubliminalEngine />
      <CommandPalette onAction={(action) => {
        if (action === 'milestone') addMilestone("New Goal");
        if (action === 'focus') setIsFocusMode(true);
        if (action === 'task') addTask("New Task");
      }} />

      {isFocusMode && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center">
           <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
           <h1 className="text-8xl font-black tracking-[1.5em] text-blue-500/40 mb-12 relative z-10">FOCUS</h1>
           <button 
             onClick={() => setIsFocusMode(false)}
             className="relative z-10 text-white/10 hover:text-white transition-all flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5"
           >
             <X className="w-4 h-4" /> EXIT
           </button>
        </div>
      )}

      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-xl bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-[0_0_25px_rgba(0,112,243,0.3)]">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tighter uppercase italic block leading-none">Pulse</span>
            <span className="text-[10px] text-white/30 tracking-widest font-bold uppercase">Performance Dashboard</span>
          </div>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/40">
            <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-400 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>System: Online</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-400 transition-colors">
              <Clock className="w-3.5 h-3.5" />
              <span>Uptime: 99.9%</span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-white/5 mx-2" />
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white/80">Admin</div>
                <div className="text-[10px] text-blue-400 font-mono">Premium Account</div>
             </div>
             <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
             </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Dashboard Header Stats */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
              {[
                { label: "Focus Level", value: "98.2", unit: "%", icon: Zap, color: "text-blue-400", bg: "bg-blue-500/5" },
                { label: "Response", value: "0.42", unit: "ms", icon: Activity, color: "text-green-400", bg: "bg-green-500/5" },
                { label: "Speed", value: "124", unit: "pts", icon: BarChart3, color: "text-gold-400", bg: "bg-gold-500/5" },
                { label: "Workload", value: "42", unit: "%", icon: Cpu, color: "text-purple-400", bg: "bg-purple-500/5" }
              ].map((stat, i) => (
                <div key={i} className="glass p-6 group hover:border-white/20 transition-all cursor-default relative overflow-hidden">
                  <div className={`absolute inset-0 ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-3">{stat.label}</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black tracking-tight">{stat.value}</span>
                        <span className="text-xs font-mono text-white/20">{stat.unit}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Left Column: Tasks & Performance */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="h-[500px]">
                  <TaskCommandCenter tasks={tasks} onToggle={toggleTask} onAdd={() => addTask("New Task")} />
               </div>
               <div className="space-y-8">
                  <NeuralPerformance />
                  <div className="glass p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group h-[215px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3 tracking-tight">Focus Mode</h3>
                      <p className="text-sm text-white/30 max-w-[240px] mx-auto leading-relaxed mb-6">
                        Eliminate distractions and enter a deep flow state.
                      </p>
                      <button 
                        onClick={() => setIsFocusMode(true)}
                        className="px-8 py-2.5 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      >
                        Enter Focus
                      </button>
                    </div>
                  </div>
               </div>
            </div>
            <SchedulePulse />
          </div>

          {/* Right Column: Goals & Insights */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <MilestoneTracker milestones={milestones} onAdd={() => addMilestone("New Goal")} />
            
            <div className="glass p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Insights</h3>
              </div>
              <div className="space-y-6">
                {[
                  { text: "Discipline is the bridge between goals and accomplishment.", author: "E. Night" },
                  { text: "Success is not final, failure is not fatal.", author: "W. Church" },
                  { text: "Focus on being productive instead of busy.", author: "T. Ferriss" }
                ].map((quote, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="text-sm text-white/60 italic leading-relaxed pl-4 border-l-2 border-blue-500/20 group-hover:border-blue-400 transition-colors">
                      "{quote.text}"
                    </div>
                    <div className="mt-2 text-[10px] text-white/20 font-bold uppercase tracking-tighter pl-4">
                      — {quote.author}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 bg-gradient-to-br from-gold-500/10 to-transparent border-gold-500/20">
               <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-500">Alert</div>
                  <div className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
               </div>
               <p className="text-xs text-white/60 leading-relaxed">
                  Focus level is slightly down. We recommend entering <strong>Focus Mode</strong> for 25 minutes.
               </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 w-full px-8 py-3 border-t border-white/5 bg-black/60 backdrop-blur-xl flex items-center justify-between text-[11px] font-mono text-white/20">
        <div className="flex gap-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>STATUS: ACTIVE</span>
          </div>
          <span>RESPONSE: 0.42ms</span>
          <span>UPTIME: 100.0%</span>
        </div>
        <div className="flex gap-8">
           <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-help">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40 font-bold text-[9px]">CTRL</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40 font-bold text-[9px]">K</kbd>
              <span className="ml-1 text-[10px]">COMMANDS</span>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
