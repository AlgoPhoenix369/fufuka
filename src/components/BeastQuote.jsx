import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const BEAST_QUOTES = [
  "MAIN CHARACTER ENERGY ACTIVATED.",
  "LOCKED IN. NO CAP.",
  "GHOST MODE: ENGAGED.",
  "THE GRIND DON'T STOP, FR FR.",
  "POV: YOU'RE WINNING.",
  "W PRODUCTIVITY ONLY.",
  "RENT IS DUE. EXECUTE.",
  "YOUR FUTURE SELF IS WATCHING.",
  "NO MORE MID WORK. EXCELLENCE ONLY.",
  "BIG BRAIN ENERGY ONLY.",
  "SURELY YOU CAN DO ONE MORE.",
  "EXECUTION > VIBES.",
  "BE THE VERSION THEY CAN'T IGNORE.",
  "YOU ARE THE 0.1%. ACT LIKE IT.",
  "STAY HUMBLE, GRIND HARD.",
  "ABSOLUTELY NO EXCUSES.",
  "WE DON'T DO WEAKNESS HERE.",
  "DOPAMINE FROM WORK > DOPAMINE FROM SCROLLING.",
  "BECOME A LEGEND IN THE MAKING.",
  "YOU'RE NOT TIRED. YOU'RE JUST UNINSPIRED.",
  "MANIFESTING SUCCESS THROUGH LABOR.",
  "WORK SO HARD YOUR BANK ACCOUNT LOOKS LIKE A PHONE NUMBER.",
  "DREAM BIG. WORK BIGGER.",
  "THE ONLY WAY OUT IS THROUGH.",
  "YOU ARE THE ARCHITECT OF YOUR FATE.",
  "CHASE THE VISION, NOT THE MONEY.",
  "SILENCE THE DOUBT WITH RESULTS.",
  "EVERY SECOND COUNTS. DON'T WASTE THEM.",
  "PUSH BEYOND THE COMFORT ZONE.",
  "SUCCESS IS THE ONLY OPTION.",
  "BORN TO CONQUER.",
  "LIMITS ARE JUST ILLUSIONS.",
  "RISE AND GRIND.",
  "TURN YOUR DREAMS INTO PLANS.",
  "YOU'RE JUST ONE TASK AWAY FROM A BREAKTHROUGH.",
  "STAY FOCUSED, STAY RELENTLESS.",
  "HARD WORK BEATS TALENT WHEN TALENT DOESN'T WORK HARD.",
  "YOUR ONLY LIMIT IS YOU.",
  "CONSISTENCY IS THE KEY TO MASTERY.",
  "WORK HARD IN SILENCE, LET SUCCESS BE YOUR NOISE.",
  "CHAMPIONS ARE MADE IN THE DARK.",
  "BELIEVE IN THE HUSTLE.",
  "DETERMINATION OVER MOTIVATION.",
  "GRIT OVER EVERYTHING.",
  "MAKE EVERY MOMENT COUNT.",
  "FOCUS ON THE GOAL, NOT THE OBSTACLE.",
  "YOUR POTENTIAL IS LIMITLESS.",
  "KEEP PUSHING, KEEP EVOLVING.",
  "THE JOURNEY IS THE REWARD.",
  "START NOW. FINISH LATER."
];

const BeastQuote = () => {
  const [quote, setQuote] = useState(BEAST_QUOTES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * BEAST_QUOTES.length);
      setQuote(BEAST_QUOTES[randomIndex]);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass p-8 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Quote className="w-6 h-6 text-pink-400" />
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/60 italic">Beast Mode Protocol</h3>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={quote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-black text-white selection:bg-pink-500/30 leading-tight italic"
        >
          "{quote}"
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: i * 2 }}
              className="h-full bg-gradient-to-r from-pink-500 to-cyan-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeastQuote;
