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
import { Activity, Zap, Shield, X, Cpu, BarChart3, Radio, Clock, Sun, Moon, Utensils, ChevronDown, Download, CheckCircle2, AlertCircle, Settings2, Trash2, Globe, Power, UploadCloud, LayoutDashboard, Calendar as CalendarIcon, Target, Menu, ChevronRight, Plus } from 'lucide-react';

function App() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskData, setNewTaskData] = useState({ title: '', startTime: '06:00', duration: 60, priority: 'high', goalId: null });
  const [showConfig, setShowConfig] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [importText, setImportText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dateKey, setDateKey] = useState(() => {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Nairobi', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  });
  
  const [deepWorkState, setDeepWorkState] = useState('idle');
  const [sessionTime, setSessionTime] = useState(() => {
    return parseInt(localStorage.getItem('neuro_session_time') || "0");
  });

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  
  const [milestones, setMilestones] = useState(() => {
    const saved = localStorage.getItem('neuro_milestones');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isDayActive, setIsDayActive] = useState(() => {
    return localStorage.getItem('neuro_day_active') === 'true';
  });

  const [tasksByDate, setTasksByDate] = useState(() => {
    const saved = localStorage.getItem('neuro_tasks');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [streamLogs, setStreamLogs] = useState(() => {
    return JSON.parse(localStorage.getItem('neuro_stream') || '["Awaiting Wake Protocol."]');
  });

  const addLog = (msg) => {
    const timestamp = new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
    setStreamLogs(prev => {
      const newLogs = [`[${timestamp}] ${msg}`, ...prev].slice(0, 100);
      localStorage.setItem('neuro_stream', JSON.stringify(newLogs));
      return newLogs;
    });
  };

  const wakeUp = () => {
    const timestamp = new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date());
    const todayKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Nairobi', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    setDateKey(todayKey);
    setIsDayActive(true);
    localStorage.setItem('neuro_day_active', 'true');
    const wakeLog = [
      `[${timestamp}] ☀️ DAY STARTED — WAKE PROTOCOL ACTIVE.`,
      `[${timestamp}] 📅 DATE TETHER LOCKED: ${todayKey}`,
      `[${timestamp}] 🎯 READY FOR EXECUTION. BEGIN YOUR MISSION.`
    ];
    setStreamLogs(wakeLog);
    localStorage.setItem('neuro_stream', JSON.stringify(wakeLog));
  };

  const sleepDown = () => {
    const timestamp = new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date());
    const todayTasks = tasksByDate[dateKey] || [];
    const completed = todayTasks.filter(t => t.status === 'fully').length;
    const halfway = todayTasks.filter(t => t.status === 'halfway').length;
    const pending = todayTasks.filter(t => t.status === 'not-done').length;
    const completedGoals = milestones.filter(m => {
      const linked = todayTasks.filter(t => t.goalId === m.id);
      return linked.length > 0 && linked.every(t => t.status === 'fully');
    }).length;
    setIsDayActive(false);
    localStorage.setItem('neuro_day_active', 'false');
    setDeepWorkState('idle');
    const sleepLog = [
      `[${timestamp}] 🌙 SLEEP PROTOCOL INITIATED. DAY CLOSED.`,
      `[${timestamp}] 📊 END-OF-DAY SUMMARY:`,
      `[${timestamp}]   ✅ Tasks Completed: ${completed}`,
      `[${timestamp}]   ⏳ Tasks Halfway: ${halfway}`,
      `[${timestamp}]   ❌ Tasks Pending: ${pending}`,
      `[${timestamp}]   🏆 Goals Achieved Today: ${completedGoals}`,
      `[${timestamp}]   ⏱️  Deep Work Time: ${formatTime(sessionTime)}`,
      `[${timestamp}] 💤 REST. RECOVER. RETURN STRONGER.`,
      ...streamLogs
    ].slice(0, 100);
    setStreamLogs(sleepLog);
    localStorage.setItem('neuro_stream', JSON.stringify(sleepLog));
  };

  useEffect(() => {
    let interval = null;
    if (deepWorkState === 'focus') {
      addLog(`DEEP WORK SESSION RESUMED/INITIATED: ${new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date())}`);
      interval = setInterval(() => {
        setSessionTime(prev => {
          const newTime = prev + 1;
          localStorage.setItem('neuro_session_time', newTime.toString());
          return newTime;
        });
      }, 1000);
    } else if (deepWorkState === 'rest') {
      addLog(`REST PROTOCOL INITIATED (TIMER PAUSED).`);
      clearInterval(interval);
    } else if (deepWorkState === 'idle') {
      if (sessionTime > 0) {
         addLog(`SESSION TERMINATED. TOTAL TIME SAVED: ${formatTime(sessionTime)}`);
         setSessionTime(0);
         localStorage.setItem('neuro_session_time', '0');
      }
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [deepWorkState]);

  useEffect(() => { localStorage.setItem('neuro_milestones', JSON.stringify(milestones)); }, [milestones]);
  useEffect(() => { localStorage.setItem('neuro_tasks', JSON.stringify(tasksByDate)); }, [tasksByDate]);

  const currentTasks = tasksByDate[dateKey] || [];
  const routine = { wake: "05:00", sleep: "02:00" };

  const [nairobiTime, setNairobiTime] = useState("");
  const [remainingHours, setRemainingHours] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      const options = { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const currentTime = new Intl.DateTimeFormat([], options).format(new Date());
      setNairobiTime(currentTime);

      const nowStr = new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" });
      const nowEAT = new Date(nowStr);
      const targetEAT = new Date(nowStr);
      targetEAT.setHours(2, 0, 0, 0);

      if (nowEAT.getHours() >= 2) {
        targetEAT.setDate(targetEAT.getDate() + 1);
      }

      const diffMs = targetEAT - nowEAT;
      setRemainingHours(diffMs / (1000 * 60 * 60));

      // Automated Protocols based on Nairobi time
      if (currentTime === "02:00:00") {
        addLog("AUTOMATED SLEEP PROTOCOL INITIATED. REPLENISHMENT PHASE ACTIVE.");
      } else if (currentTime === "05:00:00") {
        addLog("AUTOMATED WAKE PROTOCOL INITIATED. 20H CYCLE COMMENCING.");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addSingleTask = () => {
    if (!newTaskData.title.trim()) return;
    const task = { id: Date.now(), ...newTaskData, title: newTaskData.title.trim(), status: 'not-done', category: 'FORMAL' };
    setTasksByDate({ ...tasksByDate, [dateKey]: [...currentTasks, task].sort((a, b) => a.startTime.localeCompare(b.startTime)) });
    addLog(`TASK ADDED: "${task.title}"${task.goalId ? ' → ' + (milestones.find(m => m.id === task.goalId)?.title || '') : ''}`);
    setShowAddTask(false);
    setNewTaskData({ title: '', startTime: '06:00', duration: 60, priority: 'high', goalId: null });
  };

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

      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-1/2 -translate-y-1/2 z-[110] p-4 bg-[#05010a] border border-white/10 border-r-0 rounded-l-2xl text-white/50 hover:text-cyan-400 hover:bg-white/5 transition-all duration-500 ease-in-out shadow-[0_0_20px_rgba(0,0,0,0.8)] ${isSidebarOpen ? 'right-80' : 'right-0'}`}
      >
        {isSidebarOpen ? <ChevronRight className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Side Dashboard - Fixed Right */}
      <aside className={`fixed right-0 top-0 h-screen w-80 z-[100] border-l border-white/5 backdrop-blur-4xl bg-[#05010a] flex flex-col p-8 overflow-y-auto transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-600 to-cyan-400 flex items-center justify-center shadow-[0_0_40px_rgba(255,0,122,0.4)]">
              <Zap className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-3xl font-bold tracking-tight uppercase block font-beast text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-400 to-cyan-400">PULSE</span>
              <span className="text-[10px] text-cyan-400 tracking-widest font-semibold uppercase mt-1 block">SIDE_DASHBOARD</span>
            </div>
          </div>

          <div className="space-y-6">
             <div className="text-xs font-semibold text-white/30 uppercase tracking-widest border-b border-white/10 pb-3 mb-2">Primary Directives</div>
             <button onClick={() => setShowImport(true)} className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-pink-600 text-white font-bold uppercase tracking-wider text-xs hover:bg-pink-500 shadow-lg transition-all">
                <UploadCloud className="w-5 h-5" /> BULK IMPORT
             </button>
             <button onClick={() => setShowAddTask(true)} className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-cyan-600 text-white font-bold uppercase tracking-wider text-xs hover:bg-cyan-500 shadow-lg transition-all">
                <Plus className="w-5 h-5" /> ADD TASK
             </button>
             <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={wakeUp}
                  disabled={isDayActive}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border font-semibold text-xs uppercase transition-all ${
                    isDayActive
                      ? 'bg-orange-500/20 border-orange-500/40 text-orange-400 cursor-not-allowed shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                      : 'bg-white/5 border-white/10 text-orange-400 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                  }`}
                >
                  <Sun className="w-5 h-5" /> {isDayActive ? 'ACTIVE' : 'WAKE'}
                </button>
                <button
                  onClick={sleepDown}
                  disabled={!isDayActive}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border font-semibold text-xs uppercase transition-all ${
                    !isDayActive
                      ? 'bg-white/3 border-white/5 text-white/20 cursor-not-allowed'
                      : 'bg-white/5 border-white/10 text-violet-400 hover:bg-violet-500 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                  }`}
                >
                  <Moon className="w-5 h-5" /> SLEEP
                </button>
             </div>
          </div>

          <div className="space-y-6">
             <div className="text-xs font-semibold text-white/30 uppercase tracking-widest border-b border-white/10 pb-3 mb-2">Temporal Sync</div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <div className="flex items-center gap-3 text-cyan-400 mb-2">
                   <Globe className="w-4 h-4" />
                   <span className="text-xs font-semibold uppercase tracking-widest">Nairobi (EAT)</span>
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">{nairobiTime}</div>
             </div>
          </div>

          <div className="space-y-6 mt-auto">
             <div className="text-xs font-semibold text-white/30 uppercase tracking-widest border-b border-white/10 pb-3 mb-2">Status Metrics</div>
             <div className="grid grid-cols-1 gap-3">
                <div className="p-5 rounded-xl bg-white/5 border border-white/5">
                   <div className="text-xs font-semibold text-white/40 uppercase mb-2">Time Bank</div>
                   <div className="text-lg font-bold text-cyan-400 tracking-wide">{remainingHours.toFixed(1)}H REMAINING</div>
                </div>
                <div className="p-5 rounded-xl bg-white/5 border border-white/5">
                   <div className="text-xs font-semibold text-white/40 uppercase mb-2">Date Tether</div>
                   <div className="text-lg font-bold text-pink-400 tracking-wide">{dateKey}</div>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace - Offset for Sidebar */}
      <div className={`flex-1 flex justify-center transition-all duration-500 ease-in-out ${isSidebarOpen ? 'pr-80' : 'pr-0'}`}>
        <main className="w-full max-w-[1600px] p-8 md:p-12">
          <div className="grid grid-cols-12 gap-8 md:gap-12">
          
          <div className="col-span-12">
             <div className="glass p-12 bg-gradient-to-r from-pink-600/20 via-transparent to-cyan-600/20 border-pink-500/40 relative overflow-hidden group shadow-2xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-8">
                   <div className="flex-1 max-w-full">
                      <div className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-400 mb-6">CURRENT DIRECTIVE</div>
                      <h2 className="text-5xl md:text-6xl font-bold tracking-tight uppercase break-words leading-tight">
                        {currentDirective ? currentDirective.title : "QUEUE EMPTY."}
                      </h2>
                      {!currentDirective && (
                        <button onClick={() => setShowImport(true)} className="mt-8 px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white/40 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all">Initialize Load</button>
                      )}
                   </div>
                   {currentDirective && (
                     <div className="flex gap-4 shrink-0">
                        <button onClick={() => setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === currentDirective.id ? { ...t, status: 'fully' } : t) })} className="px-10 py-5 rounded-xl bg-green-500 text-white font-bold uppercase text-sm shadow-xl hover:scale-105 transition-all">COMPLETE</button>
                        <button onClick={() => { setConfigData({...currentDirective}); setShowConfig(currentDirective.id); }} className="px-10 py-5 rounded-xl bg-white/10 text-white font-bold uppercase text-sm flex items-center gap-3 border border-white/10 hover:bg-white/20"><Settings2 className="w-5 h-5" /> CONFIG</button>
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
                     milestones={milestones}
                     onUpdateStatus={(id, s) => { setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === id ? { ...t, status: s } : t) }); addLog(`TASK STATUS: "${currentTasks.find(t=>t.id===id)?.title}" → ${s.toUpperCase()}`); }} 
                     onDelete={(id) => { addLog(`TASK DELETED: "${currentTasks.find(t=>t.id===id)?.title}"`); setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.filter(t => t.id !== id) }); }}
                     onUpdateNode={(id, category) => setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === id ? { ...t, category } : t) })}
                     onConfig={(id) => { const t = currentTasks.find(x => x.id === id); setConfigData({...t}); setShowConfig(id); }}
                     onAssignGoal={(id, goalId) => {
                       const task = currentTasks.find(t => t.id === id);
                       const goal = milestones.find(m => m.id === goalId);
                       setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === id ? { ...t, goalId } : t) });
                       addLog(`TASK LINKED: "${task?.title}" → ${goal ? '"' + goal.title + '"' : 'Unassigned'}`);
                     }}
                   />
               </div>
               <div className="flex flex-col gap-12 h-full xl:h-[850px]">
                   <ExecutiveSecretary tasks={currentTasks} remainingHours={remainingHours} />
                   <BeastQuote />
                   <div className="glass p-6 flex-1 flex flex-col items-center justify-center">
                      <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Deep Work Session</div>
                      <div className="text-5xl font-mono font-bold tracking-tighter text-white mb-6">
                        {formatTime(sessionTime)}
                      </div>
                      <div className="flex items-center gap-3 w-full">
                         <button 
                           onClick={() => setDeepWorkState('focus')} 
                           className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${deepWorkState === 'focus' ? 'bg-green-500/10 text-green-500/50 border border-green-500/20' : 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-400 hover:scale-105'}`}
                           disabled={deepWorkState === 'focus'}
                         >
                           Focus
                         </button>
                         <button 
                           onClick={() => setDeepWorkState('rest')} 
                           className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${deepWorkState === 'rest' ? 'bg-blue-500/10 text-blue-500/50 border border-blue-500/20' : 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:bg-blue-400 hover:scale-105'}`}
                           disabled={deepWorkState === 'rest'}
                         >
                           Rest
                         </button>
                         <button 
                           onClick={() => setDeepWorkState('idle')} 
                           className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${deepWorkState === 'idle' ? 'bg-red-500/10 text-red-500/50 border border-red-500/20' : 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:bg-red-400 hover:scale-105'}`}
                           disabled={deepWorkState === 'idle'}
                         >
                           Stop
                         </button>
                      </div>
                   </div>
                   <Calendar dateKey={dateKey} setDateKey={setDateKey} />
               </div>
            </div>
            <SchedulePulse tasks={currentTasks} />
          </div>

          <div className="col-span-12 xl:col-span-4 flex flex-col gap-12 h-full xl:h-[850px]">
             <NeuralPerformance sessionTime={sessionTime} />
             <MilestoneTracker
               milestones={milestones}
               tasks={currentTasks}
               onAdd={(title) => {
                 const newGoal = { id: Date.now(), title, status: 'in-progress' };
                 setMilestones(prev => [...prev, newGoal]);
                 addLog(`GOAL ADDED: "${title}"`);
               }}
               onDelete={(id) => {
                 const goal = milestones.find(m => m.id === id);
                 setMilestones(prev => prev.filter(m => m.id !== id));
                 setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.goalId === id ? { ...t, goalId: null } : t) });
                 addLog(`GOAL DELETED: "${goal?.title}"`);
               }}
               onEdit={(id, newTitle) => {
                 setMilestones(prev => prev.map(m => m.id === id ? { ...m, title: newTitle } : m));
                 addLog(`GOAL RENAMED: "${newTitle}"`);
               }}
             />
             <div className="glass p-10 border-violet-500/20 flex-1 flex flex-col">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-6 shrink-0">Intelligence Stream</h3>
                <div className="text-sm font-mono text-violet-300 break-words leading-relaxed flex-1 overflow-y-auto space-y-2 pr-2">
                  {streamLogs.map((log, i) => (
                    <div key={i} className={i === 0 ? "text-white" : "text-violet-400/50"}>{`> ${log}`}</div>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t border-white/5 text-xs text-white/30 uppercase tracking-widest font-semibold">PERSISTENCE: SECURED</div>
             </div>
          </div>
          </div>
        </main>
      </div>

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
        {showAddTask && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddTask(false)} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass w-full max-w-lg p-12 relative z-10 border-cyan-500/50 shadow-2xl">
              <h2 className="text-4xl font-black mb-10 italic uppercase tracking-tighter text-cyan-400">ADD TASK</h2>
              <div className="space-y-6">
                <input
                  type="text"
                  autoFocus
                  placeholder="Task title..."
                  value={newTaskData.title}
                  onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && addSingleTask()}
                  className="w-full bg-black/40 rounded-2xl p-5 border border-white/10 outline-none focus:border-cyan-500/50 text-white font-semibold text-lg placeholder-white/20"
                />
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-3">Priority</p>
                  <div className="grid grid-cols-4 gap-3">
                    {['critical', 'high', 'medium', 'low'].map(p => (
                      <button key={p} onClick={() => setNewTaskData({ ...newTaskData, priority: p })} className={`py-3 rounded-2xl text-[10px] font-black uppercase border transition-all ${newTaskData.priority === p ? 'bg-pink-600 border-pink-500 text-white shadow-xl' : 'bg-white/5 border-white/10 text-white/40'}`}>{p}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-3">Start Time</p>
                  <input type="time" value={newTaskData.startTime} onChange={(e) => setNewTaskData({ ...newTaskData, startTime: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-lg font-black text-white outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-3">Assign Goal (optional)</p>
                  <select
                    value={newTaskData.goalId || ''}
                    onChange={(e) => setNewTaskData({ ...newTaskData, goalId: e.target.value ? parseInt(e.target.value) : null })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-cyan-500 appearance-none"
                  >
                    <option value="">— Unassigned —</option>
                    {milestones.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                  </select>
                  {milestones.length === 0 && (
                    <p className="mt-2 text-[11px] text-white/25 italic">No goals yet — add goals in the Goal Tracker first.</p>
                  )}
                </div>
              </div>
              <div className="flex gap-6 mt-10">
                <button onClick={addSingleTask} disabled={!newTaskData.title.trim()} className="flex-1 py-5 rounded-2xl bg-cyan-600 text-white font-black uppercase tracking-widest text-xs hover:bg-cyan-500 shadow-2xl transition-all disabled:opacity-30 disabled:cursor-not-allowed">ADD TASK</button>
                <button onClick={() => setShowAddTask(false)} className="px-10 py-5 rounded-2xl bg-white/5 text-white/40 font-black uppercase tracking-widest text-xs hover:bg-white/10">ABORT</button>
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
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-3">Linked Goal</p>
                  <select
                    value={configData.goalId || ''}
                    onChange={(e) => setConfigData({...configData, goalId: e.target.value ? parseInt(e.target.value) : null})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-cyan-500 appearance-none"
                  >
                    <option value="">— Unassigned —</option>
                    {milestones.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                  </select>
                </div>
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
                  addLog(`TASK CONFIGURED: "${configData.title}" → Goal: ${milestones.find(m=>m.id===configData.goalId)?.title || 'Unassigned'}`);
                  setShowConfig(null);
              }} className="w-full mt-12 py-5 rounded-2xl bg-cyan-600 text-white font-black uppercase tracking-widest text-xs hover:bg-cyan-500 transition-all">APPLY</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFocusMode && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 hypnotic-bg overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
            {/* Hypnotic Flashing Quotes Background */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-around opacity-20 overflow-hidden">
               {["FOCUS", "EXECUTE", "NO EXCUSES", "CONQUER", "OVERCOME", "1000%"].map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="text-[10vw] font-black font-beast text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 tracking-tighter whitespace-nowrap"
                  >
                    {word}
                  </motion.div>
               ))}
            </div>

            <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center p-12 glass border-pink-500/50 shadow-[0_0_100px_rgba(255,0,122,0.3)]">
              <div className="mb-12">
                 <span className="px-6 py-2 rounded-full border border-pink-500/30 text-pink-400 text-[10px] font-bold uppercase tracking-[0.3em] bg-pink-500/10 shadow-[0_0_20px_rgba(255,0,122,0.2)] hypnotic-text">Absolute Focus Protocol</span>
              </div>
              
              {currentDirective ? (
                <div className="flex flex-col items-center justify-center w-full relative z-20">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-12 leading-tight max-w-4xl mx-auto break-words drop-shadow-2xl">
                    {currentDirective.title}
                  </h1>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full">
                     <button onClick={() => { setTasksByDate({ ...tasksByDate, [dateKey]: currentTasks.map(t => t.id === currentDirective.id ? { ...t, status: 'fully' } : t) }); setIsFocusMode(false); }} className="px-12 py-6 rounded-2xl bg-green-500 text-white font-bold uppercase text-lg tracking-widest hover:scale-105 hover:bg-green-400 transition-all shadow-[0_0_40px_rgba(34,197,94,0.4)] w-full sm:w-auto">
                       Execute & Clear
                     </button>
                     <button onClick={() => setIsFocusMode(false)} className="px-12 py-6 rounded-2xl bg-white/10 text-white font-bold uppercase text-sm tracking-widest hover:bg-white/20 transition-all border border-white/20 w-full sm:w-auto">
                       Disengage
                     </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white/20 mb-12 leading-tight italic">
                    QUEUE EMPTY.
                  </h1>
                  <button onClick={() => setIsFocusMode(false)} className="px-12 py-6 rounded-2xl bg-white/10 text-white font-bold uppercase text-sm tracking-widest hover:bg-white/20 transition-all border border-white/20">
                    Disengage
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Screen Deep Work Session Overlay */}
      <AnimatePresence>
        {deepWorkState !== 'idle' && (
          <div className={`fixed inset-0 z-[400] flex flex-col items-center justify-center p-6 ${deepWorkState === 'focus' ? 'rainbow-bg' : 'bg-[#001018]'}`}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
            
            {/* Hypnotic Flashing Words */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-around opacity-40 overflow-hidden mix-blend-overlay">
               {["FOCUS", "EXECUTE", "NO EXCUSES", "CONQUER", "OVERCOME", "1000%"].map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="text-[12vw] font-black font-beast text-white tracking-tighter whitespace-nowrap"
                  >
                    {word}
                  </motion.div>
               ))}
            </div>

            <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center p-12">
               <div className="mb-8">
                 <span className={`px-6 py-2 rounded-full border text-[12px] font-bold uppercase tracking-[0.4em] shadow-2xl ${deepWorkState === 'focus' ? 'border-white/50 text-white bg-white/10' : 'border-blue-500/50 text-blue-400 bg-blue-500/10'}`}>
                    {deepWorkState === 'focus' ? 'Absolute Focus Active' : 'Rest Phase Active'}
                 </span>
               </div>
               
               <h1 className="text-[12rem] font-black uppercase tracking-tighter text-white mb-16 drop-shadow-2xl font-mono leading-none">
                  {formatTime(sessionTime)}
               </h1>
               
               <div className="flex gap-8 mt-12 w-full max-w-3xl">
                  {deepWorkState === 'rest' ? (
                     <button onClick={() => setDeepWorkState('focus')} className="flex-1 py-8 rounded-3xl bg-green-500 text-white font-black uppercase text-2xl tracking-widest hover:scale-105 transition-all shadow-[0_0_50px_rgba(34,197,94,0.5)]">Resume Focus</button>
                  ) : (
                     <button onClick={() => setDeepWorkState('rest')} className="flex-1 py-8 rounded-3xl bg-blue-500 text-white font-black uppercase text-2xl tracking-widest hover:scale-105 transition-all shadow-[0_0_50px_rgba(59,130,246,0.5)]">Take Rest</button>
                  )}
                  <button onClick={() => setDeepWorkState('idle')} className="flex-1 py-8 rounded-3xl bg-red-500 text-white font-black uppercase text-2xl tracking-widest hover:scale-105 transition-all shadow-[0_0_50px_rgba(239,68,68,0.5)]">End Session</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
