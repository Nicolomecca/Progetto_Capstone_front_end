import React from 'react';
import { motion } from 'framer-motion';

const PageTitle = () => (
  <motion.h2 
    className="text-center mb-5 text-white"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <span className="title-main">Choose a Quiz</span>
  </motion.h2>
);
export default PageTitle