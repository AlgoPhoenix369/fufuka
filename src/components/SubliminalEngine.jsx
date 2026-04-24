import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const POWER_WORDS = [
  "EXECUTE", "DOMINATE", "FOCUS", "UNSTOPPABLE", "CLARITY", 
  "POWER", "PRECISION", "SPEED", "VICTORY", "DISCIPLINE"
];

const SubliminalEngine = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomWord = POWER_WORDS[Math.floor(Math.random() * POWER_WORDS.length)];
      setCurrentWord(randomWord);
      setShowFlash(true);
      
      // Flash for 50ms
      setTimeout(() => {
        setShowFlash(false);
      }, 50);
      
    }, Math.random() * 10000 + 5000); // Randomly every 5-15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Ambient Pulsing Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-gold-900/5 animate-pulse-subtle" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.05, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.05 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999]"
          >
            <span className="text-8xl font-black tracking-[1em] text-white uppercase">
              {currentWord}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SubliminalEngine;
