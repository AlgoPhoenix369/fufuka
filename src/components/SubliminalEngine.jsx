import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const POWER_WORDS = [
  "FOCUS", "ACTION", "DONE", "GOAL", "WIN", "NOW",
  "EXECUTE", "NO EXCUSES", "ABSOLUTE POWER", "STRENGTH",
  "UNSTOPPABLE", "BEYOND LIMITS", "PURE ENERGY", "VICTORY",
  "DISCIPLINE", "MASTERY", "SPEED", "DOMINATE"
];

const SubliminalEngine = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // Ultra high frequency: every 1-3 seconds
    const interval = setInterval(() => {
      const randomWord = POWER_WORDS[Math.floor(Math.random() * POWER_WORDS.length)];
      setCurrentWord(randomWord);
      setShowFlash(true);
      
      setTimeout(() => {
        setShowFlash(false);
      }, 50);
      
    }, Math.random() * 2000 + 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Violent flickering at low opacity */}
        <div className="absolute inset-0 bg-violet-600/5 animate-[pulse_0.05s_infinite] opacity-10" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-cyan-500/10 animate-pulse-subtle" />
        
        {/* Dynamic scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.08),rgba(0,255,0,0.03),rgba(0,0,255,0.08))] z-[1] bg-[length:100%_3px,4px_100%] pointer-events-none opacity-30" />
        
        {/* Matrix-like noise */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 0.15, scale: 1.5, rotate: 0 }}
            exit={{ opacity: 0, scale: 2, rotate: 5 }}
            transition={{ duration: 0.05 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999]"
          >
            <span className="text-[15vw] font-black tracking-[-0.1em] text-white uppercase italic drop-shadow-[0_0_50px_rgba(139,92,246,0.6)]">
              {currentWord}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SubliminalEngine;
