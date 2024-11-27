import React from 'react';
import { motion } from 'framer-motion';

const QuestionDisplay = ({ quizState, onAnswerSelect, onSubmit }) => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const currentQuestion = quizState.questions[quizState.currentIndex];

  return (
    <div className="question-container">
      <h4 className="text-white mb-4">
        Question {quizState.currentIndex + 1} of {quizState.questions.length}
      </h4>
      <p className="question-text">{currentQuestion.question}</p>
      <div className="answers-container">
        {Object.entries(currentQuestion.answers).map(([key, value]) => 
          value && (
            <motion.div key={key} whileHover={{ scale: 1.02 }} className="mb-3">
              <div 
                className={`answer-box ${quizState.userAnswers[currentQuestion.id] === key ? "selected" : ""}`}
                onClick={() => onAnswerSelect(currentQuestion.id, key)}
              >
                {value}
              </div>
            </motion.div>
          )
        )}
      </div>
      <motion.div className="mt-4 d-flex justify-content-between">
        <motion.button 
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="quiz-nav-button"
          onClick={() => onSubmit()}
        >
          Submit Quiz
        </motion.button>
      </motion.div>
    </div>
  );
};

export default QuestionDisplay;