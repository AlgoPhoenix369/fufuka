import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const POWER_WORDS = [
  "FOCUS", "ACTION", "CALM", "DONE", "GOAL", 
  "SPEED", "READY", "FLOW", "WIN", "NOW",
  "EXECUTE", "NO EXCUSES", "BEYOND LIMITS", "PURE POWER",
  "ABSOLUTE FOCUS", "DESTROY DEFENSES", "SYSTEM OPTIMIZED"
];

const SubliminalEngine = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // Increased frequency: every 2-6 seconds
    const interval = setInterval(() => {
      const randomWord = POWER_WORDS[Math.floor(Math.random() * POWER_WORDS.length)];
      setCurrentWord(randomWord);
      setShowFlash(true);
      
      // Keep flash at 50ms for subliminal effect
      setTimeout(() => {
        setShowFlash(false);
      }, 50);
      
    }, Math.random() * 4000 + 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Rapid subtle flickering background */}
        <div className="absolute inset-0 bg-blue-500/2 animate-[pulse_0.1s_infinite] opacity-5" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-white/5 animate-pulse-subtle" />
        
        {/* Moving scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
        
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 0.08, scale: 1.1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 2 }}
            transition={{ duration: 0.05 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999]"
          >
            <span className="text-[12vw] font-black tracking-[-0.05em] text-white uppercase italic drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              {currentWord}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SubliminalEngine;
