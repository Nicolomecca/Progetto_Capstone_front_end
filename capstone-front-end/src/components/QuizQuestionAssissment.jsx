import React from 'react';
import { motion } from 'framer-motion';

const QuizQuestionAssessment = ({ question, onAnswerChange, selectedAnswer }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-white mb-3">Question {question.id}</h4>
      <p className="text-white">{question.question}</p>
      {question.description && (
        <p className="text-muted mb-3">{question.description}</p>
      )}
      <div className="d-grid gap-2">
        {Object.entries(question.answers).map(([key, value]) => {
          if (value === null) return null;
          return (
            <motion.button
              key={key}
              className={`btn ${selectedAnswer === key ? 'btn-primary' : 'btn-outline-light'}`}
              onClick={() => onAnswerChange(question.id, key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {value}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuizQuestionAssessment;