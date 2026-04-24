import React from 'react';
import SubliminalEngine from './components/SubliminalEngine';
import MilestoneTracker from './components/MilestoneTracker';
import SchedulePulse from './components/SchedulePulse';
import CommandPalette from './components/CommandPalette';
import { Activity, Shield, Zap, Globe } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <SubliminalEngine />
      <CommandPalette />

      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,112,243,0.4)]">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">NeuroPulse</span>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            SYSTEM OPERATIONAL
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-blue-400 transition-colors">Terminal</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Nodes</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Quantum</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column: Schedule & Main Stats */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <SchedulePulse />
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Focus Score", value: "98.2", unit: "%", icon: Zap, color: "text-blue-400" },
                { label: "Neural Load", value: "12", unit: "ms", icon: Activity, color: "text-green-400" },
                { label: "Global Sync", value: "Locked", unit: "", icon: Globe, color: "text-gold-400" }
              ].map((stat, i) => (
                <div key={i} className="glass p-6 group cursor-default">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <div className="text-[10px] uppercase tracking-widest text-white/20">Real-time</div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
                    <span className="text-sm font-mono text-white/30">{stat.unit}</span>
                  </div>
                  <div className="mt-2 text-xs text-white/40 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Main Content Area Placeholder */}
            <div className="glass p-8 h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-4">Strategic Overview</h3>
                 <p className="text-white/40 max-w-md mx-auto leading-relaxed">
                   Your neural patterns are optimized for peak execution. 
                   Continue with the current trajectory to meet Q2 milestones 12 days ahead of schedule.
                 </p>
                 <button className="mt-8 px-8 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-blue-400 hover:text-white transition-all shadow-xl">
                   Enter Deep Flow
                 </button>
               </div>
            </div>
          </div>

          {/* Right Column: Milestones & Secondary Info */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <MilestoneTracker />
            
            <div className="glass p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Subconscious Feed</h3>
              <div className="space-y-4">
                {[
                  "Discipline is the bridge between goals and accomplishment.",
                  "Success is not final, failure is not fatal.",
                  "Focus on being productive instead of busy."
                ].map((quote, i) => (
                  <div key={i} className="text-sm text-white/70 italic leading-relaxed pl-4 border-l-2 border-blue-500/20">
                    "{quote}"
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 w-full px-6 py-2 border-t border-white/5 bg-black/40 backdrop-blur-sm flex items-center justify-between text-[10px] font-mono text-white/20">
        <div className="flex gap-6">
          <span>LATENCY: 4ms</span>
          <span>UPTIME: 99.99%</span>
          <span>AUTH: VERIFIED</span>
        </div>
        <div className="flex gap-6">
          <span>PRESS <kbd className="text-white/40 px-1 rounded bg-white/5 border border-white/10">CTRL</kbd> + <kbd className="text-white/40 px-1 rounded bg-white/5 border border-white/10">K</kbd> FOR COMMANDS</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
