import React from "react";
import { Card, ProgressBar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const QuizResult = ({
  result,
  correctAnswers,
  incorrectAnswers,
  totalQuestions,
}) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="d-flex align-items-center justify-content-center pt-5">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="mb-4 quiz-card glass-effect">
          <Card.Body>
            <motion.div variants={itemVariants}>
              <Card.Title className="text-center mb-4 gradient-text">
                Quiz Completed!
              </Card.Title>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card.Text className="text-center mb-2 text-white">
                Congratulations! You can now start for real.
              </Card.Text>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card.Text className="text-center mb-2 text-white">
                Your Score:{" "}
                <span className="gradient-text">{result.score}%</span>
              </Card.Text>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card.Text className="text-center mb-3 text-white">
                Level:{" "}
                <span className="gradient-text">{result.skillLevel}</span>
              </Card.Text>
            </motion.div>
            <motion.div variants={itemVariants}>
              <ProgressBar className="mb-3">
                <ProgressBar
                  now={(correctAnswers / totalQuestions) * 100}
                  key={1}
                  style={{ backgroundColor: "#04605A" }}
                />

                <ProgressBar
                  now={(incorrectAnswers / totalQuestions) * 100}
                  style={{ backgroundColor: "#4CAF50", opacity: 0.5 }}
                  key={2}
                />
              </ProgressBar>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <span className="me-3 text-white">Correct: {correctAnswers}</span>
              <span className="text-white">Incorrect: {incorrectAnswers}</span>
            </motion.div>
          </Card.Body>
        </Card>
        <motion.div variants={itemVariants} className="text-center">
          <Button
            className="quiz-nav-button"
            onClick={() => navigate("/home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuizResult;
