import React, { useState, useEffect, useRef } from "react";
import { Card, ProgressBar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { AcademicCapIcon, BeakerIcon, TrophyIcon } from '@heroicons/react/24/solid';

const QuizResultWithDetails = ({ result, correctAnswers, incorrectAnswers, totalQuestions, questions, userAnswers }) => {
  const navigate = useNavigate();
  const [explanations, setExplanations] = useState({});
  const [loading, setLoading] = useState({});
  const [visibleExplanations, setVisibleExplanations] = useState({});
  const [renderingText, setRenderingText] = useState({});
  const token = useSelector((state) => state.token.token);
  const canvasRef = useRef(null);

  const getBadgeForLevel = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return <AcademicCapIcon className={`level-badge beginner`} />;
      case 'intermediate':
        return <BeakerIcon className={`level-badge intermediate`} />;
      case 'advanced':
        return <TrophyIcon className={`level-badge advanced`} />;
      default:
        return null;
    }
  };

  const renderLetterByLetter = (questionId, text) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setRenderingText(prev => ({ ...prev, [questionId]: text.slice(0, index) }));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  const getExplanation = async (questionId, userAnswer, correctAnswer) => {
    setLoading(prev => ({ ...prev, [questionId]: true }));
    try {
      const response = await fetch("http://localhost:3001/answer/explanation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          question: questions.find(q => q.id === questionId).question,
          userAnswer,
          correctAnswer
        }),
      });
      if (!response.ok) {
        throw new Error("Error in request");
      }
      const data = await response.json();
      let limitedExplanation = data.explanation.split('.')[0] + '.';
      setExplanations(prev => ({ ...prev, [questionId]: limitedExplanation }));
      setVisibleExplanations(prev => ({ ...prev, [questionId]: true }));
      renderLetterByLetter(questionId, limitedExplanation);
    } catch (error) {
      console.error("Error retrieving explanation:", error);
      const errorMessage = "Unable to get explanation. Please try again later.";
      setExplanations(prev => ({ ...prev, [questionId]: errorMessage }));
      renderLetterByLetter(questionId, errorMessage);
    } finally {
      setLoading(prev => ({ ...prev, [questionId]: false }));
    }
  };

  const toggleExplanation = (questionId) => {
    setVisibleExplanations(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const CustomLoader = () => (
    <div className="custom-loader">
      <div className="loader-circle"></div>
      <div className="loader-text">Processing...</div>
    </div>
  );

  useEffect(() => {
    if (result.score >= 60) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const binary = '10';
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
      function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
          const text = binary[Math.floor(Math.random() * binary.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
      const interval = setInterval(draw, 33);
      return () => clearInterval(interval);
    }
  }, [result.score]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {result.score >= 60 && (
        <canvas
          ref={canvasRef}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
        />
      )}
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
              {result.score < 60 ? (
                "Don't worry, you can always try again!"
              ) : (
                <motion.div
                className="congratulations-text"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                <span className="title-accent">Congratulations!</span> <span className="fs-5"> You've unlocked the </span><span className="neon-green-text fs-3">Matrix!</span>
              </motion.div>
              )}
            </Card.Text>
            <Card.Text className="text-center fs-4">Your Score: {result.score}%</Card.Text>
            <Card.Text className="text-center d-flex align-items-center justify-content-center fs-4">
               Level  <span className=" ms-2 neon-green-text">  {result.skillLevel}</span> {getBadgeForLevel(result.skillLevel)}
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
              <span className="me-3 fs-5">Correct: {correctAnswers}</span>
              <span className="fs-5">Incorrect: {incorrectAnswers}</span>
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
                key={question.id}
                className="mb-3 question-box p-3 border rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h5 className="question-text text-white">{question.question}</h5>
                {Object.entries(question.answers).map(([key, value]) => {
                  if (value === null) return null;
                  const isCorrect = question.correct_answers[`${key}_correct`] === "true";
                  const userAnswer = userAnswers[question.id] === key;
                  return (
                    <div
                      key={key}
                      className={`answer-box ${
                        isCorrect ? "text-success" : userAnswer ? "text-danger" : "text-white"
                      }`}
                    >
                      {value}
                      {userAnswer && !isCorrect ? " (Your Answer)" : ""}
                      {isCorrect && " (Correct)"}
                      {userAnswer && !isCorrect && (
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="ms-3"
                          onClick={() =>
                            getExplanation(
                              question.id,
                              value,
                              question.answers[
                                Object.keys(question.correct_answers).find(
                                  (k) => question.correct_answers[k] === "true"
                                ).replace("_correct", "")
                              ]
                            )
                          }
                          disabled={loading[question.id]}
                        >
                          {loading[question.id] ? <CustomLoader /> : "Explanation"}
                        </Button>
                      )}
                    </div>
                  );
                })}
                <AnimatePresence>
                  {explanations[question.id] && visibleExplanations[question.id] && (
                    <motion.div
                      className="mt-2 explanation-box"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <strong>Explanation:</strong> {renderingText[question.id] || ''}
                      <div className="auth-bot">
                        <Button
                          size="sm"
                          className="ms-2 auth-links text-white"
                          onClick={() => toggleExplanation(question.id)}
                        >
                          Close
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
        <Button className="auth-links quiz-nav-button" onClick={() => navigate("/home")}>
          Go to Home
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default QuizResultWithDetails;