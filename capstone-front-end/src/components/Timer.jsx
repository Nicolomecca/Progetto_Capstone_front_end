import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Timer = ({ duration, onTimeout, currentQuestion }) => {
  const [key, setKey] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    setIsRunning(true);
    setKey(prevKey => prevKey + 1);
    
    const timer = setTimeout(() => {
      if (isRunning) {
        onTimeout();
      }
    }, duration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentQuestion]);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={key}
        className="timer-container"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ 
          duration: duration,
          ease: "linear",
          repeat: 0
        }}
      >
        <div className="timer-bar" />
      </motion.div>
    </AnimatePresence>
  );
};

export default Timer;