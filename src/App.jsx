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
import { Activity, Zap, Shield, X, Cpu, BarChart3, Radio, Clock, Sun, Moon, Utensils, ChevronDown, Download, CheckCircle2, AlertCircle, Settings2, Trash2, Globe, Power } from 'lucide-react';

function App() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showConfig, setShowConfig] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [importText, setImportText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [milestones, setMilestones] = useState([]);
  const [tasksByDate, setTasksByDate] = useState({});
  const [lastAction, setLastAction] = useState("System Calibrated to 20H Cycle.");

  const dateKey = selectedDate.toISOString().split('T')[0];
  const currentTasks = tasksByDate[dateKey] || [];

  // Updated Constants: 20H Work, 4H Replenish
  const routine = {
    wake: "05:00",
    sleep: "02:00",
    maintenanceMinutes: 240 // 4 hours
  };
  
  const totalWorkMinutes = 20 * 60; // 1200 mins
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
    const updatedDateTasks = [...currentTasks, ...newTasks].sort((a, b) => a.startTime.localeCompare(b.startTime));
    setTasksByDate({ ...tasksByDate, [dateKey]: updatedDateTasks });
    setShowImport(false);
    setImportText("");
    setLastAction(`Load: ${newTasks.length} nodes injected.`);
  };

  const saveConfig = () => {
    const updatedDateTasks = currentTasks.map(t => t.id === showConfig ? configData : t).sort((a, b) => a.startTime.localeCompare(b.startTime));
    setTasksByDate({ ...tasksByDate, [dateKey]: updatedDateTasks });
    setShowConfig(null);
    setLastAction(`Config: Node optimized.`);
  };

  const updateTaskStatus = (id, status) => {
    setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === id ? { ...t, status } : t) });
  };

  const deleteTask = (id) => {
    setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.filter(t => t.id !== id) });
  };

  const logWake = () => {
    const time = new Date().toLocaleTimeString();
    setLastAction(`PROTOCOL: WAKE LOGGED AT ${time}`);
    alert(`WAKE PROTOCOL INITIATED AT ${time}`);
  };

  const logSleep = () => {
    const time = new Date().toLocaleTimeString();
    setLastAction(`PROTOCOL: SLEEP LOGGED AT ${time}`);
    alert(`SLEEP PROTOCOL INITIATED AT ${time}`);
  };

  const currentDirective = currentTasks.find(t => t.status === 'not-done');

  return (
    <div className="min-h-screen bg-[#05010a] text-white selection:bg-pink-500/30 overflow-x-hidden font-sans">
      <SubliminalEngine />
      <CommandPalette onAction={(action) => { if (action === 'task') setShowImport(true); if (action === 'focus') setIsFocusMode(true); }} />

      {/* Config Modal */}
      <AnimatePresence>
        {showConfig && configData && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowConfig(null)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass w-full max-w-lg p-10 relative z-10 border-cyan-500/40">
              <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter text-cyan-400">Node Configuration</h2>
              <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black uppercase text-white/30 mb-2 block">Priority</label>
                   <div className="grid grid-cols-4 gap-2">
                     {['critical', 'high', 'medium', 'low'].map(p => (
                       <button key={p} onClick={() => setConfigData({...configData, priority: p})} className={`py-3 rounded-xl text-[9px] font-black uppercase border transition-all ${configData.priority === p ? 'bg-pink-600 border-pink-500 shadow-lg' : 'bg-white/5 border-white/10 text-white/40'}`}>{p}</button>
                     ))}
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase text-white/30 mb-2 block">Start</label>
                    <input type="time" value={configData.startTime} onChange={(e) => setConfigData({...configData, startTime: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-black text-white outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-white/30 mb-2 block">Duration (Mins)</label>
                    <input type="number" value={configData.duration} onChange={(e) => setConfigData({...configData, duration: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-black text-white outline-none focus:border-cyan-500" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <button onClick={saveConfig} className="flex-1 py-4 rounded-xl bg-cyan-600 text-white font-black uppercase tracking-widest text-xs hover:bg-cyan-500 transition-all">SAVE</button>
                <button onClick={() => setShowConfig(null)} className="px-6 py-4 rounded-xl bg-white/5 text-white/40 font-black uppercase tracking-widest text-[10px]">CANCEL</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-[100] px-10 py-8 flex items-center justify-between border-b border-white/5 backdrop-blur-3xl bg-black/80 shadow-2xl">
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-pink-600 via-purple-500 to-cyan-400 flex items-center justify-center shadow-[0_0_50px_rgba(255,0,122,0.4)]">
            <Zap className="w-8 h-8 text-white fill-white animate-pulse" />
          </div>
          <div>
            <span className="text-4xl font-black tracking-tighter uppercase italic block leading-none font-beast text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-400 to-cyan-400 neon-text-pink">PULSE</span>
            <span className="text-[11px] text-cyan-400 tracking-[0.4em] font-black uppercase italic">20H_CYCLE // EAT</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex gap-2">
             <button onClick={logWake} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-black text-[10px] uppercase hover:bg-orange-500 hover:text-white transition-all"><Sun className="w-4 h-4" /> WAKE</button>
             <button onClick={logSleep} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 font-black text-[10px] uppercase hover:bg-violet-500 hover:text-white transition-all"><Moon className="w-4 h-4" /> SLEEP</button>
          </div>
          <div className="h-10 w-px bg-white/10 mx-2" />
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-2 text-cyan-400 font-black italic tracking-tighter">
                <Globe className="w-4 h-4" />
                <span className="text-2xl neon-text-cyan">{nairobiTime}</span>
             </div>
          </div>
          <button onClick={() => setShowImport(true)} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/50 font-black uppercase tracking-widest text-[10px]"><Download className="w-4 h-4 text-pink-500" /></button>
        </div>
      </nav>

      {/* Main Content - MASSIVE TOP PADDING TO PREVENT OVERLAP */}
      <main className="pt-80 pb-40 px-10 max-w-[1900px] mx-auto">
        <div className="grid grid-cols-12 gap-12">
          
          <div className="col-span-12">
             <div className="glass p-10 bg-gradient-to-r from-pink-600/20 via-transparent to-cyan-600/20 border-pink-500/40 relative overflow-hidden group">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-6">
                   <div className="flex-1 max-w-full">
                      <div className="text-[12px] font-black uppercase tracking-[0.4em] text-pink-400 mb-2">DIRECTIVE // {dateKey}</div>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase break-words leading-tight">
                        {currentDirective ? currentDirective.title : "QUEUE EMPTY."}
                      </h2>
                   </div>
                   {currentDirective && (
                     <div className="flex gap-4 shrink-0">
                        <button onClick={() => updateTaskStatus(currentDirective.id, 'fully')} className="px-8 py-4 rounded-xl bg-green-500 text-white font-black uppercase text-xs shadow-2xl">COMPLETE</button>
                        <button onClick={() => { setConfigData({...currentDirective}); setShowConfig(currentDirective.id); }} className="px-8 py-4 rounded-xl bg-white/10 text-white font-black uppercase text-xs flex items-center gap-2 border border-white/10"><Settings2 className="w-4 h-4" /> CONFIG</button>
                     </div>
                   )}
                </div>
             </div>
          </div>

          <div className="col-span-12 xl:col-span-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="h-[800px]">
                  <TaskCommandCenter 
                    tasks={currentTasks} 
                    onUpdateStatus={updateTaskStatus} 
                    onDelete={deleteTask}
                    onUpdateNode={(id, category) => setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === id ? { ...t, category } : t) })}
                    onConfig={(id) => { const t = currentTasks.find(x => x.id === id); setConfigData({...t}); setShowConfig(id); }} 
                  />
               </div>
               <div className="space-y-12">
                  <ExecutiveSecretary tasks={currentTasks} remainingHours={remainingHours} />
                  <BeastQuote />
                  <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
               </div>
            </div>
            <SchedulePulse tasks={currentTasks} />
          </div>

          <div className="col-span-12 xl:col-span-4 space-y-12">
             <div className="glass p-10 border-cyan-500/20">
                <div className="flex items-center gap-3 mb-8">
                   <Clock className="w-6 h-6 text-cyan-400" />
                   <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/60 italic">Daily Budget</h3>
                </div>
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5">
                      <span className="font-black italic uppercase text-xs tracking-widest text-pink-400">Target Work</span>
                      <span className="font-black text-xl italic">20.0H</span>
                   </div>
                   <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5">
                      <span className="font-black italic uppercase text-xs tracking-widest text-cyan-400">Remaining Bank</span>
                      <span className="font-black text-xl italic">{remainingHours.toFixed(1)}H</span>
                   </div>
                   <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5">
                      <span className="font-black italic uppercase text-xs tracking-widest text-violet-400">Replenishing</span>
                      <span className="font-black text-xl italic">4.0H</span>
                   </div>
                </div>
             </div>
             <NeuralPerformance />
             <MilestoneTracker milestones={milestones} onAdd={() => setMilestones([...milestones, {id: Date.now(), title: prompt("Goal:"), progress: 0, status: 'in-progress'}])} />
             <div className="glass p-8 border-violet-500/20">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 italic mb-4">Intelligence Feed</h3>
                <div className="text-xs font-mono text-violet-400/60 break-words leading-relaxed">{`> ${lastAction}`}</div>
             </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full px-10 py-5 border-t border-white/5 bg-black/80 backdrop-blur-3xl flex items-center justify-between text-[12px] font-black text-white/10 uppercase tracking-[0.3em] italic shadow-2xl z-50">
        <div className="flex gap-14 items-center">
          <span className="text-cyan-400 shrink-0">CYCLE: 20H_WORK // 4H_REPLENISH</span>
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shrink-0" />
          <span className="truncate">WAKE: {routine.wake} // SLEEP: {routine.sleep}</span>
        </div>
        <div className="text-cyan-400 shrink-0 ml-4">CHRONOS_V6.0 // EAT_SYNC</div>
      </footer>

      {/* Import Modal */}
      <AnimatePresence>
        {showImport && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowImport(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass w-full max-w-2xl p-10 relative z-10 border-pink-500/30 shadow-2xl">
              <h2 className="text-3xl font-black mb-6 italic tracking-tighter uppercase">Inject Directives</h2>
              <textarea className="w-full h-64 bg-black/40 rounded-2xl p-6 border border-white/10 outline-none focus:border-pink-500/50 text-white font-mono text-sm mb-6 resize-none" placeholder="Paste tasks..." value={importText} onChange={(e) => setImportText(e.target.value)} />
              <div className="flex gap-4">
                <button onClick={bulkImport} className="flex-1 py-4 rounded-xl bg-pink-600 text-white font-black uppercase tracking-widest hover:bg-pink-500 shadow-[0_0_30px_rgba(255,0,122,0.4)]">INITIALIZE</button>
                <button onClick={() => setShowImport(false)} className="px-8 py-4 rounded-xl bg-white/5 text-white/40 font-black uppercase tracking-widest hover:bg-white/10">ABORT</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
