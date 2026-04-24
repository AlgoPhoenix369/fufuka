import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SubliminalEngine from './components/SubliminalEngine';
import MilestoneTracker from './components/MilestoneTracker';
import SchedulePulse from './components/SchedulePulse';
import CommandPalette from './components/CommandPalette';
import TaskCommandCenter from './components/TaskCommandCenter';
import NeuralPerformance from './components/NeuralPerformance';
import Calendar from './components/Calendar';
import BeastQuote from './components/BeastQuote';
import ExecutiveSecretary from './components/ExecutiveSecretary';
import { Activity, Zap, Shield, X, Cpu, BarChart3, Radio, Clock, Sun, Moon, Utensils, ChevronDown, Download, CheckCircle2, AlertCircle, Settings2, Trash2, Globe, Power, UploadCloud, LayoutDashboard, Calendar as CalendarIcon, Target } from 'lucide-react';

function App() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showConfig, setShowConfig] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [importText, setImportText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [milestones, setMilestones] = useState(() => {
    const saved = localStorage.getItem('neuro_milestones');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [tasksByDate, setTasksByDate] = useState(() => {
    const saved = localStorage.getItem('neuro_tasks');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [lastAction, setLastAction] = useState("Side Dashboard Initialized.");

  useEffect(() => { localStorage.setItem('neuro_milestones', JSON.stringify(milestones)); }, [milestones]);
  useEffect(() => { localStorage.setItem('neuro_tasks', JSON.stringify(tasksByDate)); }, [tasksByDate]);

  const dateKey = selectedDate.toISOString().split('T')[0];
  const currentTasks = tasksByDate[dateKey] || [];
  const routine = { wake: "05:00", sleep: "02:00" };
  const totalWorkMinutes = 20 * 60;
  const allocatedMinutes = currentTasks.reduce((acc, t) => acc + (parseInt(t.duration) || 0), 0);
  const remainingHours = (totalWorkMinutes - allocatedMinutes) / 60;

  const [nairobiTime, setNairobiTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      const options = { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setNairobiTime(new Intl.DateTimeFormat([], options).format(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bulkImport = () => {
    const lines = importText.split('\n').filter(l => l.trim() !== "");
    const newTasks = lines.map((line, i) => ({
      id: Date.now() + i,
      title: line.trim(),
      startTime: "06:00",
      duration: 60,
      status: 'not-done',
      category: 'FORMAL',
      priority: 'high'
    }));
    setTasksByDate({ ...tasksByDate, [dateKey]: [...currentTasks, ...newTasks].sort((a, b) => a.startTime.localeCompare(b.startTime)) });
    setShowImport(false); setImportText("");
  };

  const currentDirective = currentTasks.find(t => t.status === 'not-done');

  return (
    <div className="min-h-screen bg-[#05010a] text-white selection:bg-pink-500/30 font-sans flex">
      <SubliminalEngine />
      <CommandPalette onAction={(action) => { if (action === 'task') setShowImport(true); if (action === 'focus') setIsFocusMode(true); }} />

      {/* Side Dashboard - Fixed Right */}
      <aside className="fixed right-0 top-0 h-screen w-80 z-[100] border-l border-white/5 backdrop-blur-4xl bg-[#05010a] flex flex-col p-8 overflow-y-auto">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-600 to-cyan-400 flex items-center justify-center shadow-[0_0_40px_rgba(255,0,122,0.4)]">
              <Zap className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-3xl font-black tracking-tighter uppercase italic block font-beast text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-400 to-cyan-400">PULSE</span>
              <span className="text-[9px] text-cyan-400 tracking-[0.4em] font-black uppercase italic">SIDE_DASHBOARD</span>
            </div>
          </div>

          <div className="space-y-6">
             <div className="text-[10px] font-black text-white/20 uppercase tracking-widest border-b border-white/5 pb-2">Primary Directives</div>
             <button onClick={() => setShowImport(true)} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-pink-600 text-white font-black uppercase tracking-widest text-[10px] hover:bg-pink-500 shadow-2xl transition-all">
                <UploadCloud className="w-5 h-5" /> BULK IMPORT
             </button>
             <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setLastAction("Wake Protocol.")} className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-orange-400 font-black text-[10px] uppercase hover:bg-orange-500 hover:text-white transition-all"><Sun className="w-5 h-5" /> WAKE</button>
                <button onClick={() => setLastAction("Sleep Protocol.")} className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-violet-400 font-black text-[10px] uppercase hover:bg-violet-500 hover:text-white transition-all"><Moon className="w-5 h-5" /> SLEEP</button>
             </div>
          </div>

          <div className="space-y-6">
             <div className="text-[10px] font-black text-white/20 uppercase tracking-widest border-b border-white/5 pb-2">Temporal Sync</div>
             <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 text-cyan-400 mb-2">
                   <Globe className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Nairobi (EAT)</span>
                </div>
                <div className="text-4xl font-black text-white italic glow-text">{nairobiTime}</div>
             </div>
          </div>

          <div className="space-y-6 mt-auto">
             <div className="text-[10px] font-black text-white/20 uppercase tracking-widest border-b border-white/5 pb-2">Status Metrics</div>
             <div className="grid grid-cols-1 gap-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                   <div className="text-[9px] font-black text-white/20 uppercase mb-1">Time Bank</div>
                   <div className="text-xl font-black text-cyan-400 italic">{remainingHours.toFixed(1)}H REMAINING</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                   <div className="text-[9px] font-black text-white/20 uppercase mb-1">Date Tether</div>
                   <div className="text-xl font-black text-pink-400 italic">{dateKey}</div>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace - Offset for Sidebar */}
      <main className="flex-1 mr-80 p-12 max-w-[1600px]">
        <div className="grid grid-cols-12 gap-12">
          
          <div className="col-span-12">
             <div className="glass p-12 bg-gradient-to-r from-pink-600/20 via-transparent to-cyan-600/20 border-pink-500/40 relative overflow-hidden group shadow-2xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-8">
                   <div className="flex-1 max-w-full">
                      <div className="text-[14px] font-black uppercase tracking-[0.5em] text-pink-400 mb-4">CURRENT DIRECTIVE</div>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase break-words leading-tight">
                        {currentDirective ? currentDirective.title : "QUEUE EMPTY."}
                      </h2>
                      {!currentDirective && (
                        <button onClick={() => setShowImport(true)} className="mt-8 px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white/40 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all">Initialize Load</button>
                      )}
                   </div>
                   {currentDirective && (
                     <div className="flex gap-4 shrink-0">
                        <button onClick={() => setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === currentDirective.id ? { ...t, status: 'fully' } : t) })} className="px-10 py-5 rounded-2xl bg-green-500 text-white font-black uppercase text-sm shadow-2xl hover:scale-105 transition-all">COMPLETE</button>
                        <button onClick={() => { setConfigData({...currentDirective}); setShowConfig(currentDirective.id); }} className="px-10 py-5 rounded-2xl bg-white/10 text-white font-black uppercase text-sm flex items-center gap-3 border border-white/10"><Settings2 className="w-5 h-5" /> CONFIG</button>
                     </div>
                   )}
                </div>
             </div>
          </div>

          <div className="col-span-12 xl:col-span-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="h-[850px]">
                  <TaskCommandCenter 
                    tasks={currentTasks} 
                    onUpdateStatus={(id, s) => setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === id ? { ...t, status: s } : t) })} 
                    onDelete={(id) => setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.filter(t => t.id !== id) })}
                    onUpdateNode={(id, category) => setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === id ? { ...t, category } : t) })}
                    onConfig={(id) => { const t = currentTasks.find(x => x.id === id); setConfigData({...t}); setShowConfig(id); }} 
                  />
               </div>
               <div className="flex flex-col gap-12 h-full xl:h-[850px]">
                  <ExecutiveSecretary tasks={currentTasks} remainingHours={remainingHours} />
                  <BeastQuote />
                  <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
               </div>
            </div>
            <SchedulePulse tasks={currentTasks} />
          </div>

          <div className="col-span-12 xl:col-span-4 flex flex-col gap-12 h-full xl:h-[850px]">
             <NeuralPerformance />
             <MilestoneTracker milestones={milestones} onAdd={() => setMilestones([...milestones, {id: Date.now(), title: prompt("Goal:"), progress: 0, status: 'in-progress'}])} />
             <div className="glass p-10 border-violet-500/20 flex-1 flex flex-col">
                <h3 className="text-[12px] font-black uppercase tracking-widest text-white/40 italic mb-6">Intelligence Stream</h3>
                <div className="text-sm font-mono text-violet-400/70 break-words leading-relaxed flex-1 overflow-y-auto">{`> ${lastAction}`}</div>
                <div className="mt-auto pt-4 border-t border-white/5 text-[9px] text-white/10 uppercase tracking-widest">PERSISTENCE: SECURED</div>
             </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showImport && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowImport(false)} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass w-full max-w-2xl p-12 relative z-10 border-pink-500/50 shadow-2xl">
              <h2 className="text-4xl font-black mb-8 italic tracking-tighter uppercase text-pink-500">EXECUTIVE LOAD</h2>
              <textarea className="w-full h-72 bg-black/40 rounded-3xl p-8 border border-white/10 outline-none focus:border-pink-500/50 text-white font-mono text-lg mb-8 resize-none shadow-inner" placeholder="Paste tasks..." value={importText} onChange={(e) => setImportText(e.target.value)} />
              <div className="flex gap-6">
                <button onClick={bulkImport} className="flex-1 py-5 rounded-2xl bg-pink-600 text-white font-black uppercase tracking-widest text-sm hover:bg-pink-500 shadow-2xl transition-all">INITIALIZE</button>
                <button onClick={() => setShowImport(false)} className="px-10 py-5 rounded-2xl bg-white/5 text-white/40 font-black uppercase tracking-widest text-xs hover:bg-white/10">ABORT</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfig && configData && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowConfig(null)} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass w-full max-w-lg p-12 relative z-10 border-cyan-500/50 shadow-2xl">
              <h2 className="text-4xl font-black mb-10 italic uppercase tracking-tighter text-cyan-400">Configuration</h2>
              <div className="space-y-8">
                <div className="grid grid-cols-4 gap-3">
                  {['critical', 'high', 'medium', 'low'].map(p => (
                    <button key={p} onClick={() => setConfigData({...configData, priority: p})} className={`py-4 rounded-2xl text-[10px] font-black uppercase border transition-all ${configData.priority === p ? 'bg-pink-600 border-pink-500 shadow-xl' : 'bg-white/5 border-white/10 text-white/40'}`}>{p}</button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <input type="time" value={configData.startTime} onChange={(e) => setConfigData({...configData, startTime: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-lg font-black text-white outline-none focus:border-cyan-500" />
                  <input type="number" value={configData.duration} onChange={(e) => setConfigData({...configData, duration: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-lg font-black text-white outline-none focus:border-cyan-500" />
                </div>
              </div>
              <button onClick={() => { 
                  setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === showConfig ? configData : t).sort((a, b) => a.startTime.localeCompare(b.startTime)) });
                  setShowConfig(null);
              }} className="w-full mt-12 py-5 rounded-2xl bg-cyan-600 text-white font-black uppercase tracking-widest text-xs hover:bg-cyan-500 transition-all">APPLY</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
