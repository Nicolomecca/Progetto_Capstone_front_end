import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Timer = ({ duration, onTimeout, currentQuestion }) => {
  const [key, setKey] = useState(0);
  const [remainingTime, setRemainingTime] = useState(duration);
  const timerRef = useRef(null);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
    setRemainingTime(duration);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onTimeout();
    }, duration * 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentQuestion, duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => Math.max(prev - 0.1, 0));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={key}
        className="timer-container"
        initial={{ width: "100%" }}
        animate={{ width: `${(remainingTime / duration) * 100}%` }}
        transition={{ 
          duration: 0.1,
          ease: "linear"
        }}
      >
        <div className="timer-bar" />
      </motion.div>
    </AnimatePresence>
  );
};

export default Timer;