import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const POWER_WORDS = [
  "FOCUS", "ACTION", "CALM", "DONE", "GOAL", 
  "SPEED", "READY", "FLOW", "WIN", "NOW"
];

const SubliminalEngine = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomWord = POWER_WORDS[Math.floor(Math.random() * POWER_WORDS.length)];
      setCurrentWord(randomWord);
      setShowFlash(true);
      
      setTimeout(() => {
        setShowFlash(false);
      }, 50);
      
    }, Math.random() * 10000 + 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-white/2 animate-pulse-subtle" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 0.03, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.05 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999]"
          >
            <span className="text-8xl font-black tracking-[1.5em] text-white uppercase italic">
              {currentWord}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SubliminalEngine;
