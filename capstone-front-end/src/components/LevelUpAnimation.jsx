import React from 'react';
import { motion } from 'framer-motion';

const LevelUpAnimation = ({ newLevel, onAnimationComplete }) => {
  const levelUpAnimation = {
    hidden: { opacity: 0, scale: 0.8, rotate: -180 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 1.5,
      }
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      rotate: 180,
      transition: { duration: 0.5 }
    }
  };

  const particlesAnimation = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: [0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.div
      className="level-up-container text-center"
      variants={levelUpAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={onAnimationComplete}
    >
      <h3 className="level-up-text neon-green-text">Level Up!</h3>
      <p className="new-level">New level achieved: {newLevel}</p>
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={index}
          className="particle"
          variants={particlesAnimation}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
          }}
        />
      ))}
    </motion.div>
  );
};

export default LevelUpAnimation;