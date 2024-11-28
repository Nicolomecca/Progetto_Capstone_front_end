import React from "react";
import { Card, ProgressBar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const QuizResultWithDetails = ({
  result,
  correctAnswers,
  incorrectAnswers,
  totalQuestions,
  questions,
  userAnswers,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card text="white" className="shadow mb-4 quiz-card glass-effect">
        <Card.Body>
          <motion.h2
            className="text-center mb-4 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Quiz Completed!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card.Text className="text-center">
              {result.score < 60
                ? "Don't worry, you can always try again!"
                : "Congratulations!"}
            </Card.Text>
            <Card.Text className="text-center">
              Your Score: {result.score}%
            </Card.Text>
            <Card.Text className="text-center">
              Level: {result.skillLevel}
            </Card.Text>
            <ProgressBar className="mb-3">
              <ProgressBar
                now={(correctAnswers / totalQuestions) * 100}
                key={1}
                style={{ backgroundColor: "#04605A" }}
              />
              <ProgressBar
                now={(incorrectAnswers / totalQuestions) * 100}
                key={2}
                style={{ backgroundColor: "#4CAF50", opacity: 0.5 }}
              />
            </ProgressBar>
            <div className="text-center">
              <span className="me-3">Correct: {correctAnswers}</span>
              <span>Incorrect: {incorrectAnswers}</span>
            </div>
          </motion.div>

          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {questions.map((question, index) => (
              <motion.div
                key={index}
                className="mb-3 question-box p-3 border rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h5 className="question-text text-white">
                  {question.question}
                </h5>
                {Object.entries(question.answers).map(([key, value]) => {
                  if (value === null) return null;
                  const isCorrect =
                    question.correct_answers[`${key}_correct`] === "true";
                  const userAnswer = userAnswers[question.id] === key;
                  return (
                    <div
                      key={key}
                      className={`answer-box ${
                        isCorrect
                          ? "text-success"
                          : userAnswer
                          ? "text-danger"
                          : "text-white"
                      }`}
                    >
                      {value} {userAnswer && !isCorrect ? "(Your Answer)" : ""}
                      {isCorrect && "(Correct)"}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </motion.div>
        </Card.Body>
      </Card>
      <motion.div
        className="text-center auth-bot"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Button
          className="auth-links quiz-nav-button"
          onClick={() => navigate("/home")}
        >
          Go to Home
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default QuizResultWithDetails;
